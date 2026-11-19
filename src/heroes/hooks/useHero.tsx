import { useQuery } from "@tanstack/react-query";
import { getHeroAction } from "../actions/get-hero.action";

export const useHero = (id: string) => {

    const { data, isLoading } = useQuery({
        queryKey: ['hero', { id }],
        queryFn: () => getHeroAction(id),
        staleTime: 1000 * 60 * 5,
    });

    return {
        data,
        isLoading,
    };
}