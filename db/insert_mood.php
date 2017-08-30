 <?php
include("db.php");

$conn = new mysqli($servername, $username, $password, $dbname);

$SunVal = $_GET['SunVal'];
$CloudVal = $_GET['CloudVal'];
$RainVal = $_GET['RainVal'];
$ThunderVal = $_GET['ThunderVal'];
$login = $_GET['login'];
$login_id = $_GET['login_id'];
$WeatherSymbol = $_GET['weather_symbol'];

$sql = "call Insert_Mood('".$login."',".$login_id.",".$SunVal.",".$CloudVal.",".$RainVal.",".$ThunderVal.",'".$WeatherSymbol."');";

$conn->query($sql);

$conn->close();
?>