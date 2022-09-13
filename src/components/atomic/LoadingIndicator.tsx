import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

type Props = {className?: string};

class Component extends React.Component<Props> {
    render(): JSX.Element {
        const {className} = this.props;
        return <FontAwesomeIcon className={`fa-spin ${className || ""}`} icon={faCircleNotch} />;
    }
}

const LoadingIndicator = Component;
export default LoadingIndicator;
