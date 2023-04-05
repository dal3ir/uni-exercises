"use strict";

const fs = require("fs");
const nunjucks = require("nunjucks");
const req_debuter = function (req, res, query) {

	let marqueurs = {};
	let page;
	let contenu;
	let fichierGrille;
	let grille;

	let html;
	let powerPallet;
	let px, py;

	let n = 0;
	let action;
	let position;
	let pacman;
	let counter;
	let pinky;
	let blinky;
	let inky;
	let clyde;
	let tout_cliquable;

	let point;
	let image;

	action = Number(query.action);


	contenu = fs.readFileSync("./src/assets/json/designGrille.json", "utf-8");
	fichierGrille = JSON.parse(contenu);


	const level3 = fichierGrille.levels[2];
	grille = level3.map;
	powerPallet = level3.powerPallet;
	pacman = level3.pacman;
	pinky = level3.pinky;
	blinky = level3.blinky;
	clyde = level3.clyde;
	inky = level3.inky;
	counter = level3.counter;
	point = fichierGrille.global.score;


	const directions = [
		{ x: 0, y: -1 }, // haut
		{ x: 1, y: 0 }, // droite
		{ x: 0, y: 1 }, // bas
		{ x: -1, y: 0 }, // gauche
	];

	position = [];
	for (let i = 0; i < directions.length; i++) {
		const dir = directions[i];
		px = pacman.x + dir.x;
		py = pacman.y + dir.y;
		if (px >= 0 && px <= 20 && py >= 0 && py <= 20) {
			position.push({ y: py, x: px });
		}
	}


	contenu = JSON.stringify(fichierGrille);
	fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");


	page = fs.readFileSync('./src/modele_jeux.html', 'utf-8');


	let labyrinthe = [];
	for (let i = 0; i < grille.length; i++) {
		labyrinthe.push([]);
		for (let j = 0; j < grille[i].length; j++) {
			labyrinthe[i].push({
				image: "assets/media/fondnoir.png",
				cliquable: 0,
			});
		}
	}


	for (let i = 0; i < grille.length; i++) {
		for (let j = 0; j < grille[i].length; j++) {
			if (query.action === "classique") {
				if (grille[i][j] === 1) {
					labyrinthe[i][j].image = "assets/media/mur_classique.jpg";
				} else if (grille[i][j] === 0) {
					labyrinthe[i][j].image = "assets/media/pellet_classique.jpg";	// on ajoute l'image du chemin (fond noir)
				}
			}
			else if (query.action === "feu") {
				if (grille[i][j] === 1) {
					labyrinthe[i][j].image = "assets/media/mur_feu.jpg";
				} else if (grille[i][j] === 0) {
					labyrinthe[i][j].image = "assets/media/pellet_feu.jpg";	// on ajoute l'image du chemin (fond noir)
				}
			}
			else if (query.action === "froid") {
				if (grille[i][j] === 1) {
					labyrinthe[i][j].image = "assets/media/mur_froid.jpg";
				} else if (grille[i][j] === 0) {
					labyrinthe[i][j].image = "assets/media/pellet_froid.jpg";	// on ajoute l'image du chemin (fond noir)
				}
			}

		}
	}

	for (let i = 0; i < grille.length; i++) {	// on parcourt la grille
		for (let j = 0; j < grille[i].length; j++) {		// on parcourt la grille
			let coordonnee = i * grille.length + j;			// on calcule la coordonnée
			if (coordonnee === powerPallet[0] || coordonnee === powerPallet[1]		// on ajoute les powerPallet
				|| coordonnee === powerPallet[2] || coordonnee === powerPallet[3]		// on ajoute les powerPallet
				|| coordonnee === powerPallet[4]							// on ajoute les powerPallet
			) {
				if (query.action === "classique") {
					labyrinthe[i][j].image = "assets/media/powerpellet_classique.jpg";		// on ajoute l'image du powerPallet
				} else if (query.action === "feu") {
					labyrinthe[i][j].image = "assets/media/powerpellet_feu.jpg";
				}
				else if (query.action === "froid") {
					labyrinthe[i][j].image = "assets/media/powerpellet_froid.jpg";
				}
			}

		}
	}

	labyrinthe[pinky.y][pinky.x].image = "assets/media/pinky.png";
	labyrinthe[blinky.y][blinky.x].image = "assets/media/blinky.png";
	labyrinthe[inky.y][inky.x].image = "assets/media/inky.png";
	labyrinthe[clyde.y][clyde.x].image = "assets/media/clyde.png";
	labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";

	if (tout_cliquable !== false) {
		for (let i = 0; i < position.length; i++) {
			labyrinthe[position[i].y][position[i].x].cliquable = 1;
		}
	}

	html = '<div class="grille">';

	for (let y = 0; y < labyrinthe.length; y++) {
		html += '<div class="grille-ligne">';

		for (let x = 0; x < labyrinthe[y].length; x++) {
			image = `<img src="${labyrinthe[y][x].image}">`;

			if (labyrinthe[y][x].cliquable === 1) {
				if (query.action === "classique") {
					html += `<a href="req_deplacer3?action=${n}&autre=classique">`;
				}
				else if (query.action === "feu") {
					html += `<a href="req_deplacer3?action=${n}&autre=feu">`;
				}
				else if (query.action === "froid") {
					html += `<a href="req_deplacer3?action=${n}&autre=froid">`;
				}

				html += image;
				html += `</a>`;
			} else {
				html += image;
			}

			n++;
		}

		html += '</div>';
	}

	html += '</div>';
	marqueurs.grille = html;
		marqueurs.point = "Score : " + point.i;


	page = nunjucks.renderString(page, marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();

};

module.exports = req_debuter;
