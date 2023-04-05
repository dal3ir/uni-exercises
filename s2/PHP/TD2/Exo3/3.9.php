<?php
function triAlphabetique(array $tab): array {
    sort($tab);
    return $tab;
}
$tableau = array("chat", "chien", "souris", "éléphant");
$tri = triAlphabetique($tableau);
echo "Les chaînes de caractères triées par ordre alphabétique sont : ";
foreach ($tri as $chaine) {
    echo $chaine . " ";
}
?>