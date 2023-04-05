<?php
function nombresPairs(array $tab): array {
    $pairs = array();
    foreach ($tab as $nombre) {
        if ($nombre % 2 == 0) {
            $pairs[] = $nombre;
        }
    }
    return $pairs;
}
$tableau = array(2, 5, 10, 3, 8, 1);
$pairs = nombresPairs($tableau);
echo "Les nombres pairs du tableau sont : ";
foreach ($pairs as $nombre) {
    echo $nombre . " ";
}