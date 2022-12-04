import { Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Unit from "../../common/Unit"
import CategoryGridItem from "../../components/Categories/CategoryGridItem"
import AddStockButton from "../../components/Stocks/Add/AddStockButton"
import StockList from "../../components/Stocks/StockList"
import BackButton from "../../components/UI/BackButton"
import Container from "../../components/UI/Container"
import { Routes } from "../../Router"

const CategoryByIdPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    let categoryId: string = ''

    if (params.id === undefined) {
        navigate(Routes.DASHBOARD)
    } else {
        categoryId = params.id
    }

    return <Fragment>
        <Container>
            <h1>Current inventory</h1>
            <BackButton />
        </Container>
        <Container>
            <CategoryGridItem id={categoryId} name="cat-name" stock={5} goal={10} unit={Unit.L} />
        </Container>
        <Container>
            <AddStockButton />
            <StockList />
        </Container>
    </Fragment>
}

export default CategoryByIdPage