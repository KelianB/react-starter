import React, {Suspense, useEffect} from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {ThemeProvider} from "theming";
import {themes} from "./themes";
import {AnimatePresence} from "framer-motion";
import {getPage, PageNotFound, pages} from "./routing/index";
import PageLoading from "./components/pages/PageLoading";

const body = document.getElementsByTagName("body")[0];

function App(): JSX.Element {
    const location = useLocation();
    const p = getPage(location.pathname);

    useEffect(() => {
        body.style.backgroundColor = p.backgroundColor;
    });

    return (
        <ThemeProvider theme={themes.dark}>
            <Suspense fallback={<PageLoading />}>
                {p.persistentComponent}
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={p.forceSwitchKey || location.pathname}>
                        {Object.keys(pages).map((k) => (
                            <Route
                                key={k}
                                path={pages[k].path || k}
                                exact={pages[k].exactPath}
                                component={pages[k].component}
                            />
                        ))}
                        <Route component={PageNotFound.component} />
                    </Switch>
                </AnimatePresence>
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
