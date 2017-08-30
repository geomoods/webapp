 <?php 
include("db.php");


$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);
$group_id = $_GET['group_id'];
$user_id = $_GET['user_id'];

//$group_id = 59;
//$user_id = 1;
//$Interval = 24;

$Interval = $_GET['Interval'];

$IntervalMid = $Interval/2;

$LastGroupUpdateStrg = $dbh->query("SELECT LastUpdateByUser FROM group_members where group_id=".$group_id." and user_id =".$user_id.";");
$LastGroupUpdateFetch = $LastGroupUpdateStrg->fetch(PDO::FETCH_ASSOC);

$IntervalEndDate = $LastGroupUpdateFetch['LastUpdateByUser'];

//This function counts symbol occurrences =========================================================================================
function ReturnSqlStrg($symbol,$a,$h1,$h2,$grp) {
		
	if($symbol == 'Total') {
		$sql_strg =	"";
	} else {
		$sql_strg =	" and ".$symbol."Val >0";	
	}

	return "select count(*) as ".$symbol."Count FROM user_mood_hist inner JOIN (SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, login_id FROM user_mood_hist where entered >= date_sub('".$a."',INTERVAL ".$h1." HOUR) and entered <= date_sub('".$a."',INTERVAL ".$h2." HOUR)) AS t1 group by t1.login_id) as t2 ON id = LastEntered inner JOIN group_members ON user_id = t2.login_id and group_id = ".$grp.$sql_strg.";";
}

//Mid 1 =========================================================================================

$SunCountMid_1 = $dbh->query(ReturnSqlStrg("Sun",$IntervalEndDate,$Interval,$IntervalMid,$group_id));
$CloudCountMid_1 = $dbh->query(ReturnSqlStrg("Cloud",$IntervalEndDate,$Interval,$IntervalMid,$group_id));
$RainCountMid_1 = $dbh->query(ReturnSqlStrg("Rain",$IntervalEndDate,$Interval,$IntervalMid,$group_id));	
$ThunderCountMid_1 = $dbh->query(ReturnSqlStrg("Thunder",$IntervalEndDate,$Interval,$IntervalMid,$group_id));	
$TotalCountMid_1 = $dbh->query(ReturnSqlStrg("Total",$IntervalEndDate,$Interval,$IntervalMid,$group_id));

$TotalCountMid_1_val = $TotalCountMid_1->fetch(PDO::FETCH_ASSOC);
$SunCountMid_1_val = $SunCountMid_1->fetch(PDO::FETCH_ASSOC);
$CloudCountMid_1_val = $CloudCountMid_1->fetch(PDO::FETCH_ASSOC);
$RainCountMid_1_val = $RainCountMid_1->fetch(PDO::FETCH_ASSOC);
$ThunderCountMid_1_val = $ThunderCountMid_1->fetch(PDO::FETCH_ASSOC);

$TotalMid_1 = $TotalCountMid_1_val['TotalCount'];
if($TotalMid_1<1) {$TotalMid_1 = 1;}
$SunCoefMid_1 = $SunCountMid_1_val['SunCount']/$TotalMid_1;
$CloudCoefMid_1 = $CloudCountMid_1_val['CloudCount']/$TotalMid_1;
$RainCoefMid_1 = $RainCountMid_1_val['RainCount']/$TotalMid_1;
$ThunderCoefMid_1 = $ThunderCountMid_1_val['ThunderCount']/$TotalMid_1;

if($SunCoefMid_1>1) {$SunCoefMid_1 = 1;}
if($CloudCoefMid_1>1) {$CloudCoefMid_1 = 1;}
if($RainCoefMid_1>1) {$RainCoefMid_1 = 1;}
if($ThunderCoefMid_1>1) {$ThunderCoefMid_1 = 1;}

	
$SqlMid_1 =  "SELECT AVG(nullif(SunVal, 0))*".$SunCoefMid_1." as SunValAVG,AVG(nullif(RainVal, 0))*".$RainCoefMid_1." as RainValAVG,AVG(nullif(CloudVal, 0))*".$CloudCoefMid_1." as CloudValAVG,AVG(nullif(ThunderVal, 0))*".$ThunderCoefMid_1." as ThunderValAVG FROM (select SunVal as SunVal,RainVal as RainVal,CloudVal as CloudVal,ThunderVal as ThunderVal FROM user_mood_hist inner JOIN (SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, login_id FROM user_mood_hist where entered >= date_sub('".$IntervalEndDate."',INTERVAL ".$Interval." HOUR) and entered < date_sub('".$IntervalEndDate."',INTERVAL ".$IntervalMid." HOUR)) AS t1 group by t1.login_id) as t2 ON id = LastEntered inner JOIN group_members ON user_id = t2.login_id and group_id =".$group_id.") as t3;";

$averagesMid_1 = $dbh->query($SqlMid_1);

$dataMid_1='';

while($Mid_1 = $averagesMid_1->fetch(PDO::FETCH_ASSOC)){
$dataMid_1[] = $Mid_1;
	}

//Mid 2 =========================================================================================

