"use client"
import Layout from "@/components/layout/layout";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Richtext from "@/components/common/richtext";
import {useForm} from "react-hook-form";
import {useAdminCreateCollection} from "medusa-react";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {Button} from "@mantine/core";
import UploadImage from "@/components/collections/upload-image";
import {useState} from "react";
import {uploadFiles} from "@/lib/data";

const NewCollections = () => {
    const { toast } = useToast()
    const router = useRouter()
    const createCollection = useAdminCreateCollection()
    const [images, setImages] = useState([]);
    const form = useForm({
        defaultValues: createBlank()
    })

    const handleCreate = (data) => {
        createCollection.mutate(data, {
            onSuccess: ({ collection }) => {
                // router.push(`/collections/${collection.id}`)
                toast({
                    title: "Tạo bộ sưu tập thành công",
                    description: collection.created_at,
                })
            }
        })
    }

    const createPayload = async (data) => {
        return {
            title: data.title,
            handle: data.handle,
            metadata: {
                description: data.metadata.description,
                image_url: await uploadFiles(images).then((urls) => urls[0] || ""),
            }
        }
    }

    return (
        <Layout>
            <form onSubmit={form.handleSubmit(async data => {
                handleCreate(await createPayload(data))
            })}>
                <Card className={`px-10`}>
                    <CardHeader>
                        <h1 className={`text-xl font-medium mb-2`}>Thêm bộ sưu tập</h1>
                        <p className={`text-sm text-[#717171]`}>Thêm bộ sưu tập mới vào cửa hàng của bạn.</p>
                    </CardHeader>
                    <CardContent>
                        <div className={`mt-5 transition-all duration-500`}>
                            <Label htmlFor="title">Tên bộ sưu tập</Label>
                            <Input type="text" id={`title`}
                                   className={`w-full transition-all duration-500`} {...form.register("title", {required: true})} />
                        </div>
                        <div className={`mt-5 transition-all duration-500`}>
                            <Label htmlFor="handle">Đường dẫn</Label>
                            <Input id={`handle`}
                                   className={`w-full transition-all duration-500`} {...form.register("handle")} />
                        </div>
                        <div className={`relative z-20 mt-5 transition-all duration-500`}>
                            <Label htmlFor="description">Mô tả</Label>
                            <Richtext form={form} formValue={"metadata.description"}/>
                        </div>
                        <div className={`mt-5 transition-all duration-500`}>
                            <UploadImage images={images} setImages={setImages} />
                        </div>
                        <div className={`mt-5`}>
                            <Button type={"submit"} variant={"filled"} color={"black"} fullWidth={true} size={"md"} className={`text-sm w-full transition-all duration-500`}>Thêm bộ sưu tập</Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Layout>
    )
}

const createBlank = () => {
    return {
        title: "",
        handle: "",
        metadata: {
            image_url: "",
            description: "",
        },
    }
}
export default NewCollections