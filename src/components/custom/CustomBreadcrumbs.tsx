import { Link } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

export interface BreadcrumbItem {
    label: string;
    path: string;
}

interface CustomBreadcrumbsProps {
    currentPage: string;
    breadcrumbs?: BreadcrumbItem[];
}

export const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: CustomBreadcrumbsProps) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/">Home</Link>} />
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {breadcrumbs.map(bc => (
                    <BreadcrumbItem key={bc.path}>
                        <BreadcrumbLink render={<Link to={bc.path}>{bc.label}</Link>} />
                        <BreadcrumbSeparator />
                    </BreadcrumbItem>
                ))}

                <BreadcrumbItem>
                    <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
