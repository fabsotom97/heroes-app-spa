import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Grid, Plus, Search, SortAsc } from "lucide-react";
import { AdvancedFilters } from "./AdvancedFilters";
import { useRef } from "react";
import { useSearchParams } from "react-router";

export const SearchControls = () => {

    const searchInputRef = useRef<HTMLInputElement>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const nameParam = searchParams.get('name');
    //const pageParam = searchParams.get('page') ?? '1';
    //const limitParam = searchParams.get('limit') ?? '6';
    //const categoryParam = searchParams.get('category');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setSearchParams(prev => {
                prev.set('name', searchInputRef.current?.value || '');
                return prev;
            });
        }
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

                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 bg-white">
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
            <AdvancedFilters />
        </>
    )
}
