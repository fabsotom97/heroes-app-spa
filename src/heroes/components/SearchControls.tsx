import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { useRef } from "react";
import { useSearchParams } from "react-router";

export const SearchControls = () => {

    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const nameParam = searchParams.get('name');
    //const pageParam = searchParams.get('page') ?? '1';
    //const limitParam = searchParams.get('limit') ?? '6';
    //const categoryParam = searchParams.get('category');
    const activeAccordionParam = searchParams.get('active-accordion') ?? '';
    const strengthParam = searchParams.get('strength') ?? '0';

    const setQueryParameter = (name: string, value: string) => {
        setSearchParams(prev => {
            prev.set(name, value);
            return prev;
        });
    }

    const removeQueryParameter = (name: string) => {
        setSearchParams(prev => {
            prev.delete(name);
            return prev;
        })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setQueryParameter('name', searchInputRef.current?.value || '');
        }
    }

    const handleClearAllFilters = () => {
        // TODO
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        ref={searchInputRef}
                        onKeyDown={handleKeyDown}
                        defaultValue={nameParam || ''}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={activeAccordionParam === 'advanced-filters' ? 'default' : 'outline'}
                        className="h-12"
                        onClick={() => {
                            if (activeAccordionParam === 'advanced-filters') {
                                removeQueryParameter('active-accordion');
                            } else {
                                setQueryParameter('active-accordion', 'advanced-filters');
                            }
                        }}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12 bg-white">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>

            {/* Advanced filters */}
            <Accordion value={[activeAccordionParam]}>
                <AccordionItem value="advanced-filters">
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button
                                    variant="ghost"
                                    onClick={handleClearAllFilters}
                                >
                                    Clear All
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All categories
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Universe</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All universes
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All statuses
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {strengthParam}/10</label>
                                <Slider value={[Number(strengthParam)]}
                                    onValueChange={(value) => {
                                        setQueryParameter('strength', value.toString());
                                    }}
                                    max={10}
                                    step={1} />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}
