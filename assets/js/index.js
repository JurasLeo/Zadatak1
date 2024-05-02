
//
document.getElementById("myParagraph").textContent = "Novi tekst";
//
const colorPicker = document.getElementById('colorSelect');
const myElement = document.getElementById('myElement');
myElement.style.backgroundColor = colorPicker.value='red';

//
const remove=document.getElementById("myElement")
remove.classList.remove("highlight");
const dodaj=document.getElementById("myElement")
dodaj.classList.add("active");
//
const vrijednost=document.getElementById('myInput').value;
console.log(vrijednost);
//
document.getElementById('myElement').style.display='none';
//
document.getElementById('myImage').src="./images/druga-slika.jpg";
//
const box=document.querySelectorAll(".box");
box.forEach(element => {
    element.textContent="Box";
});
//
/*
box.forEach(element =>{
    element.remove();
})
*/
//
const newElement = document.createElement('p');
newElement.textContent = "Novi paragraf";
document.body.appendChild(newElement);

//////


///
const font=document.querySelectorAll('p');
font.forEach(element =>{
    element.style.fontSize = '20px';
})
const gumb = document. querySelector('button');
////
document.body.style.backgroundImage = 'url("./images/background.jpg")';
///
const poruka=document.querySelectorAll('p');
poruka.forEach(poruka => {
    poruka.addEventListener('click', function() {

        console.log('Poruka.');

    });
});
///
const colorSelect = document.getElementById('colorSelect');
colorSelect.addEventListener('change', function() {
    const selectedColor = colorSelect.value;
    const myElement = document.getElementById('myElement');
    myElement.style.backgroundColor = selectedColor;
});

document.getElementById('.hidden').style.display='none';

///
const input = document.getElementById('myInput');
input.addEventListener('enter', function() {

});
///
const boxColor=document.querySelectorAll(".box");
boxColor.forEach(element => {
    element.onmouseover = function() {
        boxColor.style.color = 'green';
      };
});
