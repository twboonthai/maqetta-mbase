//// ประกาศตัวแปร
lnliteral = 0;
lnbrain1 = 0;
lnbrain2 = 0;
lnbrain3 = 0;
lnbrain4 = 0;
lnbrain5 = 0;
lnbrain6 = 0;
lnbrain7 = 0;
lnbrain8 = 0;
lnbrain9 = 0;
lnbrain10 = 0;
lnbrain11 = 0;
lnbrain12 = 0;

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
     
//// User defined Function		
		function brain_list() {
			//// แสดงข้อมูลใหม่
			clearList("brain_detail");
			//// แสดงคะแนน Brain เดิม
			var list_add = brain_detail.store.newItem({label: "เวลา = " + lnbrain1.toString(), value : lnbrain1.toString(), value1 : "1"});
			var list_add = brain_detail.store.newItem({label: "สถานที่ = " + lnbrain2.toString(), value : lnbrain2.toString(), value1 : "2"});
			var list_add = brain_detail.store.newItem({label: "จดจำ = " + lnbrain3.toString(), value : lnbrain3.toString(), value1 : "3"});
			var list_add = brain_detail.store.newItem({label: "คำนวณ = " + lnbrain4.toString(), value : lnbrain4.toString(), value1 : "4"});
			var list_add = brain_detail.store.newItem({label: "สมาธิ = " + lnbrain5.toString(), value : lnbrain5.toString(), value1 : "5"});
			var list_add = brain_detail.store.newItem({label: "ความจำระยะสั้น = " + lnbrain6.toString(), value : lnbrain6.toString(), value1 : "6"});
			var list_add = brain_detail.store.newItem({label: "เรียกชื่อ = " + lnbrain7.toString(), value : lnbrain7.toString(), value1 : "7"});
			var list_add = brain_detail.store.newItem({label: "พูดตาม = " + lnbrain8.toString(), value : lnbrain8.toString(), value1 : "8"});;
			var list_add = brain_detail.store.newItem({label: "ทำตามคำบอก = " + lnbrain9.toString(), value : lnbrain9.toString(), value1 : "9"});
			var list_add = brain_detail.store.newItem({label: "ทำตามคำเขียน = " + lnbrain10.toString(), value : lnbrain10.toString(), value1 : "10"});
			var list_add = brain_detail.store.newItem({label: "เขียน = " + lnbrain11.toString(), value : lnbrain11.toString(), value1 : "11"});
			var list_add = brain_detail.store.newItem({label: "วาดภาพ = " + lnbrain12.toString(), value : lnbrain12.toString(), value1 : "12"});
			var list_add = brain_detail.store.newItem({label: "อ่านออกเขียนได้ = " + lnliteral.toString(), value : lnliteral.toString(), value1 : "13"});
		}
		
		function b_click(b_obj, b_var) {
			var f_obj = reg.byId(b_obj);
			var lcx = f_obj.tooltip;
			if (lcx == '') {
				cMacro = b_var + "=" + b_var + "+1";
				eval(cMacro);
				f_obj.tooltip = "1";
				f_obj.domNode.style.backgroundImage = 'url("right.jpg")';}
			else {
				cMacro = b_var + "=" + b_var + "-1";
				eval(cMacro);
				f_obj.tooltip = "";
				f_obj.domNode.style.backgroundImage = 'url("wrong.jpg")';}
		}
		
		function adl_brain(nadl, nbrain, nliteral) {
			cReturn = "1";
			if (nadl < 12) {
				if (nadl < 5) {
					if (nliteral = 1) {
						if (nbrain > 14) {cReturn = "4";}
						else {cReturn = "5";}
					}
					else if (nliteral = 2) {
						if (nbrain > 17) {cReturn = "4";}
						else {cReturn = "5";}
					}
					else {
						if (nbrain > 22) {cReturn = "4";}
						else {cReturn = "5";}
					}
				}
				else {
					if (nliteral = 1) {
						if (nbrain > 14) {cReturn = "2";}
						else {cReturn = "3";}
					}
					else if (nliteral = 2) {
						if (nbrain > 17) {cReturn = "2";}
						else {cReturn = "3";}
					}
					else {
						if (nbrain > 22) {cReturn = "2";}
						else {cReturn = "3";}
					}
				}
			}
			return cReturn;
		}
		
		function adl_data() {
			xhr.get({
				url: ip_address + "adl_score.php",
				content: {cid: lccid},
				headers: { "X-Requested-With": null },
				load: function(adl_result) {
					xhr.get({
						url: ip_address + "brain_score.php",
						content: {cid: lccid},
						headers: { "X-Requested-With": null },
						load: function(brn_result) {
							ceducation = brn_result.trim().substr(0, 1);
							nedu = parseInt(ceducation);
							cbrain = brn_result.trim().substr(2);
							nbrain = parseInt(cbrain);
							lnGrade = adl_brain(adl_result, nedu, nbrain);
							var adl_level = reg.byId("adl_level");
							adl_level.set("value", lnGrade);},
						error: function() {alert("Failed Adl Score !");}
					});},
				error: function() {alert("Failed Adl Score !");}
			});
		}
		
