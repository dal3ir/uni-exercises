<?php
function sommeTableau($tab) {
    $somme = 0;
    foreach($tab as $nombre) {
        $somme += $nombre;
    }
    return $somme;
}
$tableau = array(2, 5, 10, 3);
$somme = sommeTableau($tableau);
echo "La somme du tableau est : " . $somme;
?>