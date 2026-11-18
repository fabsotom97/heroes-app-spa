import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-heroes-summary.action";

export const useHeroSummary = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['summary-response'],
        queryFn: getSummaryAction,
        staleTime: 1000 * 60 * 5,
    });

    return {
        data,
        isLoading,
    };
};