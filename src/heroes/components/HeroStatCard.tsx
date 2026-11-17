import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, type LucideIcon } from "lucide-react";

interface HeroStatCardProps {
    title: string;
    icon: LucideIcon;
    // wip
}

export const HeroStatCard = () => {
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Characters</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">16</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            12 Heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            2 Villains
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
