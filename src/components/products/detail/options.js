import {Label} from "@/components/ui/label";
import EditOptions from "@/components/products/edit/options";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card} from "@/components/ui/card";
import {Trash2} from "lucide-react";
import {useAdminDeleteProductOption} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";

const Options = ({productId, options}) => {
    const { toast } = useToast()
    const deleteOption = useAdminDeleteProductOption(productId)

    const handleDelete = (optionId) => {
        deleteOption.mutate(optionId, {
            onSuccess: ({ option_id, object, deleted, product }) => {
                console.log(product.options)
            },
            onError: (error) => {
                toast({
                    title: "Có lỗi xảy ra",
                    description: "Tùy chọn đang được sử dụng. Xóa sạch biến thể để có thể xóa tùy chọn này.",
                    variant: "destructive"
                })
            }
        })
    }

    return (
        <Card className={`space-y-5 p-5`}>
                <div className={`flex justify-between items-center`}>
                    <Label>Thuộc tính sản phẩm</Label>
                    <EditOptions productId={productId} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tên thuộc tính</TableHead>
                            <TableHead className={`w-32 text-center`}>Giá trị</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {options?.length && options?.map((option, index) => {
                            return <TableRow key={index}>
                                <TableCell>{option.title}</TableCell>
                                <TableCell className={`w-32 text-center`}>
                                    {option.values.filter((value, index) => option.values.findIndex((v) => v.value === value.value) === index).map((value, index) => {
                                        return <span key={index}
                                                     className={`mr-2 px-3 border rounded `}>{value.value}</span>
                                    })}
                                </TableCell>
                                <TableCell className={`w-10`}>
                                    <button onClick={() => {
                                        console.log(option.id)
                                        handleDelete(option.id)
                                    }}><Trash2 /></button>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
        </Card>
    );
}

export default Options;