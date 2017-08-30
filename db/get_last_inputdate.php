 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);
$user_id = $_GET['user_id'];

$user_input_date = $dbh->prepare("SELECT entered FROM user_mood where login_id=".$user_id.";");
$user_input_date->execute();
$data='';
while($row = $user_input_date->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode($data);

?>