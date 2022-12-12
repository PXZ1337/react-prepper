import { useEffect, useState } from "react"

const useAnimate = (dependency: any) => {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimate(false)
        }, 300)

        return () => {
            clearTimeout(timer)
        }
    }, [dependency])

    return {
        animate,
        setAnimate
    }
}

export default useAnimate