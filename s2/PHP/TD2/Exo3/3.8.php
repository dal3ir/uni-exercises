<?php
function nombresImpairs(array $tab): array {
    $impairs = array();
    foreach ($tab as $nombre) {
        if ($nombre % 2 != 0) {
            $impairs[] = $nombre;
        }
    }
    return $impairs;
}
$tableau = array(2, 5, 10, 3, 8, 1);
$impairs = nombresImpairs($tableau);
echo "Les nombres impairs du tableau sont : ";
foreach ($impairs as $nombre) {
    echo $nombre . " ";
}
?>