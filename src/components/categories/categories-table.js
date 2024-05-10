"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Badge} from "@/components/ui/badge"
import {useAdminProductCategories} from "medusa-react";
import {formatDate} from "@/utils";
import ItemOptions from "@/components/common/item-options";
import Link from "next/link";

const CollectionsTable = () => {
    const { product_categories, isLoading } = useAdminProductCategories()

    return <Table>
        <TableCaption>{(isLoading) && "Đang tải sản phẩm"}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className=" sm:table-cell">
                    ID
                </TableHead>
                <TableHead className={`w-[400px]`}>Tên</TableHead>
                <TableHead className={`w-[200px]`}>Trạng thái</TableHead>
                <TableHead className="hidden md:table-cell">
                    Đường dẫn
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
            {product_categories?.map((category, index) => {
                return (<TableRow key={index}>
                    <TableCell>
                        <div className={`max-w-40 mr-5 overflow-x-hidden`}>
                            {category.id}
                        </div>...
                    </TableCell>
                    <TableCell>
                        <Link href={`/categories/${category.id}`}>{category.name}</Link>
                    </TableCell>
                    <TableCell>
                        {category.is_active ? "Đang hoạt động" : "Không hoạt động"}
                    </TableCell>
                    <TableCell>/{category.handle}</TableCell>
                    <TableCell>{formatDate(category.created_at)}</TableCell>
                    <TableCell><ItemOptions type={"category"} productCategoryId={category.id}/></TableCell>
                </TableRow>)
            })}
        </TableBody>
    </Table>
}

export default CollectionsTable;