////prvi
//1
let num1='1';
//2
let symbols='Niz znakova';
//3
let symbols2='3 4';
//4
let symbols3='U dva retka';
//5
let log=true;
//6
console.log(num1)
console.log(symbols)
console.log(symbols2)
console.log(symbols3)
console.log(log)
//7
log=false;
console.log(log)
//8
let num2='12';
//9
const num3=num1*num2;
//10
console.log(num3)
//11
const obj={
    ime:'Leo',
    prezime:'Juras',
    zamimanje:'Voditelj',
    godina_rod:'1999',
    hobi:'igranje',
    hobi2:'trcanje'
}
//12
console.log(obj.hobi2)
//13
obj.zamimanje='vatrogasac';
obj.prezime='Horvat';
//14
console.log(obj)


///drugi
//1
function ispis(nekavarijabla){
    console.log(nekavarijabla);
}

function udaljenost(a,b){
    return 2*(a+b);
}
//2
ispis("Svaka prepreka koju naidemo je prilika za rast");
//3
const rezultat=udaljenost(20,30);
console.log(rezultat);
//4
ispis("Opseg je "+rezultat);

///treci
//1
function paran_neparan(a){
    if(a%2===0){
        console.log("Broj je paran");
    }
    else{
        console.log("Broj je neparan");
    }
}
//2
paran_neparan(117);
paran_neparan(320);


//3
function provjera(broj){
    if(broj<=10){
        console.log("Broj je od 1-10");
    }
    else if(broj<=100){
        console.log("Broj je od 11-100");
    }
    else {
        console.log("Broj je veci od 100");
    }
}
//4
provjera(12);
provjera(4);
provjera(123);

///zadaci 4
//1
for(let i=0; i<10; i++){
    console.log("console");
}
//2
let number='0';
do {  
    console.log("console1");
    number++;
   } while(number<10);

//3
for(let i=0; i<=10; i++){
    if(i%2===0){
        console.log("Ispisi");
    }
    else{
        console.log("");
    }
}

///zadaci 5

//4
function brSamoglasnika(recenica){
    let brojac=0;
    for(let i=0; i<recenica.length; i++){
        let slovo=recenica[i];
        if(slovo ==='a' || slovo ==='o' || slovo ==='i' || slovo ==='e' || slovo ==='u'||
            slovo ==='A' || slovo ==='B' || slovo ==='I' || slovo ==='E' || slovo ==='U'){
            brojac++;
        }
    }
    return brojac;
}
const test='leqrEuAnafaaasfadaasdfa';
console.log(brSamoglasnika(test));
//5
function celziusToF(C){
    return F=(9*C)/5+32;
    console.log(F);
}
function fahrenToC(F){
    return C=5*(F-32)/9;
}

const stupnjevi=18;
console.log(celziusToF(stupnjevi))
const fahreti=64.4;
console.log(fahrenToC(fahreti))

//1
function prirodniBr(N){
    let zbroj=0;
    for(let i=1;i<=N;i++){
        zbroj+=i;
    }
    return zbroj;
}
const test1=5;
console.log(prirodniBr(test1))

//3

function palindrom(recenica){
    
    return recenica===recenica.split("").reverse().join("");

}
const palindromRec='krk';
const nepalindromRec='mrk';
console.log(palindrom(palindromRec))
console.log(palindrom(nepalindromRec))