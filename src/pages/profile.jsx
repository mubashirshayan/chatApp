import { useContext } from "react"
import { GlobalContext } from "../context/context"



export default function Profile(){
let { state, dispatch } = useContext(GlobalContext);


    return(
        <><h1>Profile</h1>
        <h5>{JSON.stringify(state)}</h5>
        </>
        
        
    )
}