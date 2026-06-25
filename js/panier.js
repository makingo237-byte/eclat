/**
 * panier.js - Logique fonctionnelle du Panier d'achat
 * Affichage, calculs totaux en FCFA et modal de confirmation
 */

document.addEventListener("DOMContentLoaded", function() {
    renderPanier();

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", validerCommande);
    }

    const closeModalBtn = document.getElementById("close-modal-btn");
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function() {
            document.getElementById("success-modal").classList.remove("active");
            window.location.href = "boutique.html";
        });
    }
});

function calculerTotaux(panier) {
    let subtotal = 0;
    panier.forEach(item => {
        subtotal += item.prix * item.quantite;
    });

    // Frais de livraison fictifs fixés à 3 000 FCFA si le panier contient des éléments
    const fdp = subtotal > 0 ? 3000 : 0; 
    let totalFinal = subtotal + fdp;

    // Utilisation du format global formatCFA pour l'affichage propre
    document.getElementById("summary-subtotal").textContent = formatCFA(subtotal);
    document.getElementById("summary-shipping").textContent = formatCFA(fdp);
    document.getElementById("summary-total").textContent = formatCFA(totalFinal);

    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.disabled = panier.length === 0;
    }
}

function renderPanier() {
    const conteneur = document.getElementById("cart-items-container");
    if (!conteneur) return;

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    conteneur.innerHTML = "";

    if (panier.length === 0) {
        conteneur.innerHTML = `
            <div class="empty-message">
                <p>Votre panier est encore vide.</p>
                <br>
                <a href="boutique.html" class="btn btn-primary">Parcourir la boutique</a>
            </div>
        `;
        calculerTotaux(panier);
        return;
    }

    panier.forEach(item => {
        const itemHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.nom}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.nom}</h4>
                    <p class="item-price">${formatCFA(item.prix)}</p>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="changerQuantite(${item.id}, -1)">-</button>
                    <span>${item.quantite}</span>
                    <button class="qty-btn" onclick="changerQuantite(${item.id}, 1)">+</button>
                </div>
                <button class="delete-item-btn" onclick="supprimerArticle(${item.id})">🗑</button>
            </div>
        `;
        conteneur.innerHTML += itemHTML;
    });

    calculerTotaux(panier);
}

function changerQuantite(idProduit, delta) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const index = panier.findIndex(item => item.id === idProduit);

    if (index > -1) {
        panier[index].quantite += delta;

        if (panier[index].quantite <= 0) {
            panier.splice(index, 1);
        }

        localStorage.setItem("panier", JSON.stringify(panier));
        renderPanier();
        updateCartCountGlobal();
    }
}

function supprimerArticle(idProduit) {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier = panier.filter(item => item.id !== idProduit);

    localStorage.setItem("panier", JSON.stringify(panier));
    renderPanier();
    updateCartCountGlobal();
}

function validerCommande() {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    if (panier.length === 0) return;

    const modal = document.getElementById("success-modal");
    if (modal) {
        modal.classList.add("active");
    }

    localStorage.removeItem("panier");
    renderPanier();
    updateCartCountGlobal();
}