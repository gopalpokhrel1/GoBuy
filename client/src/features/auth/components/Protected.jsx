import { useSelector } from "react-redux"
import { validUser } from "../authSlice"
import { Navigate } from "react-router-dom";


export default function Protected({children}) {

 const user = useSelector(validUser);
 
        if(!user){
            return <Navigate to='/login' replace={true}/>
        }
        return children


}
