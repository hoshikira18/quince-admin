import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@mantine/core"
import Richtext from "@/components/common/richtext";
import CollectionSelection from "@/components/products/new/collection-selection";
import CategoriesSelection from "@/components/products/new/categories-selection";
import {useForm} from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useAdminUpdateProduct} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";

const EditGeneral = ({productId, productName, productDescription, productCategories, productCollection}) => {
    const {toast} = useToast()
    const form = useForm({
        defaultValues: {
            title: productName,
            description: productDescription,
            categories: productCategories,
            collection: productCollection
        }
    })

    const updateProduct = useAdminUpdateProduct(
        productId
    )

    const handleUpdate = (data) => {
        updateProduct.mutate(data, {
            onSuccess: ({ product }) => {
                toast({
                    title: "Cập nhật sản phẩm thành công",
                    description: product.id,
                })
            }
        })
    }

    return <Dialog>
        <DialogTrigger><div className={`w-32 cursor-pointer border p-2 rounded text-sm`}><span>Chỉnh sửa</span></div></DialogTrigger>
        <DialogContent className={`max-w-screen-lg max-h-[800px] overflow-y-scroll`}>
            <DialogHeader>
                <DialogTitle>Chỉnh sửa thông tin chung</DialogTitle>
                <DialogDescription>
                    Hành động này không thể hoàn tác
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit((data) => {
                handleUpdate(createPayload(data))
            })} className={``}>
                <div className={`mt-5 transition-all duration-500`}>
                    <Label htmlFor="title">Tên sản phẩm</Label>
                    <Input type="text" id={`title`}
                           className={`w-full transition-all duration-500`} {...form.register("title", {required: true})} />
                </div>
                <div className={`relative z-20 mt-5 transition-all duration-500`}>
                    <Label htmlFor="description">Đường dẫn</Label>
                    <Richtext form={form} content={productDescription} formValue={"description"}/>
                </div>
                <div className={`relative z-20 mt-5 grid grid-cols-12 gap-x-5 transition-all duration-500`}>
                    <div className={`col-span-6`}>
                        <Label htmlFor="price">Bộ sưu tập</Label>
                        <CollectionSelection data={productCollection} form={form}/>
                    </div>
                    <div className={`col-span-6`}>
                        <Label htmlFor="price">Danh mục</Label>
                        <CategoriesSelection data={productCategories} form={form}/>
                    </div>
                </div>
                <Button type={"submit"} variant={"filled"} color={"black"} fullWidth={true} className={`mt-5`}>Lưu</Button>
            </form>
        </DialogContent>
    </Dialog>

}

const createPayload = (data) => {
    return {
        title: data.title,
        description: data.description,
        collection_id: data.collection_id,
        categories: data.categories.map((category) => ({
            id: category.id
        })),
    }
}

export default EditGeneral