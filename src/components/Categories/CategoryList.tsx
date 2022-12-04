import { ICategory } from "../../common/Category"
import GridCointainer from "../UI/GridContainer"
import AvailableCategories from "./AvailableCategories"
import CategoryGridItem from "./CategoryGridItem"

const CategoryList = () => {
    const availableCategories = AvailableCategories().map((category: ICategory) => {
        const randomStock = Math.round(Math.random() * category.goal)

        return <CategoryGridItem
            key={category.id}
            id={category.id}
            name={category.name}
            stock={randomStock}
            goal={category.goal}
            unit={category.unit} />
    })


    return <GridCointainer>
        {availableCategories}
    </GridCointainer>
}

export default CategoryList