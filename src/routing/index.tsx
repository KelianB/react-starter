import {lazy} from "react";
import {matchPath} from "react-router";
import {Page} from "./types";

const defaultPage: Page = {
    persistentComponent: undefined,
    component: lazy(() => import("../components/pages/Home")),
    exactPath: false,
    backgroundColor: "#222222",
};

function page(params: Partial<Page>): Page {
    return {
        ...defaultPage,
        ...params,
    };
}

export function getPage(pathname: string): Page {
    const matchedPath = Object.keys(pages).find((path: string) =>
        matchPath(pathname, {path, exact: pages[path].exactPath})
    );
    return matchedPath ? pages[matchedPath] : PageNotFound;
}

export const pages: {[key: string]: Page} = {
    "/": page({
        component: lazy(() => import("../components/pages/Home")),
        exactPath: true,
    }),
};

export const PageNotFound = page({
    component: lazy(() => import("../components/pages/NotFound")),
});
