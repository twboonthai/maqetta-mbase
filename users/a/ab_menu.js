/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
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
		var ab_back = reg.byId("ab_back");
		var ab_ampur = reg.byId("ab_ampur");
		var ab_main = reg.byId("ab_main");
		var ab_province = reg.byId("ab_province");
		var ab_score = reg.byId("ab_score");
		var ab1 = reg.byId("ab1");
		var ab2 = reg.byId("ab2");
		var ab3 = reg.byId("ab3");
		var ab4 = reg.byId("ab4");
		var ab1_back = reg.byId("ab1_back");
		var ab2_back = reg.byId("ab2_back");
		var ab3_back = reg.byId("ab3_back");
		var ab4_back = reg.byId("ab4_back");
		var ab1_title = reg.byId("ab1_title");
		var ab2_title = reg.byId("ab2_title");
		var ab3_title = reg.byId("ab3_title");
		var ab4_title = reg.byId("ab4_title");
		var abs_ampur = reg.byId("abs_ampur");
		var abs_tumbon = reg.byId("abs_tumbon");
		var abs_ban = reg.byId("abs_ban");
		var abs_cid = reg.byId("abs_cid");
		var hosp_id = reg.byId("hosp_id");
		
//// 1. Back to Previous
		on(ab_back, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
		});
		on(ab1_back, "click", function() {
			ab1.performTransition("ab_main", -1, "slide", null);
		});
		on(ab2_back, "click", function() {
			ab2.performTransition("ab1", -1, "slide", null);
		});
		on(ab3_back, "click", function() {
			ab3.performTransition("ab2", -1, "slide", null);
		});
		on(ab4_back, "click", function() {
			ab4.performTransition("ab3", -1, "slide", null);
		});
//// 2. เลือกข้อมูลรวมจังหวัด ///////////////////////////////////////////////////////////////////////
		on (ab_province, "click", function() {
			list("ab_score", "adl_brain_score.php?level=1");
			ab_ampur.set("checked", false);
		});
		
		//// เลือกรายคะแนน ดูข้อมูลของคะแนนนี้ รายอำเภอ
		on (ab_score, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = ab_score.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		   	var ctitle = "ระดับ " + lcgrade + " แยกรายอำเภอ";
		   	ab1_title.set("label", ctitle);
		   	list("abs_ampur", "adl_brain_score.php?level=2&grade=" + lcgrade);
			ab_main.performTransition("ab1", 1, "slide", null);
		});
		
		//// เลือกรายคะแนน ดูข้อมูลของคะแนนนี้ รายตำบล
		on (abs_ampur, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = abs_ampur.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		    var 	lcgrade = all_list[s].grade;
		   	var lchosp = all_list[s].hosp_id;
		   	var hosp_name = all_list[s].label;
		   	list("abs_tumbon", "adl_brain_score.php?level=3&grade=" + lcgrade + "&hosp_id=" + lchosp);
		   	var ctitle = "ระดับ " + lcgrade + " เฉพาะ " + hosp_name;
		   	ab2_title.set("label", ctitle);
			ab1.performTransition("ab2", 1, "slide", null);
		});
		
		//// เลือกรายคะแนน ดูข้อมูลของคะแนนนี้ รายหมู่บ้าน
		on (abs_tumbon, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = abs_tumbon.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		   	var lctumbon = all_list[s].tumbon_id;
		   	var tumbon_name = all_list[s].label;
		   	var ctitle = "ระดับ " + lcgrade + " เฉพาะ " + tumbon_name;
		   	ab3_title.set("label", ctitle);
		   	list("abs_ban", "adl_brain_score.php?level=4&grade=" + lcgrade + "&tumbon_id=" + lctumbon);
			ab2.performTransition("ab3", 1, "slide", null);
		});
		
		//// เลือกรายคะแนน ดูข้อมูลของคะแนนนี้ รายบุคคล
		on (abs_ban, "click", function() {
			//// ระบุรายการที่เลือก
			var all_list = abs_ban.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	var lcgrade = all_list[s].grade;
		    var lcban = all_list[s].town_id;
		    var ctitle = "ระดับ " + lcgrade + " รายบุคคล";
		   	ab4_title.set("label", ctitle);
		   	list("abs_cid", "adl_brain_score.php?level=5&grade=" + lcgrade + "&town_id=" + lcban);
			ab3.performTransition("ab4", 1, "slide", null);
		});
///////////////////////////////////////////////////////////////////////////////////////////////

//// 3. เลือกเฉพาะอำเภอ
		on (ab_ampur, "click", function() {
			lchosp = hosp_id.get("value");
			list("ab_score", "adl_brain_score.php?level=1&hosp_id=" + lchosp);
			ab_province.set("checked", false);
		});

//// 4. ระบุ อสม.ประจำตัวเป้าหมาย

//// 5. ADL

//// 6. Brain

//// 7. PPS

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});