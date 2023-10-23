'use client'

import { cn } from "@/lib/utils"
import DesignerSidebar from "./DesignerSidebar"
import { useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { ElementsType, FormElementInstance, FormElements } from "./FormElements"
import useDesigner from "./hooks/useDesigner"
import { idGenerator } from "@/lib/idGenerator"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { BiSolidTrash } from "react-icons/bi"

function Designer() {   
   const { elements, addElement } = useDesigner()
   
   const droppable = useDroppable({
      id: 'designer-drop-area',
      data: {
         isDesignerDropArea: true
      }
   })

   useDndMonitor({
      onDragEnd: (event) => {
         const { active, over } = event
         if(!active || !over) return

         const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
         
         if(isDesignerBtnElement) {
            const type = active.data?.current?.type;
            const newElement = FormElements[type as ElementsType].construct(
               idGenerator()
            );
            addElement(0, newElement)
         }
      }
   })

   return (
      <div className="flex w-full h-full">
         <div className="p-4 w-full">
            <div 
               ref={droppable.setNodeRef} 
               className={cn(
                  "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                  droppable.isOver && 'ring-2 ring-primary/20'
               )}
            >
               {
                  !droppable.isOver && elements.length === 0 &&  (
                     <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                        Drop here
                     </p>
                  )
               }

               {
                  droppable.isOver && elements.length === 0 && (
                     <div className="p-4 w-full">
                        <div className="h-[120px] rounded-md bg-primary/20 top-0"></div>
                     </div>
                  )
               }

               {
                  elements.length > 0 && (
                     <div className="flex flex-col w-full p-4 gap-2">
                        {elements.map((element) => (
                           <DesignerElementWrapper key={element.id} element={element} />
                        ))}
                     </div>
                  )
               }
            </div>
         </div>

         <DesignerSidebar />
      </div>
   )
}

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
   const { removeElement } = useDesigner()
   const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

   const topHalf = useDroppable({
      id: element.id + '-top',
      data: {
         type: element.type,
         elementId: element.id,
         isTopHalfDesignerElement: true
      }   
   })

   const bottomHalf = useDroppable({
      id: element.id + '-bottom',
      data: {
         type: element.type,
         elementId: element.id,
         isBottomHalfDesignerElement: true
      }   
   })

   const draggable = useDraggable({
      id: element.id + '-drag-handler',
      data: {
         type: element.type,
         elementId: element.id,
         isDesignerElement: true
      }   
   })

   if(draggable.isDragging) return null

   const DesignerElement = FormElements[element.type]?.designerComponent;
   
   return (
      <div 
         ref={draggable.setNodeRef}
         {...draggable.listeners}
         {...draggable.attributes}
         className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer 
         rounded-md ring-1 ring-accent ring-inset"
         onMouseEnter={() => setMouseIsOver(true)}
         onMouseLeave={() => setMouseIsOver(false)}
      >
         <div
            ref={topHalf.setNodeRef}
            className={
               cn("absolute w-full h-1/2 rounded-t-md",
            )}
         ></div>

         {topHalf.isOver && (
            <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
         )}

         <div className={cn(
            "flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
            mouseIsOver && 'opacity-30',
         )}>
            <DesignerElement elementInstance={element} />
         </div>

         {bottomHalf.isOver && (
            <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
         )}

         <div 
            ref={bottomHalf.setNodeRef}
            className={
               cn("absolute w-full h-1/2 rounded-b-md bottom-0",
            )}
         ></div>

         {mouseIsOver && (
            <>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  animate-pulse"
               >
                  <p className="text-sm text-muted-foreground">Click for properties or drag to move</p>
               </div>

               <div className="absolute right-0 h-full">
                  <Button className="flex justify-center h-full border rounded-md rounded-l-none
                     bg-red-500"
                     variant={"outline"}
                     onClick={() => {
                        removeElement(+element.id)
                     }}
                  >
                     <BiSolidTrash className='h-6 w-6' />
                  </Button>
               </div>
            </>
         )}
      </div>
   )
}

export default Designer