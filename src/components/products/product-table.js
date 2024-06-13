"use client";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {formatDate} from "@/lib/utils";
import ItemOptions from "@/components/common/item-options";
import Link from "next/link";
import React, {useState} from "react";
import {Pagination} from "@mantine/core";
import {useAdminCollections, useAdminProductCategories, useAdminProducts} from "medusa-react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ChevronDown} from "lucide-react";

const ProductTable = () => {
    const PRODUCT_PER_PAGE = 5;
    const [page, setPage] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [selectedStatus, setSelectedStatus] = useState([]); // ["draft", "published"
    const [selectedCollection, setSelectedCollection] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const query = {
        collection_id: selectedCollection,
        category_id: selectedCategories,
        q: searchKey,
        status: selectedStatus,
    }
    const {
        products,
        limit,
        offset,
        isLoading,
        count
    } = useAdminProducts({
        ...query,
        expand: "variants,variants.prices,categories",
        limit: PRODUCT_PER_PAGE,
        offset: page * PRODUCT_PER_PAGE,
    })
    const {collections, isCollectionsLoading} = useAdminCollections()
    const {product_categories, isCategoriesLoading} = useAdminProductCategories()

    const totalPage = Math.ceil(count / PRODUCT_PER_PAGE);
    return (
        <div>
            <div className={"py-5 flex justify-between items-center space-x-5"}>
                <div className={"w-1/2 flex justify-between space-x-2"}>
                    <Popover>
                        <PopoverTrigger
                            className={"w-full border py-1.5 rounded-md flex items-center justify-center space-x-1"}><span>Trạng
                            thái</span> <ChevronDown/></PopoverTrigger>
                        <PopoverContent>
                            <div className={"space-y-5"}>
                                <div className={"flex items-center space-x-3"}>
                                    <Checkbox id={"published"} checked={selectedStatus.includes("published")}
                                              onCheckedChange={(e) => {
                                                  setSelectedStatus(e ? [...selectedStatus, "published"] : selectedStatus.filter((status) => status !== "published"))
                                              }}/>
                                    <label htmlFor={"published"}>Published</label>
                                </div>
                                <div className={"flex items-center space-x-3"}>
                                    <Checkbox id={"draft"} checked={selectedStatus.includes("draft")}
                                              onCheckedChange={(e) => {
                                                  setSelectedStatus(e ? [...selectedStatus, "draft"] : selectedStatus.filter((status) => status !== "draft"))
                                              }}/>
                                    <label htmlFor={"draft"}>Draft</label>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger
                            className={"w-full border py-1.5 rounded-md flex items-center justify-center space-x-1"}><span>Bộ sưu tập</span>
                            <ChevronDown/></PopoverTrigger>
                        <PopoverContent>
                            <div className={"space-y-5"}>
                                {
                                    collections?.map((collection, index) => {
                                        return (
                                            <div key={index} className={"flex items-center space-x-3"}>
                                                <Checkbox id={collection.id}
                                                          checked={selectedCollection.includes(collection.id)}
                                                          onCheckedChange={(e) => {
                                                              setSelectedCollection(e ? [...selectedCollection, collection.id] : selectedCollection.filter((id) => id !== collection.id))
                                                          }}/>
                                                <label htmlFor={collection.id}>{collection.title}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger
                            className={"w-full border py-1.5 rounded-md flex items-center justify-center space-x-1"}><span>Danh mục</span>
                            <ChevronDown/></PopoverTrigger>
                        <PopoverContent>
                            <div className={"space-y-5"}>
                                {
                                    product_categories?.map((category, index) => {
                                        return (
                                            <div key={index} className={"flex items-center space-x-3"}>
                                                <Checkbox id={category.id}
                                                          checked={selectedCategories.includes(category.id)}
                                                          onCheckedChange={(e) => {
                                                              setSelectedCategories(e ? [...selectedCategories, category.id] : selectedCategories.filter((id) => id !== category.id))
                                                          }}/>
                                                <label htmlFor={category.id}>{category.name}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <Input
                    className={""}
                    onChange={(e) => {
                        setSearchKey(e.target.value)
                    }} placeholder="Tìm kiếm sản phẩm"/>
            </div>
            <Table>
                <TableCaption>{isLoading && "Đang tải sản phẩm"}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead className={`w-[400px]`}>Tên</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="hidden md:table-cell">Giá</TableHead>
                        <TableHead className="hidden md:table-cell">Danh mục</TableHead>
                        <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products?.map((product, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link href={`/products/${product.id}`}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={`/products/${product.id}`}>{product.title}</Link>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={`${
                                            product.status === "published" ? "done" : "cancel"
                                        }`}
                                    >
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat().format(
                                        product?.variants[0]?.prices[0]?.amount
                                    ) || "-"}
                                </TableCell>
                                <TableCell>
                                    {product.categories.map((category, index) => {
                                        return <span key={index}>{category.name}</span>;
                                    })}
                                </TableCell>
                                <TableCell>{formatDate(product.created_at)}</TableCell>
                                <TableCell>
                                    <ItemOptions
                                        type={"product"}
                                        productId={product.id}
                                        productStatus={product.status}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination className={"mt-5"}
                        total={totalPage}
                        onChange={(e) => {
                            setPage(e - 1)
                        }}
                        perPage={PRODUCT_PER_PAGE}
                        color="rgba(0, 0, 0, 1)"
            />
        </div>
    );
};

export default ProductTable;
