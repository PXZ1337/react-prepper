import classes from './MainLayout.module.css'
import appClasses from '../../App.module.css'

const MainLayout = (props: any) => {
    return <main className={`${classes.main} ${appClasses.primary}`}>
        {props.children}
    </main>
}

export default MainLayout