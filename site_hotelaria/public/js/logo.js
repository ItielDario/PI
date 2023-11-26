document.addEventListener('DOMContentLoaded', function() {
    const logoContainer = document.querySelector('.logo-container');
    const navbarIcon = document.querySelector('.nav-link'); // Substitua '.navbar-icon' pelo seletor real do ícone na barra de navegação.

    navbarIcon.addEventListener('click', function() {
        // Adicione ou remova a classe 'hidden' na logoContainer
        logoContainer.classList.toggle('hidden');
    });
});