import classes from "./Loader.module.css"

interface LoaderProps {
    children: any
}

const Loader = (props: LoaderProps) => {
    return (
        <div className={classes.loader}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <g transform="translate(50 50)">
                    <g transform="scale(0.7)">
                        <g transform="translate(-50 -50)">
                            <g>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s"></animateTransform>
                                <path fillOpacity="0.8" fill="#494D5F" d="M50 50L50 0A50 50 0 0 1 100 50Z"></path>
                            </g>
                            <g>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.3333333333333333s"></animateTransform>
                                <path fillOpacity="0.8" fill="#3c893f" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)"></path>
                            </g>
                            <g>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="2s"></animateTransform>
                                <path fillOpacity="0.8" fill="#fff685" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)"></path>
                            </g>
                            <g>
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="4s"></animateTransform>
                                <path fillOpacity="0.8" fill="#ff1d58" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <div className={classes['loader-caption']}>
                {props.children}
            </div>
        </div>
    )
}

export default Loader