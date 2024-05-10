import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

import Medusa from "@medusajs/medusa-js"

const UploadImage = ({images, setImages}) => {

    return <>
        <Label htmlFor="thumbnail">Ảnh đại diện</Label>
        <Input type="file" multiple id={`thumbnail`}
               className={`w-full transition-all duration-500`}/>
    </>
}

export default UploadImage