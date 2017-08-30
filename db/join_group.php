 <?php
include("db.php");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$group_id = $_GET['group_id'];
$login_id = $_GET['user_id'];
$group_name = $_GET['group_name'];
$GrpButtonCaption = $_GET['GrpButtonCaption'];
$PrivacyStatus = $_GET['privacy_status'];

if ($GrpButtonCaption == 'Join') {
$sql = "call Join_Group(".$login_id.",".$group_id.",'".$group_name."',".$PrivacyStatus.");";
}
if ($GrpButtonCaption == 'Leave') {
$sql = "call Leave_Group(".$login_id.",".$group_id.");";
}
$conn->query($sql);

$conn->close();
?>