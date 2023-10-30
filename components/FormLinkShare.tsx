'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "./ui/use-toast";

function FormLinkShare({shareURL}: {shareURL: string}) {
   const [mounted, setMounted] = useState<boolean>(false);
   const shareLink = `${window.location.origin}/submit/${shareURL}`;

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   return (
      <div className="flex flex-grow gap-4 items-center">
         <Input readOnly value={shareLink} />
         <Button 
            className="w-[250px]" 
            onClick={() => {
               navigator.clipboard.writeText(shareLink)
               toast({
                  title: 'Copied',
                  description: 'Link copied to clipboard',
               })
            }}
         >
            <ImShare className='mr-2 h-4 w-4' />
            Share link
         </Button>
      </div>
   )
}

export default FormLinkShare