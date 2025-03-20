import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

const ManageItemsContent = ({ data }: { data: any[] }) => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);
    const [selectedColors, setSelectedColors] = useState<{ [key: number]: number }>({});

    const handleCopySlug = (slug: string) => {
        navigator.clipboard.writeText(slug);
        setOpenMenu(null);
    };

    const handleGoToProduct = (slug: string) => {
        window.location.href = `/product/${slug}`;
        setOpenMenu(null);
    };

    const handleColorChange = (productIndex: number, colorIndex: number) => {
        setSelectedColors((prevState) => ({
            ...prevState,
            [productIndex]: colorIndex,
        }));
    };

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <Table className="min-w-full text-sm text-left text-gray-700">
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow className="border-b">
                    <TableHead className="py-3 px-4">Image</TableHead>
                    <TableHead className="py-3 px-4">Name</TableHead>
                    <TableHead className="py-3 px-4">Available Colors</TableHead>
                    <TableHead className="py-3 px-4">Price</TableHead>
                    <TableHead className="py-3 px-4">Sizes & Quantities</TableHead>
                    <TableHead className="py-3 px-4">Main Category</TableHead>
                    <TableHead className="py-3 px-4">Sub Category</TableHead>
                    <TableHead className="py-3 px-4">KOKO</TableHead>
                    <TableHead className="py-3 px-4">Description</TableHead>
                    <TableHead className="py-3 px-4">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((product, index) => {
                    const selectedDetail = product.ProductDetails[selectedColors[index] ?? 0];
                    return (
                        <TableRow key={index} className="hover:bg-gray-100 transition-all duration-200">
                            <TableCell className="py-2 px-4">
                                <img
                                    src={selectedDetail.urls[0].url || product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            </TableCell>
                            <TableCell className="py-2 px-4">{product.name}</TableCell>
                            <TableCell className="py-2 px-4">
                                <div className="flex space-x-1">
                                    {product.ProductDetails.map((detail: any, colorIndex: number) => (
                                        <span
                                            key={colorIndex}
                                            className="inline-block w-4 h-4 rounded-full cursor-pointer border"
                                            style={{ backgroundColor: detail.colorKey.hex }}
                                            title={detail.colorKey.name}
                                            onClick={() => handleColorChange(index, colorIndex)}
                                        ></span>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="py-2 px-4">{selectedDetail.price} LKR</TableCell>
                            <TableCell className="py-2 px-4">
                                <div>
                                    {selectedDetail.sizes.map((size: { size: string, qty: number }, sizeIndex: number) => (
                                        <div key={sizeIndex} className="flex space-x-4">
                                            <span className="block">{size.size}: {size.qty}</span>
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="py-2 px-4">{product.mainCategoryKey}</TableCell>
                            <TableCell className="py-2 px-4">{product.subCategoryKey}</TableCell>
                            <TableCell className="py-2 px-4">
                                <span
                                    className={product.isKokoAvailable ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}
                                >
                                    {product.isKokoAvailable ? "Available" : "Unavailable"}
                                </span>
                            </TableCell>

                            <TableCell className="py-2 px-4 max-w-xs truncate">{product.description}</TableCell>
                            <TableCell className="py-2 px-4 relative text-right">
                                <button onClick={() => setOpenMenu(openMenu === index ? null : index)} className="p-1 hover:bg-transparent cursor-pointer rounded">
                                    <MoreVertical size={20} />
                                </button>
                                {openMenu === index && (
                                    <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md border z-10">
                                        <button onClick={() => handleCopySlug(product.slug)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Copy Slug</button>
                                        <button onClick={() => handleGoToProduct(product.slug)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Go to Product</button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <TableFooter></TableFooter>
        </Table>
    );
};

export default ManageItemsContent;
