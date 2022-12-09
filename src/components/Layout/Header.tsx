import classes from './Header.module.css';
import { Routes } from '../../Router';
import { Link } from 'react-router-dom';
import Version from '../Version/Version';

const Header = () => {
    return (
        <header className={`${classes.header} color6`}>
            <div className={classes.inner}>
                <h1><Link className='font-primary' to={Routes.DASHBOARD}>Prepper</Link></h1>
            </div>
            <Version />
        </header>
    );
};

export default Header;
