function createColorJSON(name, startColor, endColor, startNumber, endNumber, incerement) {
    const start = startColor;
    const end = endColor;

    const stepCount = (endNumber - startNumber) / incerement + 1;

    const rDiff = (end[0] - start[0]) / stepCount;
    const gDiff = (end[1] - start[1]) / stepCount;
    const bDiff = (end[2] - start[2]) / stepCount;

    let colors = {};
    let color = { colors };

    for (let i = startNumber; i <= endNumber; i += incerement) {
        const r = Math.round(start[0] + rDiff * i / incerement);
        const g = Math.round(start[1] + gDiff * i / incerement);
        const b = Math.round(start[2] + bDiff * i / incerement);

        colors[i] = 'rgb(' + r + ',' + g + ',' + b + ')';
    }
   
    color = JSON.stringify(color).replace("colors", name + "");

    return color;
}

console.log(createColorJSON("slate", [248, 250, 252], [0, 0, 0], 50, 1000, 50));