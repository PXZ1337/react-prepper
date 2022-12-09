import { useContext } from "react"
import { ICategoryDTO } from "../../common/dto/CategoryDTOs"
import IStockDTO from "../../common/dto/StockDTOs"
import StockContext from "../../store/Stock/stock-context"
import GridCointainer from "../UI/GridContainer"
import CategoryGridItem from "./CategoryGridItem"

interface CategoryListProps {
    items: ICategoryDTO[]
}

const CategoryList = (props: CategoryListProps) => {
    const context = useContext(StockContext)

    const groupBy = (list: any[], col: string) => {
        return list.reduce((grouped, stock) => {
            !grouped[stock[col]] ? grouped[stock[col]] = [stock] : grouped[stock[col]].push(stock)
            return grouped
        }, {})
    }

    const availableCategories = props.items.map((category: ICategoryDTO) => {
        const stockList = context.getStocksByParentCategoryId(category.id)
        const stockCapacity = stockList.reduce((previousValue, currentValue) => previousValue + currentValue.abs, 0)
        console.log(groupBy(stockList, 'categoryId'))

        return <CategoryGridItem
            key={category.id}
            id={category.id}
            name={category.name}
            stock={stockCapacity}
            goal={category.goal}
            unit={category.unit} />
    })


    return <GridCointainer>
        {availableCategories}
    </GridCointainer>
}

export default CategoryList