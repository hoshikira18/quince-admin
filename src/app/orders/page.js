import Layout from "@/components/layout/layout";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import OrdersTable from "@/components/orders/orders-table";

const Orders = () => {
    return (
        <Layout>
            <Card className={`p-5 space-y-5`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <h1 className={`text-xl font-medium mb-2`}>Quản lý đơn hàng</h1>
                        <p className={`text-sm text-[#717171]`}>Quản lý doanh thu và các đơn hàng.</p>
                    </div>
                    <Button size={`sm`}>
                        <Link href={`/products/new`}>Thêm sản phẩm</Link>
                    </Button>
                </div>
                <CardContent>
                    <OrdersTable/>
                </CardContent>
            </Card>
        </Layout>
    );
}

export default Orders;