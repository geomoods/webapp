 <?php 
include("db.php");


$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);
$group_id = $_GET['group_id'];
$user_id = $_GET['user_id'];
$UserInputRequired = $_GET['UserInputRequired'];

$LastGroupUpdateStrg = $dbh->query("SELECT LastUpdateByUser FROM group_members where group_id=".$group_id." and user_id =".$user_id.";");

$LastGroupUpdateFetch = $LastGroupUpdateStrg->fetch(PDO::FETCH_ASSOC);
$LastGroupUpdate = $LastGroupUpdateFetch['LastUpdateByUser'];

function ReturnSqlStrg($symbol,$LastGroupUpdateVal,$group_idVal) {
	
	if($symbol == 'Total') {
		$sql_strg =	"";
	} else {
		$sql_strg =	" and ".$symbol."Val >0";	
	}

	return "select count(*) as ".$symbol."Count FROM user_mood_hist inner JOIN (SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, user_mood_hist.login_id FROM geomoods.user_mood_hist where entered <= '".$LastGroupUpdateVal."') AS t1 group by t1.login_id) as t2 ON `user_mood_hist`.`id` = LastEntered inner JOIN geomoods.group_members ON user_id = t2.login_id where group_members.group_id = ".$group_idVal.$sql_strg.";";
}


if($UserInputRequired == 'true') {
	$SunCount = $dbh->query(ReturnSqlStrg("Sun",$LastGroupUpdate,$group_id));
	$CloudCount = $dbh->query(ReturnSqlStrg("Cloud",$LastGroupUpdate,$group_id));
	$RainCount = $dbh->query(ReturnSqlStrg("Rain",$LastGroupUpdate,$group_id));	
	$ThunderCount = $dbh->query(ReturnSqlStrg("Thunder",$LastGroupUpdate,$group_id));	
	$TotalCount = $dbh->query(ReturnSqlStrg("Total",$LastGroupUpdate,$group_id));

} else {
	
	$SunCount = $dbh->query("SELECT Count(id) as SunCount FROM groups_mood where SunVal > 0 and group_id=".$group_id.";");
	$CloudCount = $dbh->query("SELECT Count(id) as CloudCount FROM groups_mood where CloudVal > 0 and group_id=".$group_id.";");
	$RainCount = $dbh->query("SELECT Count(id) as RainCount FROM groups_mood where RainVal > 0 and group_id=".$group_id.";");
	$ThunderCount = $dbh->query("SELECT Count(id) as ThunderCount FROM groups_mood where ThunderVal > 0 and group_id=".$group_id.";");
	$TotalCount = $dbh->query("SELECT Count(id) as TotalCount FROM groups_mood where group_id=".$group_id.";");
	}

$TotalCountVal = $TotalCount->fetch(PDO::FETCH_ASSOC);
$SunCountVal = $SunCount->fetch(PDO::FETCH_ASSOC);
$CloudCountVal = $CloudCount->fetch(PDO::FETCH_ASSOC);
$RainCountVal = $RainCount->fetch(PDO::FETCH_ASSOC);
$ThunderCountVal = $ThunderCount->fetch(PDO::FETCH_ASSOC);


$Total = $TotalCountVal['TotalCount'];
if($Total<1) {$Total = 1;}
$SunCoef = $SunCountVal['SunCount']/$Total;
$CloudCoef = $CloudCountVal['CloudCount']/$Total;
$RainCoef = $RainCountVal['RainCount']/$Total;
$ThunderCoef = $ThunderCountVal['ThunderCount']/$Total;

if($UserInputRequired == 'true') {
	
	$Sql =  "SELECT AVG(nullif(SunVal, 0))*".$SunCoef." as SunValAVG,AVG(nullif(RainVal, 0))*".$RainCoef." as RainValAVG,AVG(nullif(CloudVal, 0))*".$CloudCoef." as CloudValAVG,AVG(nullif(ThunderVal, 0))*".$ThunderCoef." as ThunderValAVG FROM (select SunVal as SunVal,RainVal as RainVal,CloudVal as CloudVal,ThunderVal as ThunderVal FROM user_mood_hist inner JOIN (SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, login_id FROM user_mood_hist where entered <= '".$LastGroupUpdate."') AS t1 group by t1.login_id) as t2 ON `user_mood_hist`.`id` = LastEntered inner JOIN geomoods.group_members ON user_id = t2.login_id where group_members.group_id =".$group_id.") as t3;";
}

if($UserInputRequired == 'false') {
	$Sql =  "SELECT AVG(nullif(SunVal, 0))*".$SunCoef." as SunValAVG,AVG(nullif(RainVal, 0))*".$RainCoef." as RainValAVG,AVG(nullif(CloudVal, 0))*".$CloudCoef." as CloudValAVG,AVG(nullif(ThunderVal, 0))*".$ThunderCoef." as ThunderValAVG FROM groups_mood where group_id=".$group_id.";";
}

$averages = $dbh->query($Sql);

$data='';
while($mood = $averages->fetch(PDO::FETCH_ASSOC)){
	$data[] = $mood;
	}

echo json_encode($data);

die;

?>