/*
 * Tcis file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes tcis JavaScript file by default witcin HTML pages authored in Maqetta.
 */
 var cdate1 = "";
 var cdate2 = "";
 var lcampur = "";
 var lchospital = "";
 var lngrade = 0;
 
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
		var btn_tpv = reg.byId("btn_tpv");
		var btn_tap = reg.byId("btn_tap");
		var btn_ap = reg.byId("btn_ap");
		
		var ampur_list = reg.byId("ampur_list");
		var ampur_title = reg.byId("ampur_title");
		var ci_back = reg.byId("ci_back");
		var ci_type = reg.byId("ci_type");
		var cup_select = reg.byId("cup_select");
		var cup_back = reg.byId("cup_back");
		var ampur_back = reg.byId("ampur_back");
		var type_back = reg.byId("type_back");
		var type_title = reg.byId("type_title");
		var btn_ampur = reg.byId("btn_ampur");
		var btn_ampur0 = reg.byId("btn_ampur0");
		var btn_ampur1 = reg.byId("btn_ampur1");
		var btn_ampcvg = reg.byId("btn_ampcvg");
		var btn_coverage = reg.byId("btn_coverage");
		var btn_ci0 = reg.byId("btn_ci0");
		var btn_ci1 = reg.byId("btn_ci1");
		var ci_list = reg.byId("ci_list");
		var ci_province = reg.byId("ci_province");
		var ci_main = reg.byId("ci_main");
		var ci_ampur = reg.byId("ci_ampur");
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
		var cup_list = reg.byId("cup_list");
		list("cup_list", "ampur_list.php");
		
		var ci_detail = reg.byId("ci_detail");
		var detail_title = reg.byId("detail_title");
		var detail_back = reg.byId("detail_back");
		var detail_list = reg.byId("detail_list");

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
		on(ci_back, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
		});
//// 2. Back to ci Main		
		on(ampur_back, "click", function() {
			ci_ampur.performTransition("ci_main", -1, "slide", null);
		});
//// 2. Back to ci Main		
		on(type_back, "click", function() {
			if (lcampur == "") {ci_type.performTransition("ci_main", -1, "slide", null);}
			else {ci_type.performTransition("cup_select", -1, "slide", null);}
		});
//// 1. Back to ci_type
		on(detail_back, "click", function() {
			ci_detail.performTransition("ci_type", -1, "slide", null);
		});

//// เลือกรายการใน List จำแนกตาม type
		on(ci_list, "click", function() {
			var lcov = btn_coverage.get("checked");
			if (lcov !== true) {
				//// ระบุรายการที่เลือก
				var all_list = ci_list.getChildren();
		    	for (s=0; s<all_list.length; s++){
			   		if (all_list[s].get("focused") == true){
						break;}
			   	}
			   	lctype = all_list[s].ci_type;
			   	var lctext = "date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=" + lctype + "&grade=" + lngrade;
			   	if (lcampur == "") {}
			   	else {lctext = lctext + "&town_id=" + lcampur;}
			   	list("detail_list", "ci_detail.php?" + lctext);
			   	ci_type.performTransition("ci_detail", 1, "slide", null);
		   	}
		});

//// เลือกรายการใน List แสดงรายละเอียด
		on(detail_list, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = detail_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lctext = all_list[s].label + "  อ." + all_list[s].ampur + "  CI=" + all_list[s].rightText;
			alert (lctext);
		});
		
//// 4. Back to ci Main		

//// 5. Back to ci_town	

		
//// 7. Back to ci Main		

//// เลือกรวมจังหวัด
		on(btn_tpv, "click", function() {
			lcampur = "";
			btn_coverage.set("checked", false);
			btn_ci1.set("checked", false);
			type_title.set("label", "ค่า CI=0 แยกประเภท");
			btn_ci0.set("checked", true);
			lngrade = 0;
		   	var lctext = "ci_score_pv.php?date1=" + cdate1 + "&date2=" + cdate2 + "&grade=0";
			list("ci_list", lctext);
			ci_main.performTransition("ci_type", 1, "slide", null);
			btn_tap.set("checked", false);
			btn_ap.set("checked", false);
	});
	
//// เลือกเฉพาะอำเภอ
		on(btn_tap, "click", function(){
			lcampur = "";
			btn_tpv.set("checked", false);
			btn_ap.set("checked", false);
			ci_main.performTransition("cup_select", 1, "slide", null);
		 });

