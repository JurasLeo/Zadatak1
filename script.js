/*curl -i -k --user UfZO5UEl44EcWzix66jtwQ..:Qq-cyYM8MEcRj0Exn_B23w.. --data "grant_type=client_credentials" https://sudreg-data.gov.hr/api/oauth/token*/

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
    const djelatnostiDropdown = document.getElementById("djelatnostiDropdown");
    const selectedDjelatnost = document.getElementById("selectedDjelatnost");
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

/////////////////////////////////////ISPIS ODABRANIH SELECTA//////////////////////////////////////////
    function selectedOption() {
        djelatnostiDropdown.addEventListener("change", () => {
            const djelatnostSelect = djelatnostiDropdown.options[djelatnostiDropdown.selectedIndex].text;
            console.log(djelatnostSelect)
        });
        sudovi.addEventListener("change", () => {
            const selectedSud = sudovi.options[sudovi.selectedIndex].text;
            console.log(selectedSud)
        });
        pravni.addEventListener("change", () => {
            const selectedPrava = pravni.options[pravni.selectedIndex].text;
            console.log(selectedPrava)
        });
    }

    selectedOption();

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

    const mbsListUrl = 'https://sudreg-data.gov.hr/api/javni/evidencijske_djelatnosti';
const detaljiSubjektaUrl = 'https://sudreg-data.gov.hr/api/javni/detalji_subjekta';

// Funkcija za dohvat MBS-ova
async function fetchMbsList() {
    try {
        const response = await fetch(mbsListUrl,{
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filtriramo jedinstvene MBS-ove
        const uniqueMbsList = Array.from(new Set(data.map(item => item.mbs)));

        return uniqueMbsList; // Vraća niz jedinstvenih MBS-ova
    } catch (error) {
        console.error('Greška prilikom dohvaćanja popisa MBS-ova:', error);
        return []; // Vraća prazan niz u slučaju greške
    }
}

// Funkcija za dohvat detalja subjekta za određeni MBS
async function fetchDetaljiSubjekta(mbs) {
    try {
        const url = `${detaljiSubjektaUrl}?tip_identifikatora=mbs&identifikator=${mbs}`;
        const response = await fetch(url,{
            headers: {
                'Authorization': `Bearer ${tokenValue}`
            }
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Bad Request - provjerite format parametra mbs ili podršku API-ja za taj MBS');
            } else {
                throw new Error(`Network response was not ok - status ${response.status}`);
            }
        }

        const data = await response.json();
        return data; // Vraća objekt sa detaljima subjekta
    } catch (error) {
        console.error(`Greška prilikom dohvaćanja detalja za MBS ${mbs}:`, error);
        return null; // Vraća null u slučaju greške
    }
}


// Glavna funkcija koja spaja dohvaćanje popisa MBS-ova i detalja subjekata
async function main() {
    try {
        const mbsList = await fetchMbsList();

        if (mbsList.length === 0) {
            console.log('Nema dostupnih MBS-ova za obradu.');
            return;
        }

        // Iteriramo kroz svaki MBS i dohvaćamo detalje subjekta
        for (let i = 0; i < mbsList.length; i++) {
            const mbs = mbsList[i];
            const detaljiSubjekta = await fetchDetaljiSubjekta(mbs);

            if (detaljiSubjekta) {
                console.log(`Detalji za MBS ${mbs}:`, detaljiSubjekta);
                // Ovdje možete dalje obrađivati detalje po potrebi
            } else {
                console.log(`Detalji za MBS ${mbs} nisu dostupni.`);
            }
        }
    } catch (error) {
        console.error('Greška pri izvršavanju glavne funkcije:', error);
    }
}

// Pokretanje glavne funkcije
main();




}



