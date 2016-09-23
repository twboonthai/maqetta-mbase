<?php

include 'm30_fct.php';
mysql_query("SET NAMES UTF8");
$score = $_GET["npps"];
$town = $_GET["town"];

// Individual with npps = $score, NOT DEAD, latest score
$strSQL = "CREATE TEMPORARY TABLE pps_score0 AS SELECT a.cid, b.town_id, b.home_adr, CONCAT(TRIM(b.fname), '  ', b.lname) AS fullname, 
	CAST(b.home_adr AS unsigned) AS nadr, b.sex, CONCAT(LEFT(b.town_id, 4), '0000') AS ampur_id, b.birthdate, 
	CONCAT(LEFT(b.town_id, 6), '00') AS tumbon_id FROM pps_pop a, population b WHERE a.npps = ".$score.
	" AND a.cid NOT IN (SELECT cid FROM deaths) AND TRIM(a.cid) > '' AND a.auto_id IN (SELECT MAX(auto_id) AS auto_id FROM pps_pop GROUP BY cid) 
	AND a.cid = b.cid GROUP BY a.cid"; 
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// Name ampur, tumbon, mooban
$strSQL = "CREATE TEMPORARY TABLE pps_score AS SELECT a.*, b.town_name AS mooban, c.town_name AS tumbon, d.town_name AS ampur FROM pps_score0 a,
	towns b, towns c, towns d WHERE a.town_id = b.town_id AND a.tumbon_id = c.town_id AND a.ampur_id = d.town_id";
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

// Ampur List
if ($town=="") {
	$strSQL = "SELECT CONCAT('อ.', ampur) AS label, ampur_id, COUNT(cid) AS rightText, ampur FROM pps_score GROUP BY ampur_id ORDER BY ampur";
}

// Tumbon List
else if(substr($town, 4, 4)=="0000" && substr($town, 2, 2) != "00") {
	$strSQL = "SELECT CONCAT('ต.', tumbon) AS label, tumbon_id, COUNT(cid) AS rightText, tumbon FROM pps_score WHERE ampur_id = '".$town."' GROUP BY tumbon_id ORDER BY tumbon";
}

// Mooban List
else if(substr($town, 6, 2)=="00" && substr($town, 4, 2) != "00") {
	$strSQL = "SELECT mooban AS label, town_id, COUNT(cid) AS rightText, mooban FROM pps_score WHERE tumbon_id = '".$town."' GROUP BY town_id ORDER BY town_id";
}

// Individual List
else if (substr($town, 6, 2)!="00") {
	$strSQL = "SELECT fullname AS label, cid, home_adr, CONCAT(cid, ' # ', home_adr) AS rightText FROM pps_score WHERE town_id = '".$town."' ORDER BY nadr";
}

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