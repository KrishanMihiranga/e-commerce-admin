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
import { GetColors } from "@/service/ProductsService"
import { ColorProps } from "@/common/interfaces"
import { ColorPicker } from "@/components/ManageColors/ColorPicker"
import { CreateNewColor } from "@/service/ColorService"
import ManageColorContent from "@/components/ManageColors/ManageColorContent"

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters.", }),
    hex: z.string().min(3, { message: "Hex must be at least 3 characters.", }),

})


const ManageColorsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [updating, setUpdating] = useState<boolean>(false)
    const [data, setData] = useState([]);

    const form = useForm({
        resolver: zodResolver(formSchema),
    })



    const fetchData = async () => {
        try {
            const colorsRes = await GetColors();
            setData(colorsRes.data);
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
       
        const color: ColorProps = {
            key: data?.name.toUpperCase(),
            name: data?.name,
            hex: data?.hex,
        }
       
        await CreateNewColor({ data: color }).then(async (res) => {
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
                        <DialogTitle>Add New Color</DialogTitle>
                        <DialogDescription>
                            {/* Add New product */}
                        </DialogDescription>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5 ">

                                <div className="grid grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter color name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="hex"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Choose Color</FormLabel>
                                                <FormControl>
                                                    <ColorPicker
                                                        onChange={(v) => field.onChange(v)}
                                                        value={field.value}
                                                        onBlur={field.onBlur}
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
                                                Add New Color
                                            </>
                                        ) : (
                                            "Add New Color"
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
                            <h1 className="text-2xl font-semibold">Manage Colors</h1>

                            <Button className="h-12 w-1/5 cursor-pointer" onClick={() => { setIsModalOpen(true) }}><Plus /> Add New Color</Button>
                        </div>
                        <div className="p-10">
                            <ManageColorContent data={data} />
                        </div>
                    </div>
                )
            }
        </section>

    )
}


export default ManageColorsPage