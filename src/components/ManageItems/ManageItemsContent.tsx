
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import image from '../../../public/images/p2.webp'
import image2 from '../../../public/images/gp3.webp'
import { useState } from "react";
import { MoreVertical } from "lucide-react";

const products = [
    {
        image: image,
        name: "Classic Polo Shirt",
        availableColors: ["#1E3A8A", "#6B7280", "#D97706"],
        qty: [
            { size: "S", qty: 50 },
            { size: "M", qty: 75 },
            { size: "L", qty: 40 },
        ],
        price: 3200,
        mainCategory: "Male",
        subCategory: "Polo Shirt",
        koko: true,
        slug: "classic-polo-shirt",
        description: 'A high-quality cotton t-shirt available in multiple colors.'
    },
    {
        image: image2,
        name: "Casual Hoodie",
        availableColors: ["#374151", "#DC2626", "#2563EB"],
        qty: [
            { size: "S", qty: 60 },
            { size: "M", qty: 90 },
            { size: "L", qty: 20 },
        ],
        price: 4500,
        mainCategory: "Unisex",
        subCategory: "Hoodie",
        koko: false,
        slug:"casual-hoodie",
        description: 'A high-quality cotton t-shirt available in multiple colors.'
    },
    {
        image: image2,
        name: "Slim Fit Jeans",
        availableColors: ["#1E293B", "#64748B"],
        qty: [
            { size: "30", qty: 40 },
            { size: "32", qty: 70 },
            { size: "34", qty: 35 },
        ],
        price: 5000,
        mainCategory: "Male",
        subCategory: "Jeans",
        koko: true,
        slug:"slim-fit-jeans",
        description: 'A high-quality cotton t-shirt available in multiple colors.'
    },
    {
        image: image,
        name: "Summer Shorts",
        availableColors: ["#FACC15", "#F97316"],
        qty: [
            { size: "S", qty: 100 },
            { size: "M", qty: 50 },
            { size: "L", qty: 25 },
        ],
        price: 2800,
        mainCategory: "Male",
        subCategory: "Shorts",
        koko: false,
        slug:"summer-short",
        description: 'A high-quality cotton t-shirt available in multiple colors.'
    },
    {
        image: image,
        name: "Floral Dress",
        availableColors: ["#F43F5E", "#A855F7", "#D946EF"],
        qty: [
            { size: "S", qty: 45 },
            { size: "M", qty: 60 },
            { size: "L", qty: 30 },
        ],
        price: 5500,
        mainCategory: "Female",
        subCategory: "Dress",
        koko: true,
        slug:"floral-dress",
        description: 'A high-quality cotton t-shirt available in multiple colors.'
    },
];

const ManageItemsContent = () => {
    const [openMenu, setOpenMenu] = useState<number | null>(null);

    const handleCopySlug = (slug: string) => {
        navigator.clipboard.writeText(slug);
        setOpenMenu(null)
    };

    const handleGoToProduct = (slug: string) => {
        window.location.href = `/product/${slug}`;
        setOpenMenu(null)
    };

    return (
        <Table className="min-w-full text-sm text-left text-gray-700" >
            <TableCaption>A list of your recent products.</TableCaption>
            <TableHeader>
                <TableRow className="border-b">
                    <TableHead className="py-3 px-4">Image</TableHead>
                    <TableHead className="py-3 px-4">Name</TableHead>
                    <TableHead className="py-3 px-4">Available Colors</TableHead>
                    <TableHead className="py-3 px-4">Qty</TableHead>
                    <TableHead className="py-3 px-4">Price</TableHead>
                    <TableHead className="py-3 px-4">Main Category</TableHead>
                    <TableHead className="py-3 px-4">Sub Category</TableHead>
                    <TableHead className="py-3 px-4">KOKO</TableHead>
                    <TableHead className="py-3 px-4">Description</TableHead>
                    <TableHead className="py-3 px-4">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product, index) => (
                    <TableRow key={index} className="hover:bg-gray-100 transition-all duration-200">
                        <TableCell className="py-2 px-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
                        </TableCell>
                        <TableCell className="py-2 px-4">{product.name}</TableCell>
                        <TableCell className="py-2 px-4">
                            <div className="flex space-x-1">
                                {product.availableColors.map((color, index) => (
                                    <span key={index} className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color }}></span>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="py-2 px-4">
                            {product.qty.map((qty, index) => (
                                <div key={index} className="text-sm">{qty.size}: {qty.qty}</div>
                            ))}
                        </TableCell>
                        <TableCell className="py-2 px-4">{product.price} LKR</TableCell>
                        <TableCell className="py-2 px-4">{product.mainCategory}</TableCell>
                        <TableCell className="py-2 px-4">{product.subCategory}</TableCell>
                        <TableCell className="py-2 px-4">
                            <span className={product.koko ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                                {product.koko ? 'Available' : 'Unavailable'}
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
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={10} className="py-3 px-4 text-center text-gray-500">
                        Design and developed by Krishan
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default ManageItemsContent;