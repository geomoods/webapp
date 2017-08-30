<?php 

header('Content-type:application/json');
include("db.php");

$dbh = new PDO('mysql:host='.$servername.';dbname=' .$dbname, $username, $password);

$user_id = $_GET['user_id'];
$list = $_GET['list'];
//$user_id = 1;
$data='';
switch ($list) {
    case 1:
        $sql = "SELECT groups.id, group_id, user_id, Owner_id, groups.Group_name, Anonymous FROM groups 
				INNER JOIN group_members
     			ON groups.id = group_members.group_id and group_members.user_id = ".$user_id." order by groups.Group_name asc";
        break;
	case 2:
		$sql = "  SELECT distinct groups.id, group_id,-1 as user_id, Owner_id, groups.Group_name, null as Anonymous FROM groups 
				LEFT outer JOIN group_members
				ON groups.id = group_members.group_id where groups.id not in(select group_id from group_members where user_id = ".$user_id.") order by groups.Group_name asc;";
	break;
}

$group_list = $dbh->prepare($sql);
$group_list->execute();

while($row = $group_list->fetch(PDO::FETCH_ASSOC)){
$data[] = $row;
	}
echo json_encode( $data );

?>