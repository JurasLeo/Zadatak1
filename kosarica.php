<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="CodeHim">
    <title>NašiProivodi</title>
    <link rel="stylesheet" href="kosarica.css">
  
  </head>
  <body>
    <nav class="nav_links"> 
      <a href="projekt.html">
          <h1><img class="logo" src="https://dbdzm869oupei.cloudfront.net/img/sticker/preview/16653.png" alt="logo"></h1>
      </a>
      <h1 class="naslov">FurryFriends</h1>
      <div class="nav-bar">
          <ul>
              <li><a href="proizvodi.html">Naši proizvodi</a></li>
              <li><a href="zivotinje.html">Životinje</a>
                  <div class="bar">
                      <ul>
                          <li><a href="psi.html">Pas</a></li>
                          <li><a href="macke.html">Mačka</a></li>
                          <li><a href="pingvini.html">Pingvin</a></li>
                          <li><a href="tigar.html">Tigar</a></li>
                          <li><a href="medvedica.html">Sredozemna medvjedica</a></li>
                      </ul>
                  </div>
              </li>
              <li><a href="doniraj.html">Doniraj</a></li>
                <li><a href="kotakt.html">Kontakt</a></li>
                <li><a href="onama.html">O nama</a></li>
                <li><a href="https://zz-rijeka.org/kako-pomoci/" target="_blank">Kako pomoć?</a></li>
                <li><a href="kosarica.php"><i class="fa fa-shopping-cart" style="font-size:48px;color:aqua"></i></a></li>
            </ul>
      </div>
  </nav>
        <div class="tekstKosarica">
            <h1>Proizvodi u košarici</h1>
            <ul>
            <?php
                include('prikaz_kosarice.php');
            ?>
            </ul>
        </div>
        <script src="menu.js"></script>
    </section>

