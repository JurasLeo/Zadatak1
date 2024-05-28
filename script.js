
const url2 = 'https://sudreg-data.gov.hr/api/javni/dokumentacija/open_api ';

const url = 'https://sudreg-data.gov.hr/api/javni/evidencijske_djelatnosti';
const url3 = 'https://sudreg-data.gov.hr/api/javni/tvrtke';
const accessToken = '3kiUuiPLAeebTAPx-zBcDw';


// API DOKUMENT /////
fetch(url2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

//////////////

///DJELATNOSTI
const djelatnostiContainer = document.getElementById('djelatnosti');

axios.get(url, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);

        data.forEach(item => {
            if (item.djelatnost_tekst.trim() !== '') {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item.djelatnost_tekst;
                djelatnostiDropdown.appendChild(option);
            }
        });
    })
    .catch(error => {
        console.log(error);
    });


/// sudovi

const drzave = document.getElementById('sudovi');
const urlDrzave = 'https://sudreg-data.gov.hr/api/javni/sudovi';

const drzaveContainer = document.getElementById('sudovi');

axios.get(urlDrzave, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);

        data.forEach(item => {

            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('form-check');

            let checkboxInput = document.createElement('input');
            checkboxInput.classList.add('form-check-input');
            checkboxInput.setAttribute('type', 'checkbox');
            checkboxInput.setAttribute('name', 'sudovi');
            checkboxInput.setAttribute('value', item.id);


            let checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-check-label');
            checkboxLabel.innerHTML = item.naziv;

            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);

            drzaveContainer.appendChild(checkboxDiv);

        });
    })
    .catch(error => {
        console.log(error);
    });
////PRAVA
const prava = document.getElementById('pravni');
const urlprava = 'https://sudreg-data.gov.hr/api/javni/vrste_pravnih_oblika';

const uniqueLegalForms = new Set();
axios.get(urlprava, {
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);

        data.forEach(item => {

            let checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('form-check');

            let checkboxInput = document.createElement('input');
            checkboxInput.classList.add('form-check-input');
            checkboxInput.setAttribute('type', 'checkbox');
            checkboxInput.setAttribute('name', 'pravanasa');
            checkboxInput.setAttribute('value', item.mbs);

            let checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-check-label');
            checkboxLabel.innerHTML = item.naziv;

            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);

            prava.appendChild(checkboxDiv);

        });
    })
    .catch(error => {
        console.log(error);
    });
/////ispis odabranih
const urlTvrtke = 'https://sudreg-data.gov.hr/api/javni/detalji_subjekta';

const search = document.getElementById('btn').addEventListener('click',searchCompany)  

async function searchCompany() {
    const mbsInput = document.getElementById('mbsInput').value;
    if (!mbsInput) {
        alert('Molimo unesite MBS za pretragu');
        return;
    }

    try {
        const response = await fetch(`${urlTvrtke}?tip_identifikatora=mbs&identifikator=${mbsInput}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        console.log(data)

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        
        const company = data.find(company => company.mbs.toString() === mbsInput.toString());

        console.log('Pronađena tvrtka:', company);

        if (!company) {
            resultsDiv.textContent = 'Nema rezultata za dati MBS.';
            return;
        }

        const companyDiv = document.createElement('div');
        companyDiv.classList.add('company');

        const ime = document.createElement('p');
        ime.textContent = `Tvrtka: ${company.ime}`;
        
        companyDiv.appendChild(ime);
        resultsDiv.appendChild(companyDiv);

    } catch (error) {
        console.error('Greška:', error);
    }
}


