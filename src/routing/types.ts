/* General types */

export type Page = {
    persistentComponent: JSX.Element | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.LazyExoticComponent<any>;
    exactPath: boolean;
    backgroundColor: string;
    path?: string | string[];
    forceSwitchKey?: string; // can be used to prevent remounting on subroute change
};
