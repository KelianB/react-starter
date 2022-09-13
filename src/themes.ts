export const themes = {
    light: {
        text: "#111111",
        textSecondary: "#242424",
        primary: "rgb(60,140,180)",
    },
    dark: {
        text: "#efefef",
        textSecondary: "#c0c0c0",
        primary: "rgb(180,140,60)",
    },
};

export type Theme = typeof themes.light & typeof themes.dark;
