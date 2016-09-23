//// ประกาศตัวแปร
lnpps1 = 0;
lnpps2 = 0;
lnpps3 = 0;
lnpps4 = 0;
lnpps5 = 0;

lcpps1 = "1. การเคลื่อนไหว";
lcpps2 = "2. ปฏิบัติกิจกรรม";
lcpps3 = "3. กิจวัตรประจำวัน";
lcpps4 = "4. การรับประทานอาหาร";
lcpps5 = "5. ระดับความรู้สึกตัว";

/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 
 //////////////////////////////////////////////////////////// 

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

		function pps_list() {
			//// แสดงข้อมูลใหม่
			clearList("pps_detail");
			//// แสดงคะแนน pps เดิม
			var list_add = pps_detail.store.newItem({label: lcpps1 + " = " + lnpps1.toString(), value : lnpps1.toString(), value1 : "1", moveTo: "pps1"});
			var list_add = pps_detail.store.newItem({label: lcpps2 + " = " + lnpps2.toString(), value : lnpps2.toString(), value1 : "2", moveTo: "pps2"});
			var list_add = pps_detail.store.newItem({label: lcpps3 + " = " + lnpps3.toString(), value : lnpps3.toString(), value1 : "3", moveTo: "pps3"});
			var list_add = pps_detail.store.newItem({label: lcpps4 + " = " + lnpps4.toString(), value : lnpps4.toString(), value1 : "4", moveTo: "pps4"});
			var list_add = pps_detail.store.newItem({label: lcpps5 + " = " + lnpps5.toString(), value : lnpps5.toString(), value1 : "5", moveTo: "pps5"});
		}

		function pps_reset(ppsscore) {
			ppsscore = ppsscore || "";
			for (n=1; n<=5; n++) {
				var cobject = reg.byId("pps" + n.toString());
				var ctitle = eval("lcpps" + n.toString());
				var cmacro = eval("lnpps" + n.toString() + "=0");
				if (ppsscore.length > 0) {
					var ctxt = reg.byId("pps_" + n.toString() + "_" + ppsscore.substr(n-1, 1))
					var ctext = ctxt.get("label");
					var cmacro = eval("lnpps" + n.toString() + "=" + ppsscore.substr(n-1, 1));
					cobject.set("title", ctitle + "=" + ctext);
				}
	       			else {cobject.set("title", ctitle);}
	       	}
   		}

		function pps_check(fobject, fnumber) {
	   		var fobj = reg.byId(fobject);
	   		var lnobj = fobject.length;
	   		var fvar = "ln" + fobject.substr(0, lnobj-2);
	   		var fval = fobject.substr(lnobj-1, 1);
	   		if (fobj.checked == true) {
				cmacro = eval(fvar + " = " + fval);
				for (n=1; n<=fnumber; n++) {
					var fobj0 = fobject.substr(0, lnobj-1) + n.toString();
					var fobj1 = reg.byId(fobj0);
					fobj1.set("checked", false);
				}
				fobj.set("checked", true);
				pps_list();
				var macro = eval(fobject.substr(0, 4) + '.performTransition("pps_main", -1, "slide", null)');
			}
	   	}
	   	
	   	function pps_cal(ppscore) {
 			// ตรวจสอบ Parameter ทีละหลัก ค่าสูงสุดต้องไม่เกินค่าด้านซ้ายก่อนหน้า
 			var lnPPS= 0;
 			var lnPPS0 = 0;
 			// กรณีเสียชีวิต
 			if (ppscore.substr(0, 1) == "6") { lnPPS = 0;}
 			else {
	 			var lcdigit = ppscore.substr(0, 1);
	 			if (lcdigit == "1") {lnPPS = 100;}
	 			else if (lcdigit == "2") {lnPPS = 70;}
	 			else if (lcdigit == "3") {lnPPS = 50;}
	 			else if (lcdigit == "4") {lnPPS = 40;}
	 			else {lnPPS = 30;}
	 				lcdigit = ppscore.substr(1, 1);
 				if (lcdigit == "1") {lnPPS0 = 100;}
 				else if (lcdigit == "2") {lnPPS0 = 90;}
 				else if (lcdigit == "3") {lnPPS0 = 80;}
 				else if (lcdigit == "4") {lnPPS0 = 70;}
 				else if (lcdigit == "5") {lnPPS0 = 60;}
 				else if (lcdigit == "6") {lnPPS0 = 50;}
 				else if (lcdigit == "7") {lnPPS0 = 40;}
 				else {lnPPS0 = 30;}
 				
 				lnPPS = Math.min(lnPPS, lnPPS0);
 				lcdigit = ppscore.substr(2, 1);
 				if (lcdigit == "1") {lnPPS0 = 100;}
 				else if (lcdigit == "2") {lnPPS0 = 60;}
 				else if (lcdigit == "3") {lnPPS0 = 50;}
 				else if (lcdigit == "4") {lnPPS0 = 40;}
 				else {lnPPS0 = 30;}
 				
 				lnPPS = Math.min(lnPPS, lnPPS0);
 				
 				lcdigit = ppscore.substr(3, 1);
 				if (lcdigit == "1") {lnPPS0 = 100;}
 				else if (lcdigit == "2") {lnPPS0 = 80;}
 				else if (lcdigit == "3") {lnPPS0 = 20;}
 				else {lnPPS0 = 10;}
 				
 				lnPPS = Math.min(lnPPS, lnPPS0);
 				
 				lcdigit = ppscore.substr(4, 1);
 				if (lcdigit == "1") {lnPPS0 = 100;}
 				else if (lcdigit == "2") {lnPPS0 = 60;}
 				else if (lcdigit == "3") {lnPPS0 = 40;}
 				else {lnPPS0 = 10;}
 				
 				lnPPS = Math.min(lnPPS, lnPPS0);
			}
			return lnPPS;
 		}

