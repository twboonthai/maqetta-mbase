<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$parameter = $_GET['hosp_id'];
$strSQL = "SELECT a.hosp_id, a.hosp_name AS label FROM hospitals a, towns b WHERE b.hospmain = '".$parameter."' AND a.hosp_id = b.hospsub GROUP BY a.hosp_id ORDER BY a.hosp_name";

$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery)-1;
$totalField = 2-1;
$return = '{identifier: "unique_id", items:[';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		$fldval = str_replace('"', '', $items[$nfield]);
		$value = $field.'"'.$fldval.'"';
		if($nfield<$totalField)
		{
			$row = $row.$value.','; // ลบ space
		}
		else
		{
			$row = $row.$value; // ลบ space
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