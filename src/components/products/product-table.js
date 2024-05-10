"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {useAdminProducts} from "medusa-react";
import {formatDate} from "@/utils";
import ItemOptions from "@/components/common/item-options";
import Link from "next/link";

const ProductTable = () => {
    const {products, isLoading} = useAdminProducts()
    return <Table>
        <TableCaption>{(isLoading) && "Đang tải sản phẩm"}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead className={`w-[400px]`}>Tên</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="hidden md:table-cell">
                    Giá
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Ngày tạo
                </TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {products?.map((product, index) => {
                return (<TableRow key={index}>
                    <TableCell>
                        <Link href={`/products/${product.id}`}>
                            <img src={product.thumbnail} alt={product.title}
                                 className="w-16 h-16 object-cover rounded-md"/>
                        </Link>
                    </TableCell>
                    <TableCell>
                        <Link href={`/products/${product.id}`}>{product.title}</Link>
                    </TableCell>
                    <TableCell><Badge variant="outline">{product.status}</Badge></TableCell>
                    <TableCell>{new Intl.NumberFormat().format(product?.variants[0]?.prices[0]?.amount) || "-"}</TableCell>
                    <TableCell>{
                        product.categories.map((category, index) => {
                            return <span key={index}>{category.name}</span>
                        })
                    }</TableCell>
                    <TableCell>{formatDate(product.created_at)}</TableCell>
                    <TableCell><ItemOptions type={"product"} productId={product.id}
                                            productStatus={product.status}/></TableCell>
                </TableRow>)
            })}
        </TableBody>
    </Table>
}

export default ProductTable;