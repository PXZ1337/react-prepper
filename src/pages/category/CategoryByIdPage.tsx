import { useParams } from "react-router-dom"

interface CategoryByIdPageProps {
    id?: string
}

const CategoryByIdPage = (props: CategoryByIdPageProps) => {
    const params = useParams()

    return <p>You looking at the category by id page for category "{params.id}"</p>
}

export default CategoryByIdPage