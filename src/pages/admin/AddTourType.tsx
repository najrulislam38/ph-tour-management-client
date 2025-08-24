import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModel } from "@/components/modules/Admin/TourTypes/AddTourTypeModel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

export default function AddTourTypes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data } = useGetAllTourTypesQuery({ page: currentPage, limit });
  // console.log(data);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleConfirm = async (tourTypeId: string) => {
    const toastId = toast.loading("Removing...");

    try {
      const res = await removeTourType(tourTypeId);

      if (res?.data?.success) {
        toast.success("Tour Type Removed", { id: toastId });
      } else {
        toast.error("Something was wrong", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something was wrong", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center flex-wrap mb-6">
        <h3 className="text-xl font-semibold">Tour Types</h3>
        <AddTourTypeModel />
      </div>
      <div className="border border-muted rounded-md">
        <Table className="text-center">
          <TableHeader>
            <TableRow>
              <TableHead>SL No.</TableHead>
              <TableHead className="w-full text-center">Name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map(
              (item: { _id: string; name: string }, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * limit + (index + 1)}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <DeleteConfirmation
                      onConfirm={() => handleConfirm(item._id)}
                    >
                      <Button>
                        <Trash2 className="text-red-700 cursor-pointer" />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
      {totalPage > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
