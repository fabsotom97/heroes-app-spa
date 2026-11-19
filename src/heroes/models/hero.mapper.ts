import type { Hero } from "./hero.interface";

const BASE_URL = import.meta.env.VITE_API_URL;

export const mapHero = (hero: Hero): Hero => {
    return {
        ...hero,
        // instead of receiving just the '4.jpeg'
        // transform the data into the full URL of the image
        // for easier read in the component side
        image: `${BASE_URL}/images/${hero.image}`
    };
}