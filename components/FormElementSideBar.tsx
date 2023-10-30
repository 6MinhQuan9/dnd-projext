import { FormElements } from "./FormElements"
import SidebarBtnElement from "./SidebarBtnElement"
import { Separator } from "./ui/separator"

function FormElementSideBar() {
   
   return (
      <div>
         <p className="text-sm text-foreground/70">Drag and drop elements</p>
         <Separator className="my-2" />

         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
            <p className="text-sm text-muted-foreground cols-span-1 md:col-span-2 my-2
            place-self-start">
               Layout elements
            </p>
            <SidebarBtnElement formElement={FormElements.TitleField} />
            <SidebarBtnElement formElement={FormElements.SubTitleField} />
            <SidebarBtnElement formElement={FormElements.ParagraphField} />
            <SidebarBtnElement formElement={FormElements.SeparatorField} />
            <SidebarBtnElement formElement={FormElements.SpacerField} />

            <p className="text-sm text-muted-foreground cols-span-1 md:col-span-2 my-2
            place-self-start">
               Form elements
            </p>
            <SidebarBtnElement formElement={FormElements.Textfield} />
         </div>
      </div>
   )
}

export default FormElementSideBar