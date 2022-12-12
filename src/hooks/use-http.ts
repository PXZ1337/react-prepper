import { useCallback, useState } from "react"
import { extractMessageFromError } from "../common/Utils"

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const sendRequest = useCallback(async (requestFunc: () => any) => {
        setIsLoading(true)
        try {
            return await requestFunc()
        } catch (e) {
            setError(extractMessageFromError(e))
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp