/**
 * main.js - Gestion globale partagée entre toutes les pages
 * (Mise à jour automatique des compteurs de panier)
 */

document.addEventListener("DOMContentLoaded", function() {
    updateCartCountGlobal();

    // Message lors de la soumission du formulaire de contact de l'accueil
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("Merci pour votre message ! Notre équipe Éclat d'Or vous répondra sous 24 à 48 heures.");
            contactForm.reset();
        });
    }
});

// Fonction réutilisable partout pour actualiser le badge de la navbar
function updateCartCountGlobal() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        let panier = JSON.parse(localStorage.getItem("panier")) || [];
        
        // Calcule le nombre total de pièces dans le panier
        let totalArticles = 0;
        panier.forEach(item => {
            totalArticles += item.quantite;
        });
        
        cartCountElement.textContent = totalArticles;
    }
}

// Fonction utilitaire pour formater joliment les montants en FCFA (ex: 55 000 FCFA)
function formatCFA(montant) {
    return montant.valueOf().toLocaleString('fr-FR') + " FCFA";
}