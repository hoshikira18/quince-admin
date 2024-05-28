"use client";
import Layout from "@/components/layout/layout";
import { useAdminProductCategory } from "medusa-react";
import { Card } from "@/components/ui/card";
import EditGeneral from "@/components/categories/edit/general";
import { Label } from "@/components/ui/label";
import { Spoiler } from "@mantine/core";
import { formatDate } from "@/lib/utils";
import NewCategory from "@/components/categories/new/new-category";
import { Pencil } from "lucide-react";

const CategoryDetail = ({ params }) => {
  const { product_category, isLoading } = useAdminProductCategory(params.id);
  console.log(product_category);

  return (
    <Layout>
      <div className={`space-y-5`}>
        <Card className={`p-5 space-y-5`}>
          <div className={`flex items-center justify-between space-x-5`}>
            <h1 className={`text-2xl font-medium max-w-4/5`}>
              {product_category?.name}
            </h1>
            <EditGeneral
              categoryId={product_category?.id}
              categoryName={product_category?.name}
              categoryHandle={product_category?.handle}
              categoryDes={product_category?.description}
              categoryStatus={product_category?.is_active}
            >
              <div className={`w-32 cursor-pointer border p-2 rounded text-sm`}>
                <span>Chỉnh sửa</span>
              </div>
            </EditGeneral>
          </div>
          <div className={`text-end space-y-3`}>
            <div className={`flex items-start justify-between`}>
              <Label>ID</Label>
              <p className={`text-sm`}>{product_category?.id}</p>
            </div>
            <div className={`flex items-start justify-between`}>
              <Label>Đường dẫn</Label>
              <p className={`text-sm`}>/{product_category?.handle}</p>
            </div>
            <div className={`flex items-start justify-between`}>
              <Label>Trạng thái</Label>
              <p className={`text-sm`}>
                {product_category?.is_active
                  ? "Đang hoạt động"
                  : "Không hoạt động"}
              </p>
            </div>
            <div className={`flex items-start justify-between`}>
              <Label>Ngày tạo</Label>
              <p className={`text-sm`}>
                {formatDate(product_category?.created_at)}
              </p>
            </div>
            <div className={`text-start`}>
              <Label>Mô tả sản phẩm</Label>
              <Spoiler maxHeight={100} showLabel="Show more" hideLabel="Hide">
                <div
                  className={`text-sm`}
                  dangerouslySetInnerHTML={{
                    __html: product_category?.description,
                  }}
                />
              </Spoiler>
            </div>
          </div>
        </Card>
        <Card className={`p-5 space-y-5`}>
          <div className={`flex items-center justify-between`}>
            <h1 className={`text-xl font-medium`}>Danh mục con</h1>
            {params.id && <NewCategory parentCategoryId={params.id} />}
          </div>
          <div className={`space-y-5`}>
            {product_category?.category_children?.length > 0 ? (
              product_category?.category_children.map((category) => (
                <div
                  key={category.id}
                  className={`flex items-center justify-between`}
                >
                  <p className={`text-sm`}>{category.name}</p>
                  <EditGeneral
                    categoryId={category.id}
                    categoryName={category.name}
                    categoryHandle={category.handle}
                    categoryDes={category.description}
                    categoryStatus={category.is_active}
                  >
                    <div
                      className={`cursor-pointer border p-2 rounded text-sm`}
                    >
                      <Pencil size={15} />
                    </div>
                  </EditGeneral>
                </div>
              ))
            ) : (
              <p className={`text-sm text-[#717171]`}>Không có danh mục con</p>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
