import { ReactNode, useState } from "react"
import MenuContext from "./menu-context"

interface MenuProviderProps {
    children: ReactNode
}

const MenuProvider = (props: MenuProviderProps) => {
    const [isVisible, setIsVisible] = useState(false)

    const contextProps = {
        isVisible,
        setIsVisible
    }

    return <MenuContext.Provider value={contextProps}>
        {props.children}
    </MenuContext.Provider>
}

export default MenuProvider