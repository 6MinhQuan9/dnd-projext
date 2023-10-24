'use client'

import { Dispatch, SetStateAction, createContext, useState } from "react"
import { FormElementInstance } from "../FormElements"


type DesignerContextType = {
   elements: FormElementInstance[]
   addElement: (index: number, element: FormElementInstance) => void
   removeElement: (index: number) => void

   selectedElement?: FormElementInstance | null
   setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>

   updateElement: (id: number, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: { children: React.ReactNode }) {
   const [elements, setElements] = useState<FormElementInstance[]>([])
   const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)

   const addElement = (index: number, element: FormElementInstance) => {
      setElements((prev) => {
         const newElements = [...prev]
         newElements.splice(index, 0, element)
         return newElements
      })
   }

   const removeElement = (id: number) => {
      setElements((prev) => prev.filter((elements) => +elements.id !== id))
   }

   const updateElement = (id: number, element: FormElementInstance) => {
      setElements((prev) => {
         const newElements = [...prev]
         const index = newElements.findIndex((elements) => +elements.id === id)
         newElements[index] = element

         return newElements
      })
   }

   return (
      <DesignerContext.Provider
         value={{ 
            elements, 
            addElement, 
            removeElement,

            selectedElement,
            setSelectedElement,

            updateElement
         }}
      >
         {children}
      </DesignerContext.Provider>
   )
}