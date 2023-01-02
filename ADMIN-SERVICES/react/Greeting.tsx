
import * as React from "react"
import { useLazyQuery,useMutation } from 'react-apollo'
import cookieList from "./graphql/cookieList.gql"
import deleteCookie from "./graphql/deleteCookie.gql"
import { Layout, PageBlock,Button,Modal,Input,Spinner, ButtonWithIcon, IconDelete,IconPlusLines,Box, IconEdit, Alert, InputSearch} from 'vtex.styleguide'
import cookieNew from "./graphql/newCookie.gql"
import editCookie from "./graphql/updateCookie.gql"

interface CookieData {
  id: string,
  CookieFortune: string
}
const AdminExample: React.FC = () => {
 //alert
  const [submit, setSubmit] = React.useState(false)
  //alert end

  //Search
  const [search, setSearch] = React.useState<CookieData[]>([])
  // GraphQL
  const [getCookies,{ data, loading }] = useLazyQuery(cookieList, {fetchPolicy: 'network-only'})
  const [delCookie] = useMutation(deleteCookie)
  const [createCookie, ] = useMutation(cookieNew)
  const [updateCookie] = useMutation(editCookie)
 
  // Grphql End

  // inputs ref
  const ref = React.createRef() as any
  const refE = React.createRef<HTMLInputElement>()
  // inputs ref end

  // modals handle
  const [modal, setModal] = React.useState(false)
  const [modalE, setModalE] = React.useState(false)
  const [change, setChange] = React.useState(false)
  // modals handle ends

  // id handle

  const [IDC, setIDC] = React.useState("")

  // id handle end

  const [noFound, setFound] = React.useState(false)

  //search local state and handler
  const [inputSearch, setInputSearch] = React.useState("")
  
  
  const handleSearch = () => {
    
    const found = data.cookieList.filter((el: CookieData) => el.CookieFortune.toLowerCase().includes(inputSearch.toLowerCase()))
    if(found.length) {
      setSearch(found)
      
    }
    else {
      setFound(true)
    }
  }

  const showAll = ()  =>  {
    setInputSearch("")
    setSearch([])
  }
// end search local state and handler


  const handleCreate:any = async ()=>{
    await createCookie({variables:{cookiefortune: ref?.current?.value}})
    setChange(!change)
    setModal(!modal)
    setSubmit(true)

  }

  const handleCloseAlert = () => {
    setSubmit(false)
  }

  const handleCloseAlertFound = () => {
    setFound(false)
  }
  

  const handleEdit:any = async (id: string)=>{
    await updateCookie({variables:{cookieId: id, cookiefortune: refE?.current?.value}})
    setChange(!change)
    setModalE(!modalE)

  }
  const handleDelete:any = (id:string)=>{
   
  delCookie({variables:{cookiefortuneId: id}})
    setChange(!change)
    
  }


  React.useEffect(() => {
    getCookies()

  },[change])
  return (
    
    
    <Layout>
      {
            submit &&
              <Alert type="success" onClose={() => handleCloseAlert()} autoClose={3000}>
                New Cookie Created
              </Alert>
            
          }

          {
            noFound &&
            <Alert type="error" onClose={() => handleCloseAlertFound()} autoClose={3000}>
            Cookie not found
          </Alert>

          }
      <PageBlock 
      title="Cookie Fortune"
      subtitle="Cookie Fortune List."
      variation="full">
        <div className="flex w-100 justify-between mb3-l">
          <div className="flex w-50">
          <InputSearch  size="small" onChange={(e: any) => setInputSearch(e.target.value)}placeholder="Search..." onSubmit={handleSearch}></InputSearch>
          {search.length ?
          <div className="ml-3">
           <Button variation="tertiary" size="small" onClick={showAll}>SHOW ALL</Button>
           </div>: null}
          </div>
          <div className="self-end">
        <ButtonWithIcon icon={<IconPlusLines/>} size="small" onClick={() => setModal(!modal)}> ADD</ButtonWithIcon>
        </div>
        {/* <div className="ml3"> */}
        {/* <ButtonWithIcon icon={<IconPlusLines/>} iconPosition="right" onClick={() => setModal(!modal)}>Bulk </ButtonWithIcon> */}
        {/* </div> */}
        </div>

        {/* Modal Create */}
        <Modal isOpen={modal} onClose={()=>setModal(!modal)}>
          <h2>Create Cookie Fortune</h2>
          <Input ref={ref} placeholder="Add Cookie Content" size="small"/>
          <div className="mt3-l">
          <Button size="small" onClick={handleCreate}>Add</Button>
          </div>
         
        </Modal>
        {/* End Modal Create */}

        {/* Modal Edit */}
        <Modal isOpen={modalE} onClose={()=>setModalE(!modalE)}>
          <h2>Edit Cookie</h2>
          <Input ref={refE} placeholder="Edit your Cookie" size="small"/>
          <div className="mt3-l">
          <Button size="small" onClick={() => {handleEdit(IDC)}}>Edit</Button>
          </div>
          </Modal>
          {/* End Modal Edit */}

        {data && search.length ?
        <div>
          {search.map((cookie: CookieData) =><Box  key={cookie.id}>
          <div className="flex justify-between items-center h3 ">
            <div>
            <p>{`ID:  ${cookie.id}`}</p>
            <h3 className="fw3">{cookie.CookieFortune}</h3>
            </div>
            <div className="flex">
            <ButtonWithIcon icon={<IconEdit/>} variation="secondary" onClick={() => { setIDC(cookie.id) 
              setModalE(!modalE)}}>
      Edit
    </ButtonWithIcon>
           <ButtonWithIcon icon={<IconDelete/>} variation="danger" size="small" onClick={() => {handleDelete(cookie.id)}}> </ButtonWithIcon> 
           </div>
          </div></Box> )}
        </div> :
        data ?
      <div>
        {data.cookieList.map((cookie:any)=><Box  key={cookie.id}>
          <div className="flex justify-between items-center h3 ">
            <div>
            <p>{`ID:  ${cookie.id}`}</p>
            <h3 className="fw3">{cookie.CookieFortune}</h3>
            </div>
            <div className="flex">
            <ButtonWithIcon icon={<IconEdit/>} variation="secondary" onClick={() => { setIDC(cookie.id) 
              setModalE(!modalE)}}>
      Edit
    </ButtonWithIcon>
           <ButtonWithIcon icon={<IconDelete/>} variation="danger" size="small" onClick={() => {handleDelete(cookie.id)}}> </ButtonWithIcon> 
           </div>
          </div></Box>)}
      </div>
    : loading? <Spinner block={true}/>: <h1>Error Fetching Data</h1>
    }
      </PageBlock>
    </Layout>
   
  )
}

export default AdminExample