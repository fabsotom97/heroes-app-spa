import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/components/SearchControls";
import { useHeroSearch } from "@/heroes/hooks/useHeroSearch";
import { useSearchParams } from "react-router";

export const SearchPage = () => {

  const [searchParams] = useSearchParams();

  const nameParam = searchParams.get('name') ?? undefined;

  const { data: searchResult } = useHeroSearch({
    name: nameParam || undefined,
    //category: categoryParam,
  });

  return (
    <>
      <Jumbotron
        title="Superhero Search"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumbs currentPage="Search" />

      <HeroStats />

      <SearchControls />

      <HeroGrid heroes={searchResult || []} />
    </>
  );
}

export default SearchPage;