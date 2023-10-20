import { TextFieldFormElement } from "./fields/TextField";

export type ElementsType = 'Textfield';

export type FormElement = {
   type: ElementsType;

   construct: (id: string) => FormElementInstance;

   designerBtnElement: {
      icon: React.ElementType;
      label: string;
   }

   designerComponent: React.FC;
   formComponent: React.FC;
   propertiesComponent: React.FC;
}

export type FormElementInstance = {
   id: string;
   type: ElementsType;
   extraAttributes?: Record<string, any>
}

type FormElementsType = {
   [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
   Textfield: TextFieldFormElement
};
