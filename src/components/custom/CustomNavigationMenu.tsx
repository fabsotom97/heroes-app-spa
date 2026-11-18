import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";


interface NavigationItem {
    path: string;
    label: string;
}

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
    {
        path: '/admin',
        label: 'Admin',
    },
];

export const CustomNavigationMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        // not working with nested paths like '/hero/1'
        return pathname === path;
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map(item => (
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(isActive(item.path) && 'bg-slate-200 rounded-md p-2')}>
                            <Link to={item.path}>{item.label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
