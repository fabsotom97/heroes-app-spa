import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { Jumbotron } from "@/components/custom/Jumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "@/heroes/components/SearchControls";

export const SearchPage = () => {
  return (
    <>
      <Jumbotron
        title="Superhero Search"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />

      <CustomBreadcrumbs currentPage="Search" />

      <HeroStats />

      <SearchControls />
    </>
  );
}

export default SearchPage;