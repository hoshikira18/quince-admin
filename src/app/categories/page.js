import Layout from "@/components/layout/layout";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import CategoriesTable from "@/components/categories/categories-table";
import NewCategory from "@/components/categories/new/new-category";

const Categories = () => {
    return <Layout>
        <Card className={`p-5 space-y-5`}>
            <div className={`flex items-center justify-between`}>
                <div>
                    <h1 className={`text-xl font-medium mb-2`}>Danh mục</h1>
                    <p className={`text-sm text-[#717171]`}>
                        Quản lý danh mục của bạn và xem hiệu suất bán hàng của chúng.
                    </p>
                </div>
                <Button size={`sm`}>
                    <Link href={`/categories/new`}>Thêm danh mục</Link>
                </Button>
            </div>
            <CardContent>
                <CategoriesTable />
            </CardContent>
        </Card>
    </Layout>
}

export default Categories;