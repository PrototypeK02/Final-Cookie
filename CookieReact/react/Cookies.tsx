import React, {useState, useEffect} from 'react'
import {useLazyQuery} from "react-apollo"
import cookieList from "./graphql/cookieList.graphql"
import {useCssHandles} from "vtex.css-handles"
interface CountdownProps {}
interface Fortune {
  CookieFortune: string,
  id: number
}


const Cookies: StorefrontFunctionComponent<CountdownProps> = ({}) => {
  const CSS_HANDLER  = ["cookieBtn", "cookieHeader", "cookieSubheader", "h5Heading"]
  const handles = useCssHandles(CSS_HANDLER)
  const [luckyNumber,setLuckyNumber] = useState("")
  const [cookie,setCookie] = useState<Fortune>({
    CookieFortune:"",
    id: 0
  })
  const [getQuery,{data}] = useLazyQuery(cookieList)
  const [ready, setReady] = useState(false)
  
const handleClick = () => {
  const randomizer = () =>  {
    let random = Math.floor((Math.random() * 98) + 1).toString()
    return random.length  > 1 ? random : `0${random}`
  
  }
  let randomCookie = () => Math.floor(Math.random() * data.cookieList.length)
 
  setCookie(data.cookieList[randomCookie()])
  setLuckyNumber(`${randomizer()}-${randomizer()}-${randomizer()}-${randomizer()}`)
  if(!ready) {
  setReady(true)
  }
}


useEffect(() => {
 
  getQuery()
    
 
  
},[])

return (
  <div className='flex flex-column tc items-center vh-50 justify-center'>
    {ready && cookie &&
    <div>
      
    <h3 className={handles.cookieHeader}>{cookie.CookieFortune}</h3>
    <h5 className={handles.h5Heading}>And your lucky number is</h5>
    <p className={handles.cookieSubheader}>{luckyNumber}</p>
    </div>
    }
    {data && 
    <div>
      <button className={handles.cookieBtn} onClick={handleClick}>{!ready ? `Pick a Cookie`: "Pick a new Cookie"}</button>
      </div>}
  </div>
)
 
}

Cookies.schema = {
  title: 'editor.cookie.title',
  description: 'editor.cookie.description',
  type: 'object',
  properties: {},
}

export default Cookies
