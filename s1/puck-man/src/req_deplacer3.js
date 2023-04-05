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
	let inky;
	let clyde;
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


	cy = Math.floor(action / 21);
	cx = action % 21;
	mur = grille[cy][cx] === 1;
	pallet = grille[cy][cx] === 0;


	if (query.action == 229 || query.action == 230) {
		pacman.x = 1;
			pacman.y = 10;
		contenu = JSON.stringify(fichierGrille);
		fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");
	} else if (query.action == 211 || query.action == 210) {
			pacman.x = 19;
			pacman.y = 10;

		contenu = JSON.stringify(fichierGrille);
		fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");
	}

	const directions = [
		{ x: 0, y: -1 },
		{ x: 1, y: 0 },
		{ x: 0, y: 1 },
		{ x: -1, y: 0 },
	];

	if (mur === false) {
		pacman.x = cx;
		pacman.y = cy;
	}


	const distances = [];

	if (mur === false) {
		for (let i = 0; i < directions.length; i++) {
			const dir = directions[i];
			let x = pinky.x + dir.x;
			let y = pinky.y + dir.y;

			if (
				(x <= 20 && x >= 0 && y >= 0 && y <= 20)
				&& grille[y][x] === 4 || grille[y][x] === 0
			) {
				distances.push({
					dir: dir,
					dist: Math.sqrt(
						(x - pacman.x) ** 2
						+ (y - pacman.y) ** 2
					)
				});
			}
		}


		let min = 0;
		max = distances.length - 1
		for (let i = 0; i < distances.length; i++) {
			if (distances[i].dist < distances[min].dist) {
				min = i;
			} else if (distances[i].dist > distances[max].dist) {
				max = i;
			}

		}

		pinky.x += distances[min].dir.x;
		pinky.y += distances[min].dir.y;
	}


	const distances1 = [];


	if (mur === false) {
		for (let i = 0; i < directions.length; i++) {
			const dir = directions[i];
			let x = clyde.x + dir.x;
			let y = clyde.y + dir.y;

			if (
				(x <= 20 && x >= 0 && y >= 0 && y <= 20)
				&& grille[y][x] === 4 || grille[y][x] === 0
			) {
				distances1.push({
					dir: dir,
					dist: Math.sqrt(
						(x - pacman.x) ** 2
						+ (y - pacman.y) ** 2
					)
				});
			}
		}

		let min = 0;
		max = distances1.length - 1
		for (let i = 0; i < distances1.length; i++) {
			if (distances1[i].dist < distances1[min].dist) {
				min = i;
			} else if (distances1[i].dist > distances1[max].dist) {
				max = i;
			}

		}

		clyde.x += distances1[min].dir.x;
		clyde.y += distances1[min].dir.y;
	}


	const distances2 = [];

	if (mur === false) {
		for (let i = 0; i < directions.length; i++) {
			const dir = directions[i];
			let x = blinky.x + dir.x;
			let y = blinky.y + dir.y;

			if (
				(x <= 20 && x >= 0 && y >= 0 && y <= 20)
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

	const distances3 = [];

	if (mur === false) {
		for (let i = 0; i < directions.length; i++) {
			const dir = directions[i];
			let x = inky.x + dir.x;
			let y = inky.y + dir.y;

			if (
				(x <= 20 && x >= 0 && y >= 0 && y <= 20)
				&& grille[y][x] === 4 || grille[y][x] === 0
			) {
				distances3.push({
					dir: dir,
					dist: Math.sqrt(
						(x - pacman.x) ** 2
						+ (y - pacman.y) ** 2
					)
				});
			}
		}

		let min = 0;
		max = distances3.length - 1
		for (let i = 0; i < distances3.length; i++) {
			if (distances3[i].dist < distances3[min].dist) {
				min = i;
			} else if (distances3[i].dist > distances3[max].dist) {
				max = i;
			}
		}
		inky.x += distances3[min].dir.x;
		inky.y += distances3[min].dir.y;
	}

	position = [];
	for (let i = 0; i < directions.length; i++) {
		const dir = directions[i];
		px = pacman.x + dir.x;
		py = pacman.y + dir.y;
		(px >= 0 && px <= 20 && py >= 0 && py <= 20)
		position.push({ y: py, x: px });

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
	labyrinthe[inky.y][inky.x].image = "assets/media/inky.png";
	labyrinthe[clyde.y][clyde.x].image = "assets/media/clyde.png";
	labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";


	// teleportation pacman 







	for (let i = 0; i < powerPallet.length; i++) { // on parcourt les powerPallet 
		if (pacman.x === powerPallet[i] % 21 && pacman.y === Math.floor(powerPallet[i] / 21)) { // si pacman mange une powerPallet 
			powerPallet.splice(i, 1); // on supprime la powerPallet du tableau powerPallet 
			labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";	 // pacman passe au dessus du powerPallet
			level3.counter = 15;
			contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le
			fichierGrille[6] = powerPallet; // on ajoute le tableau powerPallet dans le fichier json 
		}
	}


	if (level3.counter > 0) {


		labyrinthe[pinky.y][pinky.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[blinky.y][blinky.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[inky.y][inky.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[clyde.y][clyde.x].image = "assets/media/fantome_vulnerable.png";
		labyrinthe[pacman.y][pacman.x].image = "assets/media/pacman.png";
		level3.counter = level3.counter - 1;
		contenu = JSON.stringify(fichierGrille); // on convertit le contenu du fichier json en string
		fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8"); // on écrit le contenu dans le fichier json


		if (pacman.x === pinky.x && pacman.y === pinky.y || pacman.x - 1 === pinky.x && pacman.y === pinky.y || pacman.x === pinky.x - 1 && pacman.y === pinky.y || pacman.x === pinky.x && pacman.y - 1 === pinky.y || pacman.x === pinky.x && pacman.y === pinky.y - 1) { 		// si pacman mange pinky


			pinky.x = 1;
			pinky.y = 19;
			point.i = point.i + 100;

			// reprend son point de départ 
			contenu = JSON.stringify(fichierGrille);			// on convertit le contenu du fichier json en string
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");	// on écrit le contenu dans le fichier json

		}

		else if (pacman.x === blinky.x && pacman.y === blinky.y || pacman.x - 1 === blinky.x && pacman.y === blinky.y || pacman.x === blinky.x - 1 && pacman.y === blinky.y || pacman.x === blinky.x && pacman.y - 1 === blinky.y || pacman.x === blinky.x && pacman.y === blinky.y - 1) {	// si pacman mange blinky
			blinky.x = 19;
			blinky.y = 19;
			point.i = point.i + 100;

			contenu = JSON.stringify(fichierGrille);
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");
		}

		else if (pacman.x === clyde.x && pacman.y === clyde.y || pacman.x - 1 === clyde.x && pacman.y === clyde.y || pacman.x === clyde.x - 1 && pacman.y === clyde.y || pacman.x === clyde.x && pacman.y - 1 === clyde.y || pacman.x === clyde.x && pacman.y === clyde.y - 1) {
			clyde.x = 19;
			clyde.y = 1;
				point.i = point.i + 100;

			contenu = JSON.stringify(fichierGrille);
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");

		}

		else if (pacman.x === inky.x && pacman.y === inky.y || pacman.x - 1 === inky.x && pacman.y === inky.y || pacman.x === inky.x - 1 && pacman.y === inky.y || pacman.x === inky.x && pacman.y - 1 === inky.y || pacman.x === inky.x && pacman.y === inky.y - 1) {

			inky.x = 1;
			inky.y = 1;
			point.i = point.i + 100;

			contenu = JSON.stringify(fichierGrille);
			fs.writeFileSync("./src/assets/json/grille.json", contenu, "UTF-8");

		}

	} else if (pacman.x === pinky.x && pacman.y === pinky.y || pacman.x - 1 === pinky.x && pacman.y === pinky.y || pacman.x === pinky.x - 1 && pacman.y === pinky.y || pacman.x === pinky.x && pacman.y - 1 === pinky.y || pacman.x === pinky.x && pacman.y === pinky.y - 1) { 		// si pacman mange pinky
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir le thème : </p>`;

		marqueurs.classique = `  <a href="/req_debuter3?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter3?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter3?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;


		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;
		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}


	else if (pacman.x === clyde.x && pacman.y === clyde.y || pacman.x - 1 === clyde.x && pacman.y === clyde.y || pacman.x === clyde.x - 1 && pacman.y === clyde.y || pacman.x === clyde.x && pacman.y - 1 === clyde.y || pacman.x === clyde.x && pacman.y === clyde.y - 1) {       // si pacman mange clyde
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir le thème : </p>`;

		marqueurs.classique = `  <a href="/req_debuter3?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter3?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter3?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;

		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;
		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}

	else if (pacman.x === blinky.x && pacman.y === blinky.y || pacman.x - 1 === blinky.x && pacman.y === blinky.y || pacman.x === blinky.x - 1 && pacman.y === blinky.y || pacman.x === blinky.x && pacman.y - 1 === blinky.y || pacman.x === blinky.x && pacman.y === blinky.y - 1) {       // si pacman mange blinky
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir le thème : </p>`;

		marqueurs.classique = `  <a href="/req_debuter3?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter3?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter3?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;

		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;
		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}

	else if (pacman.x === inky.x && pacman.y === inky.y || pacman.x - 1 === inky.x && pacman.y === inky.y || pacman.x === inky.x - 1 && pacman.y === inky.y || pacman.x === inky.x && pacman.y - 1 === inky.y || pacman.x === inky.x && pacman.y === inky.y - 1) {       // si pacman mange inky
		marqueurs.resultat = ` <p>Vous avez perdu </p>Votre score est de : ${point.i} point<p>Recommencer : Choisir le thème : </p>`;

		marqueurs.classique = `  <a href="/req_debuter3?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter3?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter3?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;


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

		marqueurs.resultat = ` <p>Vous avez gagné ! Recommencer du niveau 1 </p>Votre score était de : ${point.i} point`;
		marqueurs.recommencer = `<p>Recommencer la partie en ameliorant votre score</p><a href="/req_debuter3?action=classique"><button> Recommencer </button></a>`
		marqueurs.classique = `  <a href="/req_debuter?action=classique"><img src= "assets/media/theme_classique.png" class = classique></a>`;
		marqueurs.feu = `  <a href="/req_debuter?action=feu"><img src= "assets/media/theme_feu.png" class = feu></a>`;
		marqueurs.froid = `  <a href="/req_debuter?action=froid"><img src= "assets/media/theme_froid.png" class = froid></a>`;
		marqueurs.quitter = ` <a href="/req_quitter"><button>Quitter</button></a>`;

		page = fs.readFileSync('./src/modele_page_resultat.html', 'utf-8');
		page = nunjucks.renderString(page, marqueurs);
	}


	// NOTE: Ajout de l'information des cases cliquables
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
				if (query.autre === "classique") {
					html += `<a href="req_deplacer3?action=${n}&autre=classique">`;
				}
				else if (query.autre === "feu") {
					html += `<a href="req_deplacer3?action=${n}&autre=feu">`;
				}
				else if (query.autre === "froid") {
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

module.exports = req_deplacer;




