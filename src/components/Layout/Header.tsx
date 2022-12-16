import { Link } from 'react-router-dom';
import { Routes } from '../../Router';
import Version from '../Version/Version';
import classes from './Header.module.css';
import NavigationButton from './NavigationButton';

const Header = () => {
    return (
        <header className={`${classes.header} color6`}>
            <div className={classes.inner}>
                <NavigationButton />
                <h1><Link className='font-primary' to={Routes.DASHBOARD}>Prepper</Link></h1>
                <Version />
            </div>
        </header>
    );
};

export default Header;
