import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type React from "react";

interface HeroPageStatsCardProps {
    color: string;
    colorWeight?: number; // acts as a fallback in case the color weight is not defined
    icon: React.ReactNode;
    label: string;
    value: number;
}

export const HeroPageStatsCard = ({
    color,
    colorWeight = 500,
    icon,
    label,
    value,
}: HeroPageStatsCardProps) => {
    return (
        <Card className="text-center">
            <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                    <div className={cn(`bg-${color}-100`, 'p-3 rounded-full')}>
                        {icon}
                    </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{label}</h3>
                <div
                    className={cn(`text-${color}-600`, "text-3xl font-bold mb-2")}
                >
                    {value}
                </div>
                <Progress
                    value={value * 10}
                    className="h-2"
                    activeColor={`bg-${color}-${colorWeight}`}
                />
            </CardContent>
        </Card>
    );
}
