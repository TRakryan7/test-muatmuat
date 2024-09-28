import {
    TooltipProvider, 
    Tooltip, 
    TooltipContent, 
    TooltipTrigger 
} from "@/components/ui/tooltip";

const TooltipComponent = ({
    title,
    description,
    children,
}) => {
    return ( 
        <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-white text-black shadow-lg max-w-40">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-base">{description}</p>
                </div>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
     );
}
 
export default TooltipComponent;