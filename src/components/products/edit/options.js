import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Pencil} from "lucide-react";
import {useAdminCreateProductOption} from "medusa-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useToast} from "@/components/ui/use-toast";

const EditOptions = ({ productId }) => {
    const { toast } = useToast()
    const createOption = useAdminCreateProductOption(productId)
    const form = useForm({
        defaultValues: {
            title: ""
        }
    })
    const handleCreate = (title) => {
        createOption.mutate({title}, {
            onSuccess: ({ product }) => {
                console.log(product.options)
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className={`cursor-pointer border p-2 rounded text-sm`}><span>Thêm tùy chọn</span></div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tùy chọn sản phẩm</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={form.handleSubmit(data => {
                            handleCreate(data.title)
                        })}>
                            <div className={`mt-5 transition-all duration-500`}>
                                <Label htmlFor="price">Tên tùy chọn</Label>
                                <Input id={`title`}
                                       className={`w-full transition-all duration-500`} {...form.register("title")} />
                            </div>
                            <div className={`mt-5`}>
                                <Button type={"submit"} className={`w-full transition-all duration-500`}>Thêm tùy chọn</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default EditOptions;