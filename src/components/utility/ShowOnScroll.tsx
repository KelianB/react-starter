import React from "react";

type Props = {
    disabled: boolean;
    persistentMaxY?: number | (() => number);
    persistentMinY?: number | (() => number);
    maxY?: number;
    minY?: number;
    hiddenOnMount?: boolean;
    hideDelay: number;
    direction?: "up" | "down" | "both";
    render?: (visible: boolean) => void;
    children?: React.ReactNode;
};
type State = {hidden: boolean; locked: boolean};

class Component extends React.Component<Props, State> {
    static defaultProps: Partial<Props> = {
        hideDelay: 600,
        disabled: false,
    };

    private previousScrollY = 0;
    private hideTimeout: NodeJS.Timeout | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {hidden: props.hiddenOnMount || false, locked: false};
    }

    private scrollListener = (): void => {
        const y = window.scrollY;
        const {direction} = this.props;
        const {locked, hidden} = this.state;

        if (locked) return;

        const inPersistentZone = this.inPersistentZone(y);
        const shouldShow =
            this.inShowZone(y) &&
            (inPersistentZone ||
                direction === "both" ||
                (direction === "up" && y < this.previousScrollY) ||
                (direction === "down" && y > this.previousScrollY));

        if (hidden && shouldShow) this.setState({hidden: false});

        // If we're in the persistent zone, we don't want to hide the content
        if (inPersistentZone) {
            this.clearHideTimeout();
        } else {
            if (shouldShow) {
                // If the content should be shown right now, reset the hiding timeout
                this.clearHideTimeout();
                this.startHideTimeout();
            } else if (this.hideTimeout === null) {
                // If if should not be shown, hide it without resetting the hiding timeout
                this.startHideTimeout();
            }
        }

        this.previousScrollY = y;
    };

    quickFadeOut(lockDuration?: number): void {
        if (!this.state.hidden) this.clearHideTimeout();

        if (lockDuration === undefined) {
            this.setState({hidden: true});
        } else {
            this.setState({hidden: true, locked: true});
            setTimeout(() => this.setState({locked: false}), lockDuration);
        }
    }

    private clearHideTimeout(): void {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    }

    private startHideTimeout(): void {
        this.hideTimeout = setTimeout(() => {
            this.hideTimeout = null;
            this.setState({hidden: true});
        }, this.props.hideDelay);
    }

    private addListeners(): void {
        document.addEventListener("scroll", this.scrollListener);
        document.addEventListener("touchmove", this.scrollListener);
    }

    private removeListeners(): void {
        document.removeEventListener("scroll", this.scrollListener);
        document.removeEventListener("touchmove", this.scrollListener);
    }

    private inPersistentZone(y: number): boolean {
        const {persistentMaxY, persistentMinY} = this.props;
        return (
            (persistentMaxY !== undefined || persistentMinY !== undefined) &&
            (persistentMaxY === undefined ||
                y < (typeof persistentMaxY === "function" ? persistentMaxY() : persistentMaxY)) &&
            (persistentMinY === undefined ||
                y > (typeof persistentMinY === "function" ? persistentMinY() : persistentMinY))
        );
    }

    private inShowZone(y: number): boolean {
        const {maxY, minY} = this.props;
        return (maxY === undefined || y < maxY) && (minY === undefined || y > minY);
    }

    componentDidMount(): void {
        if (!this.props.disabled) this.addListeners();

        // this.scrollListener();
        // if (!this.inPersistentZone(window.scrollY)) this.startHideTimeout();

        if (this.props.hiddenOnMount) this.setState({hidden: true});
        else this.scrollListener();
    }

    componentWillUnmount(): void {
        this.removeListeners();
        this.clearHideTimeout();
    }

    componentDidUpdate(oldProps: Props): void {
        if (oldProps.disabled && !this.props.disabled) this.addListeners();
        if (!oldProps.disabled && this.props.disabled) this.removeListeners();
    }

    render(): JSX.Element {
        const {render, children, disabled} = this.props;
        const visible = disabled || !this.state.hidden;

        return (
            <>
                {render !== undefined && render(visible)}
                {children !== undefined && visible && children}
            </>
        );
    }
}

export default Component;
