"use client"
import Layout from "@/components/layout/layout";
import {useAdminOrder} from "medusa-react";
import {Card} from "@/components/ui/card";

const OrderDetail = ({params}) => {
    const orderId = params.id;
    const {
        order,
        isLoading,
    } = useAdminOrder(orderId)

    console.log(order)

    return (
        <Layout>
            <div>
                {isLoading && <span>Loading...</span>}
                <div>
                    <Card className={"p-5"}>
                        <span>{order?.display_id}</span>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}

export default OrderDetail;