//// จบ UDF ///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
//// ปุ่ม Back ///////////////////////////////////////////////////////////////////////
		var bp_back = reg.byId("bp_back");
		on(bp_back, "click", function() {
			brain_person.performTransition("staff_v2", -1, "slide", null);
		});
		var bm_back = reg.byId("bm_back");
		on(bm_back, "click", function() {
			brain_main.performTransition("brain_person", -1, "slide", null);
		});
		var b1_back = reg.byId("b1_back");
		on(b1_back, "click", function() {
			brain1.performTransition("brain_main", -1, "slide", null);
		});
		var b2_back = reg.byId("b2_back");
		on(b2_back, "click", function() {
			brain2.performTransition("brain_main", -1, "slide", null);
		});
		var b3_back = reg.byId("b3_back");
		on(b3_back, "click", function() {
			brain3.performTransition("brain_main", -1, "slide", null);
		});
		var b4_back = reg.byId("b4_back");
		on(b4_back, "click", function() {
			brain4.performTransition("brain_main", -1, "slide", null);
		});
		var b5_back = reg.byId("b5_back");
		on(b5_back, "click", function() {
			brain5.performTransition("brain_main", -1, "slide", null);
		});
		var b6_back = reg.byId("b6_back");
		on(b6_back, "click", function() {
			brain6.performTransition("brain_main", -1, "slide", null);
		});
		var b7_back = reg.byId("b7_back");
		on(b7_back, "click", function() {
			brain7.performTransition("brain_main", -1, "slide", null);
		});
		var b8_back = reg.byId("b8_back");
		on(b8_back, "click", function() {
			brain8.performTransition("brain_main", -1, "slide", null);
		});
		var b9_back = reg.byId("b9_back");
		on(b9_back, "click", function() {
			brain9.performTransition("brain_main", -1, "slide", null);
		});
		var b10_back = reg.byId("b10_back");
		on(b10_back, "click", function() {
			brain10.performTransition("brain_main", -1, "slide", null);
		});
		var b11_back = reg.byId("b11_back");
		on(b11_back, "click", function() {
			brain11.performTransition("brain_main", -1, "slide", null);
		});
		var b12_back = reg.byId("b12_back");
		on(b12_back, "click", function() {
			brain12.performTransition("brain_main", -1, "slide", null);
		});
		var b13_back = reg.byId("b13_back");
		on(b13_back, "click", function() {
			brain13.performTransition("brain_main", -1, "slide", null);
		});
////////////////////////////////////////////////////////////////		
		
		var brain_person = reg.byId("brain_person");
		var brain_main = reg.byId("brain_main");
		var brain_detail = reg.byId("brain_detail");
		var store_bdetail = new ifws({data:{items:[]}});
		brain_detail.store = null;
		brain_detail.setStore(store_bdetail);
		var brain_new = reg.byId("brain_new");
		
		var brain13 = reg.byId("brain13");

