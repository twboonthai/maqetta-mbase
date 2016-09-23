<?php
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$type = $_GET['ctype'];

// รายชื่ออำเภอในจังหวัดอุบลราชธานี
$strSQL = "CREATE TEMPORARY TABLE ampur0 AS SELECT town_id AS ampur_id, town_name AS ampur FROM towns WHERE LEFT(town_id, 2)='34' AND LEFT(town_id, 4)!='3400' 
	AND RIGHT(town_id, 4)='0000' AND LEFT(town_name, 1)!='*' AND LEFT(town_name, 6) != 'เทศบาล'";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// รายชื่ออำเภอ/รหัสโรงพยาบาล ในจังหวัดอุบลราชธานี
$strSQL = "CREATE TEMPORARY TABLE ampur_hosp AS SELECT CONCAT(LEFT(town_id, 4), '0000') AS ampur_id, hospmain AS hosp_id FROM towns WHERE LEFT(town_id, 2)='34' 
	AND LEFT(town_name, 1)!='*' AND TRIM(hospmain) > '' GROUP BY LEFT(town_id, 4)";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// รายชื่ออำเภอ และ รหัสสถานบริการ
$strSQL = "CREATE TEMPORARY TABLE ampur AS SELECT a.ampur_id, a.ampur, b.hosp_id FROM ampur0 a, ampur_hosp b WHERE a.ampur_id = b.ampur_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ค่าสำรวจ CI
$strSQL = "CREATE TEMPORARY TABLE ci_temp0 AS SELECT a.*, b.ci_type, c.ampur_id, c.ampur FROM ci_index a, ci_units b, ampur c
	WHERE a.ci_date BETWEEN '".$date1."' AND '".$date2."' AND a.ci_id = b.ci_id AND 
	CONCAT(LEFT(b.town_id, 4), '0000') = c.ampur_id ORDER BY a.ci_date DESC";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$strSQL = "CREATE TEMPORARY TABLE ci_temp AS SELECT * FROM ci_temp0 GROUP BY ci_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// CI = 0 ตาม ampur_id
$strSQL = "CREATE TEMPORARY TABLE ci_0a AS SELECT ampur_id, COUNT(ci_id) AS ci0 FROM ci_temp WHERE ci_value = 0 GROUP BY ampur_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// CI > 0 ตาม ampur_id
$strSQL = "CREATE TEMPORARY TABLE ci_1a AS SELECT ampur_id, COUNT(ci_id) AS ci1 FROM ci_temp WHERE ci_value > 0 GROUP BY ampur_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

//จำนวนหน่วยงานที่สำรวจ แยกตามอำเภอ
$strSQL = "CREATE TEMPORARY TABLE ci_surveya AS SELECT ampur_id, ampur, COUNT(ci_id) AS survey FROM ci_temp GROUP BY ampur_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// หน่วยงาน ci_units แยกรายอำเภอ
$strSQL = "CREATE TEMPORARY TABLE ci_ampur0 AS SELECT CONCAT(LEFT(town_id, 4), '0000') AS ampur_id, COUNT(ci_id) AS total_unit FROM ci_units GROUP BY LEFT(town_id, 4)";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$strSQL = "CREATE TEMPORARY TABLE ci_ampur AS SELECT a.ampur, a.ampur_id, b.total_unit FROM ampur a LEFT JOIN ci_ampur0 b ON (a.ampur_id = b.ampur_id) ORDER BY a.ampur";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ประมวลผล แยกราย ampur_id
$strSQL = "CREATE TEMPORARY TABLE ci_rpt1a AS SELECT a.*, b.survey, CONCAT(ROUND(b.survey*100/a.total_unit, 2), '%') AS spcent, 
	c.ci0, CONCAT(ROUND(c.ci0*100/b.survey, 2), '%') AS pcent0,
	d.ci1, CONCAT(ROUND(d.ci1*100/b.survey, 2), '%') AS pcent1 FROM ci_ampur a LEFT JOIN ci_surveya b ON (a.ampur_id = b.ampur_id) 
	LEFT JOIN ci_0a c ON (a.ampur_id = c.ampur_id) LEFT JOIN ci_1a d ON (a.ampur_id = d.ampur_id)";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ออกรายงาน แยกราย ampur_id
$strSQL = "CREATE TEMPORARY TABLE ci_rpta AS SELECT ampur, ampur_id, spcent, pcent0, pcent1, 
	CASE WHEN survey > 0 THEN CONCAT(survey, '/', total_unit, '=', spcent)
	     WHEN ISNULL(survey) THEN 'ไม่ได้สำรวจ' 
	END AS survey,
	CASE WHEN ci0 > 0 THEN CONCAT(ci0, '/', survey, '=', pcent0)
	     WHEN ISNULL(ci0) THEN '-' 
	END AS ci0,
	CASE WHEN ci1 > 0 THEN CONCAT(ci1, '/', survey, '=', pcent1)
	     WHEN ISNULL(ci0) THEN '-' 
	END AS ci1 FROM ci_rpt1a";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

if ($type=="1") {$strSQL = "SELECT ampur AS label, ampur_id, ci1 AS rightText FROM ci_rpta ORDER BY pcent1 DESC";}
else if($type=="2") {$strSQL = "SELECT ampur AS label, ampur_id, ci0 AS rightText FROM ci_rpta ORDER BY pcent0 DESC";}
else if($type=="3") {$strSQL = "SELECT ampur AS label, ampur_id, survey AS rightText FROM ci_rpta ORDER BY spcent DESC";}

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