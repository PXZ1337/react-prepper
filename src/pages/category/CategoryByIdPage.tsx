import { Fragment, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteStock, updateStock } from "../../api/stock"
import IStockDTO, { mapToStockInputDTO } from "../../common/dto/StockDTOs"
import CategoryGridItem from "../../components/Categories/CategoryGridItem"
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary"
import StockList from "../../components/Stocks/StockList"
import Button, { ButtonType } from "../../components/UI/Button"
import ButtonCard from "../../components/UI/ButtonCard"
import Container from "../../components/UI/Container"
import ContentCard from "../../components/UI/ContentCard"
import Headline, { HeadlineType } from "../../components/UI/Headline"
import useHttp from "../../hooks/use-http"
import { Routes } from "../../Router"
import CategoryContext from "../../store/Category/category-context"
import StockContext from "../../store/Stock/stock-context"

const CategoryByIdPage = () => {
    const navigate = useNavigate()
    const params: any = useParams()

    const stockContext = useContext(StockContext)
    const categoryContext = useContext(CategoryContext)

    const category = categoryContext.getCategoryById((+params.id))
    const filtered = stockContext.getStocksByParentCategoryId(category.id)

    const { isLoading: increaseLoading, error: increaseError, sendRequest: increaseStock } = useHttp()
    const { isLoading: reduceLoading, error: reduceError, sendRequest: reduceStock } = useHttp()
    const isLoading = increaseLoading && reduceLoading

    const reduceStockHandler = async (stockItem: IStockDTO) => {
        if (!reduceLoading) {
            reduceStock(async () => {
                const updatedStock = stockItem.stock - 1
                if (updatedStock < 1) {
                    if (window.confirm('Achtung! Wollen Sie den Eintrag wirklich löschen?')) {
                        await deleteStock(stockItem.id)
                        stockContext.removeStock(stockItem.id)
                    }

                    return
                }

                stockItem.stock = updatedStock
                stockItem.abs = updatedStock * stockItem.capacity

                const stockDTO = await updateStock(stockItem.id, mapToStockInputDTO(stockItem))
                stockContext.updateStock(stockDTO)
            })
        }
    }

    const increaseStockHandler = async (stockItem: IStockDTO) => {
        if (!increaseLoading) {
            increaseStock(async () => {
                const updatedStock = stockItem.stock + 1
                stockItem.stock = updatedStock
                stockItem.abs = updatedStock * stockItem.capacity

                const stockDTO = await updateStock(stockItem.id, mapToStockInputDTO(stockItem))
                stockContext.updateStock(stockDTO)
            })
        }
    }

    if (!isLoading && (increaseError !== '' || reduceError !== '')) {
        return <Container><ErrorBoundary caption="An error occured" message={increaseError || reduceError} /></Container>
    }

    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY}>{category.name}</Headline>
            <CategoryGridItem
                id={category.id}
                name={category.name}
                stock={stockContext.calculateCapacityByCategory(category)}
                goal={category.goal}
                unit={category.unit} />

            <ButtonCard>
                <Button buttonType={ButtonType.BACK} onClickHandler={() => { navigate(Routes.DASHBOARD) }}>ZURÜCK</Button>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK)}>
                    NEU HINZUFÜGEN
                </Button>
            </ButtonCard>

            <ContentCard>
                <Headline type={HeadlineType.PRIMARY}>Inventar ({filtered.length})</Headline>
                <StockList items={filtered} reduceStockHandler={reduceStockHandler} increaseStockHandler={increaseStockHandler} />
            </ContentCard>
        </Container>
    </Fragment >
}

export default CategoryByIdPage