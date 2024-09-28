'use client';

import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle 
} from "../ui/dialog";


const ModalComponent = ({
    title,
    description,
    children,
    large,
    xLarge,
    isOpen,
    onClose,
}) => {

    const onChange = (open)=>{
        if(!open){
            onClose();
        }
    }


    return ( 
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className={`bg-white text-black overflow-y-scroll ${large ? "max-w-6xl max-h-[35rem]":xLarge ? "max-w-6xl max-h-[40rem]":"max-h-screen max-w-2xl"}`}>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
     );
}
 
export default ModalComponent;