$SunCountMid_2 = $dbh->query(ReturnSqlStrg("Sun",$IntervalEndDate,$IntervalMid,0,$group_id));
$CloudCountMid_2 = $dbh->query(ReturnSqlStrg("Cloud",$IntervalEndDate,$IntervalMid,0,$group_id));
$RainCountMid_2 = $dbh->query(ReturnSqlStrg("Rain",$IntervalEndDate,$IntervalMid,0,$group_id));	
$ThunderCountMid_2 = $dbh->query(ReturnSqlStrg("Thunder",$IntervalEndDate,$IntervalMid,0,$group_id));	
$TotalCountMid_2 = $dbh->query(ReturnSqlStrg("Total",$IntervalEndDate,$IntervalMid,0,$group_id));

$TotalCountMid_2_val = $TotalCountMid_2->fetch(PDO::FETCH_ASSOC);
$SunCountMid_2_val = $SunCountMid_2->fetch(PDO::FETCH_ASSOC);
$CloudCountMid_2_val = $CloudCountMid_2->fetch(PDO::FETCH_ASSOC);
$RainCountMid_2_val = $RainCountMid_2->fetch(PDO::FETCH_ASSOC);
$ThunderCountMid_2_val = $ThunderCountMid_2->fetch(PDO::FETCH_ASSOC);

$TotalMid_2 = $TotalCountMid_2_val['TotalCount'];
if($TotalMid_2<1) {$TotalMid_2 = 1;}
$SunCoefMid_2 = $SunCountMid_2_val['SunCount']/$TotalMid_2;
$CloudCoefMid_2 = $CloudCountMid_2_val['CloudCount']/$TotalMid_2;
$RainCoefMid_2 = $RainCountMid_2_val['RainCount']/$TotalMid_2;
$ThunderCoefMid_2 = $ThunderCountMid_2_val['ThunderCount']/$TotalMid_2;

if($SunCoefMid_2>1) {$SunCoefMid_2 = 1;}
if($CloudCoefMid_2>1) {$CloudCoefMid_2 = 1;}
if($RainCoefMid_2>1) {$RainCoefMid_2 = 1;}
if($ThunderCoefMid_2>1) {$ThunderCoefMid_2 = 1;}

$SqlMid_2 =  "SELECT AVG(nullif(SunVal, 0))*".$SunCoefMid_2." as SunValAVG,AVG(nullif(RainVal, 0))*".$RainCoefMid_2." as RainValAVG,AVG(nullif(CloudVal, 0))*".$CloudCoefMid_2." as CloudValAVG,AVG(nullif(ThunderVal, 0))*".$ThunderCoefMid_2." as ThunderValAVG FROM (select SunVal as SunVal,RainVal as RainVal,CloudVal as CloudVal,ThunderVal as ThunderVal FROM user_mood_hist inner JOIN (SELECT MAX(id) as LastEntered, t1.login_id FROM (SELECT id, login_id FROM user_mood_hist where entered >= date_sub('".$IntervalEndDate."',INTERVAL ".$IntervalMid." HOUR) and entered <= '".$IntervalEndDate."') AS t1 group by t1.login_id) as t2 ON id = LastEntered inner JOIN group_members ON user_id = t2.login_id and group_id =".$group_id.") as t3;";

$averagesMid_2 = $dbh->query($SqlMid_2);

$dataMid_2='';
while($Mid_2 = $averagesMid_2->fetch(PDO::FETCH_ASSOC)){
	$dataMid_2[] = $Mid_2;
}

$SunValAVG_2 = $dataMid_2[0]['SunValAVG'];
$RainValAVG_2 = $dataMid_2[0]['RainValAVG'];
$CloudValAVG_2 = $dataMid_2[0]['CloudValAVG'];
$ThunderValAVG_2 = $dataMid_2[0]['ThunderValAVG'];

// =======================================================================================================

$TotalCount = $TotalMid_2 + $TotalMid_1;
$TotalCountCoef_Mid1 = $TotalMid_1 / $TotalCount;
$TotalCountCoef_Mid2 = $TotalMid_2 / $TotalCount;

$SunValAVG_1 = $dataMid_1[0]['SunValAVG']*$TotalCountCoef_Mid1;
$RainValAVG_1 = $dataMid_1[0]['RainValAVG']*$TotalCountCoef_Mid1;
$CloudValAVG_1 = $dataMid_1[0]['CloudValAVG']*$TotalCountCoef_Mid1;
$ThunderValAVG_1 = $dataMid_1[0]['ThunderValAVG']*$TotalCountCoef_Mid1;

$SunValAVG_2 = $dataMid_2[0]['SunValAVG']*$TotalCountCoef_Mid2;
$RainValAVG_2 = $dataMid_2[0]['RainValAVG']*$TotalCountCoef_Mid2;
$CloudValAVG_2 = $dataMid_2[0]['CloudValAVG']*$TotalCountCoef_Mid2;
$ThunderValAVG_2 = $dataMid_2[0]['ThunderValAVG']*$TotalCountCoef_Mid2;

$TrendData = array('SunValAVG_1' => $SunValAVG_1,'RainValAVG_1' => $RainValAVG_1,'CloudValAVG_1' => $CloudValAVG_1,'ThunderValAVG_1' => $ThunderValAVG_1,'SunValAVG_2' => $SunValAVG_2,'RainValAVG_2' => $RainValAVG_2,'CloudValAVG_2' => $CloudValAVG_2,'ThunderValAVG_2' => $ThunderValAVG_2);

echo "[".json_encode($TrendData)."]";

die;

?>