import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Richtext from "@/components/common/richtext";
import {Button} from "@mantine/core";
import {useForm} from "react-hook-form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useAdminUpdateProductCategory} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";

const EditGeneral = ({ children, categoryId, categoryName,categoryHandle, categoryDes, categoryStatus }) => {
    const {toast} = useToast()
    const form = useForm({
        defaultValues: {
            name: categoryName,
            handle: categoryHandle,
            description: categoryDes,
            is_active: categoryStatus,
        }
    })
    const updateCategory = useAdminUpdateProductCategory(
        categoryId
    )

    const handleUpdate = (data) => {
        updateCategory.mutate(data, {
            onSuccess: ({ product_category }) => {
                toast({
                    title: "Cập nhật thành công",
                    description: `Danh mục ${product_category.name} đã được cập nhật`,
                })
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className={`max-w-screen-lg max-h-[800px] overflow-y-scroll`}>
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin chung</DialogTitle>
                    <DialogDescription>
                        Hành động này không thể hoàn tác
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit((data) => {
                    handleUpdate(data)
                })} className={``}>
                    <div className={`mt-5 transition-all duration-500`}>
                        <Label htmlFor="name">Tên danh mục</Label>
                        <Input type="text" id={`name`}
                               className={`w-full transition-all duration-500`}
                               {...form.register("name", {required: true})}
                        />
                    </div>
                    <div className={`mt-5 transition-all duration-500`}>
                        <Label htmlFor="handle">Đường dẫn</Label>
                        <Input type="text" id={`handle`}
                               className={`w-full transition-all duration-500`}
                               {...form.register("handle", {required: true})}
                        />
                    </div>
                    <div className={`mt-5`}>
                        <Select value={categoryStatus} onValueChange={(data) => {
                            form.setValue("collection_id", data)
                        }}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Chọn bộ sưu tập"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={true}>Đang hoạt động</SelectItem>
                                <SelectItem value={false}>Không hoạt động</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className={`relative z-20 mt-5 transition-all duration-500`}>
                        <Label htmlFor="description">Mô tả</Label>
                        <Richtext form={form} content={categoryDes} formValue={"description"}/>
                    </div>
                    <Button type={"submit"} variant={"filled"} color={"black"} fullWidth={true}
                            className={`mt-5`}>Lưu</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditGeneral;