import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect } from "react";
const ManageColorContent = ({ data }: { data: any[] }) => {


    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Table className="min-w-full text-sm text-left text-gray-700">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow className="border-b">

                    <TableHead className="py-3 px-4">Color</TableHead>
                    <TableHead className="py-3 px-4">Name</TableHead>
                    <TableHead className="py-3 px-4">Hex</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((color, index) => {
                    return (
                        <TableRow key={index} className="hover:bg-gray-100 transition-all duration-200">

                            <TableCell className="py-2 px-4">
                                <span className="w-8 h-8 inline-block border" style={{backgroundColor: color.hex}}></span>
                            </TableCell>
                            <TableCell className="py-2 px-4">{color.name}</TableCell>
                            <TableCell className="py-2 px-4">{color.hex}</TableCell>

                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
};

export default ManageColorContent;
