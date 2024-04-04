const nav = document.querySelector('.toggle-bar')
const toggleBar = document.querySelector('.nav-bar')
nav.addEventListener('click',function(){
    nav.classList.toggle("active");
    toggleBar.classList.toggle("active");
    
});