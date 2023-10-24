import { FormElements } from "./FormElements"
import SidebarBtnElement from "./SidebarBtnElement"

function FormElementSideBar() {
   
   return (
      <div>
         Elements
         <SidebarBtnElement formElement={FormElements.Textfield} />
      </div>
   )
}

export default FormElementSideBar