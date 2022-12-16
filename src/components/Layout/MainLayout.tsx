import classes from './MainLayout.module.css'
import Navigation from './Navigation'

const MainLayout = (props: any) => {
    return <main className={`${classes.main} primary`}>
        <Navigation />
        {props.children}
    </main>
}

export default MainLayout