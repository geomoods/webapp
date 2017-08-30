 <?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$group_id = $_GET['group_id'];
$user_id = $_GET['user_id'];
$UserInputRequired = $_GET['UserInputRequired'];

$DateFilter ="";

$LastUserUpdate = $dbh->query("SELECT LastUpdateByUser FROM group_members where group_id=".$group_id." and user_id =".$user_id.";");
$LastUserUpdateVal = $LastUserUpdate->fetch(PDO::FETCH_ASSOC);
$LastUserUpdateDate = $LastUserUpdateVal['LastUpdateByUser'];

if($UserInputRequired == 'true') {$Sql =  "select entered as entered,user_mood_hist.login_id as login_id,login as login,SunVal as SunVal,RainVal as RainVal,CloudVal as CloudVal,ThunderVal as ThunderVal,WeatherSymbol as WeatherSymbol,group_members.group_id as group_id,group_members.group_name as group_name, Anonymous
  FROM user_mood_hist inner JOIN (
    SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, user_mood_hist.login_id FROM geomoods.user_mood_hist where entered <= '".$LastUserUpdateDate."') AS t1 group by t1.login_id) as t2 ON 
	`user_mood_hist`.`id` = LastEntered 
 inner JOIN geomoods.group_members
  ON 
user_id = t2.login_id where group_members.group_id =".$group_id.";";}



if($UserInputRequired == 'false') {$Sql =  "SELECT * FROM groups_mood where group_id = ".$group_id." order by entered desc;";}


$user_moods = $dbh->prepare($Sql);
$user_moods->execute();
$data='';
while($row = $user_moods->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode( $data);

?>