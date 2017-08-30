 <?php
include("db.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
$user_id = $_GET['user_id'];
$group_id = $_GET['group_id'];
$privacy_status = $_GET['privacy_status'];

$sql = "call Set_Groups_Privacy(".$user_id.",".$group_id.",".$privacy_status.");";

$conn->query($sql);

$conn->close();
?>