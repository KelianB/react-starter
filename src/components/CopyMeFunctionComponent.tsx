import React from "react";
import {createUseStyles, Styles} from "react-jss";
import {Theme} from "../themes";

type Props = {exampleProp: string};

const useStyles = createUseStyles(
    (theme: Theme): Styles => ({
        container: {},
    })
);

function Component(props: Props): JSX.Element {
    const classes = useStyles();
    return <div className={classes.container}></div>;
}

export default Component;
