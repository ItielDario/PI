document.addEventListener('DOMContentLoaded', function() {

    let currentUrl = window.location.href;
    let page = '/'+currentUrl.split('/').pop()
    let navMenu = document.querySelectorAll('.menuAtivo');
    for(let i=0; i< navMenu.length; i++) {
        if(page == navMenu[i].getAttribute('href')) {
            navMenu[i].parentNode.classList.add('active');
        }
    }
})