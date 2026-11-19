import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Hero } from "../models/hero.interface";

interface HeroPowerComparisonChartProps {
    hero: Hero;
}

export const HeroPowerComparisonChart = ({ hero }: HeroPowerComparisonChartProps) => {
    // WIP: transform hero into an array of stats and then map to component
    return (
        <Card>
            <CardHeader>
                <CardTitle>Power Comparison Chart</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Strength</div>
                        <div className="flex-1">
                            <Progress value={hero.strength * 10} className="h-4" activeColor="bg-red-500"/>
                        </div>
                        <div className="w-12 text-right font-bold">{hero.strength}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Intelligence</div>
                        <div className="flex-1">
                            <Progress value={hero.intelligence * 10} className="h-4" />
                        </div>
                        <div className="w-12 text-right font-bold">{hero.intelligence}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Speed</div>
                        <div className="flex-1">
                            <Progress value={hero.speed * 10} className="h-4" />
                        </div>
                        <div className="w-12 text-right font-bold">{hero.speed}/10</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-24 text-sm font-medium">Durability</div>
                        <div className="flex-1">
                            <Progress value={hero.durability * 10} className="h-4" />
                        </div>
                        <div className="w-12 text-right font-bold">{hero.durability}/10</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
