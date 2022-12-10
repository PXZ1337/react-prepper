import { MdRefresh } from "react-icons/md"
import classes from './RefreshButton.module.css'

const RefreshButton = () => {
    return <div className={classes['refresh-button']} title="Daten synchronisieren">
        <MdRefresh onClick={() => window.location.reload()} className="font-primary" />
    </div>
}

export default RefreshButton