//// Define Object //////////////////////////////////
		var staff_v2 = reg.byId("staff_v2");
		var p1_back = reg.byId("p1_back");
		var p2_back = reg.byId("p2_back");
		var p3_back = reg.byId("p3_back");
		var p4_back = reg.byId("p4_back");
		var p5_back = reg.byId("p5_back");
		var pps_back = reg.byId("pps_back");
		var pps_person = reg.byId("pps_person");
		var pps_detail = reg.byId("pps_detail");
		var store_adetail = new ifws({data:{items:[]}});
		pps_detail.store = null;
		pps_detail.setStore(store_adetail);
		var pps_main = reg.byId("pps_main");
		var pps_new = reg.byId("pps_new");
		var pps_person = reg.byId("pps_person");
		var pps_series = reg.byId("pps_series");
		var pps_score = reg.byId("pps_score");
		var pps1 = reg.byId("pps1");
		var pps1_1 = reg.byId("pps1_1");
		var pps1_2 = reg.byId("pps1_2");
		var pps1_3 = reg.byId("pps1_3");
		var pps1_4 = reg.byId("pps1_4");
		var pps1_5 = reg.byId("pps1_5");
		var pps1_6 = reg.byId("pps1_6");
		var pps2 = reg.byId("pps2");
		var pps2_1 = reg.byId("pps2_1");
		var pps2_2 = reg.byId("pps2_2");
		var pps2_3 = reg.byId("pps2_3");
		var pps2_4 = reg.byId("pps2_4");
		var pps2_5 = reg.byId("pps2_5");
		var pps2_6 = reg.byId("pps2_6");
		var pps2_7 = reg.byId("pps2_7");
		var pps2_8 = reg.byId("pps2_8");
		var pps3 = reg.byId("pps3");
		var pps3_1 = reg.byId("pps3_1");
		var pps3_2 = reg.byId("pps3_2");
		var pps3_3 = reg.byId("pps3_3");
		var pps3_4 = reg.byId("pps3_4");
		var pps3_5 = reg.byId("pps3_5");
		var pps4 = reg.byId("pps4");
		var pps4_1 = reg.byId("pps4_1");
		var pps4_2 = reg.byId("pps4_2");
		var pps4_3 = reg.byId("pps4_3");
		var pps4_4 = reg.byId("pps4_4");
		var pps5 = reg.byId("pps5");
		var pps5_1 = reg.byId("pps5_1");
		var pps5_2 = reg.byId("pps5_2");
		var pps5_3 = reg.byId("pps5_3");
		var pps5_4 = reg.byId("pps5_4");
///////////////////////////////////////////////////
//// Back Button /////////////////////////////////
		on(pps_back, "click", function() {
			pps_person.performTransition("staff_v2", -1, "slide", null);
		});
		on(pm_back, "click", function() {
			pps_main.performTransition("pps_person", -1, "slide", null);
		});
		on(p1_back, "click", function() {
			pps1.performTransition("pps_main", -1, "slide", null);
		});
		on(p2_back, "click", function() {
			pps2.performTransition("pps_main", -1, "slide", null);
		});
		on(p3_back, "click", function() {
			pps3.performTransition("pps_main", -1, "slide", null);
		});
		on(p4_back, "click", function() {
			pps4.performTransition("pps_main", -1, "slide", null);
		});
		on(p5_back, "click", function() {
			pps5.performTransition("pps_main", -1, "slide", null);
		});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// New PPS  //////////////////////////////////////////////////////////////////////////////////////////////
		on (pps_new, "click", function() {
			pps_reset("");
			pps_list();
			//// Clear ตัวเลือกที่เคย Checked
			for (n=1; n<=5; n++){
				var lcobj0 = "pps" + n.toString();
				var rnd = 4;
		   		if (n==1){ rnd = 6;}
		   		else if (n==2) {rnd = 8;}
		   		else if (n==3) {rnd = 5;}
		   		for (r=1; r <=rnd; r++){
		   			var lcobj1 = lcobj0 + "_" + r.toString();
		   			var lcobj = reg.byId(lcobj1);
		   			lcobj.set("checked", false);
		   		}
		   	}
			////////////////////////////////////////////////////////////////////////////////
			pps_person.performTransition("pps_main", 1, "slide", null);
		});
		
