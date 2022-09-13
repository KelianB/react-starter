import React from "react";
import {Theme} from "../../themes";
import {Styles} from "jss";
import withStyles, {WithStylesProps} from "react-jss";

type Props = WithStylesProps<typeof styles>;

class Home extends React.Component<Props> {
    render(): JSX.Element {
        const {classes} = this.props;
        return <span className={classes.title}>Home</span>;
    }
}

const styles = (theme: Theme): Styles => ({
    title: {
        color: "#fff",
    },
});

export default withStyles(styles)(Home);
