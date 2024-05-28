import {Button} from "@mantine/core";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {Label} from "@/components/ui/label";
import {useAdminUpdateStore} from "medusa-react";
import {Pencil} from "lucide-react";

const NewName = () => {
    const updateStore = useAdminUpdateStore()

    const form = useForm({
        defaultValues: {
            name: ""
        }
    })
    const handleUpdateStoreName = (name) => {
        updateStore.mutate({
            name
        }, {
            onSuccess: ({store}) => {
                console.log(store.name)
            }
        })
    }

    return <div>
        <Dialog>
            <DialogTrigger asChild>
                <Button className={"w-4 h-4"} variant={"outline"} color={"black"} size={"sm"}><Pencil
                    size={20}/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Đổi tên cửa hàng</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(data => {
                    handleUpdateStoreName(data.name)
                })} className={"space-y-3"}>
                    <Label>Tên mới</Label>
                    <Input {...form.register("name")} label="Tên mới" placeholder="Cửa hàng quần áo,..."/>
                    <Button type={"submit"} variant="filled" color={"black"} size={"md"} fullWidth>Lưu thay đổi</Button>
                </form>
            </DialogContent>
        </Dialog>
    </div>
}

export default NewName