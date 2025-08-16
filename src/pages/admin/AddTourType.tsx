import { AddTourTypeModel } from "@/components/modules/admin/tourType/AddTourTypeModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

export default function AddTourTypes() {
  const { data } = useGetAllTourTypesQuery(undefined);
  console.log(data);

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
            {data?.map((item: { name: string }, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <Trash2 className="text-red-700 cursor-pointer" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
