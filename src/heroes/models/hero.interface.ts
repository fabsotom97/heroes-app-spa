export type HeroCategory = 'Hero' | 'Villain';

export type HeroUniverse = 'DC' | 'Marvel';

export type HeroStatus = 'Active' | 'Deceased';

export interface Hero {
    id: string;
    name: string;
    slug: string;
    alias: string;
    powers: string[];
    description: string;
    strength: number;
    intelligence: number;
    speed: number;
    durability: number;
    team: string;
    image: string;
    firstAppearance: string;
    status: HeroStatus;
    category: HeroCategory;
    universe: HeroUniverse;
}