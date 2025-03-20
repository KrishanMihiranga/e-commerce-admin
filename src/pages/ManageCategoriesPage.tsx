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
import { CategoryProps, SizeProps } from "@/common/interfaces"
import { CreateNewSize } from "@/service/SizesService"
import { CreateCategory, GetCategoryByType } from "@/service/CategoriesService"
import ManageCategoriesContent from "@/components/ManageCategories/ManageCategoriesContent"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const formSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters.", }),
    type: z.string().min(3, { message: "Name must be at least 3 characters.", }),

})

const ManageCategoriesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [data, setData] = useState([]);
    const [category, setCategory] = useState<string>('main');

    const form = useForm({
        resolver: zodResolver(formSchema),
    })


    const fetchData = async () => {
        try {
            const categoryRes = await GetCategoryByType({ type: category });
            setData(categoryRes.data);
            return data;

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        fetchData()
    }, [category])

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false);
        }
    }, [data])

    const onSubmit = async (data: any) => {
        setUpdating(true);

        const category: CategoryProps = {
            key: data?.name?.toUpperCase(),
            name: data?.name,
        }

        await CreateCategory({ data: category, type: data?.type }).then(async (res) => {
            if (res?.status === 201) {
                form.reset()
                setIsModalOpen(false)
                await fetchData();
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setUpdating(false)
        })
    }
    return (
        <section className="px-10 py-5 mb-20">
            <Dialog open={isModalOpen} >
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Add New Categories</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">


                                <div className=" grid grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Category Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select a Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Fruits</SelectLabel>
                                                                <SelectItem value="main">Main Categories</SelectItem>
                                                                <SelectItem value="sub">Sub categories</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <DialogFooter>
                                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={updating}>
                                        {updating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Add New Category
                                            </>
                                        ) : (
                                            "Add New Category"
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
                            <h1 className="text-2xl font-semibold">Manage Categories</h1>

                            <Button className="h-12 w-1/5 cursor-pointer" onClick={() => { setIsModalOpen(true) }}><Plus /> Add New Categories</Button>
                        </div>
                        <div className="p-10">
                            <Select defaultValue={category} onValueChange={(e) => setCategory(e)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="main">Main Categories</SelectItem>
                                        <SelectItem value="sub">Sub categories</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <ManageCategoriesContent data={data} />
                        </div>
                    </div>
                )
            }
        </section>

    )
}


export default ManageCategoriesPage