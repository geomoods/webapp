 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);
$user_id = $_GET['user_id'];

$global_group = $dbh->prepare("SELECT * FROM default_groups where user_id = ".$user_id.";");
$global_group->execute();
$data='';
while($row = $global_group->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode($data);

?>