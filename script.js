
const url2 = 'https://sudreg-data.gov.hr/api/javni/dokumentacija/open_api ';
const url = 'https://sudreg-data.gov.hr/api/javni/evidencijske_djelatnosti';
const url3 = 'https://sudreg-data.gov.hr/api/javni/tvrtke';

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
const search = document.getElementById('btnUnesi').addEventListener('click', tokenZahtjev)
function tokenZahtjev() {
    let tokenValue = document.getElementById('InpuToken').value;

axios.get(url, {
    headers: {
        'Authorization': `Bearer ${tokenValue}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);

        data.forEach(item => {
            if (item.djelatnost_tekst.trim() !== '') {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.djelatnost_tekst;
                djelatnostiDropdown.appendChild(option);
            }
        });
    })
    .catch(error => {
        console.log(error);
    });


/// sudovi

const urlSudovi = 'https://sudreg-data.gov.hr/api/javni/sudovi';

axios.get(urlSudovi, {
    headers: {
        'Authorization': `Bearer ${tokenValue}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.naziv;
            sudovi.appendChild(option);

        });
    })
    .catch(error => {
        console.log(error);
    });
////PRAVA

const urlprava = 'https://sudreg-data.gov.hr/api/javni/vrste_pravnih_oblika';

axios.get(urlprava, {
    headers: {
        'Authorization': `Bearer ${tokenValue}`
    }
})
    .then(response => {
        const data = response.data;
        console.log(data);
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.naziv;
            pravni.appendChild(option);

        });
    })
    .catch(error => {
        console.log(error);
    });
/////DetaljiSubjekta

const urlemail = 'https://sudreg-data.gov.hr/api/javni/email_adrese'
const urlsubjekta = 'https://sudreg-data.gov.hr/api/javni/detalji_subjekta';
const urlKapitala = 'https://sudreg-data.gov.hr/api/javni/temeljni_kapitali';

const search = document.getElementById('btn').addEventListener('click', searchCompany)

async function searchCompany() {
    const mbsInput = document.getElementById('mbsInput').value;
    if (!mbsInput) {
        alert('Molimo unesite MBS za pretragu');
        return;
    }

    try {
        const response = await fetch(`${urlsubjekta}?tip_identifikatora=mbs&identifikator=${mbsInput}`, {
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });

        const data = await response.json();
        console.log(data)

        /////PODACI ZA UPIT NA DRUGI URL
        sifra_zupanije = data.sjediste.sifra_zupanije;
        pravo_oblik_id = data.vrsta_pravnog_oblika_id;
        mbsTvrtke = data.mbs;
        

        ////UPIT ZA SUDOVE 
        const responseSudovi = await fetch(urlSudovi, {
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        const dataSuda = await responseSudovi.json();
        const sud = dataSuda.find(sud => sud.sifra === sifra_zupanije);

        //UPIT ZA PRAVNE OBLIKE
        const responsePravni = await fetch(urlprava, {
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        const dataPrava = await responsePravni.json();
        const pravo_oblik = dataPrava.find(pravo_oblik => pravo_oblik.vrsta_pravnog_oblika_id === pravo_oblik_id)

        /// UPIT ZA TEMELJNI KAPITAL-TRAZI SE PREKO ODABRANOG MBS-a
        const kapital = await fetch(urlKapitala, {
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        const dataKapital = await kapital.json();
        const temeljniKapital = dataKapital.find(temeljniKapital => temeljniKapital.mbs === mbsTvrtke);

        ///UPIT ZA EMAIL TVRTKE-TRAZI SE PREKO ODABRANOG MBS-a
        const email = await fetch(urlemail, {
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        const dataEmail = await email.json();
        const emailAdrese = dataEmail.find(emailAdrese => emailAdrese.mbs === mbsTvrtke);
        
        ///ISPIS PODATAKA
        document.getElementById('status').textContent = data.status;
        document.getElementById('oib').textContent = data.oib;
        document.getElementById('Tvrtka').textContent = data.tvrtka.ime;
        document.getElementById('nadlezni_sud').textContent = sud.naziv;
        document.getElementById('pravo_oblik').textContent = pravo_oblik.naziv;

        //PROVJERA AKO IMA PODATAKA ZA KAPITAL I EMAIL
        if (temeljniKapital && temeljniKapital.iznos) {
            document.getElementById('kapital').textContent = temeljniKapital.iznos;
        }
        else {
            document.getElementById('kapital').textContent = "Nema podatka";
        }
        if (emailAdrese && emailAdrese.adresa) {
            document.getElementById('email').textContent = emailAdrese.adresa;
        } else {
            document.getElementById('email').textContent = 'Nema podatka';
        }

    } catch (error) {
        console.error('Greška:', error);
    }
}
}
