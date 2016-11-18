////////////////////////////////
//// Public Variables //////////
////////////////////////////////
var spinner = {};
ip_address = "http://192.168.200.7/mbase2017/";
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
//var tx=new Date();
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
	"dojox/widget/Standby", 
	"dojox/mobile/SwapView",
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
 ], function(Spinner, win, popup, mitem, menu, Standby, SwapView, _base, heading, tool, mobile, parser, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr){
		ready(function(){
///////////////////////////////
//// User Defined Function ////
///////////////////////////////
		
///////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
		var view1 = reg.byId("view1");
		var view2 = reg.byId("view2");
		var tx = "";
		//var ty = "";
		//dialog("ทดสอบ Dialog", "alert(tx)", "tx", "d", "เลือก Date");
//var spinner = new Spinner(opts).spin(target);
		
spinner = new Spinner().spin();
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// Log In   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var login = reg.byId("login");
		var btn_login = reg.byId("btn_login");
		var user_name = reg.byId("user_name");
		var password = reg.byId("password");
		var staff_list = reg.byId("staff_list");
		list("staff_list", "user_list.php", "กรุณา Click เลือกรายการ");
		var listx = reg.byId("listx");

		var spinner = new Spinner().spin();

		//alert ("Here");
		//debugger;
		//document.body.appendChild(standby.domNode);
		//standby.startup();
		//standby.show();
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////
		var lcpsw = "";
		var lcshow = "";
		var lcstaffpsw = "";
		var gcstaff = "";
		//////////////////
		//// Events //////
		//////////////////

		// key ชื่อ เพื่อค้นหา
		on(user_name, "keyup", function() {
			txt_search("user_name", "staff_list");
		});
		
		// Click รายชื่อเพื่อเลือก
		on(staff_list, "click", function() {
			var staff = selected_row("staff_list");
			gcstaff = staff.staff_id;
			lcstaff = staff.label.trim();
			lcstaffpsw = decode(staff.staff_pw);
			user_name.set("value", lcstaff);
			password.focus(true);
		});

		on(password, "keypress", function() {
			var lctxt = password.get("value").trim();
			var lnlen = lctxt.length;
			var lnkey = event.keyCode;
			var lcnew = String.fromCharCode(lnkey);
			
			lcpsw = lcpsw.substr(0, lnlen);
			lcshow = lcshow.substr(0, lnlen);
			
			lcpsw = lcpsw + lcnew
			lcpsw = lcpsw.toUpperCase();
			password.set("value", lcshow);
			lcshow = lcshow + "*";
		});
		// Click Log In
		on(btn_login, "click", function() {

			list2list("staff_list", "listx", "label", "rightText", "staff_id");
			lcpsw1 = password.get("value");
			spinner.stop();
			if (lcpsw == lcstaffpsw && lcpsw.trim() > "") {
				login.performTransition("main_view", 1, "slide", null);}
			else {
				if (lcpsw1 == lcstaffpsw) {
					spinner.stop();
					login.performTransition("main_view", 1, "slide", null);
				} else {
					dialog("แจ้งข้อผิดพลาด", "alert", "", "", "password ไม่ถูกต้อง กรุณาตรวจสอบ !!!");
					lcpsw = "";
					password.set("value", "");
					password.focus(true);
				}
			}
		});

		on(listx, "click", function(){
			var csel = selected_row("listx");
			var staff = csel.staff_id;
			dialog("กรอกข้อมูล", ";alert(var1 + var2);", "var1", "c", "จำนวน", "var2", "n", "ราคารวม");
		})
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// main View   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var main_view = reg.byId("main_view");
		var log_out = reg.byId("log_out");
		var menu_title = reg.byId("menu_title");
		var menu_list = reg.byId("menu_list");
		var m_store = new ifws({data:{items:[]}});
		menu_list.store = null;
		menu_list.setStore(m_store);

		var list_add = menu_list.store.newItem({label: "เมนูหลัก mBase2017", header: true});
		var list_add = menu_list.store.newItem({label: "บันทึก Vital Signs", icon: "vital_sign.jpg", rightText: ">"});
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(menu_title, "click", function() {
			var isout = log_out.get("focused");
			if (isout == true) {
				user_name.set("value", "");
				password.set("value", "");
				lcpsw = "";
				list("staff_list", "user_list.php", "กรุณา Click เลือกรายการ");
				main_view.performTransition("login", -1, "slide");
			}
		});

		on(menu_list, "click", function() {
			list("opd_list", "opd_register.php", "กรุณาเลือกผู้ป่วยเพื่อกรอก V/S");
			clearList("patient");
			lcbt = "";
			lcpr = "";
			lcrr = "";
			lcsyst = "";
			lcdias = "";
			lcweight = "";
			lcheight = "";
			lcwaist = "";
			vr2.set("value", "");
			vr3.set("value", "");
			vr4.set("value", "");
			vr5.set("value", "");
			vr6.set("value", "");
			vr7.set("value", "");
			vr8.set("value", "");
			vr9.set("value", "");
			main_view.performTransition("vrecord", 1, "slide")
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// vsign   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var vsign = reg.byId("vsign");
		var back_vsign = reg.byId("back_vsign");
		var vsign_title = reg.byId("vsign_title");
		var vsign_list = reg.byId("vsign_list");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(vsign_title, "click", function() {
			back("back_vsign", "vsign", "main_view");
		});
//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// vrecord   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var vrecord = reg.byId("vrecord");
		var back_vrecord = reg.byId("back_vrecord");
		var vrecord_title = reg.byId("vrecord_title");
		var opd_list = reg.byId("opd_list");
		var patient = reg.byId("patient");
		var p_store = new ifws({data:{items:[]}});
		patient.store = null;
		patient.setStore(p_store);

		var btn_refresh = reg.byId("btn_refresh");

		var btn_vr1 = reg.byId("btn_vr1");
		var vr2 = reg.byId("vr2");
		var vr3 = reg.byId("vr3");
		var vr4 = reg.byId("vr4");
		var vr5 = reg.byId("vr5");
		var vr6 = reg.byId("vr6");
		var vr7 = reg.byId("vr7");
		var vr8 = reg.byId("vr8");
		var vr9 = reg.byId("vr9");

		var cancel2 = reg.byId("cancel2");
		var cancel3 = reg.byId("cancel3");
		var cancel4 = reg.byId("cancel4");
		var cancel5 = reg.byId("cancel5");
		var cancel6 = reg.byId("cancel6");
		var cancel7 = reg.byId("cancel7");
		var cancel8 = reg.byId("cancel8");
		var cancel9 = reg.byId("cancel9");
		//////////////////
		//// Function ////
		//////////////////
		function p_detail() {
			vr9.set("value", lcheight);
			clearList("patient");
			var list_add = patient.store.newItem({label: "รายละเอียดผู้ป่วย", header: true});
			var list_add = patient.store.newItem({label: "ชื่อ-สกุล", rightText: lcfullname});
			var list_add = patient.store.newItem({label: "เพศ", rightText: lcsex});
			var list_add = patient.store.newItem({label: "อายุ", rightText: lcage});
			var list_add = patient.store.newItem({label: "รหัส", rightText: lccid.substr(0, 1) + "-" + 
				lccid.substr(1, 4) + "-" + lccid.substr(5, 5) + "-" + lccid.substr(9, 2) + "-" + lccid.substr(12, 1)});
			var list_add = patient.store.newItem({label: "HN", rightText: lchnumber});
		}

		on(btn_refresh, "click", function(){
			vr2.set("value", "");
			vr3.set("value", "");
			vr4.set("value", "");
			vr5.set("value", "");
			vr6.set("value", "");
			vr7.set("value", "");
			vr8.set("value", "");
			vr9.set("value", "");
			clearList("patient");

			cancel2.domNode.style.backgroundImage = 'none';
			cancel3.domNode.style.backgroundImage = 'none';
			cancel4.domNode.style.backgroundImage = 'none';
			cancel5.domNode.style.backgroundImage = 'none';
			cancel6.domNode.style.backgroundImage = 'none';
			cancel7.domNode.style.backgroundImage = 'none';
			cancel8.domNode.style.backgroundImage = 'none';

			list("opd_list", "opd_register.php", "กรุณาเลือกผู้ป่วยเพื่อกรอก V/S");
		})

		//////////////////
		//// Variables ///
		//////////////////
		var lcvisit = "";
		var lcfullname = "";
		var lcage = "";
		var lccid = "";
		var lchnumber = "";
		var lcsex = "";
		var lcbt = "";
		var lcpr = "";
		var lcrr = "";
		var lcsyst = "";
		var lcdias = "";
		var lcweight = "";
		var lcwaist = "";
		var lcheight = "";

		//////////////////
		//// Events //////
		//////////////////
		on(opd_list, "click", function() {
			vr2.set("value", "");
			vr3.set("value", "");
			vr4.set("value", "");
			vr5.set("value", "");
			vr6.set("value", "");
			vr7.set("value", "");
			vr8.set("value", "");
			vr9.set("value", "");

			var patient = selected_row("opd_list");
			lcfullname = patient.patient;
			lcage = getAge(patient.birthdate);
			lcsex = "ชาย";
			if(patient.sex=="2") {lcsex = "หญิง";}
			lchnumber = patient.hn;
			lccid = patient.cid;
			lcvisit = patient.visit_id;
			lcheight = patient.height;
			if (lcheight=="0"){lcheight = "";}
			p_detail();
		});

		on(vrecord_title, "click", function() {
			back("back_vrecord", "vrecord", "main_view");
		});

		on(btn_vr1, "click", function() {
			lcbt = vr2.get("value");
			if (lcbt=="") {lcbt="0";}
			lcpr = vr3.get("value");
			if (lcpr=="") {lcpr="0";}
			lcrr = vr4.get("value");
			if (lcrr=="") {lcrr="0";}
			lcsyst = vr5.get("value");
			if (lcsyst=="") {lcsyst="0";}
			lcdias = vr6.get("value");
			if (lcdias=="") {lcdeas="0";}
			lcweight = vr7.get("value");
			if (lcweight=="") {lcweight="0";}
			lcwaist = vr8.get("value");
			if (lcwaist=="") {lcwaist="0";}
			lcheight = vr9.get("value");
			if (lcheight=="") {lcheight="0";}
			var cphp = "vital_sign.php?staff_id=" + gcstaff + "&visit_id=" + lcvisit + "&body_temp=" + lcbt + "&pulse_rate=" + lcpr + "&resp_rate=" + lcrr +
				"&bp_syst=" + lcsyst + "&bp_dias=" + lcdias + "&weight=" + lcweight + "&height=" + lcheight + "&waist=" + lcwaist ;
			mysave(cphp, 'list("opd_list", "opd_register.php", "กรุณาเลือกผู้ป่วยเพื่อกรอก V/S")');
			clearList("patient");
			lcbt = "";
			lcpr = "";
			lcrr = "";
			lcsyst = "";
			lcdias = "";
			lcweight = "";
			lcheight = "";
			lcwaist = "";
			vr2.set("value", "");
			vr3.set("value", "");
			vr4.set("value", "");
			vr5.set("value", "");
			vr6.set("value", "");
			vr7.set("value", "");
			vr8.set("value", "");
			vr9.set("value", "");
			list("opd_list", "opd_register.php", "กรุณาเลือกผู้ป่วยเพื่อกรอก V/S");
		});

		on(vr2, "keyup", function() {
			var KeyID = event.keyCode;
			var ctxt = vr2.get("value");
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel2.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if (len1 == 2 && ctxt.indexOf(".") < 0 && KeyID != 8 && (ctxt.substr(0, 1) == "3" || ctxt.substr(0, 1) == "4")) {vr2.set("value", ctxt + ".");}
				if (len1 == 4 && ctxt.substr(3, 1) == ".") {
					vr2.set("value", ctxt.substr(0, 3));
					vr2.focus(true);}
				if (len1 == 4 && ctxt.substr(3, 1) != ".") {
					lcbt = ctxt;
					vr3.focus(true);
					// selectOnFocus
					var len2 = vr3.get("value").length;
					vr3.domNode.selectionStart = 0;
					vr3.domNode.selectionEnd = len2;
				}
			} else {
				cancel2.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel2, "click", function() {
			vr2.set("value", "");
			cancel2.domNode.style.backgroundImage = "none";
		});

		on(vr3, "keyup", function() {
			var ctxt = vr3.get("value").trim();
			lcpr = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel3.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 2) || len1 == 3) {
					lcpr = ctxt;
					vr4.focus(true);
					// selectOnFocus
					var len2 = vr4.get("value").length;
					vr4.domNode.selectionStart = 0;
					vr4.domNode.selectionEnd = len2;
				}
			} else {
				cancel3.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel3, "click", function() {
			vr3.set("value", "");
			cancel3.domNode.style.backgroundImage = "none";
		});
		
		on(vr4, "keyup", function() {
			var ctxt = vr4.get("value");
			lcrr = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel4.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 1) || len1 == 3) {
					lcrr = ctxt;
					vr5.focus(true);
					// selectOnFocus
					var len2 = vr5.get("value").length;
					vr5.domNode.selectionStart = 0;
					vr5.domNode.selectionEnd = len2;
				}
			} else {
				cancel4.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel4, "click", function() {
			vr4.set("value", "");
			cancel4.domNode.style.backgroundImage = "none";
		});
		
		on(vr5, "keyup", function() {
			var ctxt = vr5.get("value");
			lcsyst = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel5.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 3) || len1 == 3) {
					lcsyst = ctxt;
					vr6.focus(true);
					// selectOnFocus
					var len2 = vr6.get("value").length;
					vr6.domNode.selectionStart = 0;
					vr6.domNode.selectionEnd = len2;
				}
			} else {
				cancel5.domNode.style.backgroundImage = "none";
			}
		});
		on(cancel5, "click", function() {
			vr5.set("value", "");
			cancel5.domNode.style.backgroundImage = "none";
		});
		
		on(vr6, "keyup", function() {
			var ctxt = vr6.get("value");
			lcdias = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel6.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 2) || len1 == 3) {
					lcdias = ctxt;
					vr7.focus(true);
					// selectOnFocus
					var len2 = vr7.get("value").length;
					vr7.domNode.selectionStart = 0;
					vr7.domNode.selectionEnd = len2;
				}
			} else {
				cancel6.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel6, "click", function() {
			vr6.set("value", "");
			cancel6.domNode.style.backgroundImage = "none";
		});

		on(vr7, "keyup", function() {
			var KeyID = event.keyCode;
			var ctxt = vr7.get("value");
			var len1 = ctxt.length;
			if (ctxt.indexOf("..") > 0) {
				vr7.set("value", ctxt.substr(0, len1-1));
				vr7.focus(true);}
			else {
				if (len1 > 0) {
					cancel7.domNode.style.backgroundImage = 'url("cross1.jpg")';
					if (len1 == 2 && ctxt.indexOf(".") < 0 && KeyID != 8 && (ctxt.substr(0, 1) > "1")) {vr7.set("value", ctxt + ".");}
					if (len1 == 3 && ctxt.indexOf(".") < 0 && KeyID != 8) {vr7.set("value", ctxt + ".");}
					if ((len1 == 4 && ctxt.indexOf(".") == 2) || (len1 == 5 && ctxt.indexOf(".") == 3)) {
						lcweight = ctxt;
						vr8.focus(true);
						// selectOnFocus
						var len2 = vr8.get("value").length;
						vr8.domNode.selectionStart = 0;
						vr8.domNode.selectionEnd = len2;
					}
				} else {
					cancel7.domNode.style.backgroundImage = "none";
				}
			}
		});

		on(cancel7, "click", function() {
			vr7.set("value", "");
			cancel7.domNode.style.backgroundImage = "none";
		});

		on(vr8, "keyup", function() {
			var ctxt = vr8.get("value").trim();
			lcpr = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel8.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 2) || len1 == 3) {
					lcpr = ctxt;
					vr9.focus(true);
					// selectOnFocus
					var len2 = vr9.get("value").length;
					vr9.domNode.selectionStart = 0;
					vr9.domNode.selectionEnd = len2;
				}
			} else {
				cancel8.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel8, "click", function() {
			vr8.set("value", "");
			cancel8.domNode.style.backgroundImage = "none";
		});
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
		var search_box = reg.byId("search_box");
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
		
		on(search_box, "keyup", function() {
			lcsearchtext = search_box.get("value").trim().toUpperCase();
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
				search_box.set("value", "");
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
				search_box.set("value", "");
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
//// View 1   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		//var view1 = reg.byId("view1");
		//var view1_title = reg.byId("view1_title");
		//var view1_list = reg.byId("view1_list");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		//on(view1_list, "click", function() {
		//	gcsource_view = "view1";
		//	lautoback = true;
		//	lcvar = "lab";
		//	lcfield = "lab_id";
		//	gcfunction = "alert (lab)"
			
		//	txt_title.set("label", "กรุณาเลือกรายการ Lab");
		//	txt_return.set("value", "คืนค่าเป็นรหัส Lab ที่เลือก");
		//	clearList("txt_list");
		//	var list_add = txt_list.store.newItem({label: "ทดสอบการเลือกรหัส", header: true});
		//	var list_add = txt_list.store.newItem({label: "CBC", lab_id : "001"});
		//	var list_add = txt_list.store.newItem({label: "UA", lab_id : "002"});
		//	var list_add = txt_list.store.newItem({label: "FBS", lab_id : "003"});
		//	var list_add = txt_list.store.newItem({label: "BUN", lab_id : "004"});

		//	view1.performTransition("text_input", 1, "slide");
		//});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
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