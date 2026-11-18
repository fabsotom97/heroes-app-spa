import { CustomNavigationMenu, type NavigationItem } from "@/components/custom/CustomNavigationMenu";
import { Outlet } from "react-router";


const items: NavigationItem[] = [
    {
        path: '/',
        label: 'Home',
    },
    {
        path: '/heroes/1',
        label: 'Hero',
    },
    {
        path: '/search',
        label: 'Search',
    },
];

export const HeroesLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto p-6">
                <CustomNavigationMenu items={items} />

                <Outlet />
            </div>
        </div>
    );
}
