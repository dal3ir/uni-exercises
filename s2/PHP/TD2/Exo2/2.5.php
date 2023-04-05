<?php
// Déclaration du tableau de pays
$pays = array("France", "Espagne", "Italie", "Allemagne", "Royaume-Uni", "États-Unis", "Canada", "Japon", "Chine", "Australie");
// Boucle pour afficher chaque pays en majuscules sur une nouvelle ligne
foreach ($pays as $p) {
    echo strtoupper($p) . "<br>";
}
?>