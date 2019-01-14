function generateTheme() {
    var name = rand(firstNames) + ' ' + rand(lastNames);
    var business = rand(businesses);
    var theme = rand(themes);

    document.querySelector('.contract').innerHTML = '';

    to( `<div class='detail'><span class='emphasize'>${name}</span> wants you to build them</div>`, 1000);
    to( `<div class='detail'>a <span class='emphasize'>${theme}</span> website for their </div>`, 2000);
    to( `<div class='detail'><span class='emphasize'>${business}</span> business</div>`, 3000);
    to(`<div class='detail'>and wants these colors.</div>`, 4000);
    setTimeout(getColors, 4000);
}

function getColors() {
    let hue = Math.random();

    let colors = [];

    for(let x = 0; x < 5; x++) {
        colors.push({
            h: hue,
            s: Math.random(),
            l: Math.random()
        });
    }

    colors = colors.map((color) => {
        let rgb = hslToRgb(color.h, color.s, color.l);

        return {
            value: '#' + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]),
            brightness: 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
        }
    });

    let colorContainer = document.createElement('div');
    colorContainer.classList.add('detail');
    colorContainer.classList.add('color-detail');

    colors.forEach(color => {
        let colorEl = document.createElement('div');
        colorEl.classList.add('color');

        colorEl.innerHTML = color.value;
        colorEl.style.background = color.value;
        colorEl.style.color = (color.brightness <= 128) ? '#EEE' : '#555';
        colorContainer.appendChild(colorEl);
    });
    document.querySelector('.contract').appendChild(colorContainer);
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
//https://stackoverflow.com/a/9493060
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rand(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function to(template, time) {
    setTimeout(() => {
        document.querySelector('.contract').insertAdjacentHTML('beforeend', template);
    }, time);
}

function toHex(dec) {
    return ('0' + dec.toString(16)).slice(-2);
}