//// เลือก pps1 //////////////////////////////////////
		on (pps1_1, "click", function() {
			pps_check("pps1_1", 6);
		});
		on (pps1_2, "click", function() {
			pps_check("pps1_2", 6);
		});
		on (pps1_3, "click", function() {
			pps_check("pps1_3", 6);
		});
		on (pps1_4, "click", function() {
			pps_check("pps1_4", 6);
		});
		on (pps1_5, "click", function() {
			pps_check("pps1_5", 6);
		});
		on (pps1_6, "click", function() {
			pps_check("pps1_6", 6);
		});
//// เลือก pps2 //////////////////////////////////////
		on (pps2_1, "click", function() {
			pps_check("pps2_1", 8);
		});
		on (pps2_2, "click", function() {
			pps_check("pps2_2", 8);
		});
		on (pps2_3, "click", function() {
			pps_check("pps2_3", 8);
		});
		on (pps2_4, "click", function() {
			pps_check("pps2_4", 8);
		});
		on (pps2_5, "click", function() {
			pps_check("pps2_5", 8);
		});
		on (pps2_6, "click", function() {
			pps_check("pps2_6", 8);
		});
		on (pps2_7, "click", function() {
			pps_check("pps2_7", 8);
		});
		on (pps2_8, "click", function() {
			pps_check("pps2_8", 8);
		});
//// เลือก pps3 //////////////////////////////////////
		on (pps3_1, "click", function() {
			pps_check("pps3_1", 5);
		});
		on (pps3_2, "click", function() {
			pps_check("pps3_2", 5);
		});
		on (pps3_3, "click", function() {
			pps_check("pps3_3", 5);
		});
		on (pps3_4, "click", function() {
			pps_check("pps3_4", 5);
		});
		on (pps3_5, "click", function() {
			pps_check("pps3_5", 5);
		});
//// เลือก pps4 //////////////////////////////////////
		on (pps4_1, "click", function() {
			pps_check("pps4_1", 4);
		});
		on (pps4_2, "click", function() {
			pps_check("pps4_2", 4);
		});
		on (pps4_3, "click", function() {
			pps_check("pps4_3", 4);
		});
		on (pps4_4, "click", function() {
			pps_check("pps4_4", 4);
		});
//// เลือก pps5 //////////////////////////////////////
		on (pps5_1, "click", function() {
			pps_check("pps5_1", 4);
		});
		on (pps5_2, "click", function() {
			pps_check("pps5_2", 4);
		});
		on (pps5_3, "click", function() {
			pps_check("pps5_3", 4);
		});
		on (pps5_4, "click", function() {
			pps_check("pps5_4", 4);
		});

///////////////////////////////////////////////////////////
//// เลือก pps ทีละข้อ
		on(pps_detail, "click", function() {	
			//// ระบุรายการที่เลือก
			lcorder = "";
			var all_list = pps_detail.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	lcpage = all_list[s].moveTo;
			pps_main.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////
//// Save ข้อมูล pps /////////////////////////////////////////
			
		on(pps_save, "click", function() {
			var lcreturn = "";
			//var lnpps = lnpps1+lnpps2+lnpps3+lnpps4+lnpps5;
			var lcpps_code = lnpps1.toString()+lnpps2.toString()+lnpps3.toString()+lnpps4.toString()+lnpps5.toString();
			var lnppsnew = pps_cal(lcpps_code);
			var r = confirm("ต้องการบันทึกข้อมูล" + "\npps " + lnppsnew.toString() + " % ?");
			if (r == true) {
			xhr.get({
				url: ip_address + "pps_add.php",
				content: {staff_cid: lcstaffcid, cid: lccid, pps: lcpps_code, npps: lnppsnew },
				headers: { "X-Requested-With": null },
				load: function(result) {
					list("pps_series", "cid_pps.php?cid=" + lccid);
					//// แสดง Graph  pps/////////////////////////////////////////////////////////////////////////////////////////////
				  	xhr.get({
						url: ip_address + "cid_pps.php",
						content: { cid: lccid, ord: "1" },
						headers: { "X-Requested-With": null },
						load: function(result) {
							// กำจัด chr(10) chr(13)
						   	var json1 = result.replace(/[\n\r]*/g,'');
						   	var myData = eval("(" + json1 + ")");
						   	// ผล pps แสดงเป็น Graph
						   	var item = myData.items;
						   	var item_list = [];
						   	var item_cnt = item.length;
							for (i = 0; i < item_cnt; i++)
							{
								item_list[i] = parseFloat(item[i]["rightText"]);
							}
							var pps_chart = Chart(dom.byId("pps_chart"));
							pps_chart.destroy();
							var pps_chart = Chart(dom.byId("pps_chart")).
						        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
						        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
						        addPlot("default", { type: Lines }).
						        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
						        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
						        render();
							// จบการแสดง Graph
						},
						error: function() {
							alert("Failed pps Graph !");
						}
				  	});
					},
				error: function() {alert("Failed pps Save !");}
			});
			pps_main.performTransition("pps_person", -1, "slide", null);
			}
		});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});