//// เลือกจำแนกอำเภอ
		on(btn_ap, "click", function() {
			lcampur = "";
			ampur_title.set("label", "ค่า CI=0 จำแนกอำเภอ");
			btn_ampcvg.set("checked", false);
			btn_ampur1.set("checked", false);
			var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=2&cunit=1";
			list("ampur_list", "ci_score_ap.php" + lctext2);
			ci_main.performTransition("ci_ampur", 1, "slide", null);
			btn_ampur0.set("checked", true);
			var lctext = "ci_score.php?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=2&hosp_id=" + lcampur;
			list("ci_list", lctext);
			btn_tpv.set("checked", false);
			btn_tap.set("checked", false);
		});
		
//// คลิก cup_list
		on(cup_list, "click", function() {
//			//// ระบุรายการที่เลือก
			var all_list = cup_list.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	lcampur = all_list[s].ampur_id.substr(0, 4);
			lchospital = all_list[s].label;
			lngrade = 0;
		   	btn_coverage.set("checked", false);
			btn_ci1.set("checked", false);
			type_title.set("label", "ค่า CI=0 " + lchospital);
			btn_ci0.set("checked", true);
			var lctext = "ci_score_pv.php?date1=" + cdate1 + "&date2=" + cdate2 + "&grade=0&town_id=" + lcampur;
			list("ci_list", lctext);
			cup_select.performTransition("ci_type", 1, "slide", null);
		});
		
//// คลิก btn_coverage List
		on(btn_coverage, "click", function() {
			btn_ci0.set("checked", false);
			btn_ci1.set("checked", false);
			if(lcampur==""){type_title.set("label", "CI Coverage แยกประเภท");}
			else {type_title.set("label", "CI Coverage " + lchospital);}
		   	var lctext = "ci_score_pv.php?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=3";
		   	if (lcampur == "") {type_title.set("label", "CI Coverage แยกประเภท");}
			else {
				lctext = lctext + "&town_id=" + lcampur;
				type_title.set("label", "CI Coverage " + lchospital);}
			list("ci_list", lctext);
		});
		
//// คลิก btn_ampcvg List
		on(btn_ampcvg, "click", function() {
			btn_ampur0.set("checked", false);
			btn_ampur1.set("checked", false);
			ampur_title.set("label", "Coverage จำแนกอำเภอ");
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=3&cunit=1";
			list("ampur_list", "ci_score_ap.php" + lctext2);
		});
//// คลิก btn_ci0
		on(btn_ci0, "click", function() {
			btn_coverage.set("checked", false);
			btn_ci1.set("checked", false);
			lngrade = 0;
			type_title.set("label", "ค่า CI=0 แยกประเภท");
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&grade=0";
			if (lcampur == "") {type_title.set("label", "CI=0 แยกประเภท");}
			else {lctext2 = lctext2 + "&town_id=" + lcampur;
				type_title.set("label", "CI=0 " + lchospital);}
			list("ci_list", "ci_score_pv.php" + lctext2);
		});
//// คลิก btn_ci1
		on(btn_ci1, "click", function() {
			btn_coverage.set("checked", false);
			btn_ci0.set("checked", false);
			lngrade = 1;
			type_title.set("label", "ค่า CI>0 แยกประเภท");
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&grade=1";
		   	if (lcampur == "") {type_title.set("label", "CI>0 แยกประเภท");}
		   	else {lctext2 = lctext2 + "&town_id=" + lcampur;
				type_title.set("label", "CI>0 " + lchospital);}
			list("ci_list", "ci_score_pv.php" + lctext2);
		});
//// คลิก btn_ampur0
		on(btn_ampur0, "click", function() {
			btn_ampcvg.set("checked", false);
			btn_ampur1.set("checked", false);
			ampur_title.set("label", "ค่า CI=0 จำแนกอำเภอ");
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=2&cunit=1";
			list("ampur_list", "ci_score_ap.php" + lctext2);
		});
//// คลิก btn_ampur1
		on(btn_ampur1, "click", function() {
			btn_ampcvg.set("checked", false);
			btn_ampur0.set("checked", false);
			ampur_title.set("label", "ค่า CI>0 จำแนกอำเภอ");
		   	var lctext2 = "?date1=" + cdate1 + "&date2=" + cdate2 + "&ctype=1&cunit=1";
			list("ampur_list", "ci_score_ap.php" + lctext2);
		});

//// Back จาก cup_select		
		on(cup_back, "click", function() {
			cup_select.performTransition("ci_main", -1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});