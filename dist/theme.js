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
    const darkModeCookie = getCookie('darkMode');

    if(darkModeCookie === 'true'){
        darkMode();
    }else{
        lightMode();
    }
}
autoTheme();