//1

let voce=['banana','jabuka','naranca','lubenica','mandarina'];
let povrce=['krumpir','zelena salata','mrkva','kupus','cikla'];

console.log(voce);
console.log(povrce);

//2
povrce.pop();
console.log(povrce);

//3
povrce.pop();
console.log(povrce);

//4
voce.shift();
console.log(voce);

//5
let indexVoce=voce.indexOf('naranca');
console.log(indexVoce);
//6
voce.push(indexVoce);
console.log(voce);

//7

let duljinaPovrća = povrce.length;
console.log(duljinaPovrća);

//8

povrce.push(duljinaPovrća);
console.log(povrce);

//9
let hrana=voce.concat(povrce);
console.log(hrana);

//10
hrana.splice(4, 2);
console.log(hrana);

//11
hrana.reverse();
console.log(hrana);

//12 ovako je valjda dobro
console.log(hrana.toString());
console.log(hrana);


///ZADACI 1
//1
const users = [
    {id:1,name:'Ivan', score: 75},
    {id:2,name:'Pero', score: 90},
    {id:3,name:'Nina', score: 95},
    {id:4,name:'Maja', score: 80}
    ];

///Pomoću naredbe find() pronađi korisnika s imenom Nina.

const nina=users.find(users=>users.name==='Nina');
console.log(nina);

//2 Putem filter() metode pronađi sve korisnike koji imaju „score” >= 90.

const result = users.filter(users => users.score >= 90);
console.log(result);

//3 Dodajte novog usera u polje.
const newUser = {id: 5, name: 'Ana', score: 55};
users.push(newUser); 
console.log(users);


//4 Ispišite ime i score usera pomoću forEach petlje. (plus za korištenje literala).
users.forEach(users => console.log(users.name,users.score));


//5 Izračunajte ukupan „score” iznos pomoću reduce metode.
const vrijednost = 0;
const ukupanScore = users.reduce((pocetnaVrijednost,Korisnik) => pocetnaVrijednost + Korisnik.score,vrijednost);
    console.log(ukupanScore);


//Zadaci 2
//1 Napišite funkciju koja će vraćati (return) prvi element niza, a ukoliko je niz prazan vraćat će poruku „niz je prazan”. Console.log s elementima: [10, 20, 30] te []. (koristite i if unutar funkcije)

function prviElement(niz) {
    if (niz.length === 0) {
        return "niz je prazan";
    } else {
        return niz[0];
    }
}
console.log(prviElement([10,20,30]));
console.log(prviElement([]));

//2 Prenamijenite funkciju da vraća prvih n elemenata niza, n je parametar funkcije koji označava proizvoljni broj. Testirajte funkciju s elementima: [10, 20, 30] i 2, [] i 3, [10, 20, 30, 40, 50] i 6, [10, 20, 30, 40, 50] i – 3. 


function prvih_N_Element(niz,n) {
    if (niz.length === 0) {
        return "niz je prazan";
    } else{

            return niz.slice(0,n);
        }  
    }
    console.log(prvih_N_Element([10,20,30],2));
    console.log(prvih_N_Element([],3))
    console.log(prvih_N_Element([10,20,30,40,50],6))
    console.log(prvih_N_Element([10,20,30,40,50],-3))

//3 Deklarirajte array: boje = [‘Crvena’, ‘Plava’, ‘Žuta’, ‘Roza’]. Ispištite boje kao: Crvena,Plava,Žuta,RozaCrvena+Plava+Žuta+Roza


const boje = ['Crven', 'Plava', 'Žuta', 'Roza']
console.log(boje.toString());
console.log(boje.join("+"));




//5 Napišite funkciju koja će maknuti element na danom indexu. Parametri funkcije su array i indeks. Ukoliko je Index veći od dužine arraya, neka funkcija vraća poruku: Pogrešan indeks.

function elementRemovebyIndex(niz,broj){
    if(broj>niz.length){
        console.log("Pogresan indeks");
    }
    else{
      niz.splice(broj,1);
      return niz
    }

}
console.log(elementRemovebyIndex([10,20,30,40,50],3));     

//4 Napišite funkciju koja će maknuti zadani element iz arraya ukoliko on postoji u njemu. Ako ne postoji neka funkcija vraća poruku: Element ne postoji.


function elementRemove(niz,element){
    if(true){
        let odabrani=niz.splice(element,1);
        return odabrani
    }
    else
       console.log(" asfdaf ")
    ;   
    
}
console.log(elementRemove([10,20,30,40,50],20))

//zadaci 3

//Pronađite najmanji i najveći broj: [100, 200, 152, 125, 63]

const niz = [100, 200, 50, 152, 125, 63];
console.log(Math.min(...niz)); //63
console.log(Math.max(...niz)); // 200

//Napravite funkciju koja uzima dva broja kao argumente ( num, length) i vraća niz (array) višekratnika broja num dok duljina niza ne dosegne length. (num + num ...) – koristiti for petlju



//U array iz prvog zadatka nadodajte još jednom isti array.--ovo nisam bas shvatio

const arr=niz.concat(niz);
console.log(Math.min(...arr)); //63
console.log(Math.max(...arr)); // 200
