// ==UserScript==
// @name         Rangs JVC
// @author       Knifos
// @version      1
// @namespace    https://github.com/Knifos
// @updateURL    https://raw.githubusercontent.com/Knifos/Rangs-JVC/refs/heads/main/Rangs%20JVC.user.js
// @downloadURL  https://raw.githubusercontent.com/Knifos/Rangs-JVC/refs/heads/main/Rangs%20JVC.user.js
// @icon         https://i.ibb.co/0RhNwjW9/Hexagon-bleu-knifos.png
// @description  Affiche le rang du pseudo sur les profils avec une petite image. Au clic de l'image, ouvre une fenêtre pop-up expliquant les rangs.
// @match        https://www.jeuxvideo.com/profil/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const rangs = [
        { nom: "Carton",   min: 0,      image: "https://i.ibb.co/Lzh7tbc7/rang-carton-knifos.png" },
        { nom: "Bronze",   min: 50,     image: "https://i.ibb.co/kswKP5TV/rang-bronze-knifos.png" },
        { nom: "Argent",   min: 200,    image: "https://i.ibb.co/VY48Tjvj/rang-argent-knifos.png" },
        { nom: "Or",       min: 1000,   image: "https://i.ibb.co/ds9FH7zn/rang-or-knifos.png" },
        { nom: "Rubis",    min: 10000,  image: "https://i.ibb.co/bgPvk85y/rang-rubis-knifos.png" },
        { nom: "Saphir",   min: 30000,  image: "https://i.ibb.co/VY8PWrsW/rang-saphir-knifos.png" },
        { nom: "Émeraude", min: 75000,  image: "https://i.ibb.co/bRXL00T2/rang-emeraude-knifos.png" },
        { nom: "Diamant",  min: 150000, image: "https://i.ibb.co/Q7DqXKXQ/rang-diamant-knifos.png" }
    ];

    function obtenirRang(messages) {
        let rangTrouve = rangs[0];
        for (const rang of rangs) {
            if (messages >= rang.min) {
                rangTrouve = rang;
            }
        }
        return rangTrouve;
    }

    function ouvrirPopupRangs() {
        const popupHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Infos Rangs – JeuxVideo.com</title>
    <style>
        /* Thème sombre */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            background-color: #121212;
            color: #ddd;
        }
        h2 {
            margin-top: 20px;
            font-size: 1.2em;
            color: #eee;
            border-bottom: 1px solid #333;
            padding-bottom: 4px;
        }
        .portlet {
            border: 1px solid #333;
            border-radius: 4px;
            background: #222;
            width: 600px;               /* largeur fixe */
            padding: 15px;
            box-sizing: border-box;
            margin-right: 5px;          /* marge à droite */
            margin-bottom: 5px;         /* marge en bas */
        }
        .portlet-content {
            margin-top: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        table th, table td {
            padding: 6px 8px;
            border: 1px solid #444;
            vertical-align: middle;
            text-align: left;
        }
        table th {
            background-color: #333;
            width: 40%;
            color: #ccc;
        }
        table td {
            color: #ddd;
        }
        table td img {
            vertical-align: middle;
            margin-left: 6px;
            width: 24px;
            height: 30px;
        }
        ul {
            margin: 8px 0 12px 20px;
            color: #ddd;
        }
        ul li {
            margin-bottom: 4px;
        }
        strong {
            color: #fff;
        }
        span.couleur-gagner {
            color: #4FC3F7; /* bleu clair */
        }
        span.couleur-perdre {
            color: #EF5350; /* rouge clair */
        }
        a {
            color: #64B5F6;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="portlet" id="infos_rangs">
        <h2>Qu’est-ce qu'un rang&nbsp;?</h2>
        <div class="portlet-content" id="liste_rangs">
            <p>
                Les rangs sont définis par le nombre de points que vous
                <strong>gagnez à chaque fois que vous participez à la vie communautaire</strong> de jeuxvideo.com. <img src="https://image.jeuxvideo.com/smileys_img/18.gif">
            </p>
            <p><strong>Il existe 8 rangs différents&nbsp;:</strong></p>
            <table summary="Nombre de points correspondants à chaque rang">
                <tbody>
                    <tr id="carton">
                        <th scope="row">Rang de base :</th>
                        <td>
                            Carton
                            <img src="${rangs.find(r => r.nom === 'Carton').image}" alt="Carton">
                        </td>
                    </tr>
                    <tr id="bronze">
                        <th scope="row">À partir de 50 points :</th>
                        <td>
                            Bronze
                            <img src="${rangs.find(r => r.nom === 'Bronze').image}" alt="Bronze">
                        </td>
                    </tr>
                    <tr id="argent">
                        <th scope="row">À partir de 200 points :</th>
                        <td>
                            Argent
                            <img src="${rangs.find(r => r.nom === 'Argent').image}" alt="Argent">
                        </td>
                    </tr>
                    <tr id="or">
                        <th scope="row">À partir de 1 000 points :</th>
                        <td>
                            Or
                            <img src="${rangs.find(r => r.nom === 'Or').image}" alt="Or">
                        </td>
                    </tr>
                    <tr id="rubis">
                        <th scope="row">À partir de 10 000 points :</th>
                        <td>
                            Rubis
                            <img src="${rangs.find(r => r.nom === 'Rubis').image}" alt="Rubis">
                        </td>
                    </tr>
                    <tr id="saphir">
                        <th scope="row">À partir de 30 000 points :</th>
                        <td>
                            Saphir
                            <img src="${rangs.find(r => r.nom === 'Saphir').image}" alt="Saphir">
                        </td>
                    </tr>
                    <tr id="emeraude">
                        <th scope="row">À partir de 75 000 points :</th>
                        <td>
                            Émeraude
                            <img src="${rangs.find(r => r.nom === 'Émeraude').image}" alt="Émeraude">
                        </td>
                    </tr>
                    <tr id="diamant">
                        <th scope="row">À partir de 150 000 points :</th>
                        <td>
                            Diamant
                            <img src="${rangs.find(r => r.nom === 'Diamant').image}" alt="Diamant">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>Comment gagner des points&nbsp;?</h2>
        <div class="portlet-content" id="liste_points">
            <p>
                <strong>Certaines actions sur le site permettent de
                <span class="couleur-gagner">GAGNER</span> des points&nbsp;:</strong>
            </p>
            <ul>
                <li>Un message posté dans les forums = 1 point !</li>
                <li>Un commentaire posté sous un article = 1 point !</li>
            </ul>

            <p><i><b>Un soucis avec le script ? ou une suggestion ?</b><br />
            <img src="https://image.jeuxvideo.com/smileys_img/4.gif"> Contactez « Knifos » : <a href="https://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Knifos">envoyer un message privé</a></i></p>
        </div>
    </div>
</body>
</html>
        `.trim();

        const features = "menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes";
        const popup = window.open("", "InfosRangsPopup", features);

        if (!popup) {
            console.warn("Impossible d'ouvrir la fenêtre pop-up. Vérifiez les bloqueurs de pop-up.");
            return;
        }

        // Écrire le HTML et fermer le document pour forcer le rendu
        popup.document.open();
        popup.document.write(popupHTML);
        popup.document.close();

        popup.onload = function () {
            try {
                const div = popup.document.getElementById("infos_rangs");
                if (!div) return;

                // Marges supplémentaires demandées : 5px à droite et en bas
                const extraMargin = 15;

                // Dimensions du div (sans marges)
                const largeurDiv = Math.ceil(div.getBoundingClientRect().width);
                const hauteurDiv = Math.ceil(div.getBoundingClientRect().height);

                // Calcul des marges de la fenêtre (bordures + barre de titre)
                const margeX = popup.outerWidth - popup.innerWidth + 10;
                const margeY = popup.outerHeight - popup.innerHeight + 10;

                // Largeur et hauteur totales souhaitées (div + marge CSS + marges de fenêtre)
                const windowWidth  = largeurDiv + extraMargin + margeX;
                const windowHeight = hauteurDiv + extraMargin + margeY;

                // Redimensionner la fenêtre pour inclure 5px de marge à droite + en bas
                popup.resizeTo(windowWidth, windowHeight);

                // Centrer la fenêtre à l'écran
                const availW = popup.screen.availWidth;
                const availH = popup.screen.availHeight;
                const posX = Math.floor((availW - windowWidth)  / 2);
                const posY = Math.floor((availH - windowHeight) / 2);
                popup.moveTo(posX, posY);
            } catch (e) {
                console.warn("Redimensionnement ou déplacement de la pop-up impossible :", e);
            }
        };
    }

    function ajouterRangProfil() {
        const infos = document.querySelector(".bloc-default-profil-body ul.display-line-lib");
        if (!infos) return;

        // Récupérer le nombre de messages et de commentaires du profil
const libelles = infos.querySelectorAll(".info-lib");
let nbMessages = 0;
let nbCommentaires = 0;

libelles.forEach(lib => {
    const valeur = lib.nextElementSibling;
    if (!valeur) return;

    const texte = valeur.textContent.replace(/\./g, "").trim();

    if (lib.textContent.includes("Messages Forums")) {
        const nb = parseInt(texte, 10);
        if (!isNaN(nb)) nbMessages = nb;
    }

    if (lib.textContent.includes("Commentaires")) {
        const match = texte.match(/^(\d+)/);
        if (match) {
            const nb = parseInt(match[1], 10);
            if (!isNaN(nb)) nbCommentaires = nb;
        }
    }
});

const totalPoints = nbMessages + nbCommentaires;
if (totalPoints === 0) return;

// Déterminer le rang à afficher
const rang = obtenirRang(totalPoints);

        // Construire le <li> "Rang : [Nom du rang] [Icône]" cliquable
        const nouveauItem = document.createElement("li");

        const libDiv = document.createElement("div");
        libDiv.className = "info-lib";
        libDiv.textContent = "Rang :";

        const valDiv = document.createElement("div");
        valDiv.className = "info-value";

        // Conteneur relatif
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.position = "relative";

        if (rang.nom === "Diamant" || rang.nom === "Bronze" || rang.nom === "Émeraude") {
            wrapper.style.paddingRight = "28px";
        }
        else if (rang.nom === "Saphir" || rang.nom === "Rubis") {
            wrapper.style.paddingRight = "29px";
        }
        else {
            wrapper.style.paddingRight = "32px";
        }

        // exemple : wrapper.style.paddingRight = "32px"; // 24px largeur image + 8px marge

        wrapper.style.minWidth = "fit-content"; // s'assure que le texte ne sera pas compressé
        wrapper.style.cursor = "pointer"; // pointeur pour indiquer cliquable
        wrapper.title = "Cliquez pour en savoir plus sur les rangs";

        // Texte du rang
        const texteSpan = document.createElement("span");
        texteSpan.textContent = rang.nom;

        // Image positionnée absolument
        const img = document.createElement("img");
        img.src = rang.image;
        img.alt = rang.nom;
        img.style.position = "absolute";
        img.style.right = "0";
        img.style.top = "50%";
        img.style.transform = "translateY(-50%)";
        img.style.height = "30px";
        img.style.width = "24px";
        img.style.pointerEvents = "none"; // l'image ne capte pas les clics

        wrapper.appendChild(texteSpan);
        wrapper.appendChild(img);
        valDiv.appendChild(wrapper);
        nouveauItem.appendChild(libDiv);
        nouveauItem.appendChild(valDiv);
        infos.appendChild(nouveauItem);

        // Au clic, ouvrir la pop-up
        wrapper.addEventListener("click", ouvrirPopupRangs);
    }

    window.addEventListener("load", () => {
        setTimeout(ajouterRangProfil, 0);
    });
})();
