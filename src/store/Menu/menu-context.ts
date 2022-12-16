import React, { Dispatch, SetStateAction } from "react"



const MenuContext = React.createContext({
    isVisible: false,
    setIsVisible: (isVisible: boolean) => { }
})

export default MenuContext