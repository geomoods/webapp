 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$user_id = $_GET['user_id'];
/*$group_id = 1;*/

$Logged_user_mood = $dbh->prepare("SELECT * FROM user_mood where login_id = ".$user_id);
$Logged_user_mood->execute();
$data='';
while($row = $Logged_user_mood->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode( $data);

?>