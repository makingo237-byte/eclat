/**
 * boutique.js - Logique de la page Catalogue
 * Stockage des articles en FCFA, filtres, tris et ajouts au panier
 */

// Base de données des vêtements (Prix modifiés en Francs CFA)
const PRODUITS = [
    // 4 Robes
    { id: 1, categorie: "robes", nom: "Robe de Soirée Satin", prix: 55000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80", description: "Une coupe fluide en satin noble pour illuminer toutes vos soirées prestigieuses." },
    { id: 2, categorie: "robes", nom: "Robe d'Été Fleurie", prix: 30000, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop&q=80", description: "Légère et fraîche, parée de motifs floraux délicats pour vos balades ensoleillées." },
    { id: 3, categorie: "robes", nom: "Robe Bohème Chic", prix: 40000, image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=500&auto=format&fit=crop&q=80", description: "Style décontracté et élégant aux finitions brodées haut de gamme." },
    { id: 4, categorie: "robes", nom: "Robe Cocktail Noire", prix: 45000, image: "https://images.unsplash.com/photo-1539008835170-43d0213308dd?w=500&auto=format&fit=crop&q=80", description: "L'indispensable petite robe noire privée avec une touche glamour unique." },

    // 4 Hauts
    { id: 5, categorie: "hauts", nom: "Blouse en Soie Ivoire", prix: 28000, image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=500&auto=format&fit=crop&q=80", description: "Une texture douce et une couleur lumineuse faciles à accorder." },
    { id: 6, categorie: "hauts", nom: "Top Dentelle Bordeaux", prix: 19500, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80", description: "Dentelle fine travaillée sur les manches pour un look romantique assumé." },
    { id: 7, categorie: "hauts", nom: "Chemise Lin Décontractée", prix: 24500, image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=80", description: "Lin pur, respirant et fluide pour traverser la saison avec fraîcheur." },
    { id: 8, categorie: "hauts", nom: "Crop Top Cache-Cœur", prix: 17000, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80", description: "Mise en valeur cintrée du buste, idéal pour vos tenues de mi-saison." },

    // 3 Jupes
    { id: 9, categorie: "jupes", nom: "Jupe Plissée Dorée", prix: 26000, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80", description: "Reflets scintillants d'or qui suivent chacun de vos pas avec dynamisme." },
    { id: 10, categorie: "jupes", nom: "Jupe Crayon Cuir", prix: 38000, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&auto=format&fit=crop&q=80", description: "Silhouette ajustée sophistiquée pour un rendu working-girl redoutable." },
    { id: 11, categorie: "jupes", nom: "Jupe Longue Bohème", prix: 29500, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=80", description: "Tissu fluide et aérien apportant confort absolu et liberté de mouvement." },

    // 3 Sous-vêtements
    { id: 12, categorie: "sous-vetements", nom: "Ensemble Dentelle Fine", prix: 35000, image: "https://images.unsplash.com/photo-1569596082827-c5e8990496cb?w=500&auto=format&fit=crop&q=80", description: "Alliance parfaite entre confort quotidien et raffinement sensuel." },
    { id: 13, categorie: "sous-vetements", nom: "Nuisette Soie Fine", prix: 23000, image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=500&auto=format&fit=crop&q=80", description: "Une caresse sur la peau pour des nuits calmes et élégantes." },
    { id: 14, categorie: "sous-vetements", nom: "Body Sculptant Invisible", prix: 27000, image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&auto=format&fit=crop&q=80", description: "Se glisse sous vos robes ajustées pour galber parfaitement vos lignes." },

    // 3 Pantalons
    { id: 15, categorie: "pantalons", nom: "Jean Coupe Droite Chic", prix: 35000, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=500&auto=format&fit=crop&q=80", description: "Le denim premium qui sculpte sans jamais serrer." },
    { id: 16, categorie: "pantalons", nom: "Pantalon Fluide Palazzo", prix: 32000, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=80", description: "Ample, chic et taille haute pour allonger gracieusement la jambe." },
    { id: 17, categorie: "pantalons", nom: "Pantalon Tailleur Bleu Nuit", prix: 41000, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80", description: "Coupe ajustée business haut de gamme, l'élégance à l'état pur." },

    // 3 Shorts
    { id: 18, categorie: "shorts", nom: "Short en Lin Beige", prix: 21000, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&auto=format&fit=crop&q=80", description: "Une fraîcheur naturelle indispensable pour vos sorties estivales détendues." },
    { id: 19, categorie: "shorts", nom: "Short Denim Frangé", prix: 18000, image: "https://images.unsplash.com/photo-1582142407894-ec85a1268a4e?w=500&auto=format&fit=crop&q=80", description: "Un classique intemporel pour des styles estivaux branchés." },
    { id: 20, categorie: "shorts", nom: "Short Ajusté Chic", prix: 24000, image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80", description: "À porter avec un joli blazer pour un look urbain audacieux." },

    // 3 Accessoires
    { id: 21, categorie: "accessoires", nom: "Sac Cuir Matelassé", prix: 72000, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format&fit=crop&q=80", description: "Chaîne dorée et finitions soignées pour compléter votre silhouette." },
    { id: 22, categorie: "accessoires", nom: "Ceinture Boucle Dorée", prix: 15000, image: "https://images.unsplash.com/photo-1624222247344-550fb8ef555d?w=500&auto=format&fit=crop&q=80", description: "Marque la taille subtilement en apportant une belle touche d'éclat." },
    { id: 23, categorie: "accessoires", nom: "Chapeau de Paille Élégant", prix: 22000, image: "https://images.unsplash.com/photo-1565839111617-64094e9f7311?w=500&auto=format&fit=crop&q=80", description: "Protège du soleil tout en assurant une allure de star de cinéma." }
];

let categorieActuelle = "tous";
let triActuel = "defaut";

document.addEventListener("DOMContentLoaded", function() {
    renderProducts();

    const boutonsFiltre = document.querySelectorAll(".filter-btn");
    boutonsFiltre.forEach(btn => {
        btn.addEventListener("click", function() {
            boutonsFiltre.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            categorieActuelle = this.getAttribute("data-category");
            renderProducts();
        });
    });

    const selectTri = document.getElementById("sort-select");
    if (selectTri) {
        selectTri.addEventListener("change", function() {
            triActuel = this.value;
            renderProducts();
        });
    }
});

function renderProducts() {
    const grille = document.getElementById("products-grid");
    if (!grille) return;

    grille.innerHTML = "";

    // 1. Filtrage
    let listeFiltrée = PRODUITS.filter(prod => {
        if (categorieActuelle === "tous") return true;
        return prod.categorie === categorieActuelle;
    });

    // 2. Tri
    if (triActuel === "croissant") {
        listeFiltrée.sort((a, b) => a.prix - b.prix);
    } else if (triActuel === "decroissant") {
        listeFiltrée.sort((a, b) => b.prix - a.prix);
    }

    // 3. Affichage (Utilisation de la fonction formatCFA globale)
    listeFiltrée.forEach(prod => {
        const carteHTML = `
            <div class="product-card">
                <div class="product-image-wrapper">
                    <img src="${prod.image}" alt="${prod.nom}">
                    <div class="product-hover-desc">${prod.description}</div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${prod.categorie}</span>
                    <h3>${prod.nom}</h3>
                    <div class="product-meta">
                        <span class="product-price">${formatCFA(prod.prix)}</span>
                        <button class="add-to-cart-btn" onclick="ajouterAuPanier(${prod.id})">Ajouter</button>
                    </div>
                </div>
            </div>
        `;
        grille.innerHTML += carteHTML;
    });
}

function ajouterAuPanier(idProduit) {
    const produitTrouve = PRODUITS.find(p => p.id === idProduit);
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    const itemIndex = panier.findIndex(item => item.id === idProduit);

    if (itemIndex > -1) {
        panier[itemIndex].quantite += 1;
    } else {
        panier.push({
            id: produitTrouve.id,
            nom: produitTrouve.nom,
            prix: produitTrouve.prix,
            image: produitTrouve.image,
            quantite: 1
        });
    }

    localStorage.setItem("panier", JSON.stringify(panier));
    updateCartCountGlobal();

    alert(`${produitTrouve.nom} a bien été ajouté au panier !`);
}