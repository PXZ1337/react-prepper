import classes from './Header.module.css';
import appClasses from '../../App.module.css'

const Header = () => {
  return (
    <header className={`${classes.header} ${appClasses.primary}`}>
      <div className={classes.inner}>
        <h1>Prepper</h1>
      </div>
    </header>
  );
};

export default Header;
