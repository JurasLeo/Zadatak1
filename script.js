window.addEventListener('load', onLoaded, false);

function onLoaded(evt) {
    fetchData();
}

async function fetchData() {
    try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const names = data.results.map(user => user.name.first);
        const surnames = data.results.map(user => user.name.last);
        const title = data.results.map(user => user.name.title);
        rowDjelatnosti(names);
        rowRegije(surnames);
        rowPravni(title);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function rowDjelatnosti(names) {
    names.forEach(name => {
        let djelatnost = document.getElementById('djelatnosti');
        let newCopy = djelatnost.content.cloneNode(true);
        let imeDjelatnosti = newCopy.querySelector('#imeDjelatnost');
        imeDjelatnosti.textContent = name;
        djelatnost.parentNode.appendChild(newCopy);
    });
}

function rowRegije(surnames) {
    surnames.forEach(surname => {
        let regija = document.getElementById('regije');
        let newCopy = regija.content.cloneNode(true);
        let imeRegija = newCopy.querySelector('#imeRegije');
        imeRegija.textContent = surname;
        regija.parentNode.appendChild(newCopy);
    });
}

function rowPravni(title) {
    title.forEach(title => {
        let pravo = document.getElementById('pravni');
        let newCopy = pravo.content.cloneNode(true);
        let imePrava = newCopy.querySelector('#imePrava');
        imePrava.textContent = title;
        pravo.parentNode.appendChild(newCopy);
    });
}








