<?php
header("Access-Control-Allow-Origin: *");
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$grade = $_GET['grade'];
$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$town = substr($_GET['town_id'], 0, 4);
$type = $_GET['ctype'];

if($grade == 0) {$cgrade = " AND a.ci_value = 0";}
else {$cgrade = " AND a.ci_value > 0";}
// รายชื่ออำเภอในจังหวัดอุบลราชธานี
$strSQL = "CREATE TEMPORARY TABLE ampur0 AS SELECT town_id AS ampur_id, town_name AS ampur FROM towns WHERE LEFT(town_id, 2)='34' AND LEFT(town_id, 4)!='3400' 
	AND RIGHT(town_id, 4)='0000' AND LEFT(town_name, 1)!='*' AND LEFT(town_name, 6) != 'เทศบาล'";
if (strlen($town)==4) {$strSQL = $strSQL."AND LEFT(town_id, 4)='".$town."'";}
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ค่าสำรวจ CI
$strSQL = "CREATE TEMPORARY TABLE ci_temp0 AS SELECT * FROM ci_index WHERE ci_date BETWEEN '".$date1."' AND '".$date2."' ORDER BY ci_date DESC";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ci_temp1 AS SELECT * FROM ci_temp0 GROUP BY ci_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ci_temp AS SELECT a.ci_id, b.ci_type, b.ci_name, b.town_id, 
	CASE WHEN b.ci_type = '001' THEN 'วัด'
	     WHEN b.ci_type = '002' THEN ''
	     WHEN b.ci_type = '003' THEN 'ศูนย์เด็ก'
	     WHEN b.ci_type = '004' THEN 'อบต.'
	     WHEN b.ci_type = '005' THEN 'หน่วยงาน'
	END AS ci_title, CONCAT(LEFT(b.town_id, 4), '0000') AS ampur_id, a.ci_value 
	FROM ci_temp1 a, ci_units b WHERE a.ci_id = b.ci_id AND b.ci_type ='".$type."'".$cgrade;
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ออกรายงาน
$strSQL = "SELECT CONCAT(a.ci_title, a.ci_name) AS label, b.ampur, 
	 CONCAT(TRIM(b.ampur), ' #', a.ci_value) AS rightText, a.ci_type FROM ci_temp a, ampur0 b WHERE a.ampur_id = b.ampur_id 
	ORDER BY b.ampur, a.ci_name DESC";
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