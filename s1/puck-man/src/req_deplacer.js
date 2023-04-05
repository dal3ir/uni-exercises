"use strict";

const fs = require("fs");

const nunjucks = require("nunjucks");
const req_deplacer = function (req, res, query) {

	let marqueurs = {};
	let page;
	let contenu;
	let fichierGrille;
	let grille;
	let html;

	let px, py;
	let cx, cy;
	let n = 0;
	let action;
	let position;
	let pacman;
	let pallet
	let pinky;
	let blinky;
	let tout_cliquable;
	let mur;
	let powerPallet;
	let counter;

	let image;
	let max;
	let point;
	action = Number(query.action);


	contenu = fs.readFileSync("./src/assets/json/grille.json", "utf-8");
	fichierGrille = JSON.parse(contenu);

	const level1 = fichierGrille.levels[0];
	grille = level1.map;
	powerPallet = level1.powerPallet;
	pacman = level1.pacman;
	pinky = level1.pinky;
	blinky = level1.blinky;
	counter = level1.counter;
	point = fichierGrille.global.score;


	cy = Math.floor(action / 12); // on calcule la ligne 
	cx = action % 12; // on calcule la colonne 
	mur = grille[cy][cx] === 1;
	pallet = grille[cy][cx] === 0;


	const directions = [
		{ x: 0, y: -1 }, // haut
		{ x: 1, y: 0 }, // droite
		{ x: 0, y: 1 }, // bas
		{ x: -1, y: 0 }, // gauche
	];

	if (mur === false) {
		pacman.x = cx; // on déplace pacman
		pacman.y = cy; // on déplace pacman 
	}

	const distances = [];

	if (mur === false) {
		for (let i = 0; i < directions.length; i++) { // on parcourt le tableau directions 
			const dir = directions[i]; // on stocke la direction dans dir 
			let x = pinky.x + dir.x; // on ajoute la direction x à la position x de pinky 
			let y = pinky.y + dir.y; // on ajoute la direction y à la position y de pinky 

			if (
				(x <= 11 && x >= 0 && y >= 0 && y <= 11) // si x et y sont compris entre 0 et 11 
				&& grille[y][x] === 4 || grille[y][x] === 0 // et que la case est un mur ou une pellet
			) {
				distances.push({
					dir: dir, // on stocke la direction dans le tableau distances
					dist: Math.sqrt( // sqrt = racine carrée 
						(x - pacman.x) ** 2 // la distance entre pacman et pinky 
						+ (y - pacman.y) ** 2
					)
				});
			}
		}


		let min = 0; // on initialise min à 0 
		max = distances.length - 1 // car dans un tableau, le dernier index est toujours length - 1, car on commence à 0 et non 1
		for (let i = 0; i < distances.length; i++) { // on parcourt le tableau distances
			if (distances[i].dist < distances[min].dist) { // si la distance est plus petite que la distance min
				min = i; // on stocke l'index dans min 
			} else if (distances[i].dist > distances[max].dist) { // sinon si la distance est plus grande que la distance max 
				max = i; // on stocke l'index dans max 
			}
		}

		pinky.x += distances[min].dir.x; // on ajoute la direction x à pinky.x 
		pinky.y += distances[min].dir.y; // on ajoute la direction y à pinky.y 
	}


	const distances2 = [];

	if (mur === false) {
		for (let i = 0; i < directions.length; i++) {
			const dir = directions[i];
			let x = blinky.x + dir.x;
			let y = blinky.y + dir.y;

			if (
				(x <= 11 && x >= 0 && y >= 0 && y <= 11)
				&& grille[y][x] === 4 || grille[y][x] === 0
			) {
				distances2.push({
					dir: dir,
					dist: Math.sqrt(
						(x - pacman.x) ** 2
						+ (y - pacman.y) ** 2
					)
				});
			}
		}

		let min = 0;
		max = distances2.length - 1
		for (let i = 0; i < distances2.length; i++) {
			if (distances2[i].dist < distances2[min].dist) {
				min = i;

			} else if (distances2[i].dist > distances2[max].dist) {
				max = i;
			}

		}

		blinky.x += distances2[min].dir.x;
		blinky.y += distances2[min].dir.y;
	}


	position = [];
	for (let i = 0; i < directions.length; i++) { // on parcourt le tableau directions
		const dir = directions[i]; // on stocke la direction dans dir 
		px = pacman.x + dir.x; // on ajoute la direction x à la position x de pacman
		py = pacman.y + dir.y;	 // on ajoute la direction y à la position y de pacman

		(px >= 0 && px <= 11 && py >= 0 && py <= 11) // si px et py sont compris entre 0 et 11
		position.push({ y: py, x: px }); // on stocke la position dans le tableau position

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

	if (pallet === true) { // si pacman mange une pellet
		labyrinthe[cy][cx].image = "assets/media/pacman.png"; // pacman passe au dessus de la pellet
		grille[cy][cx] = 4; // on remplace la pellet par un 4 dans la grille (4 = empty)
		point.i = point.i + 10;
		contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
		fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le fichier json
	}


	for (let i = 0; i < grille.length; i++) {
		for (let j = 0; j < grille[i].length; j++) {
			if (query.autre === "classique") {

				if (grille[i][j] === 1) {
					labyrinthe[i][j].image = "assets/media/mur_classique.jpg";
				} else if (grille[i][j] === 0) {
					labyrinthe[i][j].image = "assets/media/pellet_classique.jpg";	// on ajoute l'image du chemin (fond noir)
				}
			}
			else if (query.autre === "feu") {
				if (grille[i][j] === 1) {
					labyrinthe[i][j].image = "assets/media/mur_feu.jpg";
				} else if (grille[i][j] === 0) {
					labyrinthe[i][j].image = "assets/media/pellet_feu.jpg";	// on ajoute l'image du chemin (fond noir)
				}
			}
			else if (query.autre === "froid") {
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
				if (query.autre === "classique") {
					labyrinthe[i][j].image = "assets/media/powerpellet_classique.jpg";		// on ajoute l'image du powerPallet
				} else if (query.autre === "feu") {
					labyrinthe[i][j].image = "assets/media/powerpellet_feu.jpg";
				}
				else if (query.autre === "froid") {
					labyrinthe[i][j].image = "assets/media/powerpellet_froid.jpg";
				}
			}

		}
	}


	labyrinthe[pinky.y][pinky.x].image = "assets/media/pinky.png";
	labyrinthe[blinky.y][blinky.x].image = "assets/media/blinky.png";
	labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";


	for (let i = 0; i < powerPallet.length; i++) { // on parcourt les powerPallet 
		if (pacman.x === powerPallet[i] % 12 && pacman.y === Math.floor(powerPallet[i] / 12)) { // verifie si pacman les coordonnée du pacman correspond à celle du powerPallet
			powerPallet.splice(i, 1); // on supprime la powerPallet du tableau powerPallet 

			labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";	 // pacman passe au dessus du powerPallet
			level1.counter = 15;

			contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le

		}
	}


	if (level1.counter > 0) {

		labyrinthe[pinky.y][pinky.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[blinky.y][blinky.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";
		level1.counter = level1.counter - 1;
		contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
		fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le fichier json

		// si pacman mange pinky
		if (pacman.x === pinky.x && pacman.y === pinky.y || pacman.x - 1 === pinky.x && pacman.y === pinky.y || pacman.x === pinky.x - 1 && pacman.y === pinky.y || pacman.x === pinky.x && pacman.y - 1 === pinky.y || pacman.x === pinky.x && pacman.y === pinky.y - 1) {
			pinky.x = 2;
			pinky.y = 1;
				point.i = point.i + 100;
			contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le fichier json

		}

		// si pacman mange blinky
		if (pacman.x === blinky.x && pacman.y === blinky.y || pacman.x - 1 === blinky.x && pacman.y === blinky.y || pacman.x === blinky.x - 1 && pacman.y === blinky.y || pacman.x === blinky.x && pacman.y - 1 === blinky.y || pacman.x === blinky.x && pacman.y === blinky.y - 1) {
			blinky.x = 9;
			blinky.y = 1;
			point.i = point.i + 100;
			contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le fichier json

		}

	}

	else if (pacman.x === blinky.x && pacman.y === blinky.y || pacman.x - 1 === blinky.x && pacman.y === blinky.y || pacman.x === blinky.x - 1 && pacman.y === blinky.y || pacman.x === blinky.x && pacman.y - 1 === blinky.y || pacman.x === blinky.x && pacman.y === blinky.y - 1) {       // si pacman mange blinky
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir de thème : </p>`;
		marqueurs.classique = `  <a href="/req_debuter?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;

		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;
		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}

	else if (pacman.x === pinky.x && pacman.y === pinky.y || pacman.x - 1 === pinky.x && pacman.y === pinky.y || pacman.x === pinky.x - 1 && pacman.y === pinky.y || pacman.x === pinky.x && pacman.y - 1 === pinky.y || pacman.x === pinky.x && pacman.y === pinky.y - 1) {
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir le thème : </p>`;
		marqueurs.classique = `  <a href="/req_debuter?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;
		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;
		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);

	}


	let gagne = true; // on initialise la variable gagne à true 
	for (let i = 0; i < grille.length; i++) { // on parcourt la grille 
		for (let j = 0; j < grille[i].length; j++) { // on parcourt la grille 
			if (grille[i][j] === 0) { // si la grille[i][j] est égale à 0 
				gagne = false;	 // on passe la variable gagne à false 
			}
		}
	}

	if (gagne === true) {	// si gagne est égale à true
		marqueurs.recommencer = `<p>Recommencer la partie en ameliorant votre score</p><a href="/req_debuter?action=classique"><button> Recommencer </button></a>`
		marqueurs.resultat = ` <p>Vous avez gagné !</p>Votre score est de : ${point.i} point<p> Choisir le thème pour le niveau suivant : </p>`;
		marqueurs.classique = ` <a href="/req_debuter2?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter2?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter2?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;
		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;

		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}


	// NOTE: Ajout de l'information des cases cliquables
	if (tout_cliquable !== false) {
		for (let i = 0; i < position.length; i++) {
			labyrinthe[position[i].y][position[i].x].cliquable = 1; // 1 = case cliquable 
		}
	}


	html = '<div class="grille">';

	for (let y = 0; y < labyrinthe.length; y++) {
		html += '<div class="grille-ligne">';

		for (let x = 0; x < labyrinthe[y].length; x++) {
			image = `<img src="${labyrinthe[y][x].image}">`;

			if (labyrinthe[y][x].cliquable === 1) {
				if (query.autre === "classique") {
					html += `<a href="req_deplacer?action=${n}&autre=classique">`;
				}
				else if (query.autre === "feu") {
					html += `<a href="req_deplacer?action=${n}&autre=feu">`;
				}
				else if (query.autre === "froid") {
					html += `<a href="req_deplacer?action=${n}&autre=froid">`;
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

module.exports = req_deplacer;




