"use client";
import { useRouter } from "next/navigation";
import { useAdminCreateProduct } from "medusa-react";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { set, useForm } from "react-hook-form";
import Richtext from "@/components/common/richtext";
import CollectionSelection from "@/components/products/new/collection-selection";
import CategoriesSelection from "@/components/products/new/categories-selection";
import Variant from "@/components/products/new/variants";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@mantine/core";
import UploadImage from "@/components/collections/upload-image";
import { useEffect, useState } from "react";
import { uploadFiles } from "@/lib/data";
import Loading from "@/components/common/loading";

const NewProduct = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const createProduct = useAdminCreateProduct();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: createBlank(),
  });

  const handleCreate = (productData) => {
    createProduct.mutate(productData, {
      onSuccess: ({ product }) => {
        setLoading(false);
        router.push(`/products/${product.id}`);
        toast({
          title: "Tạo sản phẩm thành công",
          description: product.created_at,
        });
      },
      onError: (error) => {
        toast({
          title: "Có lỗi xảy ra",
          description: error.message,
          type: "error",
        });
      },
    });
  };

  const createPayload = async (data) => {
    return {
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      handle: data.handle,
      thumbnail: await uploadFiles(thumbnail).then((url) => url[0]),
      images: await uploadFiles(images).then((url) => url),
      status: data.status,
      is_giftcard: data.is_giftcard,
      discountable: data.discountable,
      options: data.options.map((o) => ({
        title: o.title,
      })),
      variants: data.variants.map((v) => ({
        title: v.title,
        inventory_quantity: parseInt(String(v.inventory_quantity)),
        prices: v.prices.map((p) => ({
          amount: parseInt(String(p.amount)),
          currency_code: p.currency_code,
        })),
        options: v.options,
      })),
      collection_id: data.collection_id,
      categories: data.categories,
    };
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <form
          onSubmit={form.handleSubmit(async (data) => {
            setLoading(true);
            handleCreate(await createPayload(data));
          })}
        >
          <Card className={`px-10`}>
            <CardHeader>
              <h1 className={`text-xl font-medium mb-2`}>Thêm sản phẩm</h1>
              <p className={`text-sm text-[#717171]`}>
                Thêm sản phẩm mới vào cửa hàng của bạn.
              </p>
            </CardHeader>
            <CardContent>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="title">Tên sản phẩm</Label>
                <Input
                  type="text"
                  className={`w-full transition-all duration-500`}
                  {...form.register("title", { required: true })}
                />
              </div>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="price">Đường dẫn</Label>
                <Input
                  className={`w-full transition-all duration-500`}
                  {...form.register("handle")}
                />
              </div>
              <div className={`relative z-20 mt-5 transition-all duration-500`}>
                <Label htmlFor="price">Đường dẫn</Label>
                <Richtext form={form} formValue={"description"} />
              </div>
              <div
                className={`relative z-20 mt-5 grid grid-cols-12 gap-x-5 transition-all duration-500`}
              >
                <div className={`col-span-6`}>
                  <Label htmlFor="price">Bộ sưu tập</Label>
                  <CollectionSelection form={form} />
                </div>
                <div className={`col-span-6`}>
                  <Label htmlFor="price">Danh mục</Label>
                  <CategoriesSelection form={form} />
                </div>
              </div>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="thumbnail">Ảnh đại diện sản phẩm</Label>
                <UploadImage images={thumbnail} setImages={setThumbnail} />
              </div>
              <div className={`mt-5 transition-all duration-500`}>
                <Label htmlFor="thumbnail">Ảnh chi tiết sản phẩm</Label>
                <UploadImage
                  images={images}
                  setImages={setImages}
                  isMultiple={true}
                />
              </div>
            </CardContent>
          </Card>

          <Card className={`mt-5 transition-all duration-500 p-20`}>
            <Variant form={form} />
          </Card>
          <div className={`mt-5`}>
            <Button
              type={"submit"}
              variant={"filled"}
              fullWidth={true}
              color={"black"}
              className={`w-full transition-all duration-500`}
            >
              Thêm sản phẩm
            </Button>
          </div>
        </form>
      )}
    </Layout>
  );
};

const createBlank = () => {
  return {
    title: "",
    subtitle: "",
    description: "",
    handle: "",
    thumbnail: "",
    images: [],
    status: "published",
    is_giftcard: true,
    discountable: true,
    options: [],
    variants: [],
    collection_id: "",
    categories: [],
  };
};

export default NewProduct;
