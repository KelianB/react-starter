import {AnimatePresence} from "framer-motion";
import React from "react";
import withStyles, {Styles, WithStylesProps} from "react-jss";
import {Theme} from "../../themes";
import ShowOnTop from "./ShowOnTop";

type Props = React.PropsWithChildren<
    WithStylesProps<typeof styles> & {
        open: boolean;
        onClickAway?: () => void;
        interceptClicks?: boolean;
    }
>;

class Component extends React.Component<Props> {
    render(): JSX.Element {
        const {classes, children, open, onClickAway, interceptClicks} = this.props;

        return (
            <ShowOnTop>
                <AnimatePresence>
                    {open && (
                        <div
                            className={classes.backdrop}
                            style={{
                                pointerEvents: onClickAway || interceptClicks ? "auto" : "none",
                            }}
                            onClick={onClickAway}
                        >
                            {children}
                        </div>
                    )}
                </AnimatePresence>
            </ShowOnTop>
        );
    }
}

const styles = (theme: Theme): Styles => ({
    backdrop: {
        position: "fixed",
        width: "100%",
        height: "100%",
    },
});

export default withStyles(styles)(Component);
