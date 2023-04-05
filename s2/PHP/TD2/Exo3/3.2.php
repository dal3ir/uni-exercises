<?php
function moyenneTableau($tab) {
    $somme = 0;
    foreach($tab as $nombre) {
        $somme += $nombre;
    }
    $moyenne = $somme / count($tab);
    return $moyenne;
}
$tableau = array(2, 5, 10, 3);
$moyenne = moyenneTableau($tableau);
echo "La moyenne du tableau est : " . $moyenne;
?>