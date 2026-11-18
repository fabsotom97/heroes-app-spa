import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/components/SearchControls";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";
import { useSearchParams } from "react-router";

type TabOption = 'all' | 'favorites' | 'heroes' | 'villains';

export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { data: heroesResponse, isLoading } = useQuery({
    queryKey: ['heroes'],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  const handleTabClick = (tab: TabOption) => {
    setSearchParams(prev => {
      prev.set('tab', tab);
      return prev;
    });
  }

  const heroes = heroesResponse?.heroes || [];
  const activeTab: TabOption = searchParams.get('tab') as TabOption ?? 'all';

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
              All Characters (16)
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
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleTabClick('villains')}
            >
              Villains (2)
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

        {/* <CustomPagination /> */}
      </>
    </>
  )
}