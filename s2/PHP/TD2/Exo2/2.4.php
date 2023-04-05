<?php
// Déclaration des tableaux de villes et de populations
$villes = array("Paris", "Londres", "New York", "Tokyo", "Sydney");
$populations = array(2.2, 8.9, 8.4, 13.5, 5.2);
// Boucle pour afficher chaque ville et sa population sur une nouvelle ligne
for ($i = 0; $i < count($villes); $i++) {
    echo $villes[$i] . " : " . $populations[$i] . " millions d'habitants.<br>";
}
?>