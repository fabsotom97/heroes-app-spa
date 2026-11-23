import { useQuery } from "@tanstack/react-query";
import { searchHeroAction, type SearchHeroOptions } from "../actions/search-hero.action";

export const useHeroSearch = (opt: SearchHeroOptions) => {

    const query = useQuery({
        queryKey: ['search-hero', opt],
        queryFn: () => searchHeroAction(opt),
        staleTime: 1000 * 60 * 5,
        retry: false,
    });

    return query;
}
