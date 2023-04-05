<?php
// Déclaration du tableau de personnes
$personnes = array(
    array("nom" => "Alice", "age" => 25),
    array("nom" => "Bob", "age" => 30),
    array("nom" => "Charlie", "age" => 40),
    array("nom" => "David", "age" => 20),
    array("nom" => "Eve", "age" => 35)
);
// Boucle pour afficher le nom et l'âge de chaque personne sur une nouvelle ligne
foreach ($personnes as $personne) {
    echo $personne["nom"] . " a " . $personne["age"] . " ans.<br>";
}
?>
2.3 Voic