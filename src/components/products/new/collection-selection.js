"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useAdminCollections} from "medusa-react";

const CollectionSelection = ({form, data}) => {
    const { collections } = useAdminCollections()
    return (
        <div className={`w-full`}>
            <Select value={data?.id} onValueChange={(data) => {
                form.setValue("collection_id", data)
            }}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Chọn bộ sưu tập" />
                </SelectTrigger>
                <SelectContent>
                    {
                        collections?.map((item, index) => {
                            return <SelectItem key={index} value={item.id}>{item.title}</SelectItem>
                        })
                    }
                </SelectContent>
            </Select>
        </div>
    );
}

export default CollectionSelection;