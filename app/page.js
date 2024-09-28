"use client"

import AddButton from "@/components/addButton";
import ItemComponents from "@/components/itemsComponent";
import ItemModal from "@/components/modals/item-modal";
import TooltipComponent from "@/components/tooltip/tooltipComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useItemModal } from "@/hooks/use-modal-hooks";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { useState, useRef,useEffect } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const searchRef = useRef()
  const { onOpen } = useItemModal();

  const handlerSearch = (e) =>{
    // e.preventDefault()
    const word = searchRef.current.value;
    console.log("word", word)

        setKeyword(word);

}
  useEffect(()=>{
    console.log("keyword", keyword)
  },[keyword])
  return (
      <div>
        <div className="bg-yellow-500 px-2 py-5">
          <div>
            <div className="text-2xl font-semibold">Produk</div>
          </div>
        </div>
        <div className="p-5">
          <div className="p-3 shadow-lg rounded-lg md:flex md:justify-between md:items-center">
            <Input placeholder="Cari Produk" className={`w-full md:w-72`} ref={searchRef} onKeyUp={handlerSearch}/>
            <Button onClick={()=>onOpen()} variant="ghost" className="bg-yellow-500 hover:bg-yellow-600 text-black hidden md:flex md:w-44">
              <Plus className="h-4 w-4"/>
              Tambah Item
            </Button>
          </div>
          <div className="p-3">
              <ItemComponents keyword={keyword}/>
          </div>
        </div>
        <AddButton/>
        <ItemModal/>
      </div>
      );
}
