import { Fragment } from "react"
import { useLoaderData } from "react-router-dom"
import { fetchCategoryTree } from "../../api/category"
import { ICategoryTree } from "../../common/dto/CategoryDTOs"
import AddStockForm from "../../components/Stocks/Add/AddStockForm"
import Container from "../../components/UI/Container"
import Headline, { HeadlineType } from "../../components/UI/Headline"

export const loader = () => {
    return fetchCategoryTree()
}

const StockAddPage = () => {
    const data = useLoaderData() as ICategoryTree[]

    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY} caption="create a new stock">Add stock form</Headline>
            <AddStockForm categoryTree={data} />
        </Container>
    </Fragment>
}

export default StockAddPage