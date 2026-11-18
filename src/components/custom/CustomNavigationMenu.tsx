import { Link } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";


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
        path: 'search',
        label: 'Search',
    },
    {
        path: '/admin',
        label: 'Admin',
    },
];

export const CustomNavigationMenu = () => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map(item => (
                    <NavigationMenuItem>
                        <NavigationMenuLink>
                            <Link to={item.path}>{item.label}</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
