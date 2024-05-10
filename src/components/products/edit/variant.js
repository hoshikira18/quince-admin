import {Button} from "@mantine/core"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Pencil} from "lucide-react";
import {useToast} from "@/components/ui/use-toast";
import {memo} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useAdminCreateVariant} from "medusa-react";

const EditVariant = ({productId, options}) => {
    const {toast} = useToast()
    const createVariant = useAdminCreateVariant(productId)

    const form = useForm({
        defaultValues: {
            title: "",
            inventory_quantity: 0,
            prices: [],
            options: []
        }
    })



    const handleCreate = (variantData) => {
        createVariant.mutate(variantData, {
            onSuccess: ({ product }) => {
                toast({
                    title: "Tạo biến thể thành công",
                    description: product.created_at,
                })
            }
        })
    }

    return <Dialog>
        <DialogTrigger><div className={` cursor-pointer border p-2 rounded text-sm`}><span>Chỉnh sửa</span></div></DialogTrigger>
        <DialogContent className={`max-w-screen-lg max-h-[800px] overflow-y-scroll`}>
            <DialogHeader>
                <DialogTitle>Chỉnh sửa thông tin chung</DialogTitle>
                <DialogDescription>
                    Hành động này không thể hoàn tác
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(data => {
                handleCreate(createPayload(data))
            })} className={`space-y-3`}>
                <div className={`mt-5 transition-all duration-500`}>
                    <Label htmlFor="title">Tên biến thể</Label>
                    <Input type="text" id={`title`}
                           className={`w-full transition-all duration-500`} {...form.register("title", {required: true})} />
                </div>
                <div className={`grid grid-cols-12 gap-x-5`}>
                    {
                        options?.map((o, index) => {
                            return <div key={index} className={`mt-5 transition-all duration-500 col-span-12 grid grid-cols-12 gap-x-5`}>

                                <div className={`col-span-6`}>
                                    <Label htmlFor="title" className={`col-span-12`}>{o.title}</Label>
                                    <Select onValueChange={(data) => {
                                        form.setValue(`options.${index}.option_id`, data)
                                    }}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Tùy chọn" />
                                        </SelectTrigger>
                                        <SelectContent {...form.register(`options.${index}.option_id`)}>
                                                <SelectItem value={o.id}>{o.title}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div  className={`col-span-6`}>
                                    <Label htmlFor="title">Giá trị</Label>
                                    <Input type="text" id={`title`}
                                           className={`w-full transition-all duration-500`} {...form.register(`options.${index}.value`, {required: true})} />
                                </div>
                                       </div>
                        })
                    }
                </div>
                <div className={`mt-5 transition-all duration-500`}>
                    <Label htmlFor="title">Tồn kho</Label>
                    <Input type="number" id={`inventory_quantity`}
                           className={`w-full transition-all duration-500`} {...form.register("inventory_quantity", {required: true})} />
                </div>
                <div className={`mt-5 transition-all duration-500`}>
                    <Label htmlFor="title">Giá cả</Label>
                    <Input type="number" id={`price`}
                           className={`w-full transition-all duration-500`} {...form.register(`prices.0.amount`, {required: true})} />
                </div>
                <Button type={"submit"} variant={"filled"} size={"md"} color={"black"} fullWidth={true}
                        className={`mt-5`}>Lưu</Button>
            </form>

        </DialogContent>
    </Dialog>
}

const createPayload = (data) => ({
    title: data.title,
    options: data.options,
    prices: data.prices.map(p => ({amount: parseInt(String(p.amount)), currency_code: "VND"})),
})
export default memo(EditVariant)