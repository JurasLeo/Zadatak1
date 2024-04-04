<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "student.veleri.hr";
$username = "abahoric";
$password = "11";
$dbname = "abahoric";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Povezivanje nije uspjelo: " . $conn->connect_error);
}

// Dohvati podatke iz baze za prikaz u košarici.html
$sql = "SELECT * FROM kosarica";
$result = $conn->query($sql);
//inicijalizacija brojaca na 0 
$ukupno = 0;

// Prikazi podatke na stranici
echo '<form action="ukloni_artikl.php" method="post">';
echo "<ul>";

while ($row = $result->fetch_assoc()) {
    $proizvod_id = $row['proizvod_id'];
    $kolicina = $row['kolicina'];
    $cijena = $row['cijena'];

    // Dohvati podatke o proizvodu iz tablice "proizvodi"
    $queryProizvod = "SELECT naziv FROM proizvodi WHERE id = $proizvod_id";
    $resultProizvod = $conn->query($queryProizvod);
    
    if ($resultProizvod->num_rows > 0) {
        $rowProizvod = $resultProizvod->fetch_assoc();
        $naziv = $rowProizvod['naziv'];
        // Dodaj cijenu na ukupno
        $ukupno += $cijena;
        // Prikazi podatke na stranici
        echo '<li class="uredivanje">' . $naziv . ' - <span style="color: red;">Cijena: ' . $cijena . '</span>';  //ovdje smo dodali klasu "uredivanje" kako bi tekst mogli urediti u zasebnom css dokumentu
        echo '<button type="submit" name="ukloni_artikal" value="' . $proizvod_id . '" >Ukloni</button></li>';
    }
}
echo "</ul>";
echo '</form>';

if ($ukupno > 0) { 
    echo '<form action="stvaranjekupca.php" method="post">';
    echo '<ul>';
    echo '<li class="ukupnoje">Ime: <input type="text" name="ime" ></li>';
    echo '<li class="ukupnoje">Prezime: <input type="text" name="prezime" ></li>';
    echo '<li class="ukupnoje">Broj telefona: <input type="text" name="broj_telefona" ></li>';
    echo '<li class="ukupnoje">Adresa: <input type="text" name="adresa" ></li>';
    echo '<input type="hidden" name="ukupno" value="' . $ukupno . '">'; //skriveno polje za pohranu vrijednosti od "ukupno" kako bi se moglo upisati u bazu podataka
    echo "<li class='ukupnoje'>Ukupno $: " . $ukupno . "</li>";
    // Dodaj gumb za narudžbu
    echo '<li><button type="submit" name="naruci">Naruči</button></li>';
    echo '</ul>';
    echo '</form>';
} else {
    // Poruka ako je košarica prazna
    echo "<li class='tuzno'>Kupi Brale Kosara je Prazna</li>";
}

$conn->close();
?>

