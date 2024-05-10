import Layout from "@/components/layout/layout";
import {Card, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import ProductTable from "@/components/products/product-table";
import Link from "next/link";

const Products = () => {
    return (
        <Layout>
            <Card className={`p-5 space-y-5`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                    <h1 className={`text-xl font-medium mb-2`}>Products</h1>
                        <p className={`text-sm text-[#717171]`}>Quản lý sản phẩm của bạn và xem hiệu suất bán hàng của chúng.</p>
                    </div>
                    <Button size={`sm`}>
                        <Link href={`/products/new`}>Thêm sản phẩm</Link>
                    </Button>
                </div>
                <CardContent>
                    <ProductTable />
                </CardContent>
            </Card>
        </Layout>
    );
}

export default Products;