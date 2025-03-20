import ManageItemsContent from "@/components/ManageItems/ManageItemsContent"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
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
import { TestHealth } from "@/service/TestService"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    mainCategory: z.string().min(1, { message: "Main category is required." }),
    subCategory: z.string().min(1, { message: "Sub category is required." }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    variants: z.array(z.any()).min(1, { message: "Please add at least one variant." })
})




const ManageItemsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [items, setItems] = useState<any[]>([]);
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [restImages, setRestImages] = useState<string[]>([]);

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

    const handleTest = async () => {
        await TestHealth().then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const onSubmit = (data: any) => {
        console.log(data)
        console.log(items)
        form.reset()
        setItems([])
        setCoverImage(undefined)
        setRestImages([])
        setIsModalOpen(false)
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
            <Dialog open={isModalOpen}>
                <DialogContent className="min-w-[60vw]">
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

                                <div className="grid grid-cols-2 gap-5">
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
                                                                <SelectLabel>Fruits</SelectLabel>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                                    <Select  {...field} onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a fruit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup >
                                                                <SelectLabel>Fruits</SelectLabel>
                                                                <SelectItem value="apple">Apple</SelectItem>
                                                                <SelectItem value="banana">Banana</SelectItem>
                                                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                                                <SelectItem value="grapes">Grapes</SelectItem>
                                                                <SelectItem value="pineapple">Pineapple</SelectItem>
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
                                    render={({ field }) => (
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
                                                                                <SelectItem value="Black">Black</SelectItem>
                                                                                <SelectItem value="White">White</SelectItem>
                                                                                <SelectItem value="Purple">Purple</SelectItem>
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
                                                                                    <SelectItem value="S">S</SelectItem>
                                                                                    <SelectItem value="M">M</SelectItem>
                                                                                    <SelectItem value="L">L</SelectItem>
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
                                    <Button type="submit">Add New Product</Button>
                                </DialogFooter>
                            </form>
                        </Form>

                    </DialogHeader>
                </DialogContent>

            </Dialog>
            <div className="border rounded-xl">
                <div className="border-b h-28 flex items-center justify-between px-10">
                    <h1 className="text-2xl font-semibold">Manage Products</h1>
                    
                    <Button type="button" onClick={handleTest}>Test</Button>
                    <Button className="h-12 w-1/5 cursor-pointer" onClick={() => { setIsModalOpen(true) }}><Plus /> Add New Product</Button>
                </div>
                <div className="p-10">
                    <ManageItemsContent />
                </div>
            </div>
        </section>

    )
}

export default ManageItemsPage