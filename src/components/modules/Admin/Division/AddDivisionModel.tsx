import SingleFileUploader from "@/components/SingleFileUploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddDivisionMutation } from "@/redux/features/division/divisionApi";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const divisionSchema = z.object({
  name: z.string({ error: "You have to provide Division Name" }),
  description: z.string().optional(),
});

export function AddDivisionModel() {
  const [image, setImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [addDivision] = useAddDivisionMutation();

  const form = useForm<z.infer<typeof divisionSchema>>({
    resolver: zodResolver(divisionSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const nameValue = form.watch("name");

  const onSubmit = async (data: z.infer<typeof divisionSchema>) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    const toastId = toast.loading("Division Adding");
    try {
      const res = await addDivision(formData);

      if (res?.data?.success) {
        console.log(res);
        toast.success("Division Added successfully", { id: toastId });
        setOpen(false);
        form.reset();
      } else {
        toast.error("Division Add Failed", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Division Added Failed", { id: toastId });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Division</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Division</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-4"
            id="add-division"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Division Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Division Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is tour type name field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write description" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is tour type name field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <SingleFileUploader onChange={setImage} />
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            disabled={!image || !nameValue?.trim()}
            form="add-division"
            type="submit"
          >
            Add Division
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
