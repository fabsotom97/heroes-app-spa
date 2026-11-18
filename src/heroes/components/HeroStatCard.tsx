import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type React from "react";

interface HeroStatCardProps {
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
}

export const HeroStatCard = ({ title, icon, content }: HeroStatCardProps) => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{title}</CardTitle>
                    {icon}
                </CardHeader>
                <CardContent>
                    {content}
                </CardContent>
            </Card>
        </>
    )
}
