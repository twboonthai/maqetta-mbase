<?php
include 'm30_fct.php';
$level = $_GET['level'];
$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$hosp = $_GET['hosp_id'];
$grade = $_GET['grade'];
$tumbon = $_GET['tumbon_id'];
$mooban = $_GET['town_id'];

// HI
$strSQL = "CREATE TEMPORARY TABLE hi_temp AS SELECT a.town_id, a.hi_value, b.town_name,  CONCAT(LEFT(a.town_id, 6), '00') AS tumbon_id,
	CONCAT(LEFT(a.town_id, 4), '0000') AS ampur_id,	
	CASE WHEN a.hi_value = 0 THEN '1'
	     WHEN a.hi_value < 10 THEN '2'
	     WHEN a.hi_value >= 10 THEN '3'
	END AS grade, b.hospmain AS hosp_id FROM hi_index a, towns b WHERE a.town_id = b.town_id AND a.hi_date 
	BETWEEN '".$date1."' AND '".$date2."' AND LEFT(a.town_id, 2) = '34' GROUP BY a.town_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery);

$strSQL = "CREATE TEMPORARY TABLE hi_score AS SELECT a.ampur_id, b.town_name AS ampur, a.tumbon_id, c.town_name AS tumbon, a.town_id, a.town_name AS mooban,
	a.hosp_id, a.hi_value, a.grade FROM hi_temp a, towns b, towns c WHERE a.ampur_id = b.town_id AND a.tumbon_id = c.town_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

if ($level == "1"){
	if (strlen($hosp)==0) {
		$strSQL = "SELECT town_id FROM hi_score";
		$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
		$record = mysql_num_rows($objQuery);
		$strSQL = "SELECT 
			CASE WHEN grade = '1' THEN 'green.jpg'
			     WHEN grade = '2' THEN 'yellow.jpg'
			     WHEN grade = '3' THEN 'red.jpg'
			END AS icon, hosp_id, grade, COUNT(grade) AS label, CONCAT(ROUND(COUNT(grade)*100/$record,2),  ' %') AS rightText FROM hi_score GROUP BY grade ORDER by grade";
	} else {
		$strSQL = "SELECT town_id FROM hi_score WHERE hosp_id = '".$hosp."'";
		$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
		$record = mysql_num_rows($objQuery);
		$strSQL = "SELECT 
			CASE WHEN grade = '1' THEN 'green.jpg'
			     WHEN grade = '2' THEN 'yellow.jpg'
			     WHEN grade = '3' THEN 'red.jpg'
			END AS icon, hosp_id, grade, COUNT(grade) AS label,  CONCAT(ROUND(COUNT(grade)*100/$record, 2),  ' %') AS rightText FROM hi_score WHERE hosp_id = '".$hosp."' GROUP BY grade ORDER by grade";
	}
} elseif ($level=="2") {
	if (strlen($hosp)==0) {
		$strSQL = "SELECT ampur_id, hosp_id, ampur AS label, town_id, grade, COUNT(town_id) AS rightText FROM hi_score WHERE grade = '".$grade."' GROUP BY ampur_id ORDER BY ampur";
		$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
	} else {
		$strSQL = "SELECT tumbon_id, hosp_id, tumbon AS label, town_id, grade, COUNT(town_id) AS rightText FROM hi_score WHERE hosp_id = '".$hosp."' AND grade = '".$grade."' GROUP BY tumbon_id ORDER BY tumbon";
		$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
	}
} elseif ($level=="3") {
	$strSQL = "SELECT town_id, mooban AS label, tumbon, grade, CONCAT('HI=', hi_value) AS rightText FROM hi_score WHERE tumbon_id = '".$tumbon."' AND grade = '".$grade."' ORDER BY hi_value DESC";
	$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
} elseif ($level=="4") {
	$strSQL = "SELECT CONCAT('บ.', town_name) AS label, grade, town_id, COUNT(grade) AS rightText FROM hi_score WHERE grade = '".$grade."' AND tumbon_id = '".$tumbon."' GROUP BY town_name ORDER BY town_name";
}

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