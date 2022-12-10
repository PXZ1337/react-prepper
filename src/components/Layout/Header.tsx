import { Link } from 'react-router-dom';
import { Routes } from '../../Router';
import RefreshButton from '../Refresh/RefreshButton';
import Version from '../Version/Version';
import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={`${classes.header} color6`}>
            <div className={classes.inner}>
                <h1><Link className='font-primary' to={Routes.DASHBOARD}>Prepper</Link></h1>
                <Version />
            </div>

            <RefreshButton />
        </header>
    );
};

export default Header;
