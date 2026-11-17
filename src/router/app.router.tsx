import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { createBrowserRouter, Navigate } from "react-router";

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                path: '',
                element: <HomePage />
            },
            {
                path: '/heroes/1',
                element: <HeroPage />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
        ],
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '',
                element: <AdminPage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to={'/'} />
    }
]);