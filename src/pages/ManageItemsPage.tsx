import ManageItemsContent from "@/components/ManageItems/ManageItemsContent"
import { Button } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FileUploader from "@/components/fileUploader/FileUploader"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateNewProduct, GetAllProducts, GetColors, GetMainCategories, GetSizes, GetSubCategories } from "@/service/ProductsService"
import { ModalDataProps, ProductProps } from "@/common/interfaces"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    mainCategory: z.string().min(1, { message: "Main category is required." }),
    subCategory: z.string().min(1, { message: "Sub category is required." }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    variants: z.array(z.any()).min(1, { message: "Please add at least one variant." }),
    koko: z.boolean()
})




const ManageItemsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [items, setItems] = useState<any[]>([]);
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [restImages, setRestImages] = useState<string[]>([]);
    const [modalData, setModalData] = useState<ModalDataProps>({ colors: [], sizes: [], mainCategories: [], subCategories: [], allProducts: [] });

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const [newItem, setNewItem] = useState({
        id: crypto.randomUUID(),
        color: "",
        sizes: [] as { id: string; size: string; qty: number }[],
        price: 0,
    });

    const [newSize, setNewSize] = useState({
        size: "",
        qty: 0,
    });



    const handleAddItem = () => {
        if (newItem.color && newItem.sizes.length > 0 && newItem.price > 0) {
            const newVariant = {
                ...newItem,
                id: crypto.randomUUID(),
                coverImage: coverImage,
                restImages: restImages,
            };
            setItems([...items, newVariant]);
            form.setValue('variants', [...items, newVariant]);
            setNewItem({
                id: crypto.randomUUID(),
                color: "",
                sizes: [],
                price: 0,
            });
            setCoverImage(undefined);
            setRestImages([]);
        }
    };

    const handleAddSize = () => {
        if (newSize.size && newSize.qty > 0) {
            setNewItem((prev) => ({
                ...prev,
                sizes: [...prev.sizes, { id: crypto.randomUUID(), ...newSize }],
            }));
            setNewSize({ size: "", qty: 0 });
        }
    };

    const fetchData = async () => {
        try {
            const colorsRes = await GetColors();
            const sizesRes = await GetSizes();
            const mainCategoriesRes = await GetMainCategories();
            const subCategoriesRes = await GetSubCategories();
            const allProducts = await GetAllProducts();

            setModalData({
                colors: colorsRes?.data || [],
                sizes: sizesRes?.data || [],
                mainCategories: mainCategoriesRes?.data || [],
                subCategories: subCategoriesRes?.data || [],
                allProducts: allProducts?.data || [],
            });
            return modalData;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (modalData.colors.length > 0 &&
            modalData.colors.length > 0 &&
            modalData.mainCategories.length > 0 &&
            modalData.allProducts.length > 0 &&
            modalData.subCategories.length > 0) {
            setLoading(false);
        }
    }, [modalData])

    const onSubmit = async (data: any) => {
        setUpdating(true);

        const IndividualProductDetails = await data?.variants.map((variant: any) => {
            const data = {
                colorKey: variant?.color || '',
                urls: [
                    {
                        url: variant?.coverImage || '',
                        isCover: true,
                    },
                    ...variant?.restImages?.map((restImage: any) => ({
                        url: restImage,
                        isCover: false,
                    })) || [],
                ],
                sizes: variant?.sizes?.map((size: any) => ({
                    size: size?.size || '',
                    qty: size?.qty || 0,
                })) || [],
                price: variant?.price || 0,
            }

            return data;
        })


        const product: ProductProps = {
            name: data?.name || '',
            productDetails: IndividualProductDetails,
            mainCategoryKey: data?.mainCategory || '',
            subCategoryKey: data?.subCategory || '',
            description: data?.description || '',
            isKokoAvailable: data?.koko || false,
        }


        await CreateNewProduct({ data: product }).then(async (res) => {
            console.log(res)

            if (res?.status === 201) {
                form.reset()
                setItems([])
                setCoverImage(undefined)
                setRestImages([])
                setIsModalOpen(false)
                await fetchData();
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setUpdating(false)
        })
    }

    const handleUploadComplete = (url: string) => {
        console.log("Uploaded file URL:", url);
        setCoverImage(url);
    };
    const handleRestImageUploadComplete = (url: string) => {
        console.log("Uploaded file URL:", url);
        setRestImages((prev) => [...prev, url]);
    };

    return (
        <section className="px-10 py-5 mb-20">
            <Dialog open={isModalOpen} >
                <DialogContent className="min-w-[60vw]">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                        <DialogDescription>
                            {/* Add New product */}
                        </DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">


                                <div className="grid grid-cols-3 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mainCategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Main Category</FormLabel>
                                                <FormControl>
                                                    <Select  {...field} onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a fruit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select Category</SelectLabel>
                                                                {modalData?.mainCategories?.map((category) => (
                                                                    <SelectItem value={category?.key} key={category?.key}>{category?.name}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subCategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Sub Category</FormLabel>
                                                <FormControl>
                                                    <Select  {...field} onValueChange={field.onChange} value={field.value} >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a fruit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Select Category</SelectLabel>
                                                                {modalData?.subCategories?.map((category) => (
                                                                    <SelectItem value={category?.key} key={category?.key}>{category?.name}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="koko"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>KOKO</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="koko"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                    <Label htmlFor="koko">Accept KOKO</Label>
                                                </div>
                                            </FormControl>
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
                                                <Textarea placeholder="Type product description here" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />




                                <FormField
                                    control={form.control}
                                    name="variants"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Product Details</FormLabel>
                                            <FormControl>
                                                <ScrollArea className="h-[50vh]">

                                                    <section className="grid grid-cols-2 w-full gap-4">
                                                        {items.map((item) => (
                                                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
                                                                <div className="p-4 md:p-6">
                                                                    <div className="flex items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-4">
                                                                            <div>
                                                                                <h3 className="font-semibold text-lg">{item.color}</h3>
                                                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                                    {item.sizes.map((size: any) => `${size.size} (${size.qty})`).join(", ")}
                                                                                </p>
                                                                                <p className="text-sm font-bold">${item.price}</p>
                                                                            </div>
                                                                        </div>


                                                                        {item.coverImage && (
                                                                            <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                                                                <img src={item.coverImage} alt="Cover Image" className="w-full h-full object-cover" />
                                                                            </div>
                                                                        )}
                                                                    </div>


                                                                    {item.restImages.length > 0 && (
                                                                        <div className="mt-4 grid grid-cols-4 gap-2">
                                                                            {item.restImages.map((image: string, index: number) => (
                                                                                <div key={index} className="relative">
                                                                                    <img src={image} alt="Rest Image" className="w-20 h-20 object-cover rounded-md" />
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}


                                                        <div className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950">
                                                            <div className="p-4 md:p-6">
                                                                <div className="flex flex-col gap-5">


                                                                    <div>
                                                                        <Label className="mb-1">Color</Label>
                                                                        <Select value={newItem.color} onValueChange={(value) => setNewItem({ ...newItem, color: value })}>
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue placeholder="Select a color" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                {
                                                                                    modalData?.colors?.map((color) => (
                                                                                        <SelectItem key={color.key} value={color.key} className="flex items-center justify-between">
                                                                                            <span className="inline-block">
                                                                                                {color?.name}
                                                                                                <span
                                                                                                    className="w-3 h-3 inline-block rounded-full ml-2"
                                                                                                    style={{ backgroundColor: color.hex }}
                                                                                                ></span>
                                                                                            </span>
                                                                                        </SelectItem>
                                                                                    )
                                                                                    )
                                                                                }
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>


                                                                    <div>
                                                                        <Label className="mb-1">Sizes</Label>
                                                                        {newItem.sizes.length > 0 && (
                                                                            <div className="border p-3 rounded-md mb-3">
                                                                                {newItem.sizes.map((size) => (
                                                                                    <div key={size.id} className="flex justify-between text-sm">
                                                                                        <span>{size.size}</span>
                                                                                        <span>{size.qty}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                        <div className="flex gap-3 items-center">
                                                                            <Select value={newSize.size} onValueChange={(value) => setNewSize({ ...newSize, size: value })}>
                                                                                <SelectTrigger className="w-full">
                                                                                    <SelectValue placeholder="Size" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    {
                                                                                        modalData?.sizes?.map((size) => (
                                                                                            <SelectItem value={size?.size} key={size?.size}>{size?.size}</SelectItem>
                                                                                        )
                                                                                        )
                                                                                    }
                                                                                </SelectContent>
                                                                            </Select>
                                                                            <Input
                                                                                type="number"
                                                                                value={newSize.qty}
                                                                                onChange={(e) => setNewSize({ ...newSize, qty: Number(e.target.value) })}
                                                                                placeholder="Qty"
                                                                                className="w-24" />
                                                                            <Button size="sm" onClick={handleAddSize} type="button" >
                                                                                + Add
                                                                            </Button>
                                                                        </div>
                                                                    </div>


                                                                    <div>
                                                                        <Label className="mb-1">Price</Label>
                                                                        <Input
                                                                            type="number"
                                                                            placeholder="Price"
                                                                            value={newItem.price || ""}
                                                                            onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })} />
                                                                    </div>


                                                                    <div className="flex gap-5">

                                                                        <div>
                                                                            <Label className="mb-1">Cover Image</Label>
                                                                            {coverImage ? (
                                                                                <div className="flex flex-col gap-2">
                                                                                    <img src={coverImage} alt="Cover Image" className="w-20 rounded-md shadow" />
                                                                                    <Button size="sm" variant="destructive" onClick={() => setCoverImage(undefined)}>
                                                                                        Remove
                                                                                    </Button>
                                                                                </div>
                                                                            ) : (
                                                                                <FileUploader onUpload={handleUploadComplete} />
                                                                            )}
                                                                        </div>


                                                                        <div>
                                                                            <Label className="mb-1">Other Images</Label>
                                                                            {restImages.length > 0 ? (
                                                                                <div className="grid grid-cols-4 gap-2">
                                                                                    {restImages.map((image, index) => (
                                                                                        <div key={index} className="relative">
                                                                                            <img src={image} alt="Image" className="w-20 rounded-md shadow" />
                                                                                        </div>
                                                                                    ))}
                                                                                    <FileUploader onUpload={handleRestImageUploadComplete} type={"small"} />
                                                                                </div>
                                                                            ) : (
                                                                                <FileUploader onUpload={handleRestImageUploadComplete} />
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    <Button className="mt-4 w-full" onClick={handleAddItem} type="button">
                                                                        Save Variant
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </ScrollArea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>

                                    )} />

                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={updating}>
                                        {updating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Add New Product
                                            </>
                                        ) : (
                                            "Add New Product"
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>

                    </DialogHeader>
                </DialogContent>

            </Dialog>
            {
                loading ? (
                    <h1> Loading...</h1>
                ) : (
                    <div className="border rounded-xl">
                        <div className="border-b h-28 flex items-center justify-between px-10">
                            <h1 className="text-2xl font-semibold">Manage Products</h1>

                            <Button className="h-12 w-1/5 cursor-pointer" onClick={() => { setIsModalOpen(true) }}><Plus /> Add New Product</Button>
                        </div>
                        <div className="p-10">
                            <ManageItemsContent data={modalData?.allProducts} />
                        </div>
                    </div>
                )
            }
        </section>

    )
}

export default ManageItemsPage