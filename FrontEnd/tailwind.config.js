import twElementsPlugin from "tw-elements/dist/plugin.cjs";

export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js}",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    purge: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        twElementsPlugin
    ],
    darkMode:"class"
};
