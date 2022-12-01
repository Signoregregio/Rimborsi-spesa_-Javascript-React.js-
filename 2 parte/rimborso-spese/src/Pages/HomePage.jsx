import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect } from "react"
import FormMonth from "../Components/HomePageComponents/FormMonth"

export default function HomePage(){
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        console.log(user)
        console.log(user.id)
        console.log(user.role)
    })
    return(
            <FormMonth/>
    )
}