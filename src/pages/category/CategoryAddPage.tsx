import { Fragment } from "react"
import Container from "../../components/UI/Container"
import Headline, { HeadlineType } from "../../components/UI/Headline"

const CategoryAddPage = () => {
    return <Fragment>
        <Container>
            <Headline type={HeadlineType.PRIMARY} caption="neue Kategorie hinzufügen">Erstellen</Headline>
        </Container>
    </Fragment>
}

export default CategoryAddPage