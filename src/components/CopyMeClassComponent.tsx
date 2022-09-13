import React from "react";
import withStyles, {Styles, WithStylesProps} from "react-jss";
import {Theme} from "../themes";

type Props = WithStylesProps<typeof styles>;

class Component extends React.Component<Props> {
    render(): JSX.Element {
        const {classes} = this.props;
        return <div className={classes.container}></div>;
    }
}

const styles = (theme: Theme): Styles => ({
    container: {},
});

export default withStyles(styles)(Component);
