import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect } from "react"
import FormMonth from "../Components/HomePageComponents/FormMonth"

export default function HomePage(){
    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        const userRole = sessionStorage.getItem("userRole");
        console.log(userId)
        console.log(userRole)
    }, [])
    return(
            <FormMonth/>
    )
}