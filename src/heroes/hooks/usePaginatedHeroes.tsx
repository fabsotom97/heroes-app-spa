import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHeroes = (page: number, limit: number, category = 'all') => {

    const { data, isLoading } = useQuery({
        queryKey: ['heroes', { page, limit, category }],
        queryFn: () => getHeroesByPageAction(page, limit, category),
        staleTime: 1000 * 60 * 5, // 5 min cache
    });

    return {
        data,
        isLoading,
    };
}
