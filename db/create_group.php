 <?php
include("db.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$Group_name = $_GET['group_name'];
$owner = $_GET['owner_name'];
$owner_id = $_GET['owner_id'];
$access_type = $_GET['access_type'];
$update_freq = $_GET['update_freq'];

$sql = "call Insert_Group('".$owner."',".$owner_id.",'".$Group_name."',".$access_type.",".$update_freq.");";
//$sql = "call Insert_Group('".$owner."',".$owner_id.",'".$Group_name."',".$access_type.");";

$conn->query($sql);

$conn->close();
?>