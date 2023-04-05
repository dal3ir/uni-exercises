<?php

function premiersElements($tab, $n)
{
    $resultat = array();
    for ($i = 0; $i < $n; $i++) {
        if (isset($tab[$i])) {
            $resultat[] = $tab[$i];
        }
    }
    return $resultat;
}

$tableau = array(2, 5, 10, 3, 8, 1);
$n = 3;
$premiers = premiersElements($tableau, $n);
echo "Les " . $n . " premiers éléments du tableau sont : ";
foreach ($premiers as $element) {
    echo $element . " ";
}
