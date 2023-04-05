<?php

function chainePlusLongue($tab)
{
    $longueurMax = 0;
    $chainePlusLongue = "";
    foreach ($tab as $chaine) {
        if (strlen($chaine) > $longueurMax) {
            $longueurMax = strlen($chaine);
            $chainePlusLongue = $chaine;
        }
    }
    return $chainePlusLongue;
}

$tableau = array("chat", "chien", "souris", "éléphant");
$chaineLongue = chainePlusLongue($tableau);
echo "La chaîne la plus longue est : " . $chaineLongue;
