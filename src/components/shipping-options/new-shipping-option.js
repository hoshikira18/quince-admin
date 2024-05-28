import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@mantine/core";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {useForm} from "react-hook-form";
import {useAdminCreateShippingOption, useAdminRegions} from "medusa-react";

const NewShippingOption = () => {
    const createShippingOption = useAdminCreateShippingOption()
    const {regions} = useAdminRegions()
    const form = useForm({
        defaultValues: {
            name: "",
            region_id: "",
            provider_id: "manual",
            data: {},
            price_type: "flat_rate",
            amount: 0,
        }
    })

    const createPayload = () => {
        return {
            name: form.getValues("name"),
            region_id: form.getValues("region_id"),
            provider_id: form.getValues("provider_id"),
            data: form.getValues("data"),
            price_type: form.getValues("price_type"),
            amount: parseInt(form.getValues("amount")),
        }
    }

    const handleCreate = (
        data
    ) => {
        createShippingOption.mutate(data, {
            onSuccess: ({shipping_option}) => {
                console.log(shipping_option)
            }
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" fullWidth color="black">
                    Thêm phương thức vận chuyển
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm phương thức vận chuyển</DialogTitle>
                    <DialogDescription>
                        Thêm phương thức vận chuyển mới cho cửa hàng
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit((data) => {
                    console.log(createPayload())
                    handleCreate(createPayload())
                })} className={"space-y-5"}>
                    <div>
                        <Label>Tên phương thức thanh toán</Label>
                        <Input {...form.register("name")} label="Tên phương thức" placeholder="Tên phương thức"/>
                    </div>
                    <div>
                        <Label>Chọn vùng</Label>
                        <Select onValueChange={(e) => {
                            form.setValue("region_id", e)
                        }}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Chọn vùng của bạn"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        regions?.map(region => (
                                            <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Giá tiền</Label>
                        <Input {...form.register("amount")} label="Giá tiền" placeholder="Giá tiền"/>
                    </div>
                    <Button type="submit" color="black" variant="filled" fullWidth>Tạo mới</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewShippingOption