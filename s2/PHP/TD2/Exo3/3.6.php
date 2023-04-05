<?php
function intersectionTableaux(array $tab1, array $tab2): array {
    $intersection = array();
    foreach ($tab1 as $element) {
        if (in_array($element, $tab2)) {
            $intersection[] = $element;
        }
    }
    return $intersection;
}
$tableau1 = array(2, 5, 10, 3, 8, 1);
$tableau2 = array(5, 7, 3, 9, 1);
$intersection = intersectionTableaux($tableau1, $tableau2);
echo "Les éléments communs aux deux tableaux sont : ";
foreach ($intersection as $element) {
    echo $element . " ";
}
?>