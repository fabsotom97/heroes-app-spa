import { heroApi } from "../api/hero.api";
import { mapHero } from "../models/hero.mapper";

export const getHeroAction = async (id: string) => {
    const { data } = await heroApi.get(`/${id}`)
    return mapHero(data);
}