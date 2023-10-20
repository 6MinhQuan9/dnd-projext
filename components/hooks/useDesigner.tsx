'use client'

import { useContext } from "react"
import { DesignerContext } from "../context/Designercontext"

function useDesigner() {
   const context = useContext(DesignerContext)

   if (!context) {
      throw new Error("useDesigner should be used within <Designer>")
   }

   return context
}

export default useDesigner