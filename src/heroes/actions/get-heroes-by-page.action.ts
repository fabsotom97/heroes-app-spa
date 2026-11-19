import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../models/get-heroes.response";
import { mapHero } from "../models/hero.mapper";


export const getHeroesByPageAction = async (
    page: number,
    limit: number = 6,
    category?: string,
): Promise<HeroesResponse> => {

    if (isNaN(page)) {
        throw new Error('page value is not a number!');
    }

    if (isNaN(limit)) {
        throw new Error('limit value is not a number!');
    }

    const { data } = await heroApi.get<HeroesResponse>('/', {
        params: {
            limit: limit,
            offset: (page - 1) * limit,
            category,
        }
    });

    const heroes = data.heroes.map(mapHero);

    return {
        ...data,
        heroes: heroes,
    };
}