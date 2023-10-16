function themeDark() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

function themeLight() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.remove('dark');
    localStorage.setItem('theme', 'light');
}

function themeSystem() {
    const htmlTag = document.querySelector('html');

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlTag.classList.add('dark');
    } else {
        htmlTag.classList.remove('dark');
    }

    localStorage.setItem('theme', 'system');
}

function setTheme() {
    const themeStorage = localStorage.getItem('theme');

    if (themeStorage === 'dark') {
        themeDark();
    } else if (themeStorage === 'light') {
        themeLight();
    } else {
        themeSystem();
    }
}

setTheme();

window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({ matches }) => {
        setTheme();
    })