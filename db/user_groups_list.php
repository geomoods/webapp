<?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

//$user_id = $_GET['user_id'];
$user_id = $_GET['user_id'];

$group_list = $dbh->prepare("SELECT groups.id, if(user_id = ".$user_id.", 'true','false') as IsMember,if(Owner_id = ".$user_id.", 'true','false') as IsOwner, groups.Group_name, groups.update_freq, Anonymous FROM groups LEFT OUTER JOIN group_members ON groups.id = group_members.group_id and group_members.user_id = ".$user_id." where user_id = ".$user_id." or owner_id = ".$user_id." order by groups.Group_name asc");

$group_list->execute();

while($row = $group_list->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode( $data );

?>