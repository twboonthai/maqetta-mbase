<?php

include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$town = $_GET["town"];

if (strlen($town) == 0) {
$strSQL = "SELECT npps, CONCAT('PPS = ', npps, '%') AS label, COUNT(cid) AS rightText FROM pps_pop WHERE cid NOT IN (SELECT cid FROM deaths) AND trim(cid) > '' 
	AND auto_id IN (SELECT MAX(auto_id) AS auto_id FROM pps_pop GROUP BY cid) GROUP BY npps ORDER BY npps DESC"; }
else {
$strSQL = "SELECT a.npps, CONCAT('PPS = ', a.npps, '%') AS label, $town AS ampur_id, COUNT(a.cid) AS rightText FROM pps_pop a, population b WHERE a.cid NOT IN (SELECT cid FROM deaths) 
	AND a.cid = b.cid AND LEFT(b.town_id, 4) = LEFT($town, 4) AND trim(a.cid) > '' 
	AND a.auto_id IN (SELECT MAX(auto_id) AS auto_id FROM pps_pop GROUP BY cid) GROUP BY npps ORDER BY npps DESC"; }
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$record = mysql_num_rows($objQuery)-1;
$totalField = mysql_num_fields($objQuery)-1;
$return = '{identifier: "unique_id", items:[';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		$value = '"'.$items[$nfield].'"';

		if($nfield<$totalField)
		{
			$row = $row.trim($field.$value).','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.$value); // ลบ space
		}
	}
	$return = $return.'{';
	if($n<$record)
	{
		$return = $return.$row.'},';
	}
	else
	{
		$return = $return.$row.'}';
	}
	$row = "";
	$value = '';
}
echo $return."]}";
mysql_free_result($objQuery);
?> 