import {NumberFormatter} from "@mantine/core";
import {Card} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import EditVariant from "@/components/products/edit/variant";
import {useAdminDeleteVariant} from "medusa-react";
import {Trash2} from "lucide-react";

const Variant = ({variants, options, productId}) => {
    const deleteVariant = useAdminDeleteVariant(productId)
    const handleDelete = (variantId) => {
        deleteVariant.mutate(variantId, {
            onSuccess: ({ variant_id, object, deleted, product }) => {
                toast({
                    title: "Xóa biến thể thành công",
                    description: product.created_at,
                })
            }
        })
    }

    return <Card className={`space-y-5 p-5`}>
        <div>
            <div className={`flex justify-between items-center`}>
                <Label>Biến thể sản phẩm</Label>
                <EditVariant productId={productId} options={options}/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên biến thể</TableHead>
                        <TableHead>Tổ hợp</TableHead>
                        <TableHead>Tồn kho</TableHead>
                        <TableHead>Giá</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {variants?.length && variants?.map((variant, index) => {
                        return <TableRow key={index}>
                            <TableCell>{variant.title}</TableCell>
                            <TableCell className={`w-32`}>
                                {
                                    variant.options.map((option, index) => {
                                        return <span key={index}>{option.value}</span>
                                    })
                                }
                            </TableCell>
                            <TableCell className={`w-32`}>{variant.inventory_quantity}</TableCell>
                            <TableCell className={`w-32`}>
                                <NumberFormatter value={variant.prices[0].amount} thousandSeparator/>
                            </TableCell>
                            <TableCell><button className={`w-10`} onClick={() => {
                                handleDelete(variant.id)
                            }}><Trash2 /></button></TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    </Card>
}

export default Variant;