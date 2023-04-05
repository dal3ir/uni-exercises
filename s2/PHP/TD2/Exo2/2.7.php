
<?php
// Crée un tableau contenant les noms de 5 mois de l'année
$mois = array('Janvier', 'Février', 'Mars', 'Avril', 'Mai');

// Récupère l'année actuelle
$currentYear = date('Y');

// Affiche chaque mois sur une nouvelle ligne avec le format de date "M Y"
foreach ($mois as $month) {
    echo $month. " " .$currentYear . "<br>";
}
?>

// 2ND PHASE <br>


<?php
$mois = array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');

$date = '2023-01-18';

$nummois = substr($date, strpos($date, '-') + 1, 2);

switch ($nummois) {
    case '01':
        echo $mois[0] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '02':
        echo $mois[1] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '03':
        echo $mois[2] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '04':
        echo $mois[3] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '05':
        echo $mois[4] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '06':
        echo $mois[5] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '07':
        echo $mois[6] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '08':
        echo $mois[7] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '09':
        echo $mois[8] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '10':
        echo $mois[9] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '11':
        echo $mois[10] . ' ' . substr($date, 0, 4) . "\n";
        break;
    case '12':
        echo $mois[11] . ' ' . substr($date, 0, 4) . "\n";
        break;
    default:
        echo "Invalide";
}
?>

<br>//3rd phase <br>
<?php
$chaine = '2023-03-18';
$car = '-';
$pos = STRPOS($chaine,$car);
$ans =" ";
for ($i=0; $i<$pos; $i++){
    $ans .= $chaine[$i];
}
$mois = $chaine[$pos + 1]. $chaine[$pos + 2];
$m = '';
switch ($mois){
    case '03':
        $m ='Mars';
        break;
}

echo $m.' '.$ans;
?>
