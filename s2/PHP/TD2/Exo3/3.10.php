<?php
function premieresVoyelles(array $tab): array {
    $voyelles = array("a", "e", "i", "o", "u", "y");
    $resultat = array();
    foreach ($tab as $chaine) {
        $premiereLettre = strtolower(substr($chaine, 0, 1));
        if (in_array($premiereLettre, $voyelles)) {
            $resultat[] = $chaine;
        }
    }
    return $resultat;
}
$tableau = array("chat", "oiseau", "souris", "éléphant");
$voyelles = premieresVoyelles($tableau);
echo "Les chaînes de caractères dont la première lettre est une voyelle sont : ";
foreach ($voyelles as $chaine) {
    echo $chaine . " ";
}
?>