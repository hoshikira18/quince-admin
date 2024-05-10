import {Control, useFieldArray, UseFormGetValues, UseFormRegister, UseFormSetValue} from "react-hook-form"
import {Button, TagsInput} from "@mantine/core";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
const Variant = ({form}) => {
    const {control, register, setValue, getValues} = form
    const {
        append: appendOption, remove: removeOption,
    } = useFieldArray({
        control, name: "options", keyName: "fieldId",
    })

    const {
        append: appendVariant,
    } = useFieldArray({
        control, name: "variants", keyName: "fieldId",
    })

    const handleAppendOption = () => {
        appendOption({
            title: "", values: [{
                value: ""
            }]
        })
    }


    // Recursive function to generate combinations
    function generateCombinations(options, prefix = [], combinations = []) {
        if (!options.length) {
            combinations.push(prefix);
        } else {
            for (let i = 0; i < options[0].length; i++) {
                generateCombinations(options.slice(1), [...prefix, options[0][i]], combinations);
            }
        }
        return combinations;
    }

    const handleCreateVariant = () => {
        if (setValue) {
            setValue("variants", [])
        }
        if (getValues) {
            const options = getValues("options");
            const combinations = generateCombinations(options.map(option => option.values.map(value => value.value)));
            combinations.forEach(combination => {
                appendVariant({
                    title: combination.join(" x "), inventory_quantity: 0, prices: [{
                        amount: 0, currency_code: "VND"
                    }], options: combination.map(value => ({value})),
                });
            });
        }
    }


    return <div className={`flex flex-col gap-y-10`}>
        <div className={`flex flex-col gap-y-2`}>
            <div className={`grid grid-cols-12 gap-2`}>
                <Label htmlFor="variant_name" className="col-span-4">Kiểu biến thể</Label>
                <Label htmlFor="variant_name" className="col-span-6">Biến thể</Label>
            </div>
            <div className={`flex flex-col gap-y-3`}>
                {getValues && getValues("options")?.map((option, index) => {
                    return <div key={index} className={`grid grid-cols-12 gap-x-2 w-full`}>
                        {register && <Input
                            {...register(`options.${index}.title`)}
                            placeholder={`Color, Size,...`}
                            className={`col-span-3`}
                        />}
                        <div className={`col-span-8`}>
                            {register && <TagsInput
                                placeholder={`Xanh, Đỏ, Vàng,...`}
                                onChange={(values) => {
                                    setValue && setValue(`options.${index}.values`, values.map((value) => ({value: value})));
                                }}
                            />}
                        </div>

                        <div className={`col-span-1`}>
                            <div className={`text-red-500 w-full flex items-center justify-center border-2 rounded-md h-full cursor-pointer`} onClick={() => {
                                removeOption(index)
                            }}>Xóa</div>
                        </div>
                    </div>
                })}
            </div>
            <Button variant={"default"} fullWidth={true} onClick={handleAppendOption}>+Thêm kiểu biến
                thể</Button>
        </div>

        <div className={`space-y-3`}>
            <Label className={``}>Bảng biến thể</Label>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={`text-center`}>Tên biến thể</TableHead>
                        <TableHead className={`text-center`}>Tổ hợp biến thể</TableHead>
                        <TableHead className={`text-center`}>Giá</TableHead>
                        <TableHead className={`text-center`}>Tồn kho</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {getValues && getValues("variants").length > 0 && getValues("variants").map((variant, index) => {
                        return (<TableRow key={index}>
                            <TableCell>
                                {register && <Input className={``} {...register(`variants.${index}.title`)} />}
                            </TableCell>
                            <TableCell>
                                <div className={`space-y-1 py-1`}>
                                    {variant.options.map((option, index) => {
                                        return <div key={index}
                                                    className={`col-span-3 flex items-center justify-center px-5 py-1 border-2 rounded`}>{option.value}</div>
                                    })}
                                </div>
                            </TableCell>
                            <TableCell>
                                {register && <Input type={"number"}
                                                    className={`w-20 mx-auto`} {...register(`variants.${index}.prices.0.amount`)} />}
                            </TableCell>
                            <TableCell>
                                {register && <Input type={"number"}
                                                    className={`w-20 mx-auto`} {...register(`variants.${index}.inventory_quantity`)} />}
                            </TableCell>
                        </TableRow>)
                    })}
                </TableBody>
            </Table>
            <Button variant={"default"} fullWidth={true} className={`w-full`} onClick={handleCreateVariant}>+Tạo bảng giá biến thể</Button>
        </div>
    </div>
}

export default Variant
