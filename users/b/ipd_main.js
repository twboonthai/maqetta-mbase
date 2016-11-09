//////////////////////////
//// Public Variables ////
//////////////////////////
lcdoctor = "";
lcpsw = "";
lcstaffpsw = "";
//// General ///////////////


//// Specific //////////

///////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		function ipd_list() {
			clearList("ipd_item");
			var list_add = ipd_item.store.newItem({label: "Log Out", value : "0", rightText : "ออกจากระบบ", rightIcon2 : "exit.jpg"});
			var list_add = ipd_item.store.newItem({label: "", value : "1"});
			var list_add = ipd_item.store.newItem({label: "Ward", value : "0", header: true});
			var list_add = ipd_item.store.newItem({label: "", rightText : ">", value : "1"});
			var list_add = ipd_item.store.newItem({label: "แพทย์ผู้ดูแล", value : "0", header: true});
			var list_add = ipd_item.store.newItem({label: lcdoctor, rightText : ">", value : "1"});
		}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// IPD Login        ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var user_name = reg.byId("user_name");
		var user_search = reg.byId("user_search");
		var password = reg.byId("password");
		var doctor_list = reg.byId("doctor_list");
		var btn_login = reg.byId("btn_login");
		var ipd_login = reg.byId("ipd_login");
		
		list("doctor_list", "staff_name.php");

		//////////////////
		//// Events //////
		//////////////////
		
		// key ชื่อ เพื่อค้นหา
		on(user_search, "keyup", function() {
			txt_search("user_search", "doctor_list");
		});
		
		// Click รายชื่อเพื่อเลือก
		on(doctor_list, "click", function() {
			var doctor = selected_row("doctor_list");
			lcdoctor = doctor.label.trim();
			lcstaffpsw = decode(doctor.staff_pw);
			user_name.set("value", lcdoctor);
			password.focus(true);
		});
		
		// key password
		on(password, "keypress", function() {
			var lctxt = password.get("value").trim();
			var lnlen = lctxt.length;
			var lnkey = event.which || event.keyCode;
			var lcnew = String.fromCharCode(lnkey);
			lcpsw = lcpsw + lcnew
			lcpsw = lcpsw.toUpperCase();
		});
		
		// กรณี Backspace
		on(password, "keyup", function() {
			var lnkey = event.keyCode;
			var lnlen = lcpsw.length;
			if (lnkey == 46 || lnkey == 8) { 
				alert ("ไม่อนุญาตให้ใช้ DEL และ Backspace กรุณากรอกใหม่ !!!");
				lcpsw = "";
				password.set("value", "");}
			else {
				var lcnew = "*"
				password.set("value", lcnew.repeat(lnlen))}
		});
		
		// Click Log In
		on(btn_login, "click", function() {
			if (lcpsw == lcstaffpsw && lcpsw.trim() > "") {
				ipd_list();
				ipd_login.performTransition("ipd_main", 1, "slide", null);}
			else {
				alert ("password ไม่ถูกต้อง !!!");
				lcpsw = "";
				password.set("value", "");
				password.focus(true);
			}
		});
		//////////////////
		

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Ipd Main     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var ipd_title = reg.byId("ipd_title");
		var btn_logout = reg.byId("btn_logout");
		var ipd_main = reg.byId("ipd_main");
		var ipd_item = reg.byId("ipd_item");
		var ipd_store = new ifws({data:{items:[]}});
		ipd_item.store = null;
		ipd_item.setStore(ipd_store);
		
		var pt_list = reg.byId("pt_list");
		var pt_store = new ifws({data:{items:[]}});
		pt_list.store = null;
		pt_list.setStore(pt_store);
		
		list("pt_list", "ipd_patient.php?filter=2");

		//////////////////
		//// Events //////
		//////////////////
		on(ipd_title, "click", function() {
			var lout = btn_logout.get("focused");
			if (lout == true) {
				password.set("value", "");
				user_search.set("value", "");
				user_name.set("value", "");
				list("doctor_list", "staff_name.php");
				lcdoctor = "";
				lcpsw = "";
				lcstaffpsw = "";
				ipd_main.performTransition("ipd_login", -1, "slide");
			}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 2    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 3    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 4    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 5    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		
		//////////////////
		//// Events //////
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 6    //////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});