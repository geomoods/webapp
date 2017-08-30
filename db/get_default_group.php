 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$user_id = $_GET['user_id'];
//$user_id = 3;

$default_group = $dbh->prepare("SELECT * FROM group_members where user_id=".$user_id." and Default_group=1");
$default_group->execute();
$data='';
while($row = $default_group->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode($data);

?>