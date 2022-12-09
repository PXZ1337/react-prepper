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
    const category = useLoaderData() as ICategoryDTO
    const navigate = useNavigate()
    const context = useContext(StockContext)

    const filtered = context.getStocksByParentCategoryId(category.id)

    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY}>{category.name}</Headline>
            <CategoryGridItem id={category.id} name={category.name} stock={context.calculateCapacityByCategory(category)} goal={category.goal} unit={category.unit} />

            <ButtonCard>
                <Button buttonType={ButtonType.BACK} onClickHandler={() => { navigate(Routes.DASHBOARD) }}>ZURÜCK</Button>
                <Button buttonType={ButtonType.PRIMARY} onClickHandler={() => navigate(Routes.ADD_STOCK)}>
                    NEU HINZUFÜGEN
                </Button>
            </ButtonCard>

            <ContentCard>
                <Headline type={HeadlineType.PRIMARY}>Inventar ({filtered.length})</Headline>
                <StockList items={filtered} />
            </ContentCard>
        </Container>
    </Fragment >
}

export default CategoryByIdPage