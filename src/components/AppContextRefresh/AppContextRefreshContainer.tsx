import { Fragment, useContext, useState } from "react"
import { fetchCategoryData } from "../../api/category"
import { fetchStocks } from "../../api/stock"
import { extractMessageFromError } from "../../common/Utils"
import CategoryContext from "../../store/Category/category-context"
import StockContext from "../../store/Stock/stock-context"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import Container from "../UI/Container"
import Loader from "../UI/Loader/Loader"
import AppContextRefreshButton from "./AppContextRefreshButton"

interface AppContextContainerProps {
    children: any
}

const AppContextRefreshContainer = (props: AppContextContainerProps) => {
    const clickTimeout = 1000

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const stockContext = useContext(StockContext)
    const categoryContext = useContext(CategoryContext)

    const appRefreshHandler = async () => {
        setIsLoading(true)
        setError('')

        try {
            const stocks = await fetchStocks()
            const categoryData = await fetchCategoryData()

            stockContext.updateState(stocks)
            categoryContext.updateState(categoryData)
        } catch (e) {
            setError(extractMessageFromError(e))
        }
        finally {
            setTimeout(() => {
                setIsLoading(false)
            }, clickTimeout)
        }
    }

    let content = props.children

    if (isLoading) {
        content = <Loader>aktualisiere daten...</Loader>
    }

    if (!isLoading && error !== '') {
        content = <Container><ErrorBoundary caption="An error occured" message={error} /></Container>
    }

    return <Fragment>
        <AppContextRefreshButton onAppRefreshHandler={appRefreshHandler} />
        {content}
    </Fragment>
}

export default AppContextRefreshContainer