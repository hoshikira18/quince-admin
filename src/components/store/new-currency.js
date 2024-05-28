import {Button} from "@mantine/core";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {useAdminAddStoreCurrency, useAdminDeleteStoreCurrency} from "medusa-react";

const NewCurrency = () => {
    const addCurrency = useAdminAddStoreCurrency()
    const deleteCurrency = useAdminDeleteStoreCurrency()

    const form = useForm({
        defaultValues: {
            code: ""
        }
    })

    const handleAdd = (code) => {
        addCurrency.mutate("currencies/" + code, {
            onSuccess: ({store}) => {
                console.log(store.currencies)
            }
        })
    }


    return <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" color={"black"} fullWidth>Thêm mới đơn vị tiền tệ</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Thêm mới đơn vị tiền tệ</DialogTitle>
                    <DialogDescription>
                        Thêm mới đơn vị tiền tệ cho cửa hàng của bạn
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(data => {
                    handleAdd(data.code)
                })} className={"space-y-3"}>
                    <Label>Tên đơn vị tiền tệ</Label>
                    <Input {...form.register("code")} label="Tên đơn vị tiền tệ" placeholder="Ví dụ: USD, VND"/>
                    <Button type={"submit"} variant="filled" color={"black"} size={"md"} fullWidth>Thêm</Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>
}

export default NewCurrency