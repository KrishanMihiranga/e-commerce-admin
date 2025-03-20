import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
const ManageSizesContent = ({ data }: { data: any[] }) => {


    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Table className="min-w-full text-sm text-left text-gray-700">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow className="border-b">

                    <TableHead className="py-3 px-4">Size</TableHead>
                    <TableHead className="py-3 px-4">Length</TableHead>
                    <TableHead className="py-3 px-4">Chest</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((size, index) => {
                    return (
                        <TableRow key={index} className="hover:bg-gray-100 transition-all duration-200">


                            <TableCell className="py-2 px-4">{size.size}</TableCell>
                            <TableCell className="py-2 px-4">{size.length}"</TableCell>
                            <TableCell className="py-2 px-4">{size.chest}"</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
};

export default ManageSizesContent; 