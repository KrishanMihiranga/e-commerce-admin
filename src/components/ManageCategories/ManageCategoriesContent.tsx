import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
const ManageCategoriesContent = ({ data }: { data: any[] }) => {


    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Table className="min-w-full text-sm text-left text-gray-700">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow className="border-b">

                    <TableHead className="py-3 px-4">Name</TableHead>


                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((category, index) => {
                    return (
                        <TableRow key={index} className="hover:bg-gray-100 transition-all duration-200">

                            <TableCell className="py-2 px-4">{category.name}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
};

export default ManageCategoriesContent;
