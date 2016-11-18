<?php
Header("Access-Control-Allow-Origin: *");
//Header('Content-type: application/json; charset=utf-8');

include 'm30_fct.php';
$town = $_GET['town_id'];
$staff = $_GET['staffcid'];
$hi_index = $_GET['hi_index'];
$auto = $_GET['auto_id'];

mysql_query("SET NAMES UTF8");

if ($auto == "0") {
	$strSQL = "INSERT INTO hi_index (hi_date, cid, town_id, hi_value) VALUES (CURDATE(), '".$staff."', '".$town."', ".$hi_index.")";
} else {
	$strSQL = "UPDATE hi_index SET hi_value = ".$hi_index.", cid = '".$staff."', hi_date = CURDATE() WHERE auto_id = ".$auto;
}
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
echo $strSQL;
mysql_free_result($objQuery);

?>