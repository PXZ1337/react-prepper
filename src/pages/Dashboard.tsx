import CategoryGridItem from "../components/Category/CategoryGridItem";
import GridCointainer from "../components/UI/GridContainer";
import GridItem from "../components/UI/GridItem";

const Dashboard = () => {

    return (
        <>
            <h1>Dashboard</h1>
            <p>Stocks by category</p>
            <GridCointainer>
                <CategoryGridItem name={"Drinks"} stock={6} goal={12} unit={"L"} />
                <CategoryGridItem name={"Meat, fish, Eggs"} stock={2} goal={2.5} unit={"KG"} />
                <CategoryGridItem name={"fruits, oats"} stock={1} goal={2.5} unit={"KG"} />
                <CategoryGridItem name={"Grain"} stock={1} goal={12} unit={"KG"} />
                <CategoryGridItem name={"Energy"} stock={3} goal={12} unit={"KG"} />
            </GridCointainer></>
    );
}

export default Dashboard