////////////////////////////////
//// Public Variables //////////
////////////////////////////////
var spinner = {};

//// ส่วนนี้ไม่ต้องแก้ไข ///////////////////////////////////////////////////////////////////////////////////
// parameter สำหรับ view select_dt / Text_input
var lddate = new Date();
var ltime = true;
var lcvar = "x";
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
	"spin.js",
	"dojo/_base/window",
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
 ], function(Spinner, win, popup, mitem, menu, _base, heading, tool, mobile, parser, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		
///////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		spinner = new Spinner().spin();
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		var show_dt = reg.byId("show_dt");
		var clear_dt = reg.byId("clear_dt");

		///////////////////
		//// Variables ////
		///////////////////
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
		var lnhr1 = 0;
		var lnmin1 = 0;

		//////////////////
		//// Events //////
		//////////////////
		
		on(select_dt, "beforeTransitionIn", function() {
			calendar1.set("value", lddate);
			lchour = lddate.getHours().toString();
			hr1.set("value", pad(lchour, "00"));
			lcmin = lddate.getMinutes().toString();
			min1.set("value", pad(lcmin, "00"));
			show_dt.set("label", tsdate(lddate, 1));
		});
		
		on(select_dt_title, "click", function() {
			var isback = back_select_dt.get("focused");
			if (isback == true) {
				var cmacro = lcvar + " = lddate";
				eval(cmacro);
				eval(gcfunction);
				select_dt.performTransition(gcsource_view, -1, "swirl", null);
			}
			var isclear = clear_dt.get("focused");
			if (isclear == true) {
				lddate = "";
				hr1.set("value", "");
				min1.set("value", "");
				show_dt.set("label", tsdate(lddate));
				if (lautoback == true) {
					var cmacro = lcvar + " = lddate";
					eval(cmacro);
					eval(gcfunction);
					select_dt.performTransition(gcsource_view, -1, "swirl", null);
				}
			}
		});
		
		on(calendar1, "change", function() {
			lnhr1 = lddate.getHours();
			lnmin1 = lddate.getMinutes();
			lddate = calendar1.get("value");
			lddate.setHours(lnhr1);
			lddate.setMinutes(lnmin1);
			show_dt.set("label", tsdate(lddate, 1));
			if (calendar1.hovering == true) {
				if (lautoback == true || ltime == false) {
					var cmacro = lcvar + " = lddate";
					eval(cmacro);
					eval(gcfunction);
					select_dt.performTransition(gcsource_view, -1, "swirl", null);
				}
			}
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

					if (lautoback == true) {
						var cmacro = lcvar + " = lddate";
						eval(cmacro);
						eval(gcfunction);
						select_dt.performTransition(gcsource_view, -1, "swirl", null);
					} else {calendar1.focus(true);}
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
//// View Graph   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_graph = reg.byId("view_graph");
		var back_graph = reg.byId("back_graph");
		var graph_title = reg.byId("graph_title");
		var graph_box = reg.byId("graph_box");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(graph_title, "click", function() {
			back("back_graph", "view_graph", gcsource_view);
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ส่วนนี้ เป็น code ที่ต้องเขียน เพื่อควบคุมการทำงานของ view ต่างๆ ใน Project //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View person   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var person = reg.byId("person");
		var person_title = reg.byId("person_title");
		var person_list = reg.byId("person_list");
		var back_person = reg.byId("back_person");
		var cid = reg.byId("cid");
		var btn_ok = reg.byId("btn_ok");
		var new_store = new ifws({data:{items:[]}});
		person_list.store = null;
		person_list.setStore(new_store);
		//////////////////
		//// Function ////
		//////////////////
		function pobj() {
			var p_obj = php2obj("cid_search.php?cid=" + lccid);
			if (p_obj.sex !== undefined) {
				lcsex = p_obj.sex;
				lcage = getAge(p_obj.birthdate, "");
				lcfullname = p_obj.fname + " " + p_obj.lname;
				lcpsw = p_obj.psw;
				lctown = p_obj.town_id;
				lctownname = p_obj.town_name;
				var o_obj = php2obj("cid_osm.php?cid=" + lccid);
				lcosm = o_obj.osm;
				tel_osm = o_obj.osm_phone;
				var pcu_obj = php2obj("cid_pcu.php?cid=" + lccid);
				lcpcu = pcu_obj.pcu;
				tel_pcu = pcu_obj.pcu_phone;
				var h_obj = php2obj("cid_hosp.php?cid=" + lccid);
				lchosp = h_obj.doctor;
				tel_hosp = pcu_obj.doc_phone;

				// Hide Keyboard
				btn_ok.focus(true);
				clearList("person_list");
				var list_add = person_list.store.newItem({label: "ข้อมูลทั่วไป", header : true, value : "1"});
				var list_add = person_list.store.newItem({label: "ชื่อ-สกุล", rightText: lcfullname,  value : "2"});
				var list_add = person_list.store.newItem({label: "เพศ/อายุ", rightText: "เพศ " + lcsex + " / อายุ " + lcage, value : "3"});
				var list_add = person_list.store.newItem({label: "ข้อมูลทีมหมอครอบครัว", header : true, value : "4"});
				var list_add = person_list.store.newItem({label: "อสม. : " + lcosm, rightText: tel_osm, rightIcon2: "tel.jpg", value : "5"});
				var list_add = person_list.store.newItem({label: "รพ.สต. : " + lcpcu, rightText: tel_pcu, rightIcon2: "tel.jpg", value : "6"});
				var list_add = person_list.store.newItem({label: "แพทย์ : " + lchosp, rightText: tel_hosp, rightIcon2: "tel.jpg", value : "7"});
				var list_add = person_list.store.newItem({label: "หมายเลขฉุกเฉิน :", rightText: "1669", rightIcon2: "tel.jpg", value : "8"});
				var list_add = person_list.store.newItem({label: "ข้อมูลสุขภาพ", header : true, value : "9"});
				var list_add = person_list.store.newItem({label: "ผลการตรวจสุขภาพ", rightText: ">",  value : "10"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย หมู่บ้าน", rightText: ">",  value : "11"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย วัด", rightText: ">",  value : "12", unit: "001"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย โรงเรียน", rightText: ">",  value : "13", unit: "002"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย ศูนย์เด็ก", rightText: ">",  value : "14", unit: "003"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย อบต.", rightText: ">",  value : "15", unit: "004"});
				var list_add = person_list.store.newItem({label: "บันทึกลูกน้ำยุงลาย หน่วยงาน", rightText: ">",  value : "16", unit: "005"});
				spinner.stop();
			} else {
				spinner.stop();
				clearList("person_list");
				dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", "ไม่พบรหัสประชาชน " + lccid + " ในฐานข้อมูล ...");
			}
		}
		//////////////////
		//// Variables ///
		//////////////////
		var lccid = "";
		var lcage = "";
		var lcsex = "";
		var lcfullname = "";
		var lcosm = "";
		var tel_osm = "";
		var lcpcu = "";
		var tel_pcu = "";
		var lchosp = "";
		var tel_hosp = "";
		var phone = "";
		var lcpsw = "";
		var lctown = "";
		var lctownname = "";

		//////////////////
		//// Events //////
		//////////////////
		on(cid, "keyup", function() {
     		lccid = cid.get("value");
			var lnLength = lccid.length;
			if (lnLength == 13) {
				spinner.spin(person.domNode);
				setTimeout(function() {pobj()}, 500);
			}
		 });

		on(person_title, "click", function() {
			var isback = back_person.get("focused");
			if (isback == true) {window.location.href = "http://m30.phoubon.in.th/index.html";}
		});

		on(person_list, "click", function() {
			var pl_obj = selected_row("person_list");
			var csel = pl_obj.value;
			if (csel == "5" || csel == "6" || csel == "7") {
				if (csel == "5") {phone = tel_osm;}
				else if (csel == "6") {phone = tel_pcu;}
				else if (csel == "7") {phone = tel_hosp;}
				if (phone.length < 9) {
					var lcalert = "หมายเลขโทรศัพท์ไม่ถูกต้อง \n\nกรุณาตรวจสอบ !!!";
					dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalert);
				}
				else {
					if (phone.length == 10) {
						if (phone.substr(0, 1) == "0") {phone = phone.substr(1, 9);}
					}
					window.location.href = "tel:+66" + phone;
				}
			}
			else if (csel == "8") {
				window.location.href = "tel: 1669";
			}
			else if (csel == "11") {
				var psw = prompt("กรุณากรอกรหัสผ่าน");
				if (psw == lcpsw && lcpsw.length > 0) {
					var csurvey = prompt("กรอกค่าลูกน้ำยุงลายที่สำรวจได้");
					if (csurvey >= 0 && csurvey.length > 0) {
						mysave("hi_save.php?town_id=" + lctown + "&staffcid=" + lccid + "&hi_index=" + csurvey + "&auto_id=0");
						lcalert = "บันทึกลูกน้ำยุงลาย " + lctownname + " = " + csurvey + " เรียบร้อยแล้ว";
						dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalert);
					} else {
						lcalert = "ข้อมูลไม่ถูกต้อง ไม่สามารถบันทึกได้ !!!";
						dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalert);
					}
				}
				else {
					lcalert = "รหัสผ่านไม่ถูกต้อง ไม่มีสิทธิกรอกข้อมูล ...";
					dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalert); }
			}
			else if (csel > "11") {
				var psw = prompt("กรุณากรอกรหัสผ่าน");
				if (psw == lcpsw && lcpsw.length > 0) {
					var lctmb = lctown.substr(0, 6);
					var cunit = pl_obj.unit;
					list("office_list", "ci_units.php?tumbon=" + lctmb + "&type=" + cunit);
					person.performTransition("office", 1, "cube");
				}
				else {
					lcalert = "รหัสผ่านไม่ถูกต้อง ไม่มีสิทธิกรอกข้อมูล ...";
					dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalret);}
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// office   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var office = reg.byId("office");
		var back_office = reg.byId("back_office");
		var office_title = reg.byId("office_title");
		var office_list = reg.byId("office_list");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(office_title, "click", function() {
			back("back_office", "office", "person");
		});

		on(office_list, "click", function() {
			var o_obj = selected_row("office_list");
			var csel = o_obj.ci_id;
			var clabel = o_obj.label;
			var ci_val = prompt("บันทึกค่า CI " + clabel);
			if (ci_val >= 0 && ci_val.length > 0) {
				mysave("ci_save.php?ci_id=" + csel + "&staffcid=" + lccid + "&ci_index=" + ci_val);
				lcalert = "บันทึกลูกน้ำยุงลาย " + clabel + " = " + ci_val + " เรียบร้อยแล้ว";
				dialog("แจ้งข้อมูล", "alert", "x", "c", lcalert);
				office.performTransition("person", -1, "swirl");
			} else {
				lcalert = "ข้อมูลผิดพลาด ไม่สามารถบันทึกได้ !!!";
				dialog("แจ้งข้อผิดพลาด", "alert", "x", "c", lcalert);}
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// View 2   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		//var view2 = reg.byId("view2");
		//var back_view2 = reg.byId("back_view2");
		//var view2_title = reg.byId("view2_title");
		//var view2_list = reg.byId("view2_list");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		//on(view2_title, "click", function() {
			//back("back_view2", "view2", "sourceview");
		//});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ส่วนล่าง 2 บรรทัด ห้ามลบ ห้ามแก้ไข ///////////////////////////////////////////////////////////////////////
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////