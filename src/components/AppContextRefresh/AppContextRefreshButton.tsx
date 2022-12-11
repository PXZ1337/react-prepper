import { MdRefresh } from "react-icons/md"
import classes from './AppContextRefreshButton.module.css'

interface RefreshButtonProps {
    onAppRefreshHandler: () => void
}

const AppContextRefreshButton = (props: RefreshButtonProps) => {
    return <div className={classes['refresh-button']} title="Daten synchronisieren">
        <MdRefresh onClick={props.onAppRefreshHandler} className="font-primary" />
    </div>
}

export default AppContextRefreshButton