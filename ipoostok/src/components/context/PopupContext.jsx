import { createContext,useEffect,useState } from "react";
import { PopUp } from "../utils/PopUp";

export const PopUpCon = createContext({showAlert: alert})

export const PopUpContext = ({children}) => {
    const [Text, setText] = useState("")
    const showAlert = (text) => {
        setText(text)
    }
    return (
        <PopUpCon.Provider value={{showAlert : showAlert}}>
            {children}
            <PopUp text={Text} />
        </PopUpCon.Provider>
    )
}