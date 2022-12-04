import { useNavigate } from 'react-router-dom'
import classes from './BackButton.module.css'

const BackButton = () => {
    const navigate = useNavigate()

    return <div onClick={() => navigate(-1)} className={classes.back}>
        <p>Go back</p>
    </div>
}

export default BackButton