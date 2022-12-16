import Navigation from '../Navigation/Navigation';
import classes from './MainLayout.module.css';

const MainLayout = (props: any) => {
    return (
        <main className={`${classes.main} primary`}>
            <Navigation />
            {props.children}
        </main>
    );
};

export default MainLayout;
