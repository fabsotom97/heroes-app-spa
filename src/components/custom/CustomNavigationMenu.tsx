import { Link, useLocation } from "react-router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";


export interface NavigationItem {
    path: string;
    label: string;
}

interface CustomNavigationMenuProps {
    items: NavigationItem[];
}

export const CustomNavigationMenu = ({ items }: CustomNavigationMenuProps) => {

    const { pathname } = useLocation();

    const isActive = (path: string) => {
        // not working with nested paths like '/hero/1'
        return pathname === path;
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                {items.map(item => (
                    <NavigationMenuItem key={item.path}>
                        <NavigationMenuLink
                            className={cn(isActive(item.path) && 'bg-slate-200 rounded-md p-2')}
                            render={<Link to={item.path}>{item.label}</Link>}
                        />
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
