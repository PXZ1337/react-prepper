import { useContext } from 'react';
import MenuContext from '../../store/Menu/menu-context';
import classes from './NavigationButton.module.css';

const NavigationButton = () => {
    const menuContext = useContext(MenuContext);

    const onClickHandler = () => {
        menuContext.setIsVisible(!menuContext.isVisible);
    };
    const classNames = `${classes['navigation-icon']} ${menuContext.isVisible ? classes.open : ''}`;

    return (
        <div className={`${classes['navigation-button']} font-primary`}>
            <div onClick={onClickHandler} className={classNames}>
                <span className="primary"></span>
                <span className="primary"></span>
                <span className="primary"></span>
            </div>
        </div>
    );
};

export default NavigationButton;
