import { Fragment, ReactNode, useContext, useEffect } from 'react';
import { MdDashboardCustomize, MdLibraryAdd, MdLineWeight } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from '../../Router';
import MenuContext from '../../store/Menu/menu-context';
import ContentCard from '../UI/Card/ContentCard';
import Headline, { HeadlineType } from '../UI/Misc/Headline';
import classes from './Navigation.module.css';

interface NavigationItemProps {
    children: ReactNode;
    path: string;
    state: any;
}

const NavigationItem = (props: NavigationItemProps) => {
    return (
        <li className={classes['navigation-item']}>
            <Link to={props.path} state={props.state}>
                {props.children}
            </Link>
        </li>
    );
};

const Navigation = () => {
    const { isVisible, setIsVisible } = useContext(MenuContext);
    const location = useLocation();

    useEffect(() => {
        setIsVisible(false);
    }, [setIsVisible, location]);

    const classNames = `${classes['navigation-wrapper']} ${isVisible ? classes.visible : classes.invisible}`;

    return (
        <Fragment>
            <nav className={classNames}>
                <Headline type={HeadlineType.PRIMARY} caption={'wo möchtest du hin?'}>
                    HAUPTMENÜ
                </Headline>
                <ContentCard>
                    <ul>
                        <NavigationItem path={Routes.DASHBOARD} state={{ referer: location.pathname }}>
                            <MdDashboardCustomize />
                            Dashboard
                        </NavigationItem>
                        <NavigationItem path={Routes.STOCKS} state={{ referer: location.pathname }}>
                            <MdLineWeight />
                            Inventar nach Ablaufdatum
                        </NavigationItem>
                        <NavigationItem path={Routes.ADD_STOCK} state={{ referer: location.pathname }}>
                            <MdLibraryAdd />
                            Neu hinzufügen
                        </NavigationItem>
                    </ul>
                </ContentCard>
            </nav>
        </Fragment>
    );
};

export default Navigation;
