import classes from './Version.module.css'

const { version } = require('../../../package.json');

const Version = () => {
    return <div className={`${classes.version} font-primary`}>v{version}</div>
}

export default Version