//////////////////////////
//// Public Variables ////
//////////////////////////

//// General /////////////

// parameter สำหรับ view select_dt
var lddate = new Date();
var lcvar = "x";

// parameter สำหรับ Text Input
// View ที่ต้องการกลับหลังเสร็จงาน
var gcsource_view = "main_view";
// เก็บText : lccode = F, เก็บ Value : lccode = T
var lccode = "F";
// ประเภทของตัวแปร C(haracter) หรือ N(umber)
var lcvartype = "C";
// กลับสู่ View ทันทีเมื่อทำการเลือกรายการ ไม่ต้องกดปุ่ม Back
var lautoback = false;
// Show Text ที่ txt_return โดยไม่ต้อง Clear
var ltxtshow = false;
// Function ที่ต้องการ run เมื่อกลับสู่ gcsource_view
var gcfunction = "";


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
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(popup, mitem, menu, _base, heading, tool, mobile, parser, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Datetime    //////////////////
///////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// txt_input    ////////////
///////////////////////////////
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
		//// Events //////
		//////////////////
		
		on(text_input, "beforeTransitionIn", function() {
			if (ltxtshow == false) {txt_return.set("value", "");}
			ltxtshow = false;
			txt_search.set("value", "");
		});
		
		on(txt_search, "keyup", function() {
			lcsearchtext = txt_search.get("value").trim().toUpperCase();
	    	txt_list.setQuery({label:lcsearchtext + "*"});
		});
		
		on(txt_title, "click", function() {
			var isdel = txt_clear.get("focused");
			if (isdel == true) {	txt_return.set("value", "");}
			
			var isback = back_txt.get("focused");
			if (isback == true) {
				if (lccode != "T") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				text_input.performTransition(gcsource_view, -1, "slide", null);
				lautoback = false;
				gcfunction = "";
			}
		});
		
		on(txt_list, "click", function() {
			var lcnewtxt = "";
			var lcoldtxt = txt_return.get("value");
			var obj = selected_row("txt_list");
			// แทนค่าตัวแปรด้วย value ที่ได้จากการเลือก List
			if (lcoldtxt.trim() == "") { lcnewtxt = obj.label; }
				else { lcnewtxt = lcoldtxt + " " + obj.label; }
			txt_return.set("value", lcnewtxt);
			if (lccode == "T") {
				if (lcvartype == "N") { var cmacro = lcvar + "=" + obj.value; }
				else { var cmacro = lcvar + "='" + obj.value + "'";  }
			} else {
				var cmacro = lcvar + "= '" + lcnewtxt + "'";
			}
			eval(cmacro);
			if (lautoback == true) {
				if (lccode != "T") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				text_input.performTransition(gcsource_view, -1, "slide", null);
				lautoback = false;
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
		var view1_title = reg.byId("view1_title");
		var view1_list = reg.byId("view1_list");
		var c1 = "";
		//////////////////
		//// Function ////////////////////////////////////////////

		//////////////////////////////////////////////////////////////
		//// Events //////
		//////////////////
		on(view1_list, "click", function() {
			alert("c1=" + c1);
			gcsource_view = "view1";
			lcvar = "c1";
			view1.performTransition("text_input", 1, "slide");
		});
		//////////////////

/////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 2     /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view2 = reg.byId("view2");
		var view2_title = reg.byId("view2_title");
		var back_view2 = reg.byId("back_view2");
		//////////////////
		//// Function ////////////////////////////////////////////

		//////////////////////////////////////////////////////////////
		//// Events //////
		//////////////////
		on(view2_title, "click", function() {
			back("back_view2", "view2", "view1");
		});
		//////////////////

//////////////////////////////////////////////////////////////////////////////	
	});
});