import { Fragment } from "react"
import { useLoaderData } from "react-router-dom"
import { fetchCategoryTree } from "../../api/category"
import { ICategoryTree } from "../../common/dto/CategoryDTOs"
import UpdateStockForm from "../../components/Stocks/Update/UpdateStockForm"
import Container from "../../components/UI/Container"

export const loader = async (data: any) => {
    return fetchCategoryTree()
}

const StockByIdPage = () => {
    const data = useLoaderData() as ICategoryTree[]

    return <Fragment>
        <Container>
            <UpdateStockForm categoryTree={data} />
        </Container>
    </Fragment>
}

export default StockByIdPage