<?php
// Déclaration du tableau de fruits
$fruits = array("pomme", "banane", "orange", "kiwi", "fraise");
// Boucle pour afficher chaque élément avec un indice pair du tableau sur une nouvelle ligne
$i = 0;
foreach ($fruits as $fruit) {
    if ($i % 2 == 0) {
        echo $fruit . "<br>";
    }
    $i++;
}
?>