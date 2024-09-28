"use client"

import { Pencil } from "lucide-react";
import TooltipComponent from "./tooltip/tooltipComponent";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useItemStore } from "@/stores/item-store";
import { moneyFormat } from "@/pipes/formater";
import { useItemModal } from "@/hooks/use-modal-hooks";
import { useState, useEffect  } from "react";

const ItemComponents = ({keyword}) => {
    // console.log("keyword", keyword);
    const { cart, getCart } = useItemStore();
    const [data, setData] = useState([]);
    const { onOpen } = useItemModal();
    console.log("cart", cart);

    const getData = ()=>{
        if(keyword != ""){
            console.log("keyword", keyword);
            const data = cart.filter((item)=>{
                return item.item_name.toLowerCase().includes(keyword.toLowerCase());
            })
            console.log("data", data);
            setData(data);
        }else{
            setData(cart);
        }
    }

    useEffect(()=>{
        console.log("lari", keyword)
        getData();
    },[cart, keyword])

    return ( 
        <div className="flex justify-center items-center">

        {
            data.length != 0 ?
              <ScrollArea className="h-72 w-full">
                {
                                data.map((item, index)=>{
                                    return (
                                        <div key={index} className=" w-full h-44 shadow-lg rounded-md p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h2 className="text-2xl font-bold w-60">{item.item_name}</h2>
                                                <TooltipComponent title="Edit Item" description="Klik untuk mengedit item yang dipilih">
                                                    <Button onClick={()=>{getCart(index); onOpen();}} variant="ghost">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </TooltipComponent>
                                            </div>
                                            <div className="space-y-4 w-60">
                                                <div className="space-y-3">
                                                    <div className="text-xl font-medium">{moneyFormat(item.item_price)}</div>
                                                    <div className="text-lg font-normal">Stok Terkini : {item.in_stock}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )})
                }
              </ScrollArea> 

                :
                <div className="text-center h-72 w-full">
                    <h1 className="text-2xl font-bold">Tidak ada item yang dipilih</h1>
                </div>
        }
      
      </div> 
     );
}
 
export default ItemComponents;