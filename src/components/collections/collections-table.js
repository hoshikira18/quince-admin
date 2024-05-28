"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useAdminCollections} from "medusa-react";
import {formatDate} from "@/lib/utils"
import ItemOptions from "@/components/common/item-options";
import Link from "next/link";

const CollectionsTable = () => {
    const { collections, isLoading } = useAdminCollections()

    return <Table>
        <TableCaption>{(isLoading) && "Đang tải sản phẩm"}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className=" sm:table-cell">
                    ID
                </TableHead>
                <TableHead className={`w-[400px]`}>Tên</TableHead>
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
            {collections?.map((collection, index) => {
                return (<TableRow key={index}>
                    <TableCell>
                        <div className={`max-w-40 mr-5 overflow-x-hidden`}>
                            {collection.id}
                        </div>...
                    </TableCell>
                    <TableCell>
                        <Link href={`/collections/${collection.id}`}>{collection.title}</Link>
                    </TableCell>
                    <TableCell>/{collection.handle}</TableCell>
                    <TableCell>{formatDate(collection.created_at)}</TableCell>
                    <TableCell><ItemOptions type={"collection"} collectionId={collection.id}/></TableCell>
                </TableRow>)
            })}
        </TableBody>
    </Table>
}

export default CollectionsTable;