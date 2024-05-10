"use client"
import Layout from "@/components/layout/layout";
import {useAdminProduct} from "medusa-react";
import {Card} from "@/components/ui/card";
import General from "@/components/products/detail/general";
import Variant from "@/components/products/detail/variant";
import {memo} from "react";
import Options from "@/components/products/detail/options";

const ProductDetail = ({params}) => {
    const productId = params.id;
    const {
        product
    } = useAdminProduct(productId)
    console.log(product)
    return (
        product &&
        <Layout>
            <div className={`grid grid-cols-12 gap-5`}>
                <div className={`col-span-8 space-y-5`}>
                    <General product={product} />
                    <Options productId={productId} options={product.options} />
                    <Variant productId={productId} variants={product.variants} options={product.options} />
                </div>
                <div className={`col-span-4`}>
                    <Card className={`p-5`}>
                        <h1 className={`text-xl font-medium`}>{product?.title}</h1>
                        <p className={`text-sm text-[#717171]`}>{product?.handle}</p>
                    </Card>
                </div>
            </div>
        </Layout>)
}

export default memo(ProductDetail);