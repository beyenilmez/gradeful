function darkMode() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.add('dark');
    setCookie('darkMode', 'true', 30);
}

function lightMode() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.remove('dark');
    setCookie('darkMode', 'false', 30);
}

function autoTheme() {
    if (getCookie('visited') === 'true') {
        const darkModeCookie = getCookie('darkMode');

        if (darkModeCookie === 'true') {
            darkMode();
        } else if (darkModeCookie === 'false'){
            lightMode();
        }
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkMode();
        } else {
            lightMode();
        }

        if(getCookie('visited') === ""){
            setCookie('visited', 'true', 365);
        }
    }
}
autoTheme();