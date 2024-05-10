import {Badge} from "@/components/ui/badge";
import {Label} from "@/components/ui/label";
import {Spoiler} from "@mantine/core";
import {Card} from "@/components/ui/card";
import EditGeneral from "@/components/products/edit/general";

const General = ({product}) => {
    return (<Card className={`p-5 space-y-5`}>
        <div className={`flex items-center justify-between space-x-5`}>
            <h1 className={`text-2xl font-medium max-w-4/5`}>{product?.title}</h1>
            <div className={`flex items-center space-x-2`}>
                <Badge variant="outline">{product?.status}</Badge>
                <EditGeneral
                    productId={product.id}
                    productCategories={product.categories}
                    productCollection={product.collection}
                    productDescription={product.description}
                    productName={product.title}
                />
            </div>
        </div>
        <div className={`text-end space-y-3`}>
            <div className={`flex items-start justify-between`}>
                <Label>Đường dẫn</Label>
                <p className={`text-sm`}>{product?.handle}</p>
            </div>
            <div className={`flex items-start justify-between`}>
                <Label>Bộ sưu tập</Label>
                <p className={`text-sm`}>{product?.collection?.title}</p>
            </div>
            <div className={`flex items-start justify-between`}>
                <Label>Danh mục</Label>
                <ul className={`space-y-1`}>
                    {product?.categories?.map((category, index) => {
                        return (<li key={index}
                                    className={`py-1 px-2 rounded bg-accent text-sm`}>{category.name}</li>)
                    })}
                </ul>
            </div>
            <div className={`text-start`}>
                <Label>Mô tả sản phẩm</Label>
                <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                    <div className={`text-sm`} dangerouslySetInnerHTML={{__html: product?.description}}/>
                </Spoiler>
            </div>
        </div>
    </Card>);
}

export default General;