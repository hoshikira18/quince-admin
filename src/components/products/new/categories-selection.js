import {useAdminProductCategories} from "medusa-react";
import Select from 'react-select';
const CategoriesSelection = ({form}) => {
    const {
        product_categories,
    } = useAdminProductCategories()

    const defaultValue = form.getValues("categories")?.map((item) => ({value: item.id, label: item.name}))
    const categories = product_categories?.map((item) => ({value: item.id, label: item.name}))
    return (
        <div>
            {/*<MultiSelect*/}
            {/*    checkIconPosition="right"*/}
            {/*    data={product_categories?.map((item) => item.name)}*/}
            {/*    placeholder="Chọn danh mục"*/}
            {/*    defaultValue={form.getValues("categories")?.map((item) => item.name)}*/}
            {/*    onChange={(value) => {*/}
            {/*        form.setValue("categories", product_categories.filter((item) => value.includes(item.name)).map((item) => ({id: item.id})))*/}
            {/*    }}*/}
            {/*/>*/}
            <Select
                isMulti
                defaultValue={defaultValue}
                name="categories"
                options={categories}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(value) => {
                    // console.log(value)
                    form.setValue("categories", value?.map((item) => ({id: item.value})))
                }}
            />
        </div>

    );
}

export default CategoriesSelection;