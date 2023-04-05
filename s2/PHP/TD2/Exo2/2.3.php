<?php
// Déclaration du tableau de prix
$prix = array(10.5, 20.3, 5.2, 8.9, 15.7);
// Boucle pour calculer la somme des prix
$somme = 0;
foreach ($prix as $p) {
    $somme += $p;
}
// Affichage du résultat
echo "La somme des prix est de : " . $somme . " euros.";
?>