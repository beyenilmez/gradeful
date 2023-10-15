function darkMode() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
}

function lightMode() {
    const htmlTag = document.querySelector('html');

    htmlTag.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
}

function autoTheme() {
    if (localStorage.getItem('visited') === 'true') {
        const darkModeStorage = localStorage.getItem('darkMode');

        if (darkModeStorage === 'true') {
            darkMode();
        } else if (darkModeStorage === 'false') {
            lightMode();
        }
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkMode();
        } else {
            lightMode();
        }

        if (localStorage.getItem('visited') !== 'true') {
            localStorage.setItem('visited', 'true');
        }
    }
}
autoTheme();
