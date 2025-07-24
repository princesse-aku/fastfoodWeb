
// ___________Navbar Scroll Effect
window.addEventListener('scroll', function () {
    let navbar = document.querySelector('.navbar');
    if (this.window.scrollY > 20) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
});

// ___________Scroll To Top Button Functionality
document.querySelector('#to-top').addEventListener('click', () => {
    let TopInterval = setInterval(() => {
        let ArrowTop = document.body.scrollTop > 0 ? document.body : document.documentElement;

        if (ArrowTop.scrollTop > 0) {
            ArrowTop.scrollTop = ArrowTop.scrollTop - 50;
        }
        if (ArrowTop.scrollTop < 1) {
            clearInterval(TopInterval)
        }
    }, 10)
}, false);

// Show/Hide Scroll To Top Button
function showscroll() {
    let TopButton = document.getElementById('to-top');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        TopButton.classList.add('show')
    } else {
        TopButton.classList.remove('show')
    }
}
window.onscroll = () => {
    showscroll();
}

// ___________Navbar Toggle for Mobile
const menuBtn = document.getElementById('menu_btn');
const navLinks = document.getElementById('nav_links');
const menuIcon = document.querySelector('.menu_btn i'); // Sélectionnez l'icône à l'intérieur du bouton

menuBtn.addEventListener('click', (e) => {
    navLinks.classList.toggle('open');

    const isOpen = navLinks.classList.contains('open');
    menuIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
});

// Ferme le menu mobile si un lien est cliqué
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuIcon.setAttribute('class', 'ri-menu-line'); // Remet l'icône du menu
    });
});



// Exemple d'appel API simple au démarrage (pour vérifier la connexion)
fetch('http://localhost:3000/api/hello')
    .then(response => response.json())
    .then(data => {
        console.log('Message du backend:', data.message);
    })
    .catch(error => console.error('Erreur lors de la récupération du message hello:', error));

// Fonction pour récupérer et afficher les plats depuis le backend
async function fetchAndDisplayDishes() {
    const menuItemsContainer = document.getElementById('menu_items_container');

    // Afficher un message de chargement pendant la requête
    menuItemsContainer.innerHTML = '<div class="loading-message">Chargement des plats...</div>';

    try {
        const response = await fetch('http://localhost:3000/api/dishes'); // Votre endpoint API
        if (!response.ok) {
            // Gérer les erreurs HTTP (ex: 404, 500)
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        const dishes = await response.json(); // Convertir la réponse en JSON
        console.log('Plats récupérés:', dishes);

        // Vider le conteneur avant d'ajouter les nouveaux plats
        menuItemsContainer.innerHTML = '';

        if (dishes.length === 0) {
            // Si aucun plat n'est retourné
            menuItemsContainer.innerHTML = '<div class="loading-message">Aucun plat disponible pour le moment.</div>';
            return; // Arrêter la fonction
        }

        // Créer et ajouter les éléments de menu dynamiquement
        dishes.forEach(dish => {
            const dishElement = document.createElement('div');
            dishElement.classList.add('menu_item'); // Appliquer la classe CSS

            // Utilisez dish.image_url pour le src de l'image, avec un fallback si l'URL est vide ou nulle
            dishElement.innerHTML = `
                <img src="${dish.image_url || 'https://via.placeholder.com/200x200?text=No+Image'}" alt="${dish.name}">
                <h4>${dish.name}</h4>
                <p>${dish.description || 'Pas de description disponible.'}</p>
                <div class="price">$${parseFloat(dish.price).toFixed(2)}</div>
                `;
            menuItemsContainer.appendChild(dishElement);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération ou de l\'affichage des plats:', error);
        // Afficher un message d'erreur à l'utilisateur
        menuItemsContainer.innerHTML = '<div class="loading-message" style="color: red;">Erreur de chargement des plats. Veuillez réessayer.</div>';
    }
}

// Appeler la fonction fetchAndDisplayDishes lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', fetchAndDisplayDishes);