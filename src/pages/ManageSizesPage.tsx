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
import { GetSizes } from "@/service/ProductsService"
import { SizeProps } from "@/common/interfaces"
import { CreateNewSize } from "@/service/SizesService"
import ManageSizesContent from "@/components/manageSizes/manageSizesContent"

const formSchema = z.object({
    size: z.string().min(1, { message: "Name must be at least 1 characters.", }),
    length: z.number().min(1, { message: "Length must be at least 1 characters.", }),
    chest: z.number().min(1, { message: "Chest must be at least 1 characters.", }),

})


const ManageSizesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [data, setData] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
    })


    const fetchData = async () => {
        try {
            const sizesRes = await GetSizes();
            setData(sizesRes.data);
            return data;

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (data.length > 0) {
            setLoading(false);
        }
    }, [data])

    const onSubmit = async (data: any) => {
        setUpdating(true);

        const size: SizeProps = {
            size: data?.size,
            length: data?.length,
            chest: data?.chest,
        }

        await CreateNewSize({ data: size }).then(async (res) => {
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
                        <DialogTitle>Add New Size</DialogTitle>
                        <DialogDescription>
                        </DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5 ">

                                <div className="grid grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="size"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Size</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Size" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="chest"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Chest</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Chest in Inch"
                                                        {...field}
                                                        type="number"
                                                        min={1}
                                                        onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="length"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Length</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter Length in Inch"
                                                        {...field}
                                                        type="number"
                                                        min={1}
                                                        onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                                                    />
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
                                                Add New Size
                                            </>
                                        ) : (
                                            "Add New Size"
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
                            <h1 className="text-2xl font-semibold">Manage Sizes</h1>

                            <Button className="h-12 w-1/5 cursor-pointer" onClick={() => { setIsModalOpen(true) }}><Plus /> Add New Size</Button>
                        </div>
                        <div className="p-10">
                            <ManageSizesContent data={data} />
                        </div>
                    </div>
                )
            }
        </section>

    )
}


export default ManageSizesPage
