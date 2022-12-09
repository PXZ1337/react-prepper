import classes from './MainLayout.module.css'

const MainLayout = (props: any) => {
    return <main className={`${classes.main} primary`}>
        {props.children}
    </main>
}

export default MainLayout