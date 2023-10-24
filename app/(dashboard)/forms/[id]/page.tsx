import { GetFormById } from "@/actions/form"
import FormBuilder from "@/components/FormBuilder"

async function BuilderPage({params}: {params: {id: string}}) {
   const { id } = params
   const form = await GetFormById(Number(id))
   if(!form) {
      throw new Error("Form not found")
   }

   return <>Detail</>
}

export default BuilderPage