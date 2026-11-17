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
        <div>
            <ul>
                {links.map(link =>
                    <li>
                        <Link to={link.path}>{link.label}</Link>
                    </li>)}
            </ul>

            <Outlet />
        </div>
    );
}
