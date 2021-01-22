/** Créer un objet personne. Cette personne doit avoir des propriétés et des méthodes : 
 * - nom(string)
 * - lieu(string)
 * - argent(number)
 * - mainDroite(tableau)
 * ( du coup main gauche(tableau))
 * - seDeplacer(lieu)
 * - payerArticle(article)
 * - couper(ingredient, outil)
 */

let personne = {
    nom: "Natchez",
    lieu: null,
    argent: 100,
    mainDroite: [],
    mainGauche: [],
    seDeplacer(a, b) {
        a.personne.push(b)
        b.lieu = a.nom
    },
    payerArticle(a) {
        personne.argent = personne.argent - stock[a].prix
        console.log(`${personne.nom} paye ${stock[a].prix}€ pour ${stock[a].nom}`)
    },
    couper(a) {
        a.etats = 'couper'
    },
}

/**
 * Créer un lieu "maison" (un objet) avec comme propriété "nom: 'maison'" et "personnes = []" => qui sera un tableau de personnes présentes dans la maison :
 */

let maison = {
    nom: "maison",
    personne: [],
}

/**
 * Créer un outil (couteau) pour découper les ingrédients achetés
 * propriétés : nom et action.
 * action a comme valeur l'état "coupé" (qui sera mis aux légumes lorsqu'ils seront coupés avec le méthode de "personne".)
 */

let couteau = {
    nom: "couteau",
    action: 'coupé',
}

/**
 * Créer des produits (ingrédients) à mettre dans le magasin qui serviront à créer l'omelette (oignon, oeuf, epice, fromage, ...);
 * propriétés : nom, etats ( entier,coupé, moulu), prix
 */

class ingrédients {
    constructor(a, b, c) {
        this.nom = a;
        this.etats = b;
        this.prix = c;
    }
}
let oignon = new ingrédients('oignon', 'entier', 3.20);
let oeuf = new ingrédients('oeuf', 'entier', 3);
let epice = new ingrédients('epice', 'moulu', 4.30);
let fromage = new ingrédients('fromage', 'entier', 6);
let poulet = new ingrédients('poulet', 'entier', 5.80);
let champignon = new ingrédients('champignon', 'entier', 4);
let tomates = new ingrédients('tomates', 'entier', 2.50);
let ail = new ingrédients('ail', 'moulu', 2);

let stock = []
stock.push(oignon, oeuf, epice, fromage, poulet, champignon, tomates, ail)
// Créer un lieu "epicerie" qui a comme propriétés :
// nom, personnes = [], paniers (un tableau d'objets "panier" avec une propriété "type" égal à panier et le contenu du panier, égal à un tableau vide),
// Les "ingrédients" créés juste au dessus contenus dans un tableau.

let epicerie = {
    nom: "Epicerie",
    personne: [],
    paniers: [
        panier = {
            type: "panier",
            contenu: []
        }
    ],
}

/**
 * Créer un poele avec un tableau comme contenu. Et avec une méthode cuir() qui, après 4 secondes, met l'état 'cuit' à this.contenu[0]. On peut faire ça avec la fonction setTimeout(()=> {}, 4000)
 */

let poele = {
    nom: "poele",
    contenu: [],
    cuir() {
        setTimeout(() => {
            console.log('___________________________________')
            this.contenu[0].etats = 'cuit'
            console.log(`${poele.contenu[0].nom} est cuite`)
        }, 4000)
    },
}

// Créer un bol avec un tableau comme contenu
// ajouter une méthode melanger(nomMelange) qui va créer un nouvel objet "newMelange" avec comme nom la variable nomMelange passé en paramètre et avec 'pas cuit' en etat. cette méthode remplacera this.contenu par [l'obj newMelange]

let bol = {
    nom: "bol",
    contenu: [],
    melanger(a) {
        let newMelange = {
            nom: "une omelette",
            etats: 'pas cuit',
        }
        bol.contenu = newMelange
    },
}

/**** DEBUT DE L'OMELETTE ****/
// Pour dire que le personnage est à la maison :
// Avec l'objet personnage, utiliser la method seDeplacer et de passer en paramètre l'objet maison
// Afficher un message tel que :
// console.log(personnage.nom + " est actuellement à la " + personnage.lieu);

personne.seDeplacer(maison, personne)
console.log(`${personne.nom} est actuellement à la ${personne.lieu}`)
console.log('___________________________________')
// Pour aller à l'épicerie acheter les ingrédients pour l'omelette, je répète la première étape en changeant le parametre de la method seDeplacer par l'epicerie

