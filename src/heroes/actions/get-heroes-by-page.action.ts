import { heroApi } from "../api/hero.api";
import type { HeroesResponse } from "../models/get-heroes-response";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (): Promise<HeroesResponse> => {
    const { data } = await heroApi.get<HeroesResponse>('/');

    const heroes = data.heroes.map((hero) => ({
        ...hero,
        // instead of receiving just the '4.jpeg'
        // transform the data into the full URL of the image
        // for easier read in the component side
        image: `${BASE_URL}/images/${hero.image}`
    }));

    return {
        ...data,
        heroes: heroes,
    };
}