<?php
//header("Access-Control-Allow-Origin: *");

include 'm30_fct.php';

$cid = $_GET['cid'];
mysql_query("SET NAMES UTF8");

$strSQL = "SELECT CONCAT(TRIM(a.fname), '  ', a.lname) AS fullname, CAST(b.adl1 AS unsigned) + CAST(b.adl2 AS unsigned) + CAST(b.adl3 AS unsigned) + CAST(b.adl4 AS unsigned) + CAST(b.adl5 AS unsigned) + CAST(b.adl6 AS unsigned) + CAST(b.adl7 AS unsigned) + CAST(b.adl8 AS unsigned) + CAST(b.adl9 AS unsigned) + CAST(b.adl10 AS unsigned) AS nadl, CONCAT('ต.', c.town_name) AS town, ROUND(DATEDIFF(CURDATE(), BIRTHDATE)/365, 0) AS age, if(SEX='1', 'ชาย ', 'หญิง') AS sex, d.town_name AS ban, a.home_adr, a.cid, b.cg_name, b.cg_relate, b.econ_pb, b.dv_need, b.comp_diag FROM population a, adl_pop b, towns c, towns d WHERE a.cid = '".$cid."' AND a.cid = b.cid AND CONCAT(LEFT(a.town_id, 6), '00') = c.town_id AND a.town_id = d.town_id AND b.auto_id IN (SELECT MAX(auto_id) AS auto_id FROM adl_pop GROUP BY cid)" ;

$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");
$record = mysql_num_rows($objQuery)-1;
$totalField = 13-1;
$return = '';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;

	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{

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

	if($n<$record)
	{
		$return = $return.$row.',';
	}
	else
	{
		$return = $return.$row';
	}
	$row = "";
	$value = '';
}
echo $return;
mysql_free_result($objQuery);
?> 