const url2 = 'https://sudreg-data.gov.hr/api/javni/dokumentacija/open_api ';
const url = 'https://sudreg-data.gov.hr/api/javni/evidencijske_djelatnosti';


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


const search = document.getElementById('btnUnesi').addEventListener('click', tokenZahtjev)
function tokenZahtjev() {

    let tokenValue = document.getElementById('InpuToken').value;
///DJELATNOSTI
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

    document.getElementById('content').classList.remove('hidden');
    document.getElementById('content').classList.add('visible');


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

    document.getElementById('content').classList.remove('hidden');
    document.getElementById('content').classList.add('visible');
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

    document.getElementById('content').classList.remove('hidden');
    document.getElementById('content').classList.add('visible');

    /////DetaljiSubjekta

    const urlemail = 'https://sudreg-data.gov.hr/api/javni/email_adrese'
    const urlsubjekta = 'https://sudreg-data.gov.hr/api/javni/detalji_subjekta';
    const urlKapitala = 'https://sudreg-data.gov.hr/api/javni/temeljni_kapitali';
//////////////////////////////////TRAZI MBS///////////////////////////////////////////////////////////////
    async function searchMBS() {
        const mbsInput = document.getElementById('mbsInput').value;
        if (!mbsInput || mbsInput.length !== 8) {
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
        document.getElementById('table').classList.remove('hidden');
        document.getElementById('table').classList.add('visible');
    }

    document.getElementById('secondSection').classList.remove('hidden');
    document.getElementById('secondSection').classList.add('visible');

    document.getElementById('token').classList.remove('visible');
    document.getElementById('token').classList.add('hidden');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////TRAZI OIB////////////////////////////////////////////////////////////////////////////////////////////////////
    async function searchOIB() {
        const mbsInput = document.getElementById('mbsInput').value;
        if (!mbsInput || mbsInput.length !== 11) {
            alert('Molimo unesite OIB za pretragu');
            return;
        }

        try {
            const response = await fetch(`${urlsubjekta}?tip_identifikatora=oib&identifikator=${mbsInput}`, {
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
        document.getElementById('table').classList.remove('hidden');
        document.getElementById('table').classList.add('visible');
    }

    document.getElementById('secondSection').classList.remove('hidden');
    document.getElementById('secondSection').classList.add('visible');

    document.getElementById('token').classList.remove('visible');
    document.getElementById('token').classList.add('hidden');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const oibRadio = document.getElementById('oibTrazi');
const mbsRadio = document.getElementById('mbsTrazi');
const pretrazi = document.getElementById('btn');


let currentSearchFunction = null;

oibRadio.addEventListener('click', () => {
    currentSearchFunction = searchOIB;
});

mbsRadio.addEventListener('click', () => {
    currentSearchFunction = searchMBS;
});

pretrazi.addEventListener('click', () => {
    if (currentSearchFunction) {
        currentSearchFunction();
    } else {
        alert('Molimo odaberite opciju pretrage (OIB ili MBS)');
    }
});

/////////////////////////////////////

}



