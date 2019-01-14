function generateTheme() {
    var name = rand(firstNames) + ' ' + rand(lastNames);
    var buisness = rand(businesses);
    var theme = rand(themes);

    document.querySelector('.contract').innerHTML = '';

    to( `<div class='detail'><span class='emphasize'>${name}</span> wants you to build them</div>`, 1000);
    to( `<div class='detail'>a <span class='emphasize'>${theme}</span> website for their </div>`, 2000);
    to( `<div class='detail'><span class='emphasize'>${buisness}</span> buisness</div>`, 3000);
    to(`<div class='detail'><span class='emphasize'>and wants these colors.</div>`, 4000);
    getColors();
}

function getColors() {
    let url = 'https://colormind.io/api/';
    let data = {
        'model' : 'default'
    };

    let http = new XMLHttpRequest();

   if('withCredentials' in http) {
    http.open("POST", url, true);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function() {
        if(http.status == 200 && http.readyState == 4) {
            let colors = JSON.parse(http.responseText).result;
            colors = colors.map(color =>{
                  return {
                      value: '#' + toHex(color[0]) + toHex(color[1]) + toHex(color[2]),
                      brightness: 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
                }});

            setTimeout(() => {
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
            }, 4000);
        }
    }

    http.send(JSON.stringify(data));
   }
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