personne.seDeplacer(epicerie, personne)
console.log(`${personne.nom} est actuellement à la ${personne.lieu}`)
console.log('___________________________________')
// Mon personnage prend un des paniers dans l'épicerie (il récupère le panier dans les objets de l'épicerie et le met dans sa main droite.)
// Il doit y avoir un objet dans la main droite de personnage et un panier en moins. Vérifier avec des console.log() ensuite afficher un message du type : 
// console.log(`${personne.nom} a pris un ${mainDroite.panier.type}`)

personne.mainDroite.push(epicerie.paniers[0])
epicerie.paniers.splice(0, 1)
console.log(`${personne.nom} a pris un ${personne.mainDroite[0].type}`);
console.log('___________________________________')
// Je créer une boucle qui va prendre chaque élément (ingrédient) du contenu de l'épicerie (1 à 1) et en faire une COPIE dans le panier du personnage
// Afficher un message à chaque ingrédient pris

for (let i = 0; i < stock.length; i++) {
    personne.mainDroite[0].contenu.push(stock[i])
    console.log(`${personne.nom} rajoute ${stock[i].nom} dans son ${personne.mainDroite[0].type}`)
}
console.log('___________________________________')
// Payer chaque ingrédient récupéré dans le panier. Avec une boucle aussi, on va les passer 1 à 1 dans la fonction payerArticle()
for (let i = 0; i < personne.mainDroite[0].contenu.length; i++) {
    personne.payerArticle(i)
}
console.log('___________________________________')
// Afficher un message de ce qu'il reste d'argent sur le personnage.
console.log(`il reste ${personne.argent} a ${personne.nom}`)
console.log('___________________________________')
// rentrer à la maison (comme ça on pourra cuisiner)

personne.seDeplacer(maison, personne)
console.log(`${personne.nom} est actuellement à la ${personne.lieu}`)
console.log('___________________________________')
// mettre chaque ingrédient dans le bol (1 à 1 donc avec une boucle)

personne.mainDroite[0].contenu.forEach(element => {
    bol.contenu.push(element)
    personne.mainDroite[0].contenu = personne.mainDroite[0].contenu.filter(item => item !== element)
    console.log(`${personne.nom} ajoute ${element.nom} dans le ${bol.nom}`)
});

console.log('___________________________________')
// Vérifier que les ingrédients ne se trouvent plus dans le panier (oups ! on a oublié de le rapporter x)

// Afficher un petit message de chaque ingrédient qu'on met dans le bol.

console.log(`le ${personne.mainDroite[0].type} est vide`)
console.log('___________________________________')
// Retourner à l'épicerie pour rapporter le panier. (donc seDeplacer puis enlever le panier de la main droite et le remetre dans les paniers de l'épicerie.)

personne.seDeplacer(epicerie, personne)
console.log(`${personne.nom} est actuellement à la ${personne.lieu}`)
console.log(`${personne.nom} dépose le ${personne.mainDroite[0].type} dans la pile`)
epicerie.paniers.push(personne.mainDroite[0])
personne.mainDroite.splice(0, 1)
console.log('___________________________________')
// Afficher un petit message
console.log(`${personne.nom} repart avec ${personne.mainDroite.length} objet dans la main droite`)
console.log('___________________________________')
// Retourner à la maison pour continuer l'omelette
// Afficher un petit message

personne.seDeplacer(maison, personne)
console.log(`${personne.nom} est actuellement à la ${personne.lieu}`)
console.log('___________________________________')
// Vérifier chaque ingrédient dans le bol et le couper seulement s'il est entier ! Pour ça on utilise la méthode couper de personnage
bol.contenu.forEach(element => {
    if (element.etats == 'entier') {
        personne.couper(element)
        console.log(`${personne.nom} utilise un ${couteau.nom} pour ${couteau.action} ${element.nom}`)
    } else {
    }
});
console.log('___________________________________')
// Mélanger le contenu du bol avec la méthode melanger. on va nommer ce mélange une 'omelette' (à passer en param).
bol.melanger(bol.contenu)
// Afficher un message avec le nouveau mélange
console.log(`${personne.nom} mélange le ${bol.nom} pour obtenir une ${bol.contenu.nom}` )
console.log('___________________________________')
// vider le contenu du bol dans la poele. Il ne doit plus rien avoir dans le bol et y avoir juste l'omelette pas cuite.

poele.contenu.push(bol.contenu)
bol.contenu =  null
console.log(`${personne.nom} verse ${poele.contenu[0].nom} ${poele.contenu[0].etats} du ${bol.nom} dans la ${poele.nom}` )
// Cuire l'omelette avec la méthode de la poele 
poele.cuir()
// Afficher un message final, notre omelette est cuite :)

