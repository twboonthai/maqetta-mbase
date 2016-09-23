<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");

$strSQL = "SELECT a.hosp_id, a.hosp_name, LEFT(b.town_id, 4) AS ampur FROM hospitals a, towns b WHERE a.is_main = 1 AND a.hosp_id = b.hospmain LIMIT 1"; 
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$record = mysql_num_rows($objQuery)-1;
$totalField = 3-1;
$return = '';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$value = $items[$nfield];
		if($nfield<$totalField)
		{
			$row = $row.trim($field.$value).','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.$value); // ลบ space
		}
	}
	$return = $return.$row.',';
	$row = "";
	$value = '';
}

echo $return;
mysql_free_result($objQuery);

?> 