//// เพิ่มรายการ ////////////////////////////////////////////////////////////////////////		
		on(brain_new, "click", function() {
			lnbrain1 = 0;
			lnbrain2 = 0;
			lnbrain3 = 0;
			lnbrain4 = 0;
			lnbrain5 = 0;
			lnbrain6 = 0;
			lnbrain7 = 0;
			lnbrain8 = 0;
			lnbrain9 = 0;
			lnbrain10 = 0;
			lnbrain11 = 0;
			lnbrain12 = 0;
			lnliteral = 0;
			lcbraindate = "";
			//// Clear ตัวเลือกเดิม อ่านออกเขียนได้
			literal1.set("checked", false);
			literal2.set("checked", false);
			literal3.set("checked", false);
			//// Clear ตัวเลือกถูกผิด + เปลี่ยนภาพ
			for (n=1; n<=12; n++){
				var lcobj0 = "b" + n.toString();
				var rnd = 5;
		   		if (n==7){ rnd = 2;}
		   		else if (n==3 || n==6 || n==9) {rnd = 3;}
		   		else if (n==10 || n==11 || n==12) {rnd = 1;}
		   		for (r=1; r <=rnd; r++){
		   			var lcobj1 = lcobj0 + r.toString();
		   			var lcobj = reg.byId(lcobj1);
		   			lcobj.set("tooltip", "");
		   			lcobj.domNode.style.backgroundImage = 'url("wrong.jpg")';
		   		}
		   	}
			////////////////////////////////////////////////////////////////////////////////
			
			clearList("brain_detail");
		   //// แสดงคะแนน Brain เดิม
			var list_add = brain_detail.store.newItem({label: "เวลา = ?", value : "0", value1 : "1"});
			var list_add = brain_detail.store.newItem({label: "สถานที่ = ?" , value : "0", value1 : "2"});
			var list_add = brain_detail.store.newItem({label: "จดจำ = ?", value : "0", value1 : "3"});;
			var list_add = brain_detail.store.newItem({label: "คำนวณ = ?" , value : "0", value1 : "4"});
			var list_add = brain_detail.store.newItem({label: "สมาธิ = ?", value : "0", value1 : "5"});
			var list_add = brain_detail.store.newItem({label: "ความจำระยะสั้น = ?", value : "0", value1 : "6"});
			var list_add = brain_detail.store.newItem({label: "เรียกชื่อ = ?" , value : "0", value1 : "7"});
			var list_add = brain_detail.store.newItem({label: "พูดตาม = ?", value : "0", value1 : "8"});;
			var list_add = brain_detail.store.newItem({label: "ทำตามคำบอก = ?" , value : "0", value1 : "9"});
			var list_add = brain_detail.store.newItem({label: "ทำตามคำเขียน = ?", value : "0", value1 : "10"});
			var list_add = brain_detail.store.newItem({label: "เขียน = ?" , value : "0", value1 : "11"});
			var list_add = brain_detail.store.newItem({label: "วาดภาพ = ?", value : "0", value1 : "12"});
			var list_add = brain_detail.store.newItem({label: "อ่านออกเขียนได้ = ?", value : "0", value1 : "13"});
			
			brain_person.performTransition("brain_main", 1, "slide", null);
		});
////////////////////////////////////////////////////////////////////////////////////////////////		
//// เลือก Brain ทีละข้อ
		on(brain_detail, "click", function() {	
			//// ระบุรายการที่เลือก
			lcorder = "";
			var all_list = brain_detail.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].get("focused") == true){
					break;}
		   	}
		   	lcorder = all_list[s].value1;
			//// แสดงรายละเอียด brn รายข้อ
			var lcpage = "brain" + lcorder;
			brain_main.performTransition(lcpage, 1, "slide", null);
		});
