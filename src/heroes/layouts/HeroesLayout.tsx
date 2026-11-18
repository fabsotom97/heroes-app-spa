import { CustomNavigationMenu } from "@/components/custom/CustomNavigationMenu";
import { Link, Outlet } from "react-router";

interface RouteLink {
    path: string;
    label: string;
}

const links: RouteLink[] = [
    {
        path: '/',
        label: 'Home',
    },
    {
        path: '/heroes/1',
        label: 'Hero',
    },
    {
        path: 'search',
        label: 'Search',
    },
    {
        path: '/admin',
        label: 'Admin',
    },
];

export const HeroesLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto p-6">
                <CustomNavigationMenu />

                <Outlet />
            </div>
        </div>
    );
}
