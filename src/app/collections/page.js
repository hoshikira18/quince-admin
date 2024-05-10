import Layout from "@/components/layout/layout";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent} from "@/components/ui/card";
import CollectionsTable from "@/components/collections/collections-table";

const Collections = () => {
    return <Layout>
        <Card className={`p-5 space-y-5`}>
            <div className={`flex items-center justify-between`}>
                <div>
                    <h1 className={`text-xl font-medium mb-2`}>Bộ sưu tập</h1>
                    <p className={`text-sm text-[#717171]`}>
                        Quản lý bộ sưu tập của bạn và xem hiệu suất bán hàng của chúng.
                    </p>
                </div>
                <Button size={`sm`}>
                    <Link href={`/collections/new`}>Thêm bộ sưu tập</Link>
                </Button>
            </div>
            <CardContent>
                <CollectionsTable />
            </CardContent>
        </Card>
    </Layout>
}

export default Collections;