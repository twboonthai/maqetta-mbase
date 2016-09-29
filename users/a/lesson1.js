////////////////////////////////
//// Public Variables //////////
////////////////////////////////

//// ส่วนนี้ไม่ต้องแก้ไข ///////////////////////////////////////////////////////////////////////////////////
// parameter สำหรับ view select_dt
var lddate = new Date();
var lcvar = "x";
// parameter สำหรับ Text Input
// View ที่ต้องการกลับหลังเสร็จงาน
var gcsource_view = "main_view";
// กลับสู่ View ทันทีเมื่อทำการเลือกรายการ ไม่ต้องกดปุ่ม Back
var lautoback = false;
// ชื่อ field ที่ต้องการเก็บค่า code แทนข้อความ ถ้า lcfield = "" จะเก็บค่าเป็นข้อความ
var lcfield = "";
// Function ที่ต้องการ run เมื่อกลับสู่ gcsource_view
var gcfunction = "";
///////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 * ส่วนนี้ไม่ต้องแก้ไข เป็นการเรียก JavaScript มาตรฐานของ Maqetta มาใช้งานโดยอัตโนมัติ
 */

require([
	"dijit/PopupMenuBarItem",
  	"dijit/MenuItem",
  	"dijit/Menu",
  	"dojox/mobile/_base",
  	"dojox/mobile/Heading",
  	"dojox/mobile/ToolBarButton",
  	"dojox/mobile",
  	"dojox/mobile/parser",
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
// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ
 ], function(popup, mitem, menu, _base, heading, tool, mobile, parser, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		
///////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Datetime    //////////////
///////////////////////////////
//// ส่วนนี้ไม่ต้องแก้ไข ใช้สำหรับ view ชื่อ select_dt เพื่อการกรอกข้อมูลที่เป็นวัน เวลา 						
//// การใช้ view select_dt 																		
//// 1. กำหนดค่า gcsource_view เพื่อให้ทราบว่า เมื่อระบุวัน เวลาแล้ว จะให้กลับไปที่ view ใด 					 
//// 2. กำหนดค่า lcvar เพื่อระลุว่า ค่าวัน-เวลาที่เลือก จะถูกเก็บไว้ในตัวแปรชื่ออะไร
//// 3. กำหนดค่า gcfunction กรณีที่ต้องการ run Function เมื่อเลือกวันเวลาเสร็จ										 
//////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var select_dt = reg.byId("select_dt");
		var select_dt_title = reg.byId("select_dt_title");
		var back_select_dt = reg.byId("back_select_dt")
		var calendar1 = reg.byId("calendar1");
		calendar1.set("value", lddate);
		
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
		//////////////////
		//// Events //////
		//////////////////
		
		on(select_dt, "beforeTransitionIn", function() {
			calendar1.set("value", lddate);
			lchour = lddate.getHours().toString();
			hr1.set("value", pad(lchour, "00"));
			lcmin = lddate.getMinutes().toString();
			min1.set("value", pad(lcmin, "00"));
		});
		
		on(select_dt_title, "click", function() {
			var isback = back_select_dt.get("focused");
			if (isback == true) {
				var cmacro = lcvar + " = lddate";
				eval(cmacro);
				eval(gcfunction);
				select_dt.performTransition(gcsource_view, -1, "slide", null);
			}
		});
		
		on(calendar1, "change", function() {
			lddate = calendar1.get("value");
		});
		
		on(hr1, "click", function() {
			hr1.domNode.selectionStart = 0;
			hr1.domNode.selectionEnd = 2;
		});
		
		on(min1, "click", function() {
			min1.domNode.selectionStart = 0;
			min1.domNode.selectionEnd = 2;
		});
		
		on(hr1, "keyup", function() {
     		lnhr1 = hr1.get("value");
     		if (lnhr1 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr1 = lnhr1.toString();
	     		var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate.setHours(lnhr1);
					hr1.set("value", pad(lchr1, "00"));
					min1.focus(true);
					min1.domNode.selectionStart = 0;
					min1.domNode.selectionEnd = 2;
				}
			}
		});
		
		on(min1, "keyup", function() {
     		lnmin1 = min1.get("value");
     		if (lnmin1 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmin1 = lnmin1.toString();
	     		var lnlength = lcmin1.length;
				if (lnlength == 2 || lcmin1 > "6" || lcmin1 == "6" && lnlength == 1) {
					lddate.setMinutes(lnmin1);
					min1.set("value", pad(lcmin1, "00"));
					calendar1.focus(true);
				}
			}
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// text_input    ////////////
///////////////////////////////
//// ส่วนนี้ไม่ต้องแก้ไข ใช้สำหรับ view ชื่อ Text_input เพื่อการกรอกข้อมูลที่เป็นข้อความ	
//// การใช้ view Text_input															
//// 1. กำหนดค่า gcsource_view เพื่อให้ทราบว่า เมื่อระบุข้อความแล้ว จะให้กลับไปที่ view ใด 
//// 2. กำหนดค่า lcvar ว่าค่าข้อความที่เลือก จะให้เก็บไว้ในตัวแปรชื่ออะไร
//// 3. กำหนดค่า lcfield คือค่า column ใน txt_list ที่ต้องการให้คืนค่าแทนข้อความที่เลือก ถ้า lcfiend = "" จะคืนค่าเป็นข้อความที่เลือกโดยตรง
//// 4. กำหนดค่า gcfunction กรณีที่ต้องการ run Function หลังจากเลือกข้อความ
//// 5. กำหนดค่า lautoback : true=คลิกเลือกข้อความแล้ว back กลับ gcsource_view เลย, 
////						false=ต้องกดปุ่ม back ถึงจะกลับ gcsource_view							
//////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var text_input = reg.byId("text_input");
		var txt_search = reg.byId("txt_search");
		var txt_list = reg.byId("txt_list");
		var txt_return = reg.byId("txt_return");
		var back_txt = reg.byId("back_txt");
		var txt_clear = reg.byId("txt_clear");
		var txt_title = reg.byId("txt_title");

		//////////////////
		//// Variables ///
		//////////////////
		var lcnewtxt = "";

		//////////////////
		//// Events //////
		//////////////////
		
		on(txt_search, "keyup", function() {
			lcsearchtext = txt_search.get("value").trim().toUpperCase();
	    	txt_list.setQuery({label:lcsearchtext + "*"});
		});
		
		on(txt_title, "click", function() {
			var isdel = txt_clear.get("focused");
			if (isdel == true) {txt_return.set("value", "");}
			
			var isback = back_txt.get("focused");
			if (isback == true) {
				if (lcfield == "") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				lautoback = false;
				gcfunction = "";
				lcfield = "";
				txt_return.set("value", "");
				txt_search.set("value", "");
				text_input.performTransition(gcsource_view, -1, "slide", null);
			}
		});
		
		on(txt_list, "click", function() {
			lcnewtxt = "";
			var lcoldtxt = txt_return.get("value");
			var obj = selected_row("txt_list");
			// แทนค่าตัวแปรด้วย value ที่ได้จากการเลือก List
			if (lcoldtxt.trim() == "") { lcnewtxt = obj.label; }
				else { lcnewtxt = lcoldtxt + " " + obj.label; }
			txt_return.set("value", lcnewtxt);
			if (lcfield != "") {var cmacro = lcvar + "=" + "obj." + lcfield;}
			else {var cmacro = lcvar + "= '" + lcnewtxt + "'";}
			eval(cmacro);
			if (lautoback == true) {
				if (lcfield == "") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				lautoback = false;
				gcfunction = "";
				lcfield = "";
				txt_return.set("value", "");
				txt_search.set("value", "");
				text_input.performTransition(gcsource_view, -1, "slide", null);
			}
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 1     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view1 = reg.byId("view1");
		//var back_view1 = reg.byId("back_view1");
		var view1_title = reg.byId("view1_title");
		var view1_list = reg.byId("view1_list");
		var lnsw = 1;
		sw2list("view1_list", "sw_1", "รายการ 4", lnsw, "lab_id", "lab_name");
		var ld1 = "xx/yy/zzzz";
		var lchosp = "";
		
		//////////////////
		//// Function ////////////////////////////////////////////

		//////////////////////////////////////////////////////////////
		//// Events //////
		//////////////////
		
	on (view1_list, "click", function(){
		var cobj = selected_row("view1_list");
		if (cobj.label == "รายการ 4") {
			var sw = sw_status("view1_list", "sw_1");
			alert (sw);}
		else if (cobj.label == "รายการ 1") {
			gcsource_view = "view1";
			lcvar = "ld1";
			gcfunction = "alert(ld1)";
			view1.performTransition("select_dt", 1, "slide");}
		else {
			gcsource_view="view1";
			lcvar="lchosp";
			gcfunction="alert(lchosp)";
			lcfield="HOSP_ID";
			list("txt_list", "hosp.php");
			view1.performTransition("text_input",1,"slide");
		}
	});

	
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 2     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view2 = reg.byId("view2");
		var back_view2 = reg.byId("back_view2");
		var view2_title = reg.byId("view2_title");
		var view2_list = reg.byId("view2_list");
		//////////////////
		//// Function ////////////////////////////////////////////

		//////////////////////////////////////////////////////////////
		//// Events //////
		//////////////////
		on(view2_title, "click", function() {
			back("back_view2", "view2", "view1");
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});