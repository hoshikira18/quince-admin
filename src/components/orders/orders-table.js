"use client";
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {useAdminOrders} from "medusa-react";
import {formatDate, formatNumber} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

const OrdersTable = () => {
    const {orders, isLoading} = useAdminOrders();
    console.log(orders);

    return <Table>
        <TableCaption>{(isLoading) && "Đang tải sản phẩm"}</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    Đơn
                </TableHead>
                <TableHead className={``}>Ngày tạo</TableHead>
                <TableHead className={"w-700px"}>Tên khách hàng</TableHead>
                <TableHead className="hidden md:table-cell">
                    Vận chuyển
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Thanh toán
                </TableHead>
                <TableHead>
                    Trạng thái
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Tổng tiền
                </TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {orders?.map((order, index) => {
                return (<TableRow key={index}>
                        <TableHead className={"text-sm text-black font-normal"}>
                            <Link href={`/orders/${order.id}`} key={index} className={"w-full"}>
                                #{order.display_id}
                            </Link>
                        </TableHead>
                        <TableHead
                            className={"text-sm text-black font-normal"}>
                            <Link href={`/orders/${order.id}`} key={index} className={"w-full"}>
                                {formatDate(order.created_at)}
                            </Link>
                        </TableHead>
                        <TableHead
                            className={"text-sm text-black font-normal"}>
                            <Link href={`/orders/${order.id}`} key={index} className={"w-full"}>
                                {order.shipping_address?.first_name}
                            </Link>
                        </TableHead>
                        <TableHead
                            className={"text-sm text-black font-normal"}>
                            <Link href={`/orders/${order.id}`} key={index} className={"w-full"}>
                                {order.fulfillment_status === "fulfilled" ?
                                    <Badge variant={"done"}>Đã giao</Badge> :
                                    <Badge variant={"processing"}>Đang chờ</Badge>}
                            </Link>
                        </TableHead>
                        <TableHead className={"text-sm text-black font-normal"}>
                            {order.payment_status === "captured" ?
                                <Badge variant={"done"}>Đã thanh toán</Badge> :
                                <Badge variant={"processing"}>Chưa thanh toán</Badge>}
                        </TableHead>
                        <TableHead>
                            {order.status === "canceled" ? <Badge variant={"cancel"}>Đã hủy</Badge> :
                                <Badge variant={"processing"}>Đang chờ</Badge>}
                        </TableHead>
                        <TableHead
                            className={"text-sm text-black font-normal"}>{formatNumber(order.payments[0]?.amount)} VND</TableHead>
                        <TableHead className={"text-sm text-black font-normal"}></TableHead>
                    </TableRow>
                )
            })}

        </TableBody>
    </Table>
}

export default OrdersTable;