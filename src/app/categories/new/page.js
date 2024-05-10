"use client"
import Layout from "@/components/layout/layout";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Richtext from "@/components/common/richtext";
import {useForm} from "react-hook-form";
import {useAdminCreateProductCategory} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Button} from "@mantine/core";
import {Checkbox} from "@/components/ui/checkbox";

const NewCategoriesPage = () => {
    const { toast } = useToast()
    const router = useRouter()
    const createCategory = useAdminCreateProductCategory()


    const form = useForm({
        defaultValues: createBlank()
    })

    const handleCreate = (data) => {
        createCategory.mutate(data, {
            onSuccess: ({ product_category }) => {
                toast({
                    title: "Tạo bộ sưu tập thành công",
                    description: product_category.id,
                })
            }
        })
    }

    return (
        <Layout>
            <form onSubmit={form.handleSubmit(data => {
                handleCreate(data)
            })}>
                <Card className={`px-10`}>
                    <CardHeader>
                        <h1 className={`text-xl font-medium mb-2`}>Thêm danh mục</h1>
                        <p className={`text-sm text-[#717171]`}>Thêm danh mục mới vào cửa hàng của bạn.</p>
                    </CardHeader>
                    <CardContent>
                        <div className={`mt-5 transition-all duration-500`}>
                            <Label htmlFor="title">Tên danh mục</Label>
                            <Input type="text" id={`name`}
                                   className={`w-full transition-all duration-500`} {...form.register("name", {required: true})} />
                        </div>
                        <div className={`mt-5 transition-all duration-500`}>
                            <Label htmlFor="handle">Đường dẫn</Label>
                            <Input id={`handle`}
                                   className={`w-full transition-all duration-500`} {...form.register("handle")} />
                        </div>
                        <div className={`relative z-20 mt-5 transition-all duration-500`}>
                            <Label htmlFor="description">Mô tả</Label>
                            <Richtext form={form} formValue={"description"}/>
                        </div>
                        <div className={`mt-5 transition-all duration-500`}>
                             <Checkbox
                                onCheckedChange={(value) => {
                                    form.setValue("metadata.main_display", value)
                                }}
                            /><Label htmlFor="main_display">Hiển thị danh mục này ở trang chủ</Label>
                        </div>
                        <div className={`mt-5`}>
                            <Button type={"submit"} variant={"filled"} color={"black"} fullWidth={true} size={"md"}
                                    className={`text-sm w-full transition-all duration-500`}>Thêm danh mục</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Layout>
    )
}

const createBlank = () => {
    return {
        name: "",
        handle: "",
        description: "",
        is_active: true,
        metadata: {
            main_display: false,
            home_image: "https://theme.hstatic.net/1000226014/1001131491/14/home_category_img_2.png?v=2090",
            main_image: "https://file.hstatic.net/1000226014/collection/banner_goi_khach_san_blue-01_b1f5561291e445a5856eed39919c2f55.png"
        }
    }
}
export default NewCategoriesPage