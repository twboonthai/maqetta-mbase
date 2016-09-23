<?php
include 'm30_fct.php';
mysql_query("SET NAMES UTF8");

$date1 = $_GET['date1'];
$date2 = $_GET['date2'];
$town = substr($_GET['town_id'], 0, 6);

// ค่าสำรวจ CI ทั้งหมด ในช่วงเวลา  ci_temp /////////////////////////////////////////////////////////
$strSQL = "CREATE TEMPORARY TABLE ci_temp1 AS SELECT a.*, b.ci_type, b.town_id FROM ci_index a, ci_units b
	WHERE a.ci_date BETWEEN '".$date1."' AND '".$date2."' AND a.ci_id = b.ci_id ORDER BY a.ci_date DESC";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ci_temp0 AS SELECT * FROM ci_temp1 GROUP BY ci_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ความครอบคลุม
$strSQL = "CREATE TEMPORARY TABLE ci_0 AS SELECT ci_type, COUNT(ci_id) AS ci0 
	FROM ci_temp0 WHERE ci_value = 0 AND left(town_id, 6)='".$town."'";
$strSQL = $strSQL." GROUP BY ci_type";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

$strSQL = "CREATE TEMPORARY TABLE ci_1 AS SELECT ci_type, COUNT(ci_id) AS ci1 
	FROM ci_temp0 WHERE ci_value > 0 AND left(town_id, 6)='".$town."'";
$strSQL = $strSQL." GROUP BY ci_type";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
//

$strSQL = "CREATE TEMPORARY TABLE ci_temp AS SELECT * FROM ci_temp0 WHERE 
	left(town_id, 6)='".$town."'";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
///////////////////////////////////////////////////////////////////////////////////////

//จำนวนหน่วยงานที่สำรวจ แยกตาม ci_type
$strSQL = "CREATE TEMPORARY TABLE ci_survey AS SELECT ci_type, COUNT(ci_id) AS survey FROM ci_temp0 
	WHERE left(town_id, 6)='".$town."'";
$strSQL = $strSQL." GROUP BY ci_type";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// หน่วยงาน CI ทั้งหมดเพื่อคำนวณความครอบคลุม
$strSQL = "CREATE TEMPORARY TABLE ci_rpt0 AS SELECT ci_type, 
	CASE WHEN ci_type = '001' THEN 'วัด'
	     WHEN ci_type = '002' THEN 'โรงเรียน'
	     WHEN ci_type = '003' THEN 'ศูนย์เด็ก'
	     WHEN ci_type = '004' THEN 'อบต.'
	     WHEN ci_type = '005' THEN 'หน่วยงาน'
	END AS ci_title, COUNT(ci_id) AS total_unit FROM ci_units 
	WHERE left(town_id, 6)='".$town."'";
$strSQL = $strSQL." GROUP BY ci_type";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ประมวลผล  
$strSQL = "CREATE TEMPORARY TABLE ci_rpt1 AS SELECT a.*, b.survey, CONCAT(ROUND(b.survey*100/a.total_unit, 2), '%') AS spcent, 
	c.ci0, CONCAT(ROUND(c.ci0*100/b.survey, 2), '%') AS pcent0,
	d.ci1, CONCAT(ROUND(d.ci1*100/b.survey, 2), '%') AS pcent1 FROM ci_rpt0 a LEFT JOIN ci_survey b ON (a.ci_type = b.ci_type) 
	LEFT JOIN ci_0 c ON (a.ci_type = c.ci_type) LEFT JOIN ci_1 d ON (a.ci_type = d.ci_type)";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ออกรายงาน
$strSQL = "CREATE TEMPORARY TABLE ci_rpt AS SELECT ci_title, ci_type, 
	CASE WHEN survey > 0 THEN CONCAT(survey, '/', total_unit, '=', spcent)
	     WHEN ISNULL(survey) THEN 'ไม่ได้สำรวจ' 
	END AS survey,
	CASE WHEN ci0 > 0 THEN CONCAT(ci0, '/', survey, '=', pcent0)
	     WHEN ISNULL(ci0) THEN '-' 
	END AS ci0,
	CASE WHEN ci1 > 0 THEN CONCAT(ci1, '/', survey, '=', pcent1)
	     WHEN ISNULL(ci0) THEN '-' 
	END AS ci1, ci0 AS nci0, ci1 AS nci1 FROM ci_rpt1 ORDER BY ci_type";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// ข้อมูลแยกรายประเภทหน่วย
$strSQL = "SELECT ci_title AS label, survey AS rightText, ci_type, nci0, nci1 FROM ci_rpt";
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