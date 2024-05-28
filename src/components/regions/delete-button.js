import {Button} from "@mantine/core";
import React from "react";
import {useAdminDeleteRegion, useAdminDeleteShippingOption} from "medusa-react";
import {toast} from "@/components/ui/use-toast";

const DeleteButton = ({regionId}) => {
    const deleteRegion = useAdminDeleteRegion(regionId)

    const handleDelete = () => {
        deleteRegion.mutate(void 0, {
            onSuccess: ({ id, object, deleted }) => {
                toast({
                    title: "Xóa thành công",
                    description: id,
                })
            }
        })
    }


    return (
        <Button onClick={handleDelete} color="red" variant="outline" size="xs">Xóa</Button>
    );
}

export default DeleteButton;