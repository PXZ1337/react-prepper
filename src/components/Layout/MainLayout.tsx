import { useContext } from 'react';
import MenuContext from '../../store/Menu/menu-context';
import Navigation from '../Navigation/Navigation';
import classes from './MainLayout.module.css';

const MainLayout = (props: any) => {
    const menuContext = useContext(MenuContext);

    const classNames = `${classes.main} primary ${menuContext.isVisible ? classes['disable-scroll'] : ''}`;

    return (
        <main className={classNames}>
            <Navigation />
            {props.children}
        </main>
    );
};

export default MainLayout;
