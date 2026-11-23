import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";
import { useContext } from "react";
import { FavoriteHeroesContext } from "@/heroes/context/FavoriteHeroesContext";

const VALID_TABS = ['all', 'favorites', 'heroes', 'villains'] as const;

type TabOption = typeof VALID_TABS[number];

interface TabChangeProps {
  tab: TabOption;
  category?: string;
  page?: string;
}

export const HomePage = () => {

  const { favorites, favoriteCount } = useContext(FavoriteHeroesContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab');
  // not validated!
  const pageParam = searchParams.get('page') ?? '1';
  const limitParam = searchParams.get('limit') ?? '6';
  const categoryParam = searchParams.get('category') ?? 'all';

  const { data: summaryResponse } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHeroes(+pageParam, +limitParam, categoryParam);

  const handleTabClick = ({ tab, category, page }: TabChangeProps) => {
    setSearchParams(prev => {
      prev.set('tab', tab);
      prev.set('category', category || 'all');
      prev.set('page', page || '1');
      return prev;
    });
  }

  const heroes = heroesResponse?.heroes || [];

  // validation solution suggested by Gemini
  const activeTab: TabOption = (VALID_TABS as readonly string[]).includes(tabParam as string)
    ? (tabParam as TabOption)
    : 'all';

  return (
    <>
      <>
        <Jumbotron
          title="Superhero Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        <CustomBreadcrumbs currentPage="Superheroes" />

        <HeroStats />

        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => handleTabClick({ tab: 'all', category: 'all', page: '1' })}
            >
              All Characters ({summaryResponse?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => handleTabClick({ tab: 'favorites', page: '1' })}
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => handleTabClick({ tab: 'heroes', category: 'hero', page: '1' })}
            >
              Heroes ({summaryResponse?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleTabClick({ tab: 'villains', category: 'villain', page: '1' })}
            >
              Villains ({summaryResponse?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>All Characters</h1>
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favorites</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains</h1>
            <HeroGrid heroes={heroes} />
          </TabsContent>
        </Tabs>

        {activeTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages || 1} />
        )}
      </>
    </>
  )
}