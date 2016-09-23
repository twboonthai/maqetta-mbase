// Public Variables
var lccid = "";
var lctown = "";
var lcname = "";
var lcsex = "";
var lcphone1 = "";
var lcstaff = "";
var lcstaffname = "";
var ln60 = 0;
var lchosp = "10953";
var lcstaffcid = "";

var lnpps1 = 0;
var lnpps2 = 0;
var lnpps3 = 0;
var lnpps4 = 0;
var lnpps5 = 0;
var obj_name = "";

var lcadldate = "";

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
		
//// Define Object ////////////////////////////////////////////
		var address = reg.byId("address");
		var adl_level = reg.byId("adl_level");
		var agesex = reg.byId("agesex");
		var btn_admin = reg.byId("btn_admin");
		var btn_fct = reg.byId("btn_fct");
		var btn_hosp = reg.byId("btn_hosp");
		var care_giver = reg.byId("care_giver");
		var cid = reg.byId("cid");
		var complication = reg.byId("complication");
		var device_need = reg.byId("device_need");
		var hosp_id = reg.byId("hosp_id");
		var hosp_name = reg.byId("hosp_name");
		var person_name = reg.byId("person_name");
		var phone1_txt = reg.byId("phone1_txt");
		var pop_search = reg.byId("pop_search");
		var problem = reg.byId("problem");
		var staff_back = reg.byId("staff_back");
		var staff_v1 = reg.byId("staff_v1");
		var staff_v3 = reg.byId("staff_v3");
////////////////////////////////////////////////////////////
//// 1. กลับหน้าจอหลัก :
		on(staff_back, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/index.html";
		});
//// 2. Log In / Log Out : login.js
		
//// 3. บริหารจัดการ
		on(btn_admin, "click", function() {
		   	window.location.href = "http://m30.phoubon.in.th/file_upload.html";
		 });
	
//// 4. เปลี่ยนเครือข่าย
		on(btn_hosp, "click", function() {
			lchosp = hosp_id.get("value");
			xhr.get({
				url: ip_address + "cup_save.php",
				content: {hosp_id: lchosp},
				headers: { "X-Requested-With": null },
				load: function(result0) {
					xhr.get({
						url: ip_address + "cup_name.php",
						content: {hosp_id: lchosp},
						headers: { "X-Requested-With": null },
						load: function(result) {
							var aresult = result.split(",");
							lchosp_id = aresult[0].trim();
							lchosp_name = aresult[1].trim();
							lcampur = aresult[2].trim();
							//window.location.reload();
							hosp_id.set("value", lchosp_id);
							hosp_name.set("value", lchosp_name);
							list("pcu_list", "pcu_list.php?hosp_id=" + lchosp_id);
						},
						error: function() {}
					});
				},
				error: function() {}
			});
			//location.reload();
		});
	
//// 5. ค้นเป้าหมายจากรหัสประชาชน
		on(btn_fct, "click", function() {
			var btn_click = btn_fct.get("checked");
			if (btn_click == true) {
				adl_level.set("value", "");
				cid.set("value", "");
				person_name.set("value", "");
				agesex.set("value", "");
				phone1_txt.set("value", "");
				address.set("value", "")
				lccid = cid.get("value");
				care_giver.set("value", "");
				device_need.set("value", "");
				problem.set("value", "");
				complication.set("value", "");
				pop_search.set("checked", false);
				staff_v1.performTransition("staff_v2", 1, "slide", null);
			}
			btn_fct.set("checked", false);
		});
	
//// 6. ค้นเป้าหมายจากที่อยู่
		on(pop_search, "click", function() {
			var btn_click = pop_search.get("checked");
			if (btn_click == true) {
				cid.set("value", "");
				person_name.set("value", "");
				agesex.set("value", "");
				phone1_txt.set("value", "");
				address.set("value", "")
				lccid = cid.get("value");
				care_giver.set("value", "");
				device_need.set("value", "");
				problem.set("value", "");
				complication.set("value", "");
				btn_fct.set("checked", false);
				lchosp = hosp_id.get("value");
				list("pcu_list", "pcu_list.php?hosp_id=" + lchosp);
				staff_v1.performTransition("staff_v3", 1, "slide", null);
			}
			pop_search.set("checked", false);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});