import { heroApi } from "../api/hero.api";
import type { Hero } from "../models/hero.interface";
import { mapHero } from "../models/hero.mapper";

export interface SearchHeroOptions {
    name?: string;
    team?: string;
    category?: string;
    universe?: string;
    status?: string;
    strength?: string;
}

export const searchHeroAction = async (opt: SearchHeroOptions) => {

    if (!opt.name && !opt.team && !opt.category
        && !opt.universe && !opt.status && !opt.strength) {
        return [];
    }

    const { data } = await heroApi.get<Hero[]>(`/search`, {
        params: opt,
    });

    return data.map(mapHero);
}