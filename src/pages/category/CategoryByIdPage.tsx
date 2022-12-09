import { Fragment, useContext } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { getCategoryById } from "../../api/category"
import { ICategoryDTO } from "../../common/dto/CategoryDTOs"
import CategoryGridItem from "../../components/Categories/CategoryGridItem"
import StockList from "../../components/Stocks/StockList"
import Button, { ButtonType } from "../../components/UI/Button"
import ButtonCard from "../../components/UI/ButtonCard"
import Container from "../../components/UI/Container"
import ContentCard from "../../components/UI/ContentCard"
import Headline, { HeadlineType } from "../../components/UI/Headline"
import { Routes } from "../../Router"
import StockContext from "../../store/Stock/stock-context"

export const loader = (data: any) => {
    return getCategoryById(parseInt(data.params.id))
}

const CategoryByIdPage = () => {
    const data = useLoaderData() as ICategoryDTO
    const navigate = useNavigate()
    const context = useContext(StockContext)

    const filtered = context.getStocksByParentCategoryId(data.id)
    const stockCapacity = filtered.reduce((previousValue, currentValue) => previousValue + currentValue.abs, 0)

    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY}>{data.name}</Headline>
            <CategoryGridItem id={data.id} name={data.name} stock={stockCapacity} goal={data.goal} unit={data.unit} />

            <ButtonCard>
                <Button buttonType={ButtonType.BACK} onClickHandler={() => { navigate(Routes.DASHBOARD) }}>ZURÜCK</Button>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK, { state: { categoryId: data.id, unit: data.unit } })}>
                    NEU HINZUFÜGEN
                </Button>
            </ButtonCard>

            <ContentCard>
                <Headline type={HeadlineType.PRIMARY}>Inventar ({filtered.length})</Headline>
                <StockList items={filtered} />
            </ContentCard>
        </Container>
    </Fragment>
}

export default CategoryByIdPage