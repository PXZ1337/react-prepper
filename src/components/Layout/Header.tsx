import classes from './Header.module.css';
import appClasses from '../../App.module.css'
import { Routes } from '../../Router';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={`${classes.header} ${appClasses.primary}`}>
      <div className={classes.inner}>
        <h1><Link to={Routes.DASHBOARD}>Prepper</Link></h1>
      </div>
    </header>
  );
};

export default Header;
