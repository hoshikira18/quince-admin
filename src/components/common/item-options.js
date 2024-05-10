import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Ellipsis,
    Pencil,
    Trash2,
    DoorOpen
} from "lucide-react"
import {
    useAdminDeleteCollection,
    useAdminDeleteProduct,
    useAdminDeleteProductCategory,
    useAdminUpdateProduct
} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";
import Link from "next/link";
const ItemOptions = ({productStatus = "published", type="product", productId="", collectionId="", productCategoryId=""}) => {
    const { toast } = useToast()
    const deleteProduct = useAdminDeleteProduct(productId)
    const updateProduct = useAdminUpdateProduct(productId)
    const deleteCollection = useAdminDeleteCollection(collectionId)
    const deleteCategory = useAdminDeleteProductCategory(productCategoryId)

    const handleDelete = () => {
        switch (type) {
            case "product":
                deleteProduct.mutate(void 0, {
                    onSuccess: ({ id }) => {
                        toast({
                            title: "Xóa sản phẩm thành công",
                            description: "ID: " + id,
                        })
                    }
                })
                break;
            case "collection":
                    deleteCollection.mutate(void 0, {
                        onSuccess: ({ id, object, deleted }) => {
                            toast({
                                title: "Xóa bộ sưu tập thành công",
                                description: "ID: " + id,
                            })
                        }
                    })
                break;
            case "category":
                deleteCategory.mutate(void 0, {
                    onSuccess: ({ id, object, deleted }) => {
                        toast({
                            title: "Xóa danh mục thành công",
                            description: "ID: " + id,
                        })
                    }
                })
                break;
            default:
                console.log("Delete default")
        }
    }

    const handleUpdateStatus = (status) => {
        updateProduct.mutate({
            status,
        }, {
            onSuccess: ({ product }) => {
                {
                    toast({
                        title: "Cập nhật trạng thái thành công",
                        description: product.id,
                    })
                }
            }
        })
    }

    let link = "";
    switch (type) {
        case "product":
            link = `/products/${productId}`
            break;
        case "collection":
            link = `/collections/${productId}`
            break;
        case "category":
            link = `/categories/${productId}`
            break;
        default:
            link = `/products/${productId}`
    }

    return <DropdownMenu>
        <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
        <DropdownMenuContent>
            {
                type === "product" &&
                <DropdownMenuItem><Link href={`${link}`} className={`flex w-full items-center cursor-pointer`}><Pencil size={15} /><span className={`px-2`}>Sửa</span></Link></DropdownMenuItem>
            }

            {type === "product" &&
                <DropdownMenuItem>
                    <div
                        className={`flex items-center cursor-pointer`}
                        onClick={() => {
                            handleUpdateStatus(productStatus === "published" ? "draft" : "published")
                        }}
                    >
                        <DoorOpen size={15} />
                        <span className={`px-2`}>{productStatus !== "published" ? "Mở bán" : "Đóng sản phẩm"}</span>
                    </div>
                </DropdownMenuItem>
            }
            <DropdownMenuItem><div className={`flex items-center cursor-pointer`} onClick={handleDelete}><Trash2 size={15} /><span className={`px-2`}>Xóa</span></div></DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}

export default ItemOptions;