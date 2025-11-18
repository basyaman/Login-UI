document.addEventListener('DOMContentLoaded',()=>{


const tabs = document.querySelectorAll('.tab');
const forms = document.querySelectorAll('.form');
const goSignup = document.getElementById('go-signup');
const goLogin = document.getElementById('go-login');

function showForm(type){
    forms.forEach(form=>{
        form.classList.toggle('active',form.id === `${type}-form`);
    });

    tabs.forEach(tab=>{
        tab.classList.toggle('active',tab.dataset.target === type);
        
    });

    
}

tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{showForm(tab.dataset.target)});
});
goSignup.addEventListener('click',()=>{showForm('signup')});
goLogin.addEventListener('click',()=>{showForm('login')});


forms.forEach(form=>{
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        alert(`${form.id.replace('-form','')} form submitted!`);
    });
});





});

