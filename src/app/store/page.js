"use client"
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Layout from "@/components/layout/layout";
import {useAdminDeleteStoreCurrency, useAdminStore, useAdminUpdateStore} from "medusa-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import NewCurrency from "@/components/store/new-currency";
import {Trash} from "lucide-react";
import {Button} from "@mantine/core";
import NewName from "@/components/store/new-name";

const Store = () => {
    const {
        store, isLoading,
    } = useAdminStore()
    const deleteCurrency = useAdminDeleteStoreCurrency()
    const updateStore = useAdminUpdateStore()

    const handleDelete = (code) => {
        deleteCurrency.mutate(code, {
            onSuccess: ({store}) => {
                console.log(store.currencies)
            }
        })
    }

    const handleUpdateStoreDefaultCurrency = (default_currency_code) => {
        updateStore.mutate({
            default_currency_code
        }, {
            onSuccess: ({store}) => {
                console.log(store.name)
            }
        })
    }


    const currencies = store?.currencies
    const defaultCurrency = store?.default_currency

    return (<Layout>
        <Card>
            <CardHeader>
                <div className={"flex items-center space-x-2"}>
                    <h1 className={`text-xl font-medium mb-2`}>{store?.name}</h1>
                    <NewName/>
                </div>
                <p className={`text-sm text-[#717171]`}>
                    Quản lý cửa hàng của bạn.
                </p>
            </CardHeader>
            <CardContent>
                <div className={"space-y-5"}>
                    {currencies && currencies.length > 0 && (<Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tên tiền tệ</TableHead>
                                <TableHead>Mã tiền tệ</TableHead>
                                <TableHead>Symbol</TableHead>
                                <TableHead className={"w-32"}></TableHead>
                                <TableHead className={"w-20"}></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currencies.map(currency => {
                                return (<TableRow key={currency.name}>
                                    <TableCell>{currency.name}
                                        {currency.code === defaultCurrency.code && (
                                            <Badge className={"ml-2"} variant={"outline"}>default</Badge>)}
                                    </TableCell>
                                    <TableCell>{currency.code}</TableCell>
                                    <TableCell>{currency.symbol}</TableCell>
                                    <TableCell>
                                        <div className={"text-center"}>
                                            <Button onClick={() => {
                                                handleUpdateStoreDefaultCurrency(currency.code)
                                            }} variant={"outline"} color={"green"}>Set default</Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => {
                                            handleDelete(currency.code)
                                        }} variant={"outline"} color={"red"}>
                                            <Trash/>
                                        </Button>
                                    </TableCell>
                                </TableRow>)
                            })}
                        </TableBody>
                    </Table>)}
                    <NewCurrency/>
                </div>
            </CardContent>
        </Card>
    </Layout>);
};

export default Store;
