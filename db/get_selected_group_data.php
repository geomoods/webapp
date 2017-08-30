<?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$group_id = $_GET['group_id'];
$user_id = $_GET['user_id'];

$group_list = $dbh->prepare("SELECT IfNull((select 'true' from group_members where user_id=".$user_id." and group_id=".$group_id."),'false') as IsMember,IfNull((select '-1' from group_members where user_id=".$user_id." and group_id=".$group_id." and Anonymous=-1),'0') as IsPrivate,if(Owner_id = ".$user_id.", 'true','false') as IsOwner, Group_name, update_freq  FROM groups where id=".$group_id);
$group_list->execute();

$data='';

while($row = $group_list->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode( $data );

?>