<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$hosp = $_GET['hosp_id'];
$tumbon = $_GET['tumbon_id'];
$mooban = $_GET['town_id'];

// จำนวนสำรวจ แยกตามตำบล
$strSQL = "CREATE TEMPORARY TABLE hi_temp AS SELECT town_id, CONCAT(LEFT(town_id, 6), '00') AS tumbon_id 
	FROM hi_index WHERE hi_date BETWEEN '".$date1."' AND '".$date2."' AND LEFT(town_id, 2) = '34'";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$strSQL = "CREATE TEMPORARY TABLE hi_survey AS SELECT tumbon_id, COUNT(town_id) AS survey FROM hi_temp GROUP BY tumbon_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// จำนวนหมู่บ้านทั้งหมดแยกรายอำเภอ
$strSQL = "CREATE TEMPORARY TABLE ampur1 AS SELECT town_id, town_name, CONCAT(LEFT(town_id, 6), '00') AS tumbon_id FROM towns WHERE LEFT(town_id, 4) IN 
	(SELECT LEFT(town_id, 4) FROM towns WHERE hospmain = '".$hosp."' ORDER BY town_id) AND right(town_id, 2) != '00'";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ampur2 AS SELECT tumbon_id, COUNT(town_id) AS amount FROM ampur1 GROUP BY tumbon_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ampur AS SELECT a.tumbon_id, b.town_name AS tumbon, a.amount FROM ampur2 a, towns b WHERE a.tumbon_id = b.town_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// รวมการสำรวจรายตำบล
$strSQL = "CREATE TEMPORARY TABLE ampur_survey AS SELECT a.*, b.survey, ROUND(b.survey*100/a.amount, 2) AS pcent FROM ampur a LEFT JOIN hi_survey b ON (a.tumbon_id = b.tumbon_id)";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "SELECT tumbon_id, tumbon AS label, 
	CASE WHEN survey > 0 THEN CONCAT('T=', amount, '/S=', survey, '/P=', pcent, '%') 
	     WHEN ISNULL(survey) THEN 'ไม่ได้สำรวจ' 
	END AS rightText FROM ampur_survey ORDER BY tumbon";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$record = mysql_num_rows($objQuery)-1;
$totalField = mysql_num_fields($objQuery)-1;
$return = '{identifier: "unique_id", items:[';
//$return = '';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	//$row = '"unique_id":'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		//$field = '"'.mysql_field_name($objQuery, $nfield).'"'.':';
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
//echo $return;
mysql_free_result($objQuery);
?> 