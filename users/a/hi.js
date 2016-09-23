/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 var cdate1 = "";
 var cdate2 = "";
 
require([
	"dijit/PopupMenuBarItem",
  	"dijit/MenuItem",
  	"dijit/Menu",
  	"gridx/modules/VirtualVScroller",
  	"dijit/layout/ContentPane",
  	"dijit/form/Button",
  	"dijit/form/ComboButton",
 	"dojo/ready",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/data/ItemFileReadStore",
 	"dijit/registry",
 	"dojo/on",
 	"dojo/dom",
    "dojox/charting/Chart",
    "dojox/charting/axis2d/Default",
    "dojox/charting/plot2d/Lines",	
    "dojox/charting/plot2d/StackedColumns",	
	"dojox/charting/plot2d/Grid",
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(popup, mitem, menu, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
		//// Define Object
		var ac_back = reg.byId("ac_back");
		var ampur_coverage = reg.byId("ampur_coverage");
		var ap_coverage = reg.byId("ap_coverage");
		
		var ampur_back = reg.byId("ampur_back");
		var ampur_title = reg.byId("ampur_title");
		var ampur_list = reg.byId("ampur_list");
		var hi_ampur = reg.byId("hi_ampur");
		var btn_coverage = reg.byId("btn_coverage");
		var coverage_list = reg.byId("coverage_list");
		var btn_ampur = reg.byId("btn_ampur");
		var hi_title = reg.byId("hi_title");
		var hi_town = reg.byId("hi_town");
		var town_back = reg.byId("town_back");
		
		var hi_village = reg.byId("hi_village");
		var village_title = reg.byId("village_title");
		var village_list = reg.byId("village_list");
		var village_back = reg.byId("village_back");
		
		var town_list = reg.byId("town_list");
		var hi_province = reg.byId("hi_province");
		var hi_main = reg.byId("hi_main");
		var hi_coverage = reg.byId("hi_coverage");
		var ampur = reg.byId("ampur");
		var hi_list = reg.byId("hi_list");
		var hi_back = reg.byId("hi_back");
		var calendar1 = reg.byId("calendar1");
		var date1_title = reg.byId("date1_title");
		var calendar2 = reg.byId("calendar2");
		var date2_title = reg.byId("date2_title");
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		var firstDay = new Date(y, 0, 1);
		var lcdate = firstDay.getDate();
		var lcmonth = firstDay.getMonth()+1;
		var lcyear = firstDay.getFullYear();
		cdate1 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
		var lcdate1 = tsdate(firstDay);
		date1_title.set("title", lcdate1);
		var lastDay = new Date(y, m + 1, 0);
		var lcdate = lastDay.getDate();
		var lcmonth = lastDay.getMonth()+1;
		var lcyear = lastDay.getFullYear();
		cdate2 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
		var lcdate2 = tsdate(lastDay);
		date2_title.set("title", lcdate2);

		on(calendar1, "change", function() {
			var ldapp = calendar1.get("value");
			var lcdate = ldapp.getDate();
			var lcmonth = ldapp.getMonth()+1;
			var lcyear = ldapp.getFullYear();
			cdate1 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
			var lcdate1 = tsdate(ldapp);
			date1_title.set("title", lcdate1);
			date1_title.set("open", false);
		});
		
		on(calendar2, "change", function() {
			var ldapp = calendar2.get("value");
			var lcdate = ldapp.getDate();
			var lcmonth = ldapp.getMonth()+1;
			var lcyear = ldapp.getFullYear();
			cdate2 = lcyear.toString() + "." + lcmonth.toString() + "." + lcdate.toString();
			var lcdate2 = tsdate(ldapp);
			date2_title.set("title", lcdate2);
			date2_title.set("open", false);
		});
		
//// 1. Back to Previous
		on(hi_back, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
		});

//// 2. Back to HI Main		
		var cvg_back = reg.byId("cvg_back");
		on(cvg_back, "click", function() {
			hi_coverage.performTransition("hi_main", -1, "slide", null);
		});
		
//// 3. go to HI Coverage		
		on(btn_coverage, "click", function() {
			var lampur = btn_ampur.get("checked");
			if (lampur == true) {hi_main.performTransition("hi_coverage", 1, "slide", null);}
			else {hi_main.performTransition("ampur_coverage", 1, "slide", null);}
			btn_coverage.set("checked", false);
		});
//// 4. Back to HI Main		
		on(town_back, "click", function() {
			var lampur = btn_ampur.get("checked");
			if (lampur == true) {hi_town.performTransition("hi_main", -1, "slide", null);}
			else {hi_town.performTransition("hi_ampur", -1, "slide", null);}
		});
//// 5. Back to hi_town	
		on(village_back, "click", function() {
			hi_village.performTransition("hi_town", -1, "slide", null);
		});
//// 6. Back to HI Main		
		on(ampur_back, "click", function() {
			hi_ampur.performTransition("hi_main", -1, "slide", null);
		});
		
//// 7. Back to HI Main		
		on(ac_back, "click", function() {
			ampur_coverage.performTransition("hi_main", -1, "slide", null);
		});

//// เลือกเฉพาะอำเภอ
		on(btn_ampur, "click", function() {
			var lcampur = ampur.get("value");
			var lctext = "?date1=" + cdate1 + "&date2=" + cdate2 + "&level=1&hosp_id=" + lcampur;
			list("hi_list", "hi_score.php" + lctext);
			var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&level=1&hosp_id=" + lcampur;
			list("coverage_list", "hi_tumbon.php" + lctext2);
			hi_province.set("checked", false);
		});

//// เลือกรวมจังหวัด
		on(hi_province, "click", function() {
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=1";
			list("hi_list", lctext);
			var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2;
			list("ap_coverage", "hi_ampur.php" + lctext2);
			btn_ampur.set("checked", false);
		});
		
//// คลิก Green, Yellow, Red
		on(hi_list, "click", function() {
			var lampur = btn_ampur.get("checked");
			var ctitle = "รายอำเภอ";
			if (lampur == true) {
				var lcampur = ampur.get("value");
				ctitle = "รายตำบล";
				var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&hosp_id=" + lcampur;
			} else {
				var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2";
			}
			//// ระบุรายการที่เลือก
			var all_list = hi_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		   	if (lcgrade == "1") {ctitle = "HI=0 " + ctitle;}
		   	if (lcgrade == "2") {ctitle = "HI<10 " + ctitle;}
		   	if (lcgrade == "3") {ctitle = "HI>=10 " + ctitle;}
		   	hi_title.set("label", "จำนวนหมู่บ้าน " + ctitle);
		   	lctext = lctext + "&grade=" + lcgrade;
		   	if (lampur == true) {
			   	list("town_list", lctext);
			   	hi_main.performTransition("hi_town", 1, "slide", null);
			} else {
				ampur_title.set("label", "จำนวนหมู่บ้าน " + ctitle);
			   	list("ampur_list", lctext);
			   	hi_main.performTransition("hi_ampur", 1, "slide", null);
			}
		});
		
//// คลิก town_list
		on(town_list, "click", function() {
			//// ระบุรายการที่เลือก
			ctitle = "รายหมู่บ้าน";
			var all_list = town_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		   	var lctumbon = all_list[s].tumbon_id;
		   	if (lcgrade == "1") {ctitle = "HI=0 " + ctitle;}
		   	if (lcgrade == "2") {ctitle = "HI<10 " + ctitle;}
		   	if (lcgrade == "3") {ctitle = "HI>=10 " + ctitle;}
		   	village_title.set("label", ctitle);
		   	
		   	var lctext = "hi_score.php?date1="+cdate1+"&date2="+cdate2+"&level=3&tumbon_id="+lctumbon+"&grade=" + lcgrade;
		   	list("village_list", lctext);
		   	hi_town.performTransition("hi_village", 1, "slide", null);
		});
		
//// คลิก ampur_list
		on(ampur_list, "click", function() {
			var lcampur = ampur.get("value");
			ctitle = "รายตำบล";
			var lctext = "hi_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&level=2&hosp_id=" + lcampur;
			//// ระบุรายการที่เลือก
			var all_list = ampur_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		   	if (lcgrade == "1") {ctitle = "HI=0 " + ctitle;}
		   	if (lcgrade == "2") {ctitle = "HI<10 " + ctitle;}
		   	if (lcgrade == "3") {ctitle = "HI>=10 " + ctitle;}
		   	hi_title.set("label", "จำนวนหมู่บ้าน " + ctitle);
		   	lctext = lctext + "&grade=" + lcgrade;
			list("town_list", lctext);
			hi_ampur.performTransition("hi_town", 1, "slide", null);
		});
		
//// คลิก ap_coverage List
		on(ap_coverage, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = ap_coverage.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcampur = all_list[s].hosp_id;
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&level=1&hosp_id=" + lcampur;
			list("coverage_list", "hi_tumbon.php" + lctext2);
			ampur_coverage.performTransition("hi_coverage", 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});