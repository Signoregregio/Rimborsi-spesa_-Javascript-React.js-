import { useEffect } from "react"
import FormMonth from "../Components/HomePageComponents/FormMonth"

export default function HomePage({setDisabled}){
    // useEffect(() => {
    //     setDisabled(true)
    //     const userId = sessionStorage.getItem("userId");
    //     const userRole = sessionStorage.getItem("userRole");
    //     console.log(userId)
    //     console.log(userRole)
    //     setDisabled(false)
    // }, [])
    return(
            <FormMonth/>
    )
}