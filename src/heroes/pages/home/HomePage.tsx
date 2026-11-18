import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/components/SearchControls";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

type TabOption = 'all' | 'favorites' | 'heroes' | 'villains';

export const HomePage = () => {

  const [activeTab, setActiveTab] = useState<TabOption>('all');

  const { data: heroesResponse, isLoading } = useQuery({
    queryKey: ['heroes'],
    queryFn: () => getHeroesByPageAction(),
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

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
              onClick={() => setActiveTab('all')}
            >
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => setActiveTab('favorites')}
            >
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => setActiveTab('heroes')}
            >
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setActiveTab('villains')}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h1>All Characters</h1>
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="favorites">
            <h1>Favorites</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="heroes">
            <h1>Heroes</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Villains</h1>
            <HeroGrid heroes={[]} />
          </TabsContent>
        </Tabs>

        {/* <CustomPagination /> */}
      </>
    </>
  )
}