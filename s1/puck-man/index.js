// Site WEB demo PI

"use strict";

const http = require("http");
const url = require("url");
let mon_serveur;
let port;

// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION

const req_commencer = require("./src/req_commencer.js");
const req_afficher_formulaire_inscription = require("./src/req_afficher_formulaire_inscription.js");
const req_inscrire = require("./src/req_inscrire.js");
const req_identifier = require("./src/req_identifier.js");

const req_statique = require("./src/req_statique.js");
const req_erreur = require("./src/req_erreur.js");


const req_debuter = require("./src/req_debuter.js");
const req_deplacer = require("./src/req_deplacer.js");
const req_reprendre = require("./src/extras/req_reprendre.js");

const req_debuter2 = require("./src/req_debuter2.js");
const req_deplacer2 = require("./src/req_deplacer2.js");
const req_reprendre2 = require("./src/extras/req_reprendre2.js");

const req_debuter3 = require("./src/req_debuter3.js");
const req_deplacer3 = require("./src/req_deplacer3.js");
const req_reprendre3 = require("./src/extras/req_reprendre3.js");

const req_quitter = require("./src/req_quitter.js");


// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE

const traite_requete = function (req, res) {

	let requete;
	let pathname;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;


	case '/req_debuter':
				req_debuter(req, res, query);
				break;
						

			case '/req_deplacer':
				req_deplacer(req, res, query);
				break;

	case '/req_reprendre':
				req_reprendre(req, res, query);
				break;


					case '/req_debuter2':
				req_debuter2(req, res, query);
				break;
				
	case '/req_deplacer2':
				req_deplacer2(req, res, query);
				break;
					case '/req_reprendre2':
				req_reprendre2(req, res, query);
				break;

					
			case '/req_debuter3':
				req_debuter3(req, res, query);
				break;

	case '/req_deplacer3':
				req_deplacer3(req, res, query);
				break;
				
					case '/req_reprendre3':
				req_reprendre3(req, res, query);
				break;


			case '/req_quitter':
				req_quitter(req, res, query);
				break;



			default:
				req_statique(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		// console.trace();
		req_erreur(req, res, query);
	}
};

// CREATION ET LANCEMENT DU SERVEUR

mon_serveur = http.createServer(traite_requete);
port = 5000;
// Pour récupérer le numéro du port depuis la ligne de commande. Exemple : node index.js 5000
// port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
