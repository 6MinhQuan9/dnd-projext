'use client'

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({shareURL}: {shareURL: string}) {
   const [mounted, setMounted] = useState<boolean>(false);
   const shareLink = `${window.location.origin}/submit/${shareURL}`;

   useEffect(() => {
      setMounted(true)
   }, [])

   if (!mounted) return null

   return (
      <Button className="w-[200px]" onClick={() => window.open(shareLink, '_blank')}>
        Visit
      </Button>
   )
}

export default VisitBtn