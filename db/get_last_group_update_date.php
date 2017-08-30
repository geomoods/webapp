 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$user_id = $_GET['user_id'];
$group_id = $_GET['group_id'];


$user_update_date = $dbh->prepare("SELECT LastUpdateByUser FROM group_members where user_id=".$user_id." and group_id=".$group_id);

$user_update_date->execute();
$data='';
while($row = $user_update_date->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode($data);

?>