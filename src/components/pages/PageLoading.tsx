import React from "react";
import {Translation} from "react-i18next";
import withStyles, {Styles, WithStylesProps} from "react-jss";
import {Theme} from "../../themes";
import LoadingIndicator from "../atomic/LoadingIndicator";

type Props = WithStylesProps<typeof styles>;

class Component extends React.Component<Props> {
    render(): JSX.Element {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <Translation>
                    {(t): React.ReactNode => (
                        <>
                            <LoadingIndicator className={classes.loadingIcon} />
                            <span className={classes.loadingText}>{t("loading")}</span>
                        </>
                    )}
                </Translation>
            </div>
        );
    }
}

const styles = (theme: Theme): Styles => ({
    container: {
        width: "100%",
        height: "100%",
        color: theme.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    loadingIcon: {
        fontSize: 48,
    },
    loadingText: {
        fontFamily: "Arial",
        fontSize: 20,
        marginTop: 10,
        letterSpacing: 1.1,
    },
});

export default withStyles(styles)(Component);
