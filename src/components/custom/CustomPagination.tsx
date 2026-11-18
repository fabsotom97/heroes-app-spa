import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
    totalPages: number;
    limit?: number;
}

export const CustomPagination = ({ totalPages, limit }: PaginationProps) => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: totalPages }).map((_, index) => (
                    <Button key={index} variant="default" size="sm">
                        {index + 1}
                    </Button>
                ))
            }

            <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
