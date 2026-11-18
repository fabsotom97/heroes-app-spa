import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const usePaginatedHeroes = (page: number, limit: number) => {

    const { data, isLoading } = useQuery({
        queryKey: ['heroes', { page, limit }],
        queryFn: () => getHeroesByPageAction(page, limit),
        staleTime: 1000 * 60 * 5, // 5 min cache
    });

    return {
        data,
        isLoading,
    };
}
