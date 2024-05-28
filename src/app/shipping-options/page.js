"use client";
import React from "react";
import Layout from "@/components/layout/layout";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {useAdminShippingOptions} from "medusa-react";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import DeleteButton from "@/components/shipping-options/delete-button";
import {formatNumber} from "@/lib/utils";
import NewShippingOption from "@/components/shipping-options/new-shipping-option";

const ShippingOptions = () => {
    const {shipping_options, isLoading} = useAdminShippingOptions();


    return (<Layout>
        <div className={"space-y-5"}>
            <Card>
                <CardHeader>
                    <h1 className={`text-xl font-medium mb-2`}>Phương thức giao hàng</h1>
                    <p className={`text-sm text-[#717171]`}>
                        Manage your shipping options and view their performance.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="my-5">
                        {isLoading && <span>Loading...</span>}
                        {shipping_options && !shipping_options.length && (<span>No Shipping Options</span>)}
                        {shipping_options && shipping_options.length > 0 && (<Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Tên phương thức</TableHead>
                                    <TableHead>Vùng</TableHead>
                                    <TableHead>Giá cả</TableHead>
                                    <TableHead className={"w-20"}></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shipping_options.map((shipping_option) => (<TableRow key={shipping_option.id}>
                                    <TableCell>{shipping_option.name}</TableCell>
                                    <TableCell>{shipping_option.region.name}</TableCell>
                                    <TableCell>{formatNumber(shipping_option.amount)}</TableCell>
                                    <TableCell>
                                        <DeleteButton shippingOptionId={shipping_option.id}/>
                                    </TableCell>
                                </TableRow>))}
                            </TableBody>
                        </Table>)}
                    </div>
                    <NewShippingOption/>
                </CardContent>
            </Card>
        </div>
    </Layout>);
};

export default ShippingOptions;
