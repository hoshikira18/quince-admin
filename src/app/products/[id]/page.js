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
                        <h1 className={`text-xl font-medium`}>Ảnh đại diện sản phẩm</h1>
                        <img src={product.thumbnail} alt="thumbnail" className={"rounded mt-5 border-2"}/>
                    </Card>

                    <Card className={`p-5 mt-5`}>
                        <h1 className={`text-xl font-medium`}>Ảnh chi tiết sản phẩm</h1>
                        <div className={"grid grid-cols-2 gap-3"}>
                            {product.images.map((image, index) => (
                                <img key={index} src={image?.url} alt="thumbnail" className={"col-span-1 rounded mt-5 border-2"}/>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Layout>)
}

export default memo(ProductDetail);