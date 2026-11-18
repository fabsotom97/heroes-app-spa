import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/components/SearchControls";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useSearchParams } from "react-router";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHeroes } from "@/heroes/hooks/usePaginatedHeroes";

const VALID_TABS = ['all', 'favorites', 'heroes', 'villains'] as const;

type TabOption = typeof VALID_TABS[number];

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab');
  // not validated!
  const pageParam = searchParams.get('page') ?? '1';
  const limitParam = searchParams.get('limit') ?? '6';

  const { data: summaryResponse } = useHeroSummary();
  const { data: heroesResponse } = usePaginatedHeroes(+pageParam, +limitParam);

  const handleTabClick = (tab: TabOption) => {
    setSearchParams(prev => {
      prev.set('tab', tab);
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

        <SearchControls />

        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => handleTabClick('all')}
            >
              All Characters ({summaryResponse?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => handleTabClick('favorites')}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => handleTabClick('heroes')}
            >
              Heroes ({summaryResponse?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleTabClick('villains')}
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
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={heroes.filter(hero => hero.category === 'Hero')} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains</h1>
            <HeroGrid heroes={heroes.filter(hero => hero.category === 'Villain')} />
          </TabsContent>
        </Tabs>

        <CustomPagination totalPages={heroesResponse?.pages || 1} />
      </>
    </>
  )
}