import { Fragment } from "react"
import { useParams } from "react-router-dom"
import BackButton from "../../components/UI/BackButton"
import Container from "../../components/UI/Container"

const StockByIdPage = () => {
    const params = useParams()

    return <Fragment>
        <Container>
            <h1>Stock by ID page: {params.id}</h1>
            <BackButton />
        </Container>
    </Fragment>
}

export default StockByIdPage