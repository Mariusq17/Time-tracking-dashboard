const menuOptions = document.getElementsByClassName('menu-option');
const cardsCurrentTime = document.getElementsByClassName('card-current-time');
const cardLastTime = document.getElementsByClassName('card-last-time');

let period = null;

for(let i = 0; i < menuOptions.length; i++) {
    let option = menuOptions[i];
    option.addEventListener('click', () => {
        unsetActiveClass();
        option.classList.add('active');
        period = option.innerText.toLowerCase();
        fetch('./data.json')
            .then(res => res.json())
            .then(data => {
                for(let i = 0; i < data.length; i++) {
                    let elem = data[i].timeframes;
                    cardsCurrentTime[i].innerText = elem[period]['current'] + 'hrs';
                    if(period != 'daily')
                        cardLastTime[i].innerText = `Last ${period.charAt(0).toUpperCase() + period.slice(1, -2)} - ${elem[period]['previous']}hrs`;
                    else cardLastTime[i].innerText = `Last Day - ${elem[period]['previous']}hrs`;
                }
            });
    });
}
function unsetActiveClass() {
    for(let i = 0; i < menuOptions.length; i++)
        if(menuOptions[i].classList.contains('active'))
            menuOptions[i].classList.remove('active');
}
