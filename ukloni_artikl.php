<?php
// vrsi se provjera ako je pritisnut gumb ukloni artikl
if (isset($_POST['ukloni_artikal'])) {
    // dohvaca se ID artikla koji treba biti uklonjen
    $proizvod_id = $_POST['ukloni_artikal'];

    // Spajanje na bazu 
    $servername = "student.veleri.hr";
    $username = "abahoric";
    $password = "11";
    $dbname = "abahoric";
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Povezivanje nije uspjelo: " . $conn->connect_error);
    }

    // SQL upit za brisanje artikla iz tablice "kosarica"
    $sqlDelete = "DELETE FROM kosarica WHERE proizvod_id = $proizvod_id";
    if ($conn->query($sqlDelete) === TRUE) {
        header("Location: kosarica.php");
    } else {
        echo "Greška prilikom uklanjanja artikla: " . $conn->error;
    }
    $conn->close();
}

?>
