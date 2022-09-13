export const WIDE_SCREEN_THRESHOLD = 900;
export const NARROW_SCREEN_THRESHOLD = 480;

const mediaQueries = {
    wideScreen: `@media (min-width: ${WIDE_SCREEN_THRESHOLD}px)`,
    nonWideScreen: `@media (max-width: ${WIDE_SCREEN_THRESHOLD}px)`,
    narrowScreen: `@media (max-width: ${NARROW_SCREEN_THRESHOLD}px)`,
    nonNarrowScreen: `@media (min-width: ${NARROW_SCREEN_THRESHOLD}px)`,
};

export default mediaQueries;
