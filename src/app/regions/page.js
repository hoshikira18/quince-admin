"use client";
import React from "react";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useAdminCreateShippingOption,
  useAdminCurrencies,
  useAdminRegions,
  useAdminShippingOptions,
} from "medusa-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@mantine/core";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/shipping-options/delete-button";
import { formatDate } from "@/lib/utils";

const Regions = ({ children }) => {
  const { regions, isLoading } = useAdminRegions();

  const createShippingOption = useAdminCreateShippingOption();
  const form = useForm({
    defaultValues: {
      name: "",
      provider_id: "manual",
      data: {},
      price_type: "flat_rate",
      amount: 0,
    },
  });

  const createPayload = () => {
    return {
      name: form.getValues("name"),
      currency_code: "vnd",
      tax_rate: 0,
      fulfillment_providers: [
        {
          id: "manual",
          is_installed: true,
        },
      ],
      payment_providers: [
        {
          id: "manual",
          is_installed: true,
        },
      ],
      countries: ["VN"],
    };
  };

  const handleCreate = (data) => {
    createShippingOption.mutate(data, {
      onSuccess: ({ shipping_option }) => {
        console.log(shipping_option.id);
      },
    });
  };

  return (
    <Layout>
      {children}
      <Card>
        <CardHeader>
          <h1 className={`text-xl font-medium mb-2`}>Vùng bán hàng</h1>
          <p className={`text-sm text-[#717171]`}>
            Quản lý các vùng bán hàng của bạn.
          </p>
        </CardHeader>
        <CardContent>
          <div className="my-5">
            {isLoading && <span>Loading...</span>}
            {regions && !regions.length && <span>No Shipping Options</span>}
            {regions && regions.length > 0 && (
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Tên vùng</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead>Quốc gia</TableHead>
                    <TableHead>Tiền tệ</TableHead>
                    <TableHead className={"w-20"}></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regions?.map((region) => (
                    <TableRow key={region.id}>
                      <TableCell>{region.name}</TableCell>
                      <TableCell>{formatDate(region.created_at)}</TableCell>
                      <TableCell>{region.countries[0]?.name}</TableCell>
                      <TableCell>{region.currency_code}</TableCell>
                      <TableCell>
                        <DeleteButton shippingOptionId={region.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" fullWidth color="black">
                Thêm vùng bán hàng
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm vùng bán hàng</DialogTitle>
                <DialogDescription>
                  Thêm vùng bán hàng mới cho cửa hàng
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={form.handleSubmit((data) => {
                  handleCreate(createPayload());
                })}
                className={"space-y-5"}
              >
                <div>
                  <Label>Tên phương thức thanh toán</Label>
                  <Input
                    {...form.register("name")}
                    label="Tên phương thức"
                    placeholder="Tên phương thức"
                  />
                </div>
                <div>
                  <Label>Chọn vùng</Label>
                  <Select
                    onValueChange={(e) => {
                      form.setValue("region_id", e);
                    }}
                  >
                    <SelectTrigger className="">
                      <SelectValue placeholder="Chọn vùng của bạn" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {regions?.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Giá tiền</Label>
                  <Input
                    {...form.register("amount")}
                    label="Giá tiền"
                    placeholder="Giá tiền"
                  />
                </div>
                <Button type="submit" color="black" variant="filled" fullWidth>
                  Tạo mới
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Regions;
