<?php
$objConnect = mysql_connect("m30.phoubon.in.th", "m30_fct","##m30##") or die("Error Connect to Database");
mysql_query("SET NAMES UTF8");
$objDB = mysql_select_db("m30_fct");
?> 