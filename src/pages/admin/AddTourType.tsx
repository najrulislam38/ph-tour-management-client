/* eslint-disable @typescript-eslint/no-unused-vars */
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

export default function AddTourTypes() {
  const { data } = useGetAllTourTypesQuery(undefined);
  // console.log(data);
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleConfirm = async (tourTypeId: string) => {
    console.log("clicked");
    try {
      const res = await removeTourType(tourTypeId);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
            {data?.map((item: { _id: string; name: string }, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <DeleteConfirmation onConfirm={() => handleConfirm(item._id)}>
                    <Button>
                      <Trash2 className="text-red-700 cursor-pointer" />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