//////////////////////////////////////////////////////////////////////		
//// Brain1
		var brain1 = reg.byId("brain1");
		var b11 = reg.byId("b11");
		var b12 = reg.byId("b12");
		var b13 = reg.byId("b13");
		var b14 = reg.byId("b14");
		var b15 = reg.byId("b15");
		on(brain1, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b11, "click", function() {
			b_click("b11", "lnbrain1")
		});
		on(b12, "click", function() {
			b_click("b12", "lnbrain1")
		});
		on(b13, "click", function() {
			b_click("b13", "lnbrain1")
		});
		on(b14, "click", function() {
			b_click("b14", "lnbrain1")
		});	
		on(b15, "click", function() {
			b_click("b15", "lnbrain1")
		});
/////////////////////////////////////////////////////////////////////////	
//// Brain2
		var brain2 = reg.byId("brain2");
		var b21 = reg.byId("b21");
		var b22 = reg.byId("b22");
		var b23 = reg.byId("b23");
		var b24 = reg.byId("b24");
		var b25 = reg.byId("b25");
		on(brain2, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b21, "click", function() {
			b_click("b21", "lnbrain2")
		});
		on(b22, "click", function() {
			b_click("b22", "lnbrain2")
		});
		on(b23, "click", function() {
			b_click("b23", "lnbrain2")
		});
		on(b24, "click", function() {
			b_click("b24", "lnbrain2")
		});	
		on(b25, "click", function() {
			b_click("b25", "lnbrain2")
		});
		
//// Brain3
		var brain3 = reg.byId("brain3");
		var b31 = reg.byId("b31");
		var b32 = reg.byId("b32");
		var b33 = reg.byId("b33");
		on(brain3, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b31, "click", function() {
			b_click("b31", "lnbrain3")
		});
		on(b32, "click", function() {
			b_click("b32", "lnbrain3")
		});
		on(b33, "click", function() {
			b_click("b33", "lnbrain3")
		});
		
//// Brain4
		var brain4 = reg.byId("brain4");
		var b41 = reg.byId("b41");
		var b42 = reg.byId("b42");
		var b43 = reg.byId("b43");
		var b44 = reg.byId("b44");
		var b45 = reg.byId("b45");
		on(brain4, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b41, "click", function() {
			b_click("b41", "lnbrain4")
		});
		on(b42, "click", function() {
			b_click("b42", "lnbrain4")
		});
		on(b43, "click", function() {
			b_click("b43", "lnbrain4")
		});
		on(b44, "click", function() {
			b_click("b44", "lnbrain4")
		});	
		on(b45, "click", function() {
			b_click("b45", "lnbrain4")
		});
		
//// Brain5
		var brain5 = reg.byId("brain5");
		var b51 = reg.byId("b51");
		var b52 = reg.byId("b52");
		var b53 = reg.byId("b53");
		var b54 = reg.byId("b54");
		var b55 = reg.byId("b55");
		on(brain5, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b51, "click", function() {
			b_click("b51", "lnbrain5")
		});
		on(b52, "click", function() {
			b_click("b52", "lnbrain5")
		});
		on(b53, "click", function() {
			b_click("b53", "lnbrain5")
		});
		on(b54, "click", function() {
			b_click("b54", "lnbrain5")
		});	
		on(b55, "click", function() {
			b_click("b55", "lnbrain5")
		});
		
//// Brain6
		var brain6 = reg.byId("brain6");
		var b61 = reg.byId("b61");
		var b62 = reg.byId("b62");
		var b63 = reg.byId("b63");
		on(brain6, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b61, "click", function() {
			b_click("b61", "lnbrain6")
		});
		on(b62, "click", function() {
			b_click("b62", "lnbrain6")
		});
		on(b63, "click", function() {
			b_click("b63", "lnbrain6")
		});
		
//// Brain7
		var brain7 = reg.byId("brain7");
		var b71 = reg.byId("b71");
		var b72 = reg.byId("b72");
		on(brain7, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b71, "click", function() {
			b_click("b71", "lnbrain7")
		});
		on(b72, "click", function() {
			b_click("b72", "lnbrain7")
		});
		
