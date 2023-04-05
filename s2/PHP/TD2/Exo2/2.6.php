<?php
// Déclaration du tableau d'animaux et d'âges
$animaux = array(
    array("nom" => "Chat", "age" => 5),
    array("nom" => "Chien", "age" => 3),
    array("nom" => "Lion", "age" => 8),
    array("nom" => "Tigre", "age" => 6),
    array("nom" => "Ours", "age" => 4)
);
// Fonction de comparaison pour le tri par ordre d'âge décroissant
function cmp($a, $b) {
    if ($a["age"] == $b["age"]) {
        return 0;
    }
    return ($a["age"] > $b["age"]) ? -1 : 1;
}
// Tri du tableau par ordre d'âge décroissant
usort($animaux, "cmp");
// Boucle pour afficher chaque animal et son âge
foreach ($animaux as $animal) {
    echo $animal["nom"] . " a " . $animal["age"] . " ans.<br>";
}
?>