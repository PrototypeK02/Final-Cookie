//react/adminExample.tsx
import * as React from "react"
import "./styles/newCookie.css"
 import cookieNew from "./graphql/newCookie.gql"
import { useMutation } from "react-apollo"
import { useCssHandles } from "vtex.css-handles";

interface ChildProps {
  setModal: any; // try not to use any.  
}

const CSS_HANDLES = ["container", "modal", "modalbtnA", "modalbtnB", "modalBtns", "modalInput"];


const CreateCookie: React.FC<ChildProps> = ({setModal}) => {
  const ref = React.useRef() as any
  const [doSomething] = useMutation(cookieNew)
 
  const handles = useCssHandles(CSS_HANDLES)
  return (
    
    <div className={handles.container}>
     
      <div className={handles.modal}>
      <h3>Create New Cookie</h3>
      <input ref={ref} type="text" placeholder="Cookie fortune Text" className={handles.modalInput}/>
      <div className={handles.modalBtns}>
    <button className={handles.modalbtnA} onClick={() => {doSomething({variables: {cookiefortune: ref?.current?.value}})
  setModal(false) } }>CREATE</button>
    <button className={handles.modalbtnB} onClick={()=> setModal(false)}>CANCEL</button>
      </div>
    </div>
    </div>
  )
}

export default CreateCookie