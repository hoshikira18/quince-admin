"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Richtext from "@/components/common/richtext";
import { useForm } from "react-hook-form";
import { useAdminCreateProductCategory } from "medusa-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@mantine/core";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const NewCategories = ({ parentCategoryId, children, images }) => {
  const { toast } = useToast();
  const createCategory = useAdminCreateProductCategory();

  const form = useForm({
    defaultValues: createBlank(parentCategoryId),
  });

  const handleCreate = (data) => {
    createCategory.mutate(data, {
      onSuccess: ({ product_category }) => {
        toast({
          title: "Tạo bộ sưu tập thành công",
          description: product_category.id,
        });
      },
    });
  };

  const createPayload = async (data, images) => {
    return {
      name: data.name,
      handle: data.handle,
      parent_category_id: data.parent_category_id,
      description: data.description,
      is_active: data.is_active,
      metadata: {
        main_display: data.metadata.main_display,
      },
    };
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className={`w-40 cursor-pointer border p-2 rounded text-sm`}>
          <span>Thêm danh mục con</span>
        </div>
      </DialogTrigger>
      <DialogContent
        className={`max-w-screen-lg max-h-[800px] overflow-y-scroll`}
      >
        <form
          onSubmit={form.handleSubmit(async (data) => {
            handleCreate(await createPayload(data, images));
          })}
        >
          <Card className={`px-10`}>
            <CardHeader>
              <h1 className={`text-xl font-medium mb-2`}>Thêm danh mục</h1>
              <p className={`text-sm text-[#717171]`}>
                Thêm danh mục mới vào cửa hàng của bạn.
              </p>
            </CardHeader>
            <CardContent>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="title">Tên danh mục</Label>
                <Input
                  type="text"
                  id={`name`}
                  className={`w-full transition-all duration-500`}
                  {...form.register("name", { required: true })}
                />
              </div>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="handle">Đường dẫn</Label>
                <Input
                  id={`handle`}
                  className={`w-full transition-all duration-500`}
                  {...form.register("handle")}
                />
              </div>
              <div className={`relative z-20 mt-5 transition-all duration-500`}>
                <Label htmlFor="description">Mô tả</Label>
                <Richtext form={form} formValue={"description"} />
              </div>
              <div className={`relative z-20 mt-5 transition-all duration-500`}>
                {children}
              </div>
              <div
                className={`mt-5 transition-all duration-500 flex items-center space-x-2`}
              >
                <Checkbox
                  onCheckedChange={(value) => {
                    form.setValue("metadata.main_display", value);
                  }}
                />
                <Label htmlFor="main_display">
                  Hiển thị danh mục này ở trang chủ
                </Label>
              </div>
              <div className={`mt-5`}>
                <Button
                  type={"submit"}
                  variant={"filled"}
                  color={"black"}
                  fullWidth={true}
                  size={"md"}
                  className={`text-sm w-full transition-all duration-500`}
                >
                  Thêm danh mục
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const createBlank = (parentCategoryId) => {
  return {
    name: "",
    handle: "",
    parent_category_id: parentCategoryId || "",
    description: "",
    is_active: true,
    metadata: {
      main_display: false,
    },
  };
};

export default NewCategories;
