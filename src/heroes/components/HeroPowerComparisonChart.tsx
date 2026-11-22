import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Hero } from "../models/hero.interface";

interface HeroPowerComparisonChartProps {
    hero: Hero;
}

interface PowerStat {
    label: string;
    value: number;
    color: string;
    colorWeight?: number;
}

export const HeroPowerComparisonChart = ({ hero }: HeroPowerComparisonChartProps) => {

    const stats: PowerStat[] = [
        { label: 'Strength', color: 'red', value: hero.strength, },
        { label: 'Intelligence', color: 'purple', value: hero.intelligence, },
        { label: 'Speed', color: 'yellow', value: hero.speed, colorWeight: 400 },
        { label: 'Durability', color: 'green', value: hero.durability },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Power Comparison Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {stats.map(stat => (
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-medium">{stat.label}</div>
                            <div className="flex-1">
                                <Progress
                                    value={stat.value * 10}
                                    className="h-4"
                                    activeColor={`bg-${stat.color}-${stat.colorWeight || 500}`}
                                />
                            </div>
                            <div className="w-12 text-right font-bold">{stat.value}/10</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