//// Brain8
		var brain8 = reg.byId("brain8");
		var b81 = reg.byId("b81");
		var b82 = reg.byId("b82");
		var b83 = reg.byId("b83");
		var b84 = reg.byId("b84");
		var b85 = reg.byId("b85");
		on(brain8, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b81, "click", function() {
			b_click("b81", "lnbrain8")
		});
		on(b82, "click", function() {
			b_click("b82", "lnbrain8")
		});
		on(b83, "click", function() {
			b_click("b83", "lnbrain8")
		});
		on(b84, "click", function() {
			b_click("b84", "lnbrain8")
		});	
		on(b85, "click", function() {
			b_click("b85", "lnbrain8")
		});
		
//// Brain9
		var brain9 = reg.byId("brain9");
		var b91 = reg.byId("b91");
		var b92 = reg.byId("b92");
		var b93 = reg.byId("b93");
		on(brain9, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b91, "click", function() {
			b_click("b91", "lnbrain9")
		});
		on(b92, "click", function() {
			b_click("b92", "lnbrain9")
		});
		on(b93, "click", function() {
			b_click("b93", "lnbrain9")
		});
		
//// Brain10
		var brain10 = reg.byId("brain10");
		var b101 = reg.byId("b101");
		on(brain10, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b101, "click", function() {
			b_click("b101", "lnbrain10");
			brain10.performTransition("brain_main", -1, "slide", null);
		});
		
//// Brain11
		var brain11 = reg.byId("brain11");
		var b111 = reg.byId("b111");
		on(brain11, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b111, "click", function() {
			b_click("b111", "lnbrain11");
			brain11.performTransition("brain_main", -1, "slide", null);
		});
		
//// Brain12
		var brain12 = reg.byId("brain12");
		var b121 = reg.byId("b121");
		on(brain12, "beforeTransitionOut", function() {
			brain_list();
		});
		on(b121, "click", function() {
			b_click("b121", "lnbrain12");
			brain12.performTransition("brain_main", -1, "slide", null);
		});
		
//// อ่านออกเขียนได้
		var literal1 = reg.byId("literal1");
		var literal2 = reg.byId("literal2");
		var literal3 = reg.byId("literal3");
		on(literal1, "click", function() {	
			lnliteral = 1;
			literal2.set("checked", false);
			literal3.set("checked", false);
			
			brain_list();
			
			brain13.performTransition("brain_main", -1, "slide", null);
		});
		on(literal2, "click", function() {	
			lnliteral = 2;
			literal1.set("checked", false);
			literal3.set("checked", false);
			
			brain_list();
			
			brain13.performTransition("brain_main", -1, "slide", null);
		});
		on(literal3, "click", function() {	
			lnliteral = 3;
			literal2.set("checked", false);
			literal1.set("checked", false);
			
			brain_list();
			
			brain13.performTransition("brain_main", -1, "slide", null);
		});
////////////////////////////////////////////////////////////////////
//// บันทึกข้อมูล /////////////////////////////////////////////////////		
		var adl_level = reg.byId("adl_level");
		var brain_save = reg.byId("brain_save");
		on(brain_save, "click", function() {
			if (lnliteral == 0) {alert ("กรุณากรอกระดับการอ่านออกเขียนได้ก่อน !!!");}
			else {
				var lcText0 = lnbrain1.toString() + lnbrain2.toString() + lnbrain3.toString() + lnbrain4.toString() + lnbrain5.toString() + lnbrain6.toString() + lnbrain7.toString();
				var lcText1 = lnbrain8.toString() + lnbrain9.toString() + lnbrain10.toString() + lnbrain11.toString() + lnbrain12.toString();
				var lcbrain = lcText0 + lcText1;
				var lceducate = lnliteral.toString();
				var r = confirm("ต้องการบันทึกการประเมินสภาพสมอง ?");
				if (r == true) {
				    xhr.get({
						url: ip_address + "brain_upd.php",
						content: {staff_cid: gcstaffid, cid: lccid, brain: lcbrain, educate: lceducate },
						headers: { "X-Requested-With": null },
						load: function() {},
						error: function() {alert("Failed Brain Save !");}
					});
					// หาคะแนน ADL
					adl_data();
				}
				brain_main.performTransition("staff_v2", -1, "slide", null);
			}
		});	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});