<?php
// Déclaration du tableau d'étudiants et de notes
$etudiants = array(
    array("id" => 1, "nom" => "Alice", "notes" => array("SDBG" => 12, "PHP" => 14, "CSS" => 16)),
    array("id" => 2, "nom" => "Bob", "notes" => array("SDBG" => 8, "PHP" => 10, "CSS" => 12)),
    array("id" => 3, "nom" => "Charlie", "notes" => array("SDBG" => 15, "PHP" => 18, "CSS" => 20)),
    array("id" => 4, "nom" => "David", "notes" => array("SDBG" => 5, "PHP" => 7, "CSS" => 9)),
    array("id" => 5, "nom" => "Chanel", "notes" => array("SDBG" => 13, "PHP" => 12, "CSS" => 13))
);

// Boucle pour calculer la moyenne des notes et ajouter un commentaire différent en fonction de la moyenne de la note
foreach ($etudiants as $key => $etudiant) {
    $moyennes = array();
    foreach ($etudiant["notes"] as $matiere => $note) {
        $moyenne = array_sum($etudiant["notes"]) / count($etudiant["notes"]);
        $commentaire = "";
        if ($moyenne < 5) {
            $commentaire = "C'est pas gagné";
        } elseif ($moyenne < 7) {
            $commentaire = "Doit travailler beaucoup plus";
        } elseif ($moyenne == 10) {
            $commentaire = "Vraiment très moyen";
        } elseif ($moyenne >= 11 && $moyenne <= 12) {
            $commentaire = "En léger progrès";
        } elseif ($moyenne >= 12 && $moyenne <= 14) {
            $commentaire = "Moyen, mais encourageant pour la suite";
        } elseif ($moyenne >= 15 && $moyenne <= 17) {
            $commentaire = "Bien joué";
        } elseif ($moyenne >= 18) {
            $commentaire = "Au top";
        }
        $moyennes[$matiere] = array("moyenne" => $moyenne, "commentaire" => $commentaire);
    }
    $etudiants[$key]["moyennes"] = $moyennes;
}

// Affichage du résultat par étudiant et par matière
foreach ($etudiants as $etudiant) {
    echo "ID : " . $etudiant["id"] . "<br>";
    echo "Nom : " . $etudiant["nom"] . "<br>";
    foreach ($etudiant["moyennes"] as $matiere => $moyenne) {
        echo "Matière : " . $matiere . "<br>";
        echo "Moyenne : " . $moyenne["moyenne"] . "<br>";
        echo "Commentaire : " . $moyenne["commentaire"] . "<br>";
    }
    echo "<br>";
}
?>