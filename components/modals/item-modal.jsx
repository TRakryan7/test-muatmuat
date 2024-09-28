"use client";

import { z } from "zod";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import ModalComponent from "../modal/modalComponent";
import { useItemModal } from "@/hooks/use-modal-hooks";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useItemStore } from "@/stores/item-store";
import { useReducer, useEffect } from "react";
import { moneyFormatter } from "@/pipes/formater";


const formSchema = z.object({
    item_name: z.string().refine((val) => val != "null", { message: 'supplier tidak boleh kosong' }),
    item_price: z.number().min(1, { message: 'Harga harus diatas 0' }),
    in_stock: z.number().min(1, { message: 'Stok harus diatas 0' }),
  });

const ItemModal = () => {


    const {isOpen, onOpen, onClose} = useItemModal();
    const { add, cartIndex, cartEdit, emptyEdit, edit } = useItemStore();
    console.log("cartEdit", cartEdit);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            item_name: cartEdit != {} ? cartEdit.item_name : '',
            item_price: cartEdit != {} ? cartEdit.item_price : '',
            in_stock: cartEdit != {} ? cartEdit.in_stock : '',
        },
    });


    const onSubmit = async (data) => {
        console.log(data);
        Object.keys(cartEdit).length != 0? edit(cartIndex, data):add(data);
        form.reset();
        setValue("");
        
        onClose();
    }

    const setItem =() =>{
        form.setValue("item_name", cartEdit != {} ?cartEdit.item_name:'');
        form.setValue("item_price", cartEdit != {} ?cartEdit.item_price:'');
        setValue(Object.keys(cartEdit).length != 0 ? String(cartEdit.item_price):'');
        form.setValue("in_stock", cartEdit != {} ?cartEdit.in_stock:'');
    }

        // REDUCER START

        const initialValue = form.getValues("price")
        ? moneyFormatter.format(form.getValues("price"))
        : "";
    
        const [value, setValue] = useReducer((_, next) => {
            const digits = next.replace(/\D/g, "");
            return moneyFormatter.format(Number(digits));
        }, initialValue);
    
        function handleChange(realChangeFn, formattedValue) {
            const digits = formattedValue.replace(/\D/g, "");
            const realValue = Number(digits);
            realChangeFn(realValue);
        }
    
        // REDUCER END

        useEffect(()=>{
            setItem()
        },[cartEdit])
    return ( 
        <ModalComponent 
            title={`${Object.keys(cartEdit).length != 0?"Edit Item":"Tambah Item"}`} 
            description={`${Object.keys(cartEdit).length != 0?"Silakan Edit item terpilih":"Silakan isi untuk menambah item"}`}
            isOpen= {isOpen}
            onClose={()=>{
                onClose();
                form.reset();
                setValue("");
                emptyEdit();
            }}
        >
            <div className="space-y-5 mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                        <FormField control={form.control}
                            name="item_name"
                            render={({ field }) => (
                                <FormItem className="w-full mb-8 md:mb-0">
                                    <FormLabel className="text-base font-normal">Nama Item</FormLabel>
                                    <FormControl>
                                        <Input  className="w-full" placeholder="Nama Item" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control}
                            name="item_price"
                            render={({ field }) => {
                            field.value = parseInt(value);
                            const _change = field.onChange;
                            return(
                                <FormItem className="w-full">
                                                    <FormLabel className="text-base font-normal">Masukkan Harga</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder="Masukkan Harga" 
                                                            {...field}
                                                            onChange={(ev) => {
                                                            setValue(ev.target.value);
                                                            handleChange(_change, ev.target.value);
                                                            }}
                                                            value={value ? value : 0}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                    }}
                                />
                        <FormField control={form.control}
                            name="in_stock"
                            render={({ field }) => (
                                <FormItem className="w-full mb-8 md:mb-0">
                                    <FormLabel className="text-base font-normal">Stok Saat ini</FormLabel>
                                    <FormControl>
                                        <Input  
                                            className="w-full" 
                                            placeholder="Stok Saat ini" 
                                            {...field} 
                                            onChange={event => field.onChange(+event.target.value === NaN ? 0 : +event.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <Button type="submit" className="flex gap-2 bg-yellow-500 text-black hover:bg-yellow-600 text-base">Simpan</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ModalComponent>
    );
}
 
export default ItemModal;