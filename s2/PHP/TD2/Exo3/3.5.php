<?php
function filterStrings(array $strings, string $character): array {
    $filtreStrings = array();
    foreach ($strings as $string) {
        if (strpos($string, $character) !== false) {
            $filtreStrings[] = $string;
        }
    }
    return $filtreStrings;
}
$strings = array("SGBD", "C", "PHP", "JAVA", "CSS");
$filtreStrings = filterStrings($strings, "JA");
print_r($filtreStrings);
?>