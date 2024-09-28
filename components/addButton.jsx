"use client"
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useItemModal } from "@/hooks/use-modal-hooks";

const AddButton = () => {

    const { onOpen } = useItemModal();


    return ( 
        <div className="absolute right-7 bottom-10 md:hidden">
            <Button onClick={()=>{onOpen()}} className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full h-12 w-12 p-0">
                <Plus className="h-7 w-7"/>
            </Button>
        </div>
     );
}
 
export default AddButton;