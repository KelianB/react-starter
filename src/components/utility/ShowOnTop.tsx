import React from "react";
import ReactDOM from "react-dom";

type Props = React.PropsWithChildren<unknown>;

let container: HTMLDivElement | null = null;

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        if (container === null) {
            container = document.createElement("div");
            container.id = "show-on-top";
            document.getElementsByTagName("body")[0].appendChild(container);
        }
    }

    render(): JSX.Element {
        if (container) return ReactDOM.createPortal(this.props.children, container);
        else throw new Error("ShowOnTop container has not been initialized");
    }
}

export default Component;
