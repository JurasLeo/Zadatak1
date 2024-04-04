<?php
$server = "student.veleri.hr";
$database = "abahoric";
$username = "abahoric";
$password = "11";

$conn = mysqli_connect($server, $username, $password, $database) or die("Konekcija nije uspješna");

$email = isset($_POST["email"]) ? mysqli_real_escape_string($conn, $_POST["email"]) : '';
$poruka = isset($_POST["upiti"]) ? mysqli_real_escape_string($conn, $_POST["upiti"]) : '';

// Specify your table name and column names in the INSERT INTO statement
$query = "INSERT INTO upit (email, poruka) VALUES ('$email', '$poruka')";

$res = mysqli_query($conn, $query);
if ($res) {
    echo "Upit je dodan!";
} else {
    echo "Došlo je do problema prilikom dodavanja upita.";
}

mysqli_close($conn);
?>