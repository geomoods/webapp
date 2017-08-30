 <?php 
header('Content-type:application/json');
include("db.php");


$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);
$login = $_GET['login'];
$pwd = $_GET['pwd'];
$sth = $dbh->query("SELECT id, login FROM users WHERE (login = '".$login."' or email = '".$login."') and pwd COLLATE latin1_bin = '".$pwd."'");
$userdata = $sth->fetch(PDO::FETCH_ASSOC);

echo "[".json_encode($userdata)."]";
?>