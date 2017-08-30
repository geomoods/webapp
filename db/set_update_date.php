 <?php
include("db.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
$login_id = $_GET['login_id'];
$group_id = $_GET['group_id'];

$sql = "call Set_Update_Date(".$login_id.",".$group_id.");";

$conn->query($sql);

$conn->close();
?>