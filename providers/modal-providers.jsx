'use client'

import ItemModal from "@/components/modals/item-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const[isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <ItemModal/>
        </>
    )
}