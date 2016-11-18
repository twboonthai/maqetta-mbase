//////////////////////////
//// Public Variables ////
//////////////////////////

//// General ///////////////
var lddate0 = new Date();
var gcsource_view = "";
var lcvar = "";
var gcfunction = "";

var lcsource = "";
var lcvartype = "N";
var lccode = "T";
var lcfnc = "";
var lcvar = "";
var lcoldtxt = "";
var lcnewtxt = "";

var lccid = "";
var lcfullname = "";
var lcage = "";
var lddate1 = "";
var lnhr1 = 0;
var lnmin1 = 0;
var lddate2 = "";
var lnhr2 = 0;
var lnmin2 = 0;
var ldekg = "";
var lnhrekg = 0;
var lnminekg = 0;
var ldtpt = "";
var lnhrtpt = 0;
var lnmintpt = 0;
var lcbt = "";
var lcpr = "";
var lcrr = "";
var lcsyst = "";
var lcdias = "";
var lccc = "";
var lcrisk = "";

//// Medication //////////
var ldiv = "";
var lnhriv = 0;
var lnminiv = 0;
var ldo2 = "";
var lnhro2 = 0;
var lnmino2 = 0;
var ldasa = "";
var lnhrasa = 0;
var lnminasa = 0;
var ldisd = "";
var lnhrisd = 0;
var lnminisd = 0;
var ldpvx = "";
var lnhrpvx = 0;
var lnminpvx = 0;
var ldmp = "";
var lnhrmp = 0;
var lnminmp = 0;
//////////////////////////
// Stemi
var lnstemi = 0;
var ldsk = "";
var lnreferto = 0;
var lnnosk = 0;
var lnhrsk = 0;
var lnminsk = 0;
var ldrf = "";
var lnhrrf = 0;
var lnminrf = 0;
///////////////////////////
// Investigations
var lcekg = "";
var lctpt = "";

// Result
var lcdiag = "";
var lctreatment = "";

// Risk Factors
var lndm = 0;
var lnht = 0;
var lnlp = 0;
var lnsm = 0;
var lnfm = 0;
var lnxx = 0;
var lcother = "";

var lnauto = 0;
var lchx_n = "";
var lchx_o = "";
var lchx_p = "";
var lchx_q = "";
var lchx_r = "";
var lchx_s = "";
var lchx_t = "";
var ip_address = "webmbase/";
var lcfullname = "";
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
		//// Click b_obj show icon right or wrong and store 0 or 1 to b_var
		function b_click(b_obj, b_var) {
			var f_obj = reg.byId(b_obj);
			var lcx = f_obj.tooltip;
			if (lcx == '') {
				cMacro = b_var + "= 1";
				eval(cMacro);
				f_obj.tooltip = "1";
				f_obj.domNode.style.backgroundImage = 'url("right.jpg")';}
			else {
				cMacro = b_var + "= 0";
				eval(cMacro);
				f_obj.tooltip = "";
				f_obj.domNode.style.backgroundImage = 'url("wrong.jpg")';}
		}
		
		//// show icon : nval = 1 right or nval = 0 wrong
		function b_check(b_obj, nval) {
			var f_obj = reg.byId(b_obj);
			var lcx = f_obj.tooltip;
			if (nval == 1) {
				f_obj.tooltip = "1";
				f_obj.domNode.style.backgroundImage = 'url("right.jpg")';}
			else {
				f_obj.tooltip = "";
				f_obj.domNode.style.backgroundImage = 'url("wrong.jpg")';}
		}
		
		//// click button csource and show label of csource in object cdestination and store label to variable creturn
		function btn2txt(csource, cdestination, creturn) {
			var s_obj = reg.byId(csource);
			var d_obj = reg.byId(cdestination);
			var s_txt = s_obj.label.trim();
			var d_txt = d_obj.get("value");
			if (s_txt.trim() == "Clear") {var cmacro1 = creturn + " = ''";	}
			else {var cmacro1 = creturn + " = '" + d_txt + " " + s_txt + "'.trim()";}
			eval(cmacro1);
			var cmacro2 = "d_obj.set('value', " + creturn + ")";
			eval(cmacro2);
		}
		
		function menu_list() {
			//// แสดง Menu
			//clearList("stemi_menu");		
			var list_add = stemi_menu.store.newItem({label: "ข้อมูลทั่วไป", icon : "person.jpg", rightText: ">", value : "1"});
			var list_add = stemi_menu.store.newItem({label: "ประวัติการเจ็บหน้าอก", icon : "heart.jpg", rightText: ">",  value : "2"});
			var list_add = stemi_menu.store.newItem({label: "Investigations", icon : "ekg.jpg", rightText: ">",  value : "3"});
			var list_add = stemi_menu.store.newItem({label: "การรักษาเบื้องต้น", icon : "rx.jpg", rightText: ">",  value : "4"});
			var list_add = stemi_menu.store.newItem({label: "การรักษา STEMI", icon : "ekg1.jpg", rightText: ">", value : "5"});
			var list_add = stemi_menu.store.newItem({label: "ผลตอบกลับ", icon : "ambulance.jpg", rightText: ">", value : "9"});
			var list_add = stemi_menu.store.newItem({label: "Actions", value : "6", header: true});
			var list_add = stemi_menu.store.newItem({label: "บันทึกข้อมูล", rightIcon2 : "save.jpg", value : "7"});
			var list_add = stemi_menu.store.newItem({label: "PDF", rightIcon2 : "pdf.jpg", value : "8"});
			var list_add = stemi_menu.store.newItem({label: "ประมวลผล", rightIcon2 : "kpi-icon.jpg", value : "10"});
		}
		
		//// show list according to public variable
		function cp_list() {
			//// แสดง NOPQRST
			clearList("chest_pain");		
			var list_add = chest_pain.store.newItem({label: lchx_n, icon : "n.jpg", value : "1", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_o, icon : "o.jpg", value : "2", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_p, icon : "p.jpg", value : "3", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_q, icon : "q.jpg", value : "4", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_r, icon : "r.jpg", value : "5", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_s, icon : "s.jpg", value : "6", rightText: ">"});
			var list_add = chest_pain.store.newItem({label: lchx_t, icon : "t.jpg", value : "7", rightText: ">"});
		}
		
		function inv_list() {
			//// แสดง Investigations
			clearList("investigate");
			var list_add = investigate.store.newItem({label: "EKG", value : "", header : true});
			var list_add = investigate.store.newItem({label : "", rightText : tsdate(ldekg, 1) + " >", value : "1", icon : "ekg.jpg"});
			var list_add = investigate.store.newItem({label : lcekg, value : "1", variableHeight : true});
			var list_add = investigate.store.newItem({label: "", value : ""});
			var list_add = investigate.store.newItem({label: "Troponin-T", value : "", header : true });
			var list_add = investigate.store.newItem({label: "", rightText : tsdate(ldtpt, 1) + " >", value : "2", icon : "heart.jpg"});
			var list_add = investigate.store.newItem({label: lctpt, value : "2", variableHeight : true});
		}

		function rx_list() {
			//// แสดง Medications
			clearList("treatment");
			var list_add = treatment.store.newItem({label: "Medications and Treatments", value : "0", header : true});
			var list_add = treatment.store.newItem({label: "IV Fluid", icon : "iv_fluid.jpg", rightText: tsdate(ldiv, 1) + " >", value : "1"});
			var list_add = treatment.store.newItem({label: "Oxygen", icon : "oxygen.jpg", rightText : tsdate(ldo2, 1) + " >", value : "2"});
			var list_add = treatment.store.newItem({label: "Isosorbide", icon : "isordil.jpg", rightText : tsdate(ldisd, 1) + " >", value : "3"});
			var list_add = treatment.store.newItem({label: "ASA grV", icon : "asa.jpg", rightText : tsdate(ldasa, 1) + " >", value : "4"});
			var list_add = treatment.store.newItem({label: "Plavix", icon : "plavix.jpg", rightText : tsdate(ldpvx, 1) + " >", value : "5"});
			var list_add = treatment.store.newItem({label: "Morphine", icon : "poppy.jpg", rightText : tsdate(ldmp, 1) + " >", value : "6"});
		}
		
		function er_list() {
			// ข้อมูลทั่วไป
			var lcrisk = "";
			if (lndm == 1) {
				if (lcrisk.length == 0) {lcrisk = "DM";}
				else {lcrisk = lcrisk + ", DM";}
			}
			if (lnht == 1) {
				if (lcrisk.length == 0) {lcrisk = "HT";}
				else {lcrisk = lcrisk + ", HT";}
			}
			if (lnlp == 1) {
				if (lcrisk.length == 0) {lcrisk = "LIPID";}
				else {lcrisk = lcrisk + ", LIPID";}
			}
			if (lnsm == 1) {
				if (lcrisk.length == 0) {lcrisk = "Smoking";}
				else {lcrisk = lcrisk + ", Smoking";}
			}
			if (lnfm == 1) {
				if (lcrisk.length == 0) {lcrisk = "Family";}
				else {lcrisk = lcrisk + ", Family";}
			}
			if (lnxx == 1) {
				if (lcrisk.length == 0) {lcrisk = lcother;}
				else {lcrisk = lcrisk + ", " + lcother;}
			}
			clearList("er_visit");
			var list_add = er_visit.store.newItem({label: "ผู้ป่วย", rightText: lcfullname + " (" + lcage + ")", value : "1"});
			var list_add = er_visit.store.newItem({label: "FMC", rightText: tsdate(lddate2, 1) + " >", value : "2"});
			var list_add = er_visit.store.newItem({label: "C/C :", rightText: ">", value : "3"});
			var list_add = er_visit.store.newItem({label: lccc, variableHeight: true, value : "3"});
			var list_add = er_visit.store.newItem({label: "Temperature", rightText: lcbt + " C >", value : "4"});
			var list_add = er_visit.store.newItem({label: "Pulse Rate", rightText: lcpr + "/min >", value : "5"});
			var list_add = er_visit.store.newItem({label: "Respiratory Rate", rightText: lcrr + "/min >", value : "6"});
			var list_add = er_visit.store.newItem({label: "Blood Pressure", rightText: lcsyst + "/" + lcdias + " mmHg >", value : "7"});
//			var list_add = er_visit.store.newItem({label: "", value : "8"});
			var list_add = er_visit.store.newItem({label: "Risk Factors", rightText: lcrisk + " >", value : "9"});
		}
		
		function stemi1_list() {
			clearList("stemi1");
			var list_add = stemi1.store.newItem({label: "Provisional Diagnosis", value : "0", header : true});
			sw2list("stemi1", "sw_stemi", "Case STEMI", lnstemi);
		}
		
		function stemi2_list() {
			//// Stemi2
			clearList("stemi2");
			var list_add = stemi2.store.newItem({label: "Streptokinase", value : "0", header : true});
			if (ldsk != "") {lcsk = tsdate(ldsk, 1);}
	    	else {lcsk = "ไม่ได้ฉีด SK";}
		    var item = new dojox.mobile.ListItem({
		        id: "sk",
		        label: "SK Injection",
		        rightText: lcsk + " >"
		    });
			stemi2.addChild(item);
			lcnosk = "";
			if (lnnosk == 1) {
				lcnosk = "ผู้ป่วยมีข้อห้ามในการใช้ยา";
			}
			if (lnnosk == 2) {
				lcnosk = "ความไม่พร้อมของบุคลากร";
			}
			if (lnnosk == 3) {
				lcnosk = "ความไม่พร้อมของวัสดุอุปกรณ์";
			}
			sk_value.set("value", lcnosk);
			if (lcnosk != "") {
				var item = new dojox.mobile.ListItem({
		       	 	id: "nosk",
		       	 	label: "สาเหตุ",
		        	rightText: lcnosk + " >"
		    	});
				stemi2.addChild(item);
			}
		}
		
		function stemi3_list() {
			//// Stemi3
			clearList("stemi3");
			var list_add = stemi3.store.newItem({label: "Refer", value : "0", header : true});
			var lcrf = "";
			if (ldrf != "") {lcrf = tsdate(ldrf, 1);}
	    	else {lcrf = "ไม่ได้ Refer";}
		    var item = new dojox.mobile.ListItem({
		        id: "rf",
		        label: "วันเวลา Refer",
		        rightText: lcrf + "  >",
		        value: 1
		    });
			stemi3.addChild(item);
			
			var crefer = "";
			if (lnreferto == 1) {crefer = "EMERGENCY ROOM";}
			else if (lnreferto == 2) { crefer = "CORONARY CARE UNIT";}
			else if (lnreferto == 3) { crefer = "CATHETER LABORATORY";}
			refer_value.set("value", crefer);
			var item = new dojox.mobile.ListItem({
		        id: "rfto",
		        label: "Refer To",
		        rightText: crefer + "  >",
		        value: 2
		    });
			stemi3.addChild(item);
			////////////////////////////////////
		}
		
		function risk_list() {
			// Risk Factors
			clearList("risk");
			var list_add = risk.store.newItem({label: "ปัจจัยเสี่ยง (Risk Factors)", value : "0", header : true});
			//// DM
			sw2list("risk", "sw_dm", "Diabetes Mellitus", lndm);
			//// HT
		    sw2list("risk", "sw_ht", "Hypertension", lnht);
			//// Lipid
		    sw2list("risk", "sw_lp", "Hyperlipidemia", lnlp);
			//// Smoking
		    sw2list("risk", "sw_sm", "Smoking Habit", lnsm);
			//// Family
		    sw2list("risk", "sw_fm", "Family History", lnfm);
			//// Other
		    sw2list("risk", "sw_xx", "Other Factors", lnxx);
	    	if (lnxx == 1) {risk_other.set("value", lcother);
	    		risk_other.domNode.style.visibility = "visible";}
	    	else {risk_other.set("value", "");
	    		risk_other.domNode.style.visibility = "hidden";}
		}
		
		function rs_list() {
			//// แสดง Medications
			clearList("result_list");
			var list_add = result_list.store.newItem({label: "ผลการวินิจฉัย และรักษา", value : "0", header : true});
			var list_add = result_list.store.newItem({label: "Diagnosis :", rightText: ">", value : "1"});
			var list_add = result_list.store.newItem({label: lcdiag, variableHeight: true, style: "color: blue", value : "2"});
			var list_add = result_list.store.newItem({label: "Treatment :", rightText : ">", value : "3"});
			var list_add = result_list.store.newItem({label: lctreatment, variableHeight: true, style: "color: blue", value : "4"});
		}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////		
///////////////////////////////
//// Loading Code /////////////
///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_v1    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var cid = reg.byId("cid");
		var btn_ok = reg.byId("btn_ok");
		var stemi_v1 = reg.byId("stemi_v1");
		var stemi_v1h = reg.byId("stemi_v1h");
		var new_row = reg.byId("new_row");
		var back_stemi = reg.byId("back_stemi");
		var stemi_visits = reg.byId("stemi_visits");
		var guideline = reg.byId("guideline");
		var gl_store = new ifws({data:{items:[]}});
		guideline.store = null;
		guideline.setStore(gl_store);
		var list_add = guideline.store.newItem({label: "Guidelines", value : "0", header : true});
		var list_add = guideline.store.newItem({label: "สำหรับแพทย์", icon : "help.jpg", value : "1"});
		var list_add = guideline.store.newItem({label: "สำหรับพยาบาล", icon : "help.jpg", value : "2"});
		var list_add = guideline.store.newItem({label: "การเตรียมยา SK", icon : "help.jpg", value : "3"});
		var list_add = guideline.store.newItem({label: "ข้อควรระวังขณะให้ยา SK", icon : "help.jpg", value : "4"});
		var list_add = guideline.store.newItem({label: "ข้อควรระวังหลังให้ยา SK", icon : "help.jpg", value : "5"});
		var list_add = guideline.store.newItem({label: "เกณฑ์การประเมินผลการให้ยา SK", icon : "help.jpg", value : "6"});

		//////////////////
		//// Events //////
		//////////////////
		on(guideline, "click", function() {
			lcret = selected_row("guideline");
			if (lcret.value == "1") {
				var ctxt = "1. แพทย์ ประเมินผู้ป่วยก่อนให้ยาละลายลิ่มเลือดตามแบบประเมินผู้ป่วยที่รับการรักษาก่อนให้ยาละลายลิ่มเลือด " + "\n" + 
				"2.  แพทย์ ให้ข้อมูลผู้ป่วยและญาติเกี่ยวกับความจำเป็นในการให้ยาละลายลิ่มเลือด อธิบายผลดีและภาวะแทรกซ้อนของยาละลายลิ่มเลือด " +
				"การให้ยามีความปลอดภัยสูงในผู้ป่วยที่มีข้อบ่งชี้และไม่มีข้อห้าม ภาวะแทรกซ้อนที่รุนแรงที่อาจเกิดขึ้นมีน้อยมากเมื่อเทียบกับประโยชน์ที่ผู้ป่วยจะได้รับ " +
				"เช่นเลือดออกในสมองพบร้อยละ 0.5-1.5, Major bleeding ในระบบทางเดินอาหาร ร้อยละ 4-5";
				dialog("SK สำหรับแพทย์", "alert", "x", "c", ctxt);
			}
			if (lcret.value == "2") {
				var ctxt = "ให้ผู้ป่วยหรือญาติเซ็นใบยินยอมการได้รับยาละลายลิ่มเลือดในแบบประเมินผู้ป่วย   ที่ได้รับการรักษาก่อนให้ยาละลายลิ่มเลือด" +
					"(ข้อบ่งชี้การให้ยาละลายลิ่มเลือด   ผู้ป่วยที่มีอาการเจ็บแน่นหน้าอกที่ได้รับการวินิจฉัยว่าเป็นโรคกล้ามเนื้อหัวใจตายเฉียบพลัน (STEMI) ภายใน 12 ชั่วโมงหลังจากมีอาการ " +
					"โดยไม่มีข้อห้ามการสั่งให้ยา Streptokinase  ให้ขนาด 1.5 ล้านยูนิต ในเวลา 60 นาที)";
				dialog("SK สำหรับพยาบาล", "alert", "x", "c", ctxt);
			}
			
			if (lcret.value == "3") {
				var ctxt = "พยาบาล เป็นผู้ให้ยาละลายลิ่มเลือดโดยเร็วที่สุด (หากสามารถเริ่มให้ได้ภายใน 30 นาทีหลังจากผู้ป่วยมาถึง รพ.จะได้ผลดี) โดยเตรียมและผสมยาตามขั้นตอนการเตรียมยา Streptokinase ดังนี้" + "\n" +
					"1. ละลายด้วย 0.9% NSS ควรฉีดสารละลายอย่างช้าๆ ด้านในบริเวณข้างขวดยา" + "\n" +
 					"2. กลิ้งขวดยาอย่างช้าๆเพื่อให้ยาผสมเข้ากัน ห้ามเขย่า เนื่องจากทำให้เกิดฟองได้" + "\n" + 
 					"3. นำสารละลายที่ได้เจือจางผสมใน 0.9% NSS 100 ml" + "\n" + 
 					"4. ตรวจสอบดูว่ามีอนุภาคหรือการเปลี่ยนสีก่อนให้ยากับผู้ป่วย" + "\n" + 
					"5. ห้ามผสมยาอื่นในภาชนะเดียวกัน" + "\n" + 
 					"6. ควรใช้สารละลายหลังผสมทันที เนื่องจากยาไม่มีส่วนผสมของสารกันเสีย และเก็บได้นาน 8 ชั่วโมงเท่านั้น";
				dialog("การเตรียมยา SK", "alert", "x", "c", ctxt);
			}
			
			if (lcret.value == "4") {
				var ctxt = "1. ห้ามให้ยา Streptokinase ซ้ำอีก ในผู้ป่วยที่เคยได้รับยา Streptokinase มาก่อน โดยให้เลือกใช้วิธีการขยายหลอดเลือดหัวใจด้วยบอลลูนแทน (PCI)" + "\n" +
					"2. ควรให้สารน้ำแก่ผู้ป่วยให้เพียงพอ ร่วมกับพิจารณาหยุดยาที่มีฤทธิ์ลดความดันโลหิตชั่วคราว และ/หรือพิจารณาให้ยาเพิ่มความดันโลหิต พร้อมกับการให้ยา Streptokinase ในผู้ป่วยที่มีความดันโลหิตต่ำ" + "\n" +
 					"3. ควรพิจารณาทำการขยายหลอดเลือดหัวใจชนิดปฐม (Primary PCI) ในผู้ป่วยภาวะหัวใจล้มเหลว หรือผู้ป่วยที่พบหรือคาดว่าจะเกิด Cardiogenic Shock หากผู้ป่วยสามรถรับการขยายหลอดเลือดหัวใจได้ในเวลาที่เหมาะสม" + "\n" + 
 					"4. ควรรักษาด้วยการให้เลือดและส่วนประกอบของเลือดทดแทนในผู้ป่วยที่เกิดภาวะเลือดออกรุนแรงหลังได้รับยาละลายลิ่มเลือด";
				dialog("ข้อควรระวังขณะให้ยา SK", "alert", "x", "c", ctxt);
			}
			
			if (lcret.value == "5") {
				var ctxt = "พยาบาล   เฝ้าระวังผลข้างเคียงและภาวะแทรกซ้อนจากการให้ยาละลายลิ่มเลือด โดยติดตามผู้ป่วยที่ได้รับยาละลายลิ่มเลือด ดังนี้" + "\n" +
					"1. ต้องสังเกตอาการเจ็บหน้าอก อาการเหนื่อยของผู้ป่วยและอาการทั่วไป ตลอดจนติดตามV/S และ Monitor EKG อย่างใกล้ชิด หลังผู้ป่วยได้รับยาละลายลิ่มเลือด่ำ" + "\n" +
 					"2. ต้องติดตาม EKG 12 leads ทุก 30 นาที เพื่อประเมินการเปิดหลอดเลือดหัวใจ (reperfusion) หากอาการเจ็บหน้าอกลดลงและ EKG แสดง ST segment ลดต่ำลงอย่างน้อย ร้อยละ 50 ภายในช่วงเวลา 90-120 นาทีหลังเริ่มให้ยาละลายลิ่มเลือด แสดงว่าหลอดเลือดหัวใจน่าจะเปิด" + "\n" + 
 					"3. รายงานแพทย์หากอาการเจ็บหน้าอกไม่ดีขึ้นและไม่มีสัญญาณของการเปิดหลอดเลือด (Reperfusion) ภายในช่วงเวลา 90-120 นาที หลังเริ่มให้ยาละลายลิ่มเลือดเพื่อพิจารณาทำการขยายหลอดเลือดหัวใจ (PCI) ";
				dialog("ข้อควรระวังหลังให้ยา SK", "alert", "x", "c", ctxt);
			}
			
			if (lcret.value == "6") {
				var ctxt = "เกณฑ์การประเมินการเปิดหลออดเลือดหัวใจ (Reperfusion) หลังได้รับยาละลายลิ่มเลือด" + "\n" +
					"1. อาการเจ็บแน่นหน้าอกลดลง หรือหายอย่างรวดเร็ว่ำ" + "\n" +
 					"2. EKG ส่วนของ ST ที่ยกสูงขึ้นกลับลงมาสู่เกณฑ์ปกติ (ST resolution) ภายใน 120 นาทีหลังได้รับยาละลายลิ่มเลือด" + "\n" + 
 					"3. ภาวะหัวใจเต้นผิดจังหวะได้แก่" + "\n" +
 					"   3.1. accelerated idioventricular rhythm" + "\n" + 
 					"   3.2. frequent premature ventricular complexes (พบได้ถี่มากขึ้นกว่าเดิม 2 เท่า ภายใน 90 นาทีหลังให้ยาละลายลิ่มเลือด)" + "\n" + 
 					"   3.3. nonsustained  ventricular  tachycardia" + "\n" + 
 					"4. ระดับ cardiac enzyme CK-MB จะขึ้นสูงสุดประมาณ 12 ชั่วโมง หลังจากผู้ป่วยมีอาการเจ็บหน้าอก (ปกติถ้าไม่มี reperfusion ระดับ CK-MB จะขึ้นสูงสุดที่ 24-36 ชั่วโมง)";
				dialog("การประเมินการให้ยา SK", "alert", "x", "c", ctxt);
			}		
		});
		
		on(cid, "keyup", function() {
     		lcuser = cid.get("value");
			lnLength = lcuser.length;
			if (lnLength == 13) {
				patient = php2obj("cid_search.php?cid=" + lcuser);
				lccid = patient.cid;
				lcage = getAge(patient.birthdate, "");
				lcfullname = patient.fname + " " + patient.lname;
				stemi_v1h.set("label", "STEMI : " + lcfullname + " (" + lcage + ")");
				// Hide Keyboard
				btn_ok.focus(true);
				pt_fullname.set("value", lcfullname);
				list("stemi_visits", "stemi_cid.php?cid=" + lccid);
			}
		 });

		on(stemi_v1h, "click", function() {
			// กลับเมนูหลัก

			var isback = back_stemi.get("focused");
			if (isback == true) {
				window.location.href = "http://m30.phoubon.in.th/index.html";}

			var isnew = new_row.get("focused");
			if (isnew == true) {
				if (lccid == "") {alert ("กรุณากรอก รหัสประชาชนก่อน !!!");}
				else {
					selected_clear("guideline");
					selected_clear("stemi_visits");
					lnauto = 0;
					// General /////////
					lcbt = "";
					lcpr = "";
					lcrr = "";
					lcsyst = "";
					lcdias = "";
					lccc = "เจ็บหน้าอกด้านซ้าย";
					btemp.set("value", "");
					pulse.set("value", "");
					resp.set("value", "");
					syst.set("value", "");
					dias.set("value", "");
					
					lndm = 0;
					lnht = 0;
					lnlp = 0;
					lnsm = 0;
					lnfm = 0;
					lnxx = 0;
					lcother = "";
					risk_list()
					
					lchx_n = "";
					lchx_o = "";
					lchx_p = "";
					lchx_q = "";
					lchx_r = "";
					lchx_s = "";
					lchx_t = "";
					
					ldiv = "";
					ldo2 = "";
					ldasa = "";
					ldisd = "";
					ldpvx = "";
					ldmp = "";
	
					ldsk = "";
					ldrf = "";
					
					lcdiag = "";
					lctreatment = "";
					
					cp_list();
					rx_list();
					lnstemi = 0;
					lnreferto = 0
					lnnosk = 0;
					
					//// DateTime //////////////////////////////////////////
					// onset
					lddate1 = new Date();
					lnhr1 = lddate1.getHours();
					lnmin1 = lddate1.getMinutes();
					hr1.set("value", pad(lnhr1.toString(), "00"));
					min1.set("value", pad(lnmin1.toString(), "00"));
					date1.set("value", tsdate(lddate1));
					// fmc
					lddate2 = new Date();
					lnhr2 = lddate2.getHours();
					lnmin2 = lddate2.getMinutes();
					hr2.set("value", pad(lnhr2.toString(), "00"));
					min2.set("value", pad(lnmin2.toString(), "00"));
					date2.set("value", tsdate(lddate2));
					// ekg
					ekg_value.set("value", "");
					ldekg = "";
					hrekg.set("value", "");
					minekg.set("value", "");
					dateekg.set("value", "");
					lcekg = "";
					ekg_value.set("value", "");
					// Trop-T
					tpt_value.set("value", "");
					ldtpt = "";
					hrtpt.set("value", "");
					mintpt.set("value", "");
					datetpt.set("value", "");
					lctpt = "";
					tpt_value.set("value", "");
					//// Medication
					// IV Fluid
					dateiv.set("value", "");
					hriv.set("value", "");
					miniv.set("value", "");
					// O2
					dateo2.set("value", "");
					hro2.set("value", "");
					mino2.set("value", "");
					// ASA
					dateasa.set("value", "");
					hrasa.set("value", "");
					minasa.set("value", "");
					// isordil
					dateisd.set("value", "");
					hrisd.set("value", "");
					minisd.set("value", "");
					// Plavix
					datepvx.set("value", "");
					hrpvx.set("value", "");
					minpvx.set("value", "");
					// Morphine
					datemp.set("value", "");
					hrmp.set("value", "");
					minmp.set("value", "");
					//// Stemi
					// sk
					datesk.set("value", "");
					hrsk.set("value", "");
					minsk.set("value", "");
					sk_value.set("value", "");
					// Refer
					daterf.set("value", "");
					hrrf.set("value", "");
					minrf.set("value", "");
					refer_value.set("value", "");
					
					er_list();
					stemi1_list();
					stemi2_list();
					stemi3_list();
					/////////////////////////////////////////////////////////////////
					stemi_v1.performTransition("stemi_v2", 1, "slide", null);
					stemi_v2h.set("label", "Visit : " + tsdate(lddate1));
					min1.focus(true);
				}
			}
		});
//// Click Visit ////////////////////////////////////////////////////
		on(stemi_visits, "click", function() {
			st_visit = selected_row("stemi_visits");
			// Clear Medication Datetime
			//// Medication
			// IV Fluid
			dateiv.set("value", "");
			hriv.set("value", "");
			miniv.set("value", "");
			// O2
			dateo2.set("value", "");
			hro2.set("value", "");
			mino2.set("value", "");
			// ASA
			dateasa.set("value", "");
			hrasa.set("value", "");
			minasa.set("value", "");
			// isordil
			dateisd.set("value", "");
			hrisd.set("value", "");
			minisd.set("value", "");
			// Plavix
			datepvx.set("value", "");
			hrpvx.set("value", "");
			minpvx.set("value", "");
			// Morphine
			datemp.set("value", "");
			hrmp.set("value", "");
			minmp.set("value", "");
			
			// sk
			datesk.set("value", "");
			hrsk.set("value", "");
			minsk.set("value", "");
			// Refer
			daterf.set("value", "");
			hrrf.set("value", "");
			minrf.set("value", "");
				
			// menu1 ข้อมูลทั่วไป
    		lddate1 = ctot(st_visit.onset);
    		lcbt = st_visit.body_temp;
    		lcpr = st_visit.pulse_rate;
    		lcrr = st_visit.resp_rate;
    		lcsyst = st_visit.bp_syst;
    		lcdias = st_visit.bp_dias;
    		lccc = st_visit.c_complaint;
    		btemp.set("value", lcbt);
			pulse.set("value", lcpr);
			resp.set("value", lcrr);
			syst.set("value", lcsyst);
			dias.set("value", lcdias);
			lndm = st_visit.dm;
			lnht = st_visit.ht;
			lnsm = st_visit.sm;
			lnlp = st_visit.lp;
			lnfm = st_visit.fm;
			lnxx = st_visit.xx;
			lcother = st_visit.risk_xx;
			risk_list();
			
    		// onset
			date1.set("value", tsdate(lddate1));
			lnhr1 = lddate1.getHours();
			lchr1 = lnhr1.toString();
			hr1.set("value", pad(lchr1, "00"));
			lnmin1 = lddate1.getMinutes();
			lcmin1 = lnmin1.toString();
			min1.set("value", pad(lcmin1, "00"));
			// FMC
    		lddate2 = ctot(st_visit.fmc);
			stemi_v2h.set("label", "Visit : " + tsdate(lddate2));
			date2.set("value", tsdate(lddate2));
			lnhr2 = lddate2.getHours();
			var lchr2 = lnhr2.toString();
			hr2.set("value", pad(lchr2, "00"));
			lnmin2 = lddate2.getMinutes();
			var lcmin2 = lnmin2.toString();
			min2.set("value", pad(lcmin2, "00"));
			
			er_list();
			
			// EKG
			ldekg = ctot(st_visit.ekg_dt);
			lcekg = st_visit.ekg_result;
			if (ldekg != "") {
				dateekg.set("value", tsdate(ldekg));
				lnhrekg = ldekg.getHours();
				var lchrekg = lnhrekg.toString();
				hrekg.set("value", pad(lchrekg, "00"));
				lnminekg = ldekg.getMinutes();
				var lcminekg = lnminekg.toString();
				minekg.set("value", pad(lcminekg, "00"));
				lcdekg = tsdate(ldekg, 1);
			}
			// Trop-T
			ldtpt = ctot(st_visit.tpt_dt);
			lctpt = st_visit.tpt_result;
			if (ldtpt != "") {
				datetpt.set("value", tsdate(ldtpt));
				lnhrtpt = ldtpt.getHours();
				var lchrtpt = lnhrtpt.toString();
				hrtpt.set("value", pad(lchrtpt, "00"));
				lnmintpt = ldtpt.getMinutes();
				var lcmintpt = lnmintpt.toString();
				mintpt.set("value", pad(lcmintpt, "00"));
				lcdtpt = tsdate(ldtpt, 1);
			}
			
			// Medication
			ldiv = ctot(st_visit.iv_dt);
			if (ldiv != "") {
				dateiv.set("value", tsdate(ldiv));
				lnhriv = ldiv.getHours();
				lchriv = lnhriv.toString();
				hriv.set("value", pad(lchriv, "00"));
				lnminiv = ldiv.getMinutes();
				lcminiv = lnminiv.toString();
				miniv.set("value", pad(lcminiv, "00"));
				lcdiv = tsdate(ldiv, 1);
			}
			ldo2 = ctot(st_visit.o2_dt);
			if (ldo2 != "") {
				dateo2.set("value", tsdate(ldo2));
				lnhro2 = ldo2.getHours();
				lchro2 = lnhro2.toString();
				hro2.set("value", pad(lchro2, "00"));
				lnmino2 = ldo2.getMinutes();
				lcmino2 = lnmino2.toString();
				mino2.set("value", pad(lcmino2, "00"));
				lcdo2 = tsdate(ldo2, 1);
			}
			ldasa = ctot(st_visit.asa_dt);
			if (ldasa != "") {
				dateasa.set("value", tsdate(ldasa));
				lnhrasa = ldasa.getHours();
				lchrasa = lnhrasa.toString();
				hrasa.set("value", pad(lchrasa, "00"));
				lnminasa = ldasa.getMinutes();
				lcminasa = lnminasa.toString();
				minasa.set("value", pad(lcminasa, "00"));
				lcdasa = tsdate(ldasa, 1);
			}
			ldisd = ctot(st_visit.isd_dt);
			if (ldisd != "") {
				dateisd.set("value", tsdate(ldisd));
				lnhrisd = ldisd.getHours();
				lchrisd = lnhrisd.toString();
				hrisd.set("value", pad(lchrisd, "00"));
				lnminisd = ldisd.getMinutes();
				lcminisd = lnminisd.toString();
				minisd.set("value", pad(lcminisd, "00"));
				lcdisd = tsdate(ldisd, 1);
			}
			ldpvx = ctot(st_visit.pvx_dt);
			if (ldpvx != "") {
				datepvx.set("value", tsdate(ldpvx));
				lnhrpvx = ldpvx.getHours();
				lchrpvx = lnhrpvx.toString();
				hrpvx.set("value", pad(lchrpvx, "00"));
				lnminpvx = ldpvx.getMinutes();
				lcminpvx = lnminpvx.toString();
				minpvx.set("value", pad(lcminpvx, "00"));
				lcdpvx = tsdate(ldpvx, 1);
			}
			ldmp = ctot(st_visit.mp_dt);
			if (ldmp != "") {
				datemp.set("value", tsdate(ldmp));
				lnhrmp = ldmp.getHours();
				lchrmp = lnhrmp.toString();
				hrmp.set("value", pad(lchrmp, "00"));
				lnminmp = ldmp.getMinutes();
				lcminmp = lnminmp.toString();
				minmp.set("value", pad(lcminmp, "00"));
				lcdmp = tsdate(ldmp, 1);
			}
			lnauto = st_visit.auto_id;
			
			// menu2 ข้อมูลเจ็บหน้าอก NOPQRST
			lchx_n = st_visit.hx_n;
			lchx_o = st_visit.hx_o;
			lchx_p = st_visit.hx_p;
			lchx_q = st_visit.hx_q;
			lchx_r = st_visit.hx_r;
			lchx_s = st_visit.hx_s;
			lchx_t = st_visit.hx_t;
			
			// menu5 Stemi
			//// stemi1
			lnstemi = st_visit.is_stemi;
			stemi1_list();
			
			lnnosk = st_visit.nosk;
			ldsk = ctot(st_visit.sk_dt);
			if (ldsk != "") {
				datesk.set("value", tsdate(ldsk));
				lnhrsk = ldsk.getHours();
				lchrsk = lnhrsk.toString();
				hrsk.set("value", pad(lchrsk, "00"));
				lnminsk = ldsk.getMinutes();
				lcminsk = lnminsk.toString();
				minsk.set("value", pad(lcminsk, "00"));
				lcdsk = tsdate(ldsk, 1);
			}
			//// Stemi2
			stemi2_list();
			
			// Stemi3 ////////////////////////////////////////////
			ldrf = ctot(st_visit.refer_dt);
			if (ldrf != "") {
				daterf.set("value", tsdate(ldrf));
				lnhrrf = ldrf.getHours();
				lchrrf = lnhrrf.toString();
				hrrf.set("value", pad(lchrrf, "00"));
				lnminrf = ldrf.getMinutes();
				lcminrf = lnminrf.toString();
				minrf.set("value", pad(lcminrf, "00"));
				lcdrf = tsdate(ldrf, 1);
			}
			lnreferto = st_visit.refer_to;
			stemi3_list();
			////////////////////////////////////
			// Result
			lcdiag = st_visit.diagnosis;
			lctreatment = st_visit.treatment;
			rs_list();
			
			cp_list();
			rx_list();
			inv_list();
			stemi_v1.performTransition("stemi_v2", 1, "slide", null);
		});	
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_v2  ////  ////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_v2 = reg.byId("stemi_v2");	
		var stemi_v2h = reg.byId("stemi_v2h");	
		var back_sv2 = reg.byId("back_sv2");
		var stemi_menu = reg.byId("stemi_menu");
		var stemi_store = new ifws({data:{items:[]}});
		stemi_menu.store = null;
		stemi_menu.setStore(stemi_store);
		
		menu_list("stemi_menu");
		//////////////////
		//// Events //////
		//////////////////
		on(stemi_v2h, "click", function() {
			back("back_sv2", "stemi_v2", "stemi_v1");
			selected_clear("stemi_menu");
		});
		//// เลือกรายการเมนู ///////////////////////
		on(stemi_menu, "click", function() {
			cobj = selected_row("stemi_menu");
			s = cobj.value;
		   	if (s=="1") {
		   		// ข้อมูลทั่วไป
		   		stemi_v2.performTransition("stemi_menu1_1", 1, "slide", null);
		   	}
		   	if (s=="2") {
		   		// ประวัติเจ็บหน้าอก NOPQRST
		   		stemi_v2.performTransition("stemi_menu2", 1, "slide", null);
		   	}
		   	if (s=="3") {
		   		// Investigation
		   		inv_list();
		   		stemi_v2.performTransition("stemi_menu3", 1, "slide", null);
		   	}
		   		// Treatment
		   	if (s=="4") {
		   		rx_list();
		   		stemi_v2.performTransition("stemi_menu4", 1, "slide", null);
		   	}
		   	if (s=="5") {
		   		stemi_v2.performTransition("stemi_menu6", 1, "slide", null);
		   	}
		   	
		   	if (s=="9") {
		   		stemi_v2.performTransition("result", 1, "slide", null);
		   	}
			
			//// Save ข้อมูล
		   	if (s=="7") {
				var lcdate2 = d2txt(lddate2, 1);
				var lcdate1 = d2txt(lddate1, 1);
				var lcdekg = d2txt(ldekg, 1);
				var lcdtpt = d2txt(ldtpt, 1);
				var lcdiv = d2txt(ldiv, 1);
				var lcdo2 = d2txt(ldo2, 1);
				var lcdasa = d2txt(ldasa, 1);
				var lcdisd = d2txt(ldisd, 1);
				var lcdpvx = d2txt(ldpvx, 1);
				var lcdmp = d2txt(ldmp, 1);
				var lcdsk = d2txt(ldsk, 1);
				var lcdrf = d2txt(ldrf, 1);
				lcbt = tb2.get("value").trim();
				lcpr = tb3.get("value").trim();
				lcrr = tb4.get("value").trim();
				lcsyst = tb5.get("value").trim();
				lcdias = tb6.get("value").trim();
				var lcresult = "";
				if (lcdiag > "") {lcresult = "&diagnosis=" + lcdiag;}
				if (lctreatment > "") {lcresult = lcresult + "&treatment=" + lctreatment;}
				
				lcphp = "stemi_save.php?cid=" + lccid + "&fmc=" + lcdate2 + "&onset=" + lcdate1 + "&auto_id=" + lnauto + "&dm=" + lndm + "&ht=" + lnht + "&lp=" + 
					lnlp + "&sm=" + lnsm + "&fm=" + lnfm + "&xx=" + lnxx + "&hx_n=" + lchx_n + "&hx_o=" + lchx_o + "&hx_p=" + lchx_p + "&hx_q=" + lchx_q +
					"&hx_r=" + lchx_r + "&hx_s=" + lchx_s + "&hx_t=" + lchx_t + "&ekg_dt=" + lcdekg + "&ekg=" + lcekg + "&tpt_dt=" + lcdtpt + "&tpt=" + lctpt +
					"&iv=" + lcdiv + "&o2=" + lcdo2 + "&asa=" + lcdasa + "&isd=" + lcdisd + "&pvx=" + lcdpvx + "&mp=" + lcdmp +
					"&is_stemi=" + lnstemi + "&sk_dt=" + lcdsk + "&refer_dt=" + lcdrf + "&rf_to=" + lnreferto + "&nosk=" + lnnosk + "&bt=" + lcbt + "&pr=" + lcpr +
					"&rr=" + lcrr + "&syst=" + lcsyst + "&dias=" + lcdias + "&cc=" + lccc + "&riskxx=" + lcother + lcresult;
				mysave(lcphp, 'list("stemi_visits", "stemi_cid.php?cid=" + lccid)');
			   	inv_list();
			   	rx_list();
			   	rs_list();
			   	stemi_v2.performTransition("stemi_v1", -1, "slide", null);
			}

			if (s=="8") {
			   	// สร้าง PDF File //////////////////////////////////////
			   	var lcrisk = "";
			   	var lnrisk = 0;
			   	if (lndm == 1) {
			   		if (lnrisk == 0) {lcrisk = "DM";}
			   		else {lcrisk = lcrisk + ", DM";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnht == 1) {
			   		if (lnrisk == 0) {lcrisk = "HT";}
			   		else {lcrisk = lcrisk + ", HT";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnsm == 1) {
			   		if (lnrisk == 0) {lcrisk = "Smoking";}
			   		else {lcrisk = lcrisk + ", Smoking";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnlp == 1) {
			   		if (lnrisk == 0) {lcrisk = "Hyperlipidemia";}
			   		else {lcrisk = lcrisk + ", Hyperlipidemia";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnfm == 1) {
			   		if (lnrisk == 0) {lcrisk = "Family History";}
			   		else {lcrisk = lcrisk + ", Family History";}
			   		lnrisk = lnrisk + 1;
			   	}
			   	if (lnxx == 1) {
			   		if (lnrisk == 0) {lcrisk = lcother;}
			   		else {lcrisk = lcrisk + ", " + lcother;}
			   		lnrisk = lnrisk + 1;
			   	}
			   	
			   	// TPR
			   	var tpr = "BT=" + lcbt + ",  PR=" + lcpr + ",  RR=" + lcrr + "  BP=" + lcsyst + "/" + lcdias;
			   	// Refer
			   	var lcrfto = "";
			   	if (lnreferto==1) {lcrfto = "ER";}
			   	if (lnreferto==2) {lcrfto = "CCU";}
			   	if (lnreferto==3) {lcrfto = "Cath Lab";}
			   	
			   	// no SK
			   	var nosk = "";
			   	if (lnnosk == 1) {nosk = "ไม่ได้ฉีด SK เนื่องจากผู้ป่วยมีข้อห้ามในการใช้ยา SK";}
				if (lnnosk == 2) {nosk = "ไม่ได้ฉีด SK เนื่องจากความไม่พร้อมด้านบุคลากร";}
				if (lnnosk == 3) {nosk = "ไม่ได้ฉีด SK เนื่องจากความไม่พร้อมด้านวัสดุอุปกรณ์";}
				
				// critical period
				var ctime1 = min2hm(d2d_diff(lddate1, lddate2, "minutes"));
				var ctime2 = min2hm(d2d_diff(lddate2, ldekg, "minutes"));
				var ctime3 = min2hm(d2d_diff(lddate2, ldsk, "minutes"));
				var ctime4 = min2hm(d2d_diff(lddate2, ldrf, "minutes"));
				var ctime5 = min2hm(d2d_diff(lddate1, ldsk, "minutes"));
			   	
			   	// PHP to PDF //////////////
			   	lcpdf = ip_address + "pdf.php?cid=" + lccid + "&pt_name=" + lcfullname + " อายุ " + lcage + "&cc=" + lccc + "&hxn=" + lchx_n + "&hxo=" + lchx_o + "&hxp=" + lchx_p + 
			   	"&hxq=" + lchx_q + "&hxr=" + lchx_r + "&hxs=" + lchx_s + "&hxt=" + lchx_t + "&risk=" + lcrisk + "&er=" + tsdate(lddate2, 1) + "&tpr=" + tpr + "&dekg=" + tsdate(ldekg, 1) +
			   	"&ekg=" + lcekg + "&dtpt=" + tsdate(ldtpt, 1) + "&tpt=" + lctpt + "&iv=" + tsdate(ldiv, 1) + "&o2=" + tsdate(ldo2, 1) + "&isd=" + tsdate(ldisd, 1) + "&asa=" + tsdate(ldasa, 1) + 
			   	"&pvx=" + tsdate(ldpvx, 1) + "&mp=" + tsdate(ldmp, 1) + "&sk=" + tsdate(ldsk, 1) + nosk + "&refer=" + tsdate(ldrf, 1) + "&rfto=" + lcrfto +
			   	"&time1=" + ctime1 + "&time2=" + ctime2 + "&time3=" + ctime3 + "&time4=" + ctime4 + "&time5=" + ctime5;
				document.location.href = lcpdf;
				alert ("สร้าง PDF ชื่อ stemi_" + lccid + ".pdf เรียบร้อยแล้ว");
			   	/////////////////////////////////////////////////////
				//stemi_v2.performTransition("stemi_v1", -1, "slide", null);
		   	}
		   	if (s=="10") {
		   		clearList("rpt_list");
		   		var list_add = rpt_list.store.newItem({label: "สรุปช่วงเวลาการเข้าถึงบริการ", header: true});
				var list_add = rpt_list.store.newItem({label: "Onset - FMC", rightText: min2hm(d2d_diff(lddate1, lddate2, "minutes"))});
				var list_add = rpt_list.store.newItem({label: "FMC - EKG", rightText: min2hm(d2d_diff(lddate2, ldekg, "minutes"))});
				var list_add = rpt_list.store.newItem({label: "FMC - SK", rightText: min2hm(d2d_diff(lddate2, ldsk, "minutes"))});
				var list_add = rpt_list.store.newItem({label: "FMC - Refer", rightText: min2hm(d2d_diff(lddate2, ldrf, "minutes"))});
				var list_add = rpt_list.store.newItem({label: "Onset - SK", rightText: min2hm(d2d_diff(lddate1, ldsk, "minutes"))});
				stemi_v2.performTransition("report", 1, "slide", null);
		   	}
		   	
         });
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu1_1, 1_2    /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu1 = reg.byId("stemi_menu1");
		var back_menu1 = reg.byId("back_menu1");
		var back_menu1_1 = reg.byId("back_menu1_1");
		var stemi_menu1_1 = reg.byId("stemi_menu1_1");
		var back_menu1_2 = reg.byId("back_menu1_2");
		var stemi_menu1_2 = reg.byId("stemi_menu1_2");
		var er_visit = reg.byId("er_visit");
		var risk = reg.byId("risk");
		var risk_other = reg.byId("risk_other");
		// Hide Object ///////////////////////////////////////
		risk_other.domNode.style.visibility = "hidden";
		/////////////////////////////////////////////////////
		var date2 = reg.byId("date2");
		var minus_d2 = reg.byId("minus_d2");
		var plus_d2 = reg.byId("plus_d2");
		var hr2 = reg.byId("hr2");
		var min2 = reg.byId("min2");
		var pt_fullname = reg.byId("pt_fullname");
		
		var btemp = reg.byId("btemp");
		var pulse = reg.byId("pulse");

		var resp = reg.byId("resp");
		var syst = reg.byId("syst");
		var dias = reg.byId("dias");
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu1_1, "click", function() {
			stemi_menu1_1.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(back_menu1, "click", function() {
			er_list();
			stemi_menu1.performTransition("stemi_menu1_1", -1, "slide", null);
		});
		
		on(back_menu1_2, "click", function() {
			// ปรับข้อมูล Risk
			lcother = risk_other.get("value").trim();
			
			lcdm = sw_dm.innerText;
			lnsearch = lcdm.search("YES");
			if (lnsearch > 0) {lndm = 1;}
			else {lndm = 0;}
			
			lcht = sw_ht.innerText;
			lnsearch = lcht.search("YES");
			if (lnsearch > 0) {lnht = 1;}
			else {lnht = 0;}
			
			lclp = sw_lp.innerText;
			lnsearch = lclp.search("YES");
			if (lnsearch > 0) {lnlp = 1;}
			else {lnlp = 0;}
			
			lcsm = sw_sm.innerText;
			lnsearch = lcsm.search("YES");
			if (lnsearch > 0) {lnsm = 1;}
			else {lnsm = 0;}
			
			lcfm = sw_fm.innerText;
			lnsearch = lcfm.search("YES");
			if (lnsearch > 0) {lnfm = 1;}
			else {lnfm = 0;}
			
			lcxx = sw_xx.innerText;
			lnsearch = lcxx.search("YES");
			if (lnsearch > 0) {lnxx = 1;}
			else {lnxx = 0;}
			
			er_list();
			stemi_menu1_2.performTransition("stemi_menu1_1", -1, "slide", null);
		});

		on(date2, "click", function() {
			var txt = date2.get("value");
			if(txt.trim() == "") {lddate2 = new Date();}
			date2.set("value", tsdate(lddate2));
		});
		on(minus_d2, "click", function() {
			var lcdate = date2.get("value");
			if (lcdate.trim() == "") {lddate2 = new Date();}
			else {lddate = lddate2.getDate() - 1;
			lddate2.setDate(lddate);}
			date2.set("value", tsdate(lddate2));
		});
		on(plus_d2, "click", function() {
			var lcdate = date2.get("value");
			if (lcdate.trim() == "") {lddate2 = new Date();}
			else {lddate = lddate2.getDate() + 1;
			lddate2.setDate(lddate);}
			date2.set("value", tsdate(lddate2));
		});
		on(hr2, "keyup", function() {
     		lnhr2 = hr2.get("value");
     		if (lnhr2 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr2 = lnhr2.toString();
	     		var lnlength = lchr2.length;
				if (lnlength == 2 || lchr2 > "2") {
					lddate2.setHours(lnhr2);
					hr2.set("value", pad(lchr2, "00"));
					min2.focus(true);
				}
			}
		});
		on(min2, "keyup", function() {
     		lnmin2 = min2.get("value");
     		if (lnmin2 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmin2 = lnmin2.toString();
	     		var lnlength = lcmin2.length;
				if (lnlength == 2 || lcmin2 > "6" || lcmin2 == "6" && lnlength == 1) {
					lddate2.setMinutes(lnmin2);
					min2.set("value", pad(lcmin2, "00"));
					back_menu1.focus(true);
				}
			}
		});
		// เลือกรายการ ข้อมูลทั่วไป
		on(er_visit, "click", function() {
			var er = selected_row("er_visit");
			if (er.value == "2") {
				lddate0 = lddate2;
				gcsource_view = "stemi_menu1_1";
				lcvar = "lddate2";
				gcfunction = "er_list()";
				stemi_menu1_1.performTransition("select_dt", 1, "swirl");
			}
			if (er.value == "3") {
				lcsource = "stemi_menu1_1";
				lcvartype = "C";
				lccode = "F";
				//// แสดง txt_list
				txt_title.set("label", "Chief Complaint");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "เจ็บแน่นหน้าอกด้านซ้าย", value : "เจ็บแน่นหน้าอกด้านซ้าย"});
				var list_add = txt_list.store.newItem({label: "จุกแน่นบริเวณลิ้นปี่", value : "จุกแน่นบริเวณลิ้นปี่"});
				var list_add = txt_list.store.newItem({label: "เหงื่อออก หน้ามืด เป็นลม", value : "เหงื่อออก หน้ามืด เป็นลม"});
				var list_add = txt_list.store.newItem({label: "อ่อนแรง เหนื่อยเพลีย", value : "อ่อนแรง เหนื่อยเพลีย"});
				var list_add = txt_list.store.newItem({label: "หายใจไม่สะดวก", value : "หายใจไม่สะดวก"});
				lcoldtxt = lccc.replace(">", "").trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "er_list()";
				lcvar = "lccc";
				stemi_menu1_1.performTransition("txt_input", 1, "slide", null);}
			else if (er.value == "9") {stemi_menu1_1.performTransition("stemi_menu1_2", 1, "slide", null);}
			else {
				tb1.set("value", lcfullname);
				tb2.set("value", lcbt);
				if (lcbt == "") {lcicon = "none";}
				else {lcicon = 'url("cross1.jpg")';}
				cancel2.domNode.style.backgroundImage = lcicon;
				tb3.set("value", lcpr);
				if (lcpr == "") {lcicon = "none";}
				else {lcicon = 'url("cross1.jpg")';}
				cancel3.domNode.style.backgroundImage = lcicon;
				tb4.set("value", lcrr);
				if (lcrr == "") {lcicon = "none";}
				else {lcicon = 'url("cross1.jpg")';}
				cancel4.domNode.style.backgroundImage = lcicon;
				tb5.set("value", lcsyst);
				if (lcsyst == "") {lcicon = "none";}
				else {lcicon = 'url("cross1.jpg")';}
				cancel5.domNode.style.backgroundImage = lcicon;
				tb6.set("value", lcdias);
				if (lcdias == "") {lcicon = "none";}
				else {lcicon = 'url("cross1.jpg")';}
				cancel6.domNode.style.backgroundImage = lcicon;
				
				stemi_menu1_1.performTransition("view_input", 1, "slide", null);
			}
		});
		
		on(btemp, "keyup", function() {
     		lctemp = btemp.get("value").trim();
     		var lnlength = lctemp.length;
			if (lnlength == 2 && (lctemp.substr(0, 1) == "3" || lctemp.substr(0, 1) == "4")) {btemp.set("value", lctemp + ".");}
			if (lnlength == 4 && lctemp.substr(3, 1) == ".") {
				btemp.set("value", lctemp.substr(0, 3));
				btemp.focus(true);}
			if (lnlength == 4 && lctemp.substr(3, 1) != ".") {
				lcbt = lctemp;
				pulse.focus(true);
			}
		});
		
		on(pulse, "keyup", function() {
     		lctemp = pulse.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 2) || lnlength == 3) {
				lcpr = lctemp;
				resp.focus(true);
			}
		});
		
		on(resp, "keyup", function() {
     		lctemp = resp.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 1) || lnlength == 3) {
				lcrr = lctemp;
				syst.focus(true);
			}
		});
		
		on(syst, "keyup", function() {
     		lctemp = syst.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 3) || lnlength == 3) {
				lcsyst = lctemp;
				dias.focus(true);
			}
		});
		
		on(dias, "keyup", function() {
     		lctemp = dias.get("value").trim();
     		var lnlength = lctemp.length;
			if ((lnlength == 2 && lctemp.substr(0, 1) > 2) || lnlength == 3) {
				lcdias = lctemp;
				back_menu1.focus(true);
			}
		});
		//////////////////
		on(risk, "click", function() {
			var csw = sw_status("risk", "sw_xx");
			if (csw== "on") {risk_other.domNode.style.visibility = "visible";
				risk_other.focus(true);}
			else {risk_other.domNode.style.visibility = "hidden";
				lcother = "";}
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu2    ////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu2 = reg.byId("stemi_menu2");
		var back_menu2 = reg.byId("back_menu2");
		var chest_pain = reg.byId("chest_pain");
		var store_cp = new ifws({data:{items:[]}});
		chest_pain.store = null;
		chest_pain.setStore(store_cp);
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu2, "click", function() {
			stemi_menu2.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(chest_pain, "click", function() {
			lcsource = "stemi_menu2";
			lcvartype = "C";
			lccode = "F";
			var obj = selected_row("chest_pain");
			if (obj.value == "1") {
				//// แสดง txt_list
				txt_title.set("label", "N = Normal");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "เคยมีอาการมาก่อน", value : "เคยมีอาการมาก่อน"});
				var list_add = txt_list.store.newItem({label: "เคยวินิจฉัยโรคหัวใจขาดเลือด", value : "เคยวินิจฉัยโรคหัวใจขาดเลือด"});
				var list_add = txt_list.store.newItem({label: "ไม่เคยมีอาการมาก่อน", value : "ไม่เคยมีอาการมาก่อน"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_n";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
			else if (obj.value == "2") {
				stemi_menu2.performTransition("hx_o", 1, "slide", null);}
			else if (obj.value == "3") {
				//// แสดง txt_list
				txt_title.set("label", "P = Precipitating Cause");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "ขณะกินอาหาร", value : "ขณะกินอาหาร"});
				var list_add = txt_list.store.newItem({label: "ขณะดูโทรทัศน์", value : "ขณะดูโทรทัศน์"});
				var list_add = txt_list.store.newItem({label: "ขณะถ่ายอุจจาระ", value : "ขณะถ่ายอุจจาระ"});
				var list_add = txt_list.store.newItem({label: "ขณะทำงาน", value : "ขณะทำงาน"});
				var list_add = txt_list.store.newItem({label: "", value: ""});
				var list_add = txt_list.store.newItem({label: "คลื่นไส้อาเจียน", value : "คลื่นไส้อาเจียน"});
				var list_add = txt_list.store.newItem({label: "หน้ามืด วิงเวียน", value : "หน้ามืด วิงเวียน"});
				var list_add = txt_list.store.newItem({label: "หอบเหนื่อย", value : "หอบเหนื่อย"});
				var list_add = txt_list.store.newItem({label: "หายใจไม่สะดวก", value : "หายใจไม่สะดวก"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_p";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
			else if (obj.value == "4") {
				//// แสดง txt_list
				txt_title.set("label", "Q = Quality of Discomfort");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "จุกแน่นใต้ลิ้นปี่", value : "จุกแน่นใต้ลิ้นปี่"});
				var list_add = txt_list.store.newItem({label: "แน่นคล้ายถูกของหนักทับ", value : "แน่นคล้ายถูกของหนักทับ"});
				var list_add = txt_list.store.newItem({label: "เหงื่อแตก", value : "เหงื่อแตก"});
				var list_add = txt_list.store.newItem({label: "นอนราบไม่ได้", value : "นอนราบไม่ได้"});
				var list_add = txt_list.store.newItem({label: "", value: ""});
				var list_add = txt_list.store.newItem({label: "นอนพักอาการทุเลา", value : "นอนพักอาการทุเลา"});
				var list_add = txt_list.store.newItem({label: "อมยาอาการทุเลา", value : "อมยาอาการทุเลา"});
				var list_add = txt_list.store.newItem({label: "มีอาการเป็นๆหายๆ", value : "มีอาการเป็นๆหายๆ"});
				var list_add = txt_list.store.newItem({label: "มีอาการเป็นมากขึ้นเรื่อยๆ", value : "มีอาการเป็นมากขึ้นเรื่อยๆ"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_q";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
			else if (obj.value == "5") {
				//// แสดง txt_list
				txt_title.set("label", "R = Region of Discomfort");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "เจ็บแน่นบริเวณกลางหน้าอก", value : "เจ็บแน่นบริเวณกลางหน้าอก"});
				var list_add = txt_list.store.newItem({label: "อาการเจ็บไม่ร้าวไปที่ใด", value : "อาการเจ็บไม่ร้าวไปที่ใด"});
				var list_add = txt_list.store.newItem({label: "อาการเจ็บร้าวไปแขนซ้าย", value : "อาการเจ็บร้าวไปแขนซ้าย"});
				var list_add = txt_list.store.newItem({label: "อาการเจ็บร้าวไปที่ไหล่ซ้าย", value : "อาการเจ็บร้าวไปที่ไหล่ซ้าย"});
				var list_add = txt_list.store.newItem({label: "อาการเจ็บร้าวไปที่คอ", value : "อาการเจ็บร้าวไปที่คอ"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_r";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
			else if (obj.value == "6") {
				//// แสดง txt_list
				txt_title.set("label", "S = Severity of Pain");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "1/10 คะแนน", value : "1/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "2/10 คะแนน", value : "2/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "3/10 คะแนน", value : "3/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "4/10 คะแนน", value : "4/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "5/10 คะแนน", value : "5/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "6/10 คะแนน", value : "6/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "7/10 คะแนน", value : "7/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "8/10 คะแนน", value : "8/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "9/10 คะแนน", value : "9/10 คะแนน"});
				var list_add = txt_list.store.newItem({label: "10/10 คะแนน", value : "10/10 คะแนน"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_s";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
			else {
				//// แสดง txt_list
				txt_title.set("label", "T = Timing");
				clearList("txt_list");		
				var list_add = txt_list.store.newItem({label: "น้อยกว่า 3 นาที", value : "น้อยกว่า 3 นาที"});
				var list_add = txt_list.store.newItem({label: "3-5 นาที", value : "3-5 นาที"});
				var list_add = txt_list.store.newItem({label: "5-10 นาที", value : "5-10 นาที"});
				var list_add = txt_list.store.newItem({label: "10-30 นาที", value : "10-30 นาที"});
				var list_add = txt_list.store.newItem({label: "มากกว่า 30 นาที", value : "มากกว่า 30 นาที"});
				lcoldtxt = obj.label.trim();
				txt_return.set("value", lcoldtxt);
				lcfnc = "cp_list()";
				lcvar = "lchx_t";
				stemi_menu2.performTransition("txt_input", 1, "slide", null);}
		});	
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// hx_o    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hx_o = reg.byId("hx_o");
		var back_hxo = reg.byId("back_hxo");
		var date1 = reg.byId("date1");
		var minus_d1 = reg.byId("minus_d1");
		var plus_d1 = reg.byId("plus_d1");
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
	
		//////////////////
		//// Events //////
		//////////////////
		on(back_hxo, "click", function() {
			lchx_o = tsdate(lddate1, 1);
			cp_list();
			hx_o.performTransition("stemi_menu2", -1, "slide", null);
		});
		on(date1, "click", function() {
			var txt = date1.get("value");
			if(txt.trim() == "") {lddate1 = new Date();}
			date1.set("value", tsdate(lddate1));
		});
		on(minus_d1, "click", function() {
			var lcdate = date1.get("value");
			if (lcdate.trim() == "") {lddate1 = new Date();}
			else {lddate = lddate1.getDate()-1;
			lddate1.setDate(lddate);}
			date1.set("value", tsdate(lddate1));
		});
		on(plus_d1, "click", function() {
			var lcdate = date1.get("value");
			if (lcdate.trim() == "") {lddate1 = new Date();}
			else {lddate = lddate1.getDate()+1;
			lddate1.setDate(lddate);}
			date1.set("value", tsdate(lddate1));
		});
		on(hr1, "keyup", function() {
     		lnhr1 = hr1.get("value");
     		if (lnhr1 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr1 = lnhr1.toString();
	     		var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate1.setHours(lnhr1);
					hr1.set("value", pad(lchr1, "00"));
					min1.focus(true);
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
					lddate1.setMinutes(lnmin1);
					min1.set("value", pad(lcmin1, "00"));
					back_hxo.focus(true);
				}
			}
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu3    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu3 = reg.byId("stemi_menu3");
		var back_menu3 = reg.byId("back_menu3");
		var menu3_title = reg.byId("menu3_title");
		var investigate = reg.byId("investigate");
		var store_inv = new ifws({data:{items:[]}});
		investigate.store = null;
		investigate.setStore(store_inv);
		//////////////////
		//// Events //////
		//////////////////

		on(menu3_title, "click", function() {
			back("back_menu3", "stemi_menu3", "stemi_v2");
		});
		
		on(investigate, "click", function() {
			var obj = selected_row("investigate");
			ekg_value.set("value", lcekg);
			tpt_value.set("value", lctpt);
			if (obj.value == "1") {stemi_menu3.performTransition("menu3_ekg", 1, "slide", null);}
			else if (obj.value == "2") {stemi_menu3.performTransition("menu3_tpt", 1, "slide", null);}
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu3_ekg    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu3_ekg = reg.byId("menu3_ekg");
		var back_ekg = reg.byId("back_ekg");
		var minus_ekg = reg.byId("minus_ekg");
		var plus_ekg = reg.byId("plus_ekg");
		var dateekg = reg.byId("dateekg");
		var hrekg = reg.byId("hrekg");
		var minekg = reg.byId("minekg");
		var ekg_value = reg.byId("ekg_value");
		
		var ekg_list = reg.byId("ekg_list");
		var ekg_store = new ifws({data:{items:[]}});
		ekg_list.store = null;
		ekg_list.setStore(ekg_store);
		var list_add = ekg_list.store.newItem({label: "Waves", header : true});
		var list_add = ekg_list.store.newItem({label : "ST Elevate"});
		var list_add = ekg_list.store.newItem({label : "ST Depress"});
		var list_add = ekg_list.store.newItem({label : "Inverted T"});
		var list_add = ekg_list.store.newItem({label : "Q Wave"});
		var list_add = ekg_list.store.newItem({label : "Hyper Acute T"});
		var list_add = ekg_list.store.newItem({label: "Leads", header : true});
		var list_add = ekg_list.store.newItem({label : "I (Lat)"});
		var list_add = ekg_list.store.newItem({label : "II (Inf)"});
		var list_add = ekg_list.store.newItem({label : "III (Inf)"});
		var list_add = ekg_list.store.newItem({label : "AVR"});
		var list_add = ekg_list.store.newItem({label : "AVL (Latl)"});
		var list_add = ekg_list.store.newItem({label : "AVF (Inf)"});
		var list_add = ekg_list.store.newItem({label : "AVL"});
		var list_add = ekg_list.store.newItem({label : "V1 (Sep)"});
		var list_add = ekg_list.store.newItem({label : "V2 (Sep)"});
		var list_add = ekg_list.store.newItem({label : "V3 (Ant)"});
		var list_add = ekg_list.store.newItem({label : "V4 (Ant)"});
		var list_add = ekg_list.store.newItem({label : "V5 (Lat)"});
		var list_add = ekg_list.store.newItem({label : "V6 (Lat)"});

		var btn_clear_ekg = reg.byId("btn_clear_ekg");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_ekg, "click", function() {
			lcekg = ekg_value.get("value").trim();
			inv_list();
			menu3_ekg.performTransition("stemi_menu3", -1, "slide", null);
		});

		on(dateekg, "click", function() {
			var txt = dateekg.get("value");
			if(txt.trim() == "") {ldekg = new Date();}
			dateekg.set("value", tsdate(ldekg));
			hrekg.focus(true);
		});
		on(minus_ekg, "click", function() {
			var lcdate = dateekg.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldekg.getDate()-1;
			ldekg.setDate(lddate);}
			dateekg.set("value", tsdate(ldekg));
		});
		on(plus_ekg, "click", function() {
			var lcdate = dateekg.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldekg.getDate()+1;
			ldekg.setDate(lddate);}
			dateekg.set("value", tsdate(ldekg));
		});

		on(hrekg, "keyup", function() {
     		lnhrekg = hrekg.get("value");
     		if (lnhrekg > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrekg = lnhrekg.toString();
	     		var lnlength = lchrekg.length;
				if (lnlength == 2 || lchrekg > "2") {
					ldekg.setHours(lnhrekg);
					hrekg.set("value", pad(lchrekg, "00"));
					minekg.focus(true);
				}
			}
		});
		on(minekg, "keyup", function() {
     		lnminekg = minekg.get("value");
     		if (lnminekg > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminekg = lnminekg.toString();
	     		var lnlength = lcminekg.length;
				if (lnlength == 2 || lcminekg > "6" || lcminekg == "6" && lnlength == 1) {
					ldekg.setMinutes(lnminekg);
					minekg.set("value", pad(lcminekg, "00"));
					back_ekg.focus(true);
				}
			}
		});
		
		on(ekg_list, "click", function() {
			var lcold = ekg_value.get("value");
			var obj = selected_row("ekg_list");
			if (obj.header != true) {
				if (lcold == "") {ekg_value.set("value", obj.label);}
				else {ekg_value.set("value", lcold + " " + obj.label);}
			}
		});
		
		on(btn_clear_ekg, "click", function() {
			ekg_value.set("value", "");
		});
		//////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu3_tpt    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu3_tpt = reg.byId("menu3_tpt");
		var back_tpt = reg.byId("back_tpt");
		var minus_tpt = reg.byId("minus_tpt");
		var plus_tpt = reg.byId("plus_tpt");
		var datetpt = reg.byId("datetpt");
		var hrtpt = reg.byId("hrtpt");
		var mintpt = reg.byId("mintpt");
		var tpt_value = reg.byId("tpt_value");
		var tpt_list = reg.byId("tpt_list");
		var tpt_store = new ifws({data:{items:[]}});
		tpt_list.store = null;
		tpt_list.setStore(tpt_store);
		var list_add = tpt_list.store.newItem({label: "ผลการตรวจ Trop-T", header : true});
		var list_add = tpt_list.store.newItem({label : "Trop-T < 0.1 ng/ml"});
		var list_add = tpt_list.store.newItem({label : "Trop-T = 0.1 ng/ml"});
		var list_add = tpt_list.store.newItem({label : "Trop-T > 0.1 ng/ml"});

		//////////////////
		//// Events //////
		//////////////////
		on(back_tpt, "click", function() {
			lctpt = tpt_value.get("value").trim();
			inv_list();
			menu3_tpt.performTransition("stemi_menu3", -1, "slide", null);
		});

		on(datetpt, "click", function() {
			var txt = datetpt.get("value");
			if(txt.trim() == "") {ldtpt = new Date();}
			datetpt.set("value", tsdate(ldtpt));
			hrtpt.focus(true);
		});
		on(minus_tpt, "click", function() {
			var lcdate = datetpt.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldtpt.getDate()-1;
			ldtpt.setDate(lddate);}
			datetpt.set("value", tsdate(ldtpt));
		});
		on(plus_tpt, "click", function() {
			var lcdate = datetpt.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldtpt.getDate()+1;
			ldtpt.setDate(lddate);}
			datetpt.set("value", tsdate(ldtpt));
		});

		on(hrtpt, "keyup", function() {
     		lnhrtpt = hrtpt.get("value");
     		if (lnhrtpt > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrtpt = lnhrtpt.toString();
	     		var lnlength = lchrtpt.length;
				if (lnlength == 2 || lchrtpt > "2") {
					ldtpt.setHours(lnhrtpt);
					hrtpt.set("value", pad(lchrtpt, "00"));
					mintpt.focus(true);
				}
			}
		});
		on(mintpt, "keyup", function() {
     		lnmintpt = mintpt.get("value");
     		if (lnmintpt > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmintpt = lnmintpt.toString();
	     		var lnlength = lcmintpt.length;
				if (lnlength == 2 || lcmintpt > "6" || lcmintpt == "6" && lnlength == 1) {
					ldtpt.setMinutes(lnmintpt);
					mintpt.set("value", pad(lcmintpt, "00"));
					back_tpt.focus(true);
				}
			}
		});

		on(tpt_list, "click", function() {
			var lcold = tpt_value.get("value");
			var obj = selected_row("tpt_list");
			if (obj.header != true) {
				if (lcold == "") {tpt_value.set("value", obj.label);}
				else {tpt_value.set("value", lcold + " " + obj.label);}
			}
		});
		
		on(btn_clear_tpt, "click", function() {
			tpt_value.set("value", "");
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu4    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu4 = reg.byId("stemi_menu4");
		var back_menu4 = reg.byId("back_menu4");
		var treatment = reg.byId("treatment");
		var store_rx = new ifws({data:{items:[]}});
		treatment.store = null;
		treatment.setStore(store_rx);
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu4, "click", function() {
			stemi_menu4.performTransition("stemi_v2", -1, "slide", null);
		});
		on(treatment, "click", function() {
			stemi_menu4.performTransition("menu4_dt", 1, "slide", null);
		});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu4_dt    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu4_dt = reg.byId("menu4_dt");
		var back_4dt = reg.byId("back_4dt");

		var minus_iv = reg.byId("minus_iv");
		var plus_iv = reg.byId("plus_iv");
		var dateiv = reg.byId("dateiv");
		var hriv = reg.byId("hriv");
		var miniv = reg.byId("miniv");

		var minus_o2 = reg.byId("minus_o2");
		var plus_o2 = reg.byId("plus_o2");
		var dateo2 = reg.byId("dateo2");
		var hro2 = reg.byId("hro2");
		var mino2 = reg.byId("mino2");

		var minus_asa = reg.byId("minus_asa");
		var plus_asa = reg.byId("plus_asa");
		var dateasa = reg.byId("dateasa");
		var hrasa = reg.byId("hrasa");
		var minasa = reg.byId("minasa");

		var minus_isd = reg.byId("minus_isd");
		var plus_isd = reg.byId("plus_isd");
		var dateisd = reg.byId("dateisd");
		var hrisd = reg.byId("hrisd");
		var minisd = reg.byId("minisd");

		var minus_pvx = reg.byId("minus_pvx");
		var plus_pvx = reg.byId("plus_pvx");
		var datepvx = reg.byId("datepvx");
		var hrpvx = reg.byId("hrpvx");
		var minpvx = reg.byId("minpvx");

		var minus_mp = reg.byId("minus_mp");
		var plus_mp = reg.byId("plus_mp");
		var datemp = reg.byId("datemp");
		var hrmp = reg.byId("hrmp");
		var minmp = reg.byId("minmp");
		//////////////////
		//// Events //////
		//////////////////
		on(back_4dt, "click", function() {
			rx_list();
			menu4_dt.performTransition("stemi_menu4", -1, "slide", null);
		});

		on(dateiv, "click", function() {
			var txt = dateiv.get("value");
			if (txt == "" || txt == "-") {
				ldiv = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldiv = "";
					hriv.set("value", "");
					miniv.set("value", "");}
			}
			dateiv.set("value", tsdate(ldiv));
			hriv.focus(true);
		});
		on(minus_iv, "click", function() {
			var lcdate = dateiv.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldiv.getDate()-1;
			ldiv.setDate(lddate);}
			dateiv.set("value", tsdate(ldiv));
		});
		on(plus_iv, "click", function() {
			var lcdate = dateiv.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldiv.getDate()+1;
			ldiv.setDate(lddate);}
			dateiv.set("value", tsdate(ldiv));
		});

		on(hriv, "keyup", function() {
     		lnhriv = hriv.get("value");
     		if (lnhriv > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchriv = lnhriv.toString();
	     		var lnlength = lchriv.length;
				if (lnlength == 2 || lchriv > "2") {
					ldiv.setHours(lnhriv);
					hriv.set("value", pad(lchriv, "00"));
					miniv.focus(true);
				}
			}
		});
		on(miniv, "keyup", function() {
     		lnminiv = miniv.get("value");
     		if (lnminiv > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminiv = lnminiv.toString();
	     		var lnlength = lcminiv.length;
				if (lnlength == 2 || lcminiv > "6" || lcminiv == "6" && lnlength == 1) {
					ldiv.setMinutes(lnminiv);
					miniv.set("value", pad(lcminiv, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(dateo2, "click", function() {
			var txt = dateo2.get("value");
			if (txt == "" || txt == "-") {
				ldo2 = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldo2 = "";
					hro2.set("value", "");
					mino2.set("value", "");}
			}
			dateo2.set("value", tsdate(ldo2));
			hro2.focus(true);
		});
		
		on(minus_o2, "click", function() {
			var lcdate = dateo2.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldo2.getDate()-1;
			ldo2.setDate(lddate);}
			dateo2.set("value", tsdate(ldo2));
		});
		on(plus_o2, "click", function() {
			var lcdate = dateo2.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldo2.getDate()+1;
			ldo2.setDate(lddate);}
			dateo2.set("value", tsdate(ldo2));
		});

		on(hro2, "keyup", function() {
     		lnhro2 = hro2.get("value");
     		if (lnhro2 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchro2 = lnhro2.toString();
	     		var lnlength = lchro2.length;
				if (lnlength == 2 || lchro2 > "2") {
					ldo2.setHours(lnhro2);
					hro2.set("value", pad(lchro2, "00"));
					mino2.focus(true);
				}
			}
		});
		on(mino2, "keyup", function() {
     		lnmino2 = mino2.get("value");
     		if (lnmino2 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmino2 = lnmino2.toString();
	     		var lnlength = lcmino2.length;
				if (lnlength == 2 || lcmino2 > "6" || lcmino2 == "6" && lnlength == 1) {
					ldo2.setMinutes(lnmino2);
					mino2.set("value", pad(lcmino2, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(dateasa, "click", function() {
			var txt = dateasa.get("value");
			if (txt == "" || txt == "-") {
				ldasa = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldasa = "";
					hrasa.set("value", "");
					minasa.set("value", "");}
			}
			dateasa.set("value", tsdate(ldasa));
			hrasa.focus(true);
		});
		on(minus_asa, "click", function() {
			var lcdate = dateasa.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldasa.getDate()-1;
			ldasa.setDate(lddate);}
			dateasa.set("value", tsdate(ldasa));
		});
		on(plus_asa, "click", function() {
			var lcdate = dateasa.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldasa.getDate()+1;
			ldasa.setDate(lddate);}
			dateasa.set("value", tsdate(ldasa));
		});

		on(hrasa, "keyup", function() {
     		lnhrasa = hrasa.get("value");
     		if (lnhrasa > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrasa = lnhrasa.toString();
	     		var lnlength = lchrasa.length;
				if (lnlength == 2 || lchrasa > "2") {
					ldasa.setHours(lnhrasa);
					hrasa.set("value", pad(lchrasa, "00"));
					minasa.focus(true);
				}
			}
		});
		on(minasa, "keyup", function() {
     		lnminasa = minasa.get("value");
     		if (lnminasa > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminasa = lnminasa.toString();
	     		var lnlength = lcminasa.length;
				if (lnlength == 2 || lcminasa > "6" || lcminasa == "6" && lnlength == 1) {
					ldasa.setMinutes(lnminasa);
					minasa.set("value", pad(lcminasa, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(dateisd, "click", function() {
			var txt = dateisd.get("value");
			if (txt == "" || txt == "-") {
				ldisd = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldisd = "";
					hrisd.set("value", "");
					minisd.set("value", "");}
			}
			dateisd.set("value", tsdate(ldisd));
			hrisd.focus(true);
		});
		on(minus_isd, "click", function() {
			var lcdate = dateisd.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldisd.getDate()-1;
			ldisd.setDate(lddate);}
			dateisd.set("value", tsdate(ldisd));
		});
		on(plus_isd, "click", function() {
			var lcdate = dateisd.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldisd.getDate()+1;
			ldisd.setDate(lddate);}
			dateisd.set("value", tsdate(ldisd));
		});

		on(hrisd, "keyup", function() {
     		lnhrisd = hrisd.get("value");
     		if (lnhrisd > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrisd = lnhrisd.toString();
	     		var lnlength = lchrisd.length;
				if (lnlength == 2 || lchrisd > "2") {
					ldisd.setHours(lnhrisd);
					hrisd.set("value", pad(lchrisd, "00"));
					minisd.focus(true);
				}
			}
		});
		on(minisd, "keyup", function() {
     		lnminisd = minisd.get("value");
     		if (lnminisd > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminisd = lnminisd.toString();
	     		var lnlength = lcminisd.length;
				if (lnlength == 2 || lcminisd > "6" || lcminisd == "6" && lnlength == 1) {
					ldisd.setMinutes(lnminisd);
					minisd.set("value", pad(lcminisd, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(datepvx, "click", function() {
			var txt = datepvx.get("value");
			if (txt == "" || txt == "-") {
				ldpvx = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldpvx = "";
					hrpvx.set("value", "");
					minpvx.set("value", "");}
			}
			datepvx.set("value", tsdate(ldpvx));
			hrpvx.focus(true);
		});
		on(minus_pvx, "click", function() {
			var lcdate = datepvx.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldpvx.getDate()-1;
			ldpvx.setDate(lddate);}
			datepvx.set("value", tsdate(ldpvx));
		});
		on(plus_pvx, "click", function() {
			var lcdate = datepvx.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldpvx.getDate()+1;
			ldpvx.setDate(lddate);}
			datepvx.set("value", tsdate(ldpvx));
		});

		on(hrpvx, "keyup", function() {
     		lnhrpvx = hrpvx.get("value");
     		if (lnhrpvx > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrpvx = lnhrpvx.toString();
	     		var lnlength = lchrpvx.length;
				if (lnlength == 2 || lchrpvx > "2") {
					ldpvx.setHours(lnhrpvx);
					hrpvx.set("value", pad(lchrpvx, "00"));
					minpvx.focus(true);
				}
			}
		});
		on(minpvx, "keyup", function() {
     		lnminpvx = minpvx.get("value");
     		if (lnminpvx > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminpvx = lnminpvx.toString();
	     		var lnlength = lcminpvx.length;
				if (lnlength == 2 || lcminpvx > "6" || lcminpvx == "6" && lnlength == 1) {
					ldpvx.setMinutes(lnminpvx);
					minpvx.set("value", pad(lcminpvx, "00"));
					back_4dt.focus(true);
				}
			}
		});
		
		//////////////////
		on(datemp, "click", function() {
			var txt = datemp.get("value");
			if (txt == "" || txt == "-") {
				ldmp = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldmp = "";
					hrmp.set("value", "");
					minmp.set("value", "");}
			}
			datemp.set("value", tsdate(ldmp));
			hrmp.focus(true);
		});
		on(minus_mp, "click", function() {
			var lcdate = datemp.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldmp.getDate()-1;
			ldmp.setDate(lddate);}
			datemp.set("value", tsdate(ldmp));
		});
		on(plus_mp, "click", function() {
			var lcdate = datemp.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldmp.getDate()+1;
			ldmp.setDate(lddate);}
			datemp.set("value", tsdate(ldmp));
		});

		on(hrmp, "keyup", function() {
     		lnhrmp = hrmp.get("value");
     		if (lnhrmp > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrmp = lnhrmp.toString();
	     		var lnlength = lchrmp.length;
				if (lnlength == 2 || lchrmp > "2") {
					ldmp.setHours(lnhrmp);
					hrmp.set("value", pad(lchrmp, "00"));
					minmp.focus(true);
				}
			}
		});
		on(minmp, "keyup", function() {
     		lnminmp = minmp.get("value");
     		if (lnminmp > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminmp = lnminmp.toString();
	     		var lnlength = lcminmp.length;
				if (lnlength == 2 || lcminmp > "6" || lcminmp == "6" && lnlength == 1) {
					ldmp.setMinutes(lnminmp);
					minmp.set("value", pad(lcminmp, "00"));
					back_4dt.focus(true);
				}
			}
		});
//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// menu6_sk    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu6_sk = reg.byId("menu6_sk");
		var back_sk = reg.byId("back_sk");
		var sk_value = reg.byId("sk_value")
		var btn_clear_sk = reg.byId("btn_clear_sk");
		var sk_list = reg.byId("sk_list");
		var sk_store = new ifws({data:{items:[]}});
		sk_list.store = null;
		sk_list.setStore(sk_store);
		var list_add = sk_list.store.newItem({label: "สาเหตุที่ไม่ฉีด Streptokinase", header : true});
		var list_add = sk_list.store.newItem({label : "ผู้ป่วยมีข้อห้ามในการใช้ยา", value : 1});
		var list_add = sk_list.store.newItem({label : "ความไม่พร้อมด้านบุคลากร", value : 2});
		var list_add = sk_list.store.newItem({label : "ความไม่พร้อมด้านวัสดุ อุปกรณ์", value : 3});
		
		// sk date
		var minus_sk = reg.byId("minus_sk");
		var plus_sk = reg.byId("plus_sk");
		var datesk = reg.byId("datesk");
		var hrsk = reg.byId("hrsk");
		var minsk = reg.byId("minsk");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_sk, "click", function() {
			stemi2_list();
			menu6_sk.performTransition("stemi_menu6", -1, "slide", null);
		});
		on(datesk, "click", function() {
			var txt = datesk.get("value");
			if(txt.trim() == "") {ldsk = new Date();
				hrsk.focus(true);}
			datesk.set("value", tsdate(ldsk));
			lnnosk = 0
			sk_value.set("value", "");
		});
		on(minus_sk, "click", function() {
			var lcdate = datesk.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldsk.getDate()-1;
			ldsk.setDate(lddate);}
			datesk.set("value", tsdate(ldsk));
			lnnosk = 0
			sk_value.set("value", "");
		});
		on(plus_sk, "click", function() {
			var lcdate = datesk.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldsk.getDate()+1;
			ldsk.setDate(lddate);}
			datesk.set("value", tsdate(ldsk));
			lnnosk = 0
			sk_value.set("value", "");
		});

		on(hrsk, "keyup", function() {
     		lnhrsk = hrsk.get("value");
     		if (lnhrsk > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrsk = lnhrsk.toString();
	     		var lnlength = lchrsk.length;
				if (lnlength == 2 || lchrsk > "2") {
					ldsk.setHours(lnhrsk);
					hrsk.set("value", pad(lchrsk, "00"));
					minsk.focus(true);
				}
				lnnosk = 0
				sk_value.set("value", "");
			}
		});
		on(minsk, "keyup", function() {
     		lnminsk = minsk.get("value");
     		if (lnminsk > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminsk = lnminsk.toString();
	     		var lnlength = lcminsk.length;
				if (lnlength == 2 || lcminsk > "6" || (lcminsk == "6" && lnlength == 1)){
					ldsk.setMinutes(lnminsk);
					minsk.set("value", pad(lcminsk, "00"));
					lnnosk = 0
					sk_value.set("value", "");
				}
			}
		});

		on(sk_list, "click", function() {
			var obj = selected_row("sk_list");
			sk_value.set("value", obj.label);
			lnnosk = obj.value;
			ldsk = "";
			datesk.set("value", "");
			hrsk.set("value", "");
			minsk.set("value", "");
			stemi2_list();
			menu6_sk.performTransition("stemi_menu6", -1, "slide", null);
		});
		
		on(btn_clear_sk, "click", function() {
			sk_value.set("value", "");
			lnnosk = 0;
		});
		
///////////////////////////////
//// menu6_refer    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var menu6_refer = reg.byId("menu6_refer");
		var back_refer = reg.byId("back_refer");
		var refer_value = reg.byId("refer_value")
		var btn_clear_refer = reg.byId("btn_clear_refer");
		var refer_list = reg.byId("refer_list");
		var refer_store = new ifws({data:{items:[]}});
		refer_list.store = null;
		refer_list.setStore(refer_store);
		var list_add = refer_list.store.newItem({label: "แผนก รพศ. ที่ส่งไป", header : true});
		var list_add = refer_list.store.newItem({label : "EMERGENCY ROOM", value : 1});
		var list_add = refer_list.store.newItem({label : "CORONARY CARE UNIT", value : 2});
		var list_add = refer_list.store.newItem({label : "CATHETER LABORATORY", value : 3});
		
		// refer date
		var minus_rf = reg.byId("minus_rf");
		var plus_rf = reg.byId("plus_rf");
		var daterf = reg.byId("daterf");
		var hrrf = reg.byId("hrrf");
		var minrf= reg.byId("minrf");
		
		//////////////////
		//// Events //////
		//////////////////
		on(back_refer, "click", function() {
			stemi3_list();
			menu6_refer.performTransition("stemi_menu6", -1, "slide", null);
		});
		on(daterf, "click", function() {
			var txt = daterf.get("value");
			if (txt == "" || txt == "-") {
				ldrf = new Date();}
			else {
				lreturn = confirm("ต้องการลบขัอมูลวันที่ ?");
				if (lreturn == true) {
					ldrf = "";
					hrrf.set("value", "");
					minrf.set("value", "");}
			}
			daterf.set("value", tsdate(ldrf));
			hrrf.focus(true);
		});
		
		on(minus_rf, "click", function() {
			var lcdate = daterf.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldrf.getDate()-1;
			ldrf.setDate(lddate);}
			daterf.set("value", tsdate(ldrf));
		});
		on(plus_rf, "click", function() {
			var lcdate = daterf.get("value");
			if (lcdate.trim() == "") {lddate = new Date();}
			else {lddate = ldrf.getDate()+1;
			ldrf.setDate(lddate);}
			daterf.set("value", tsdate(ldrf));
		});

		on(hrrf, "keyup", function() {
     		lnhrrf = hrrf.get("value");
     		if (lnhrrf > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchrrf = lnhrrf.toString();
	     		var lnlength = lchrrf.length;
				if (lnlength == 2 || lchrrf > "2") {
					ldrf.setHours(lnhrrf);
					hrrf.set("value", pad(lchrrf, "00"));
					minrf.focus(true);
				}
			}
		});
		on(minrf, "keyup", function() {
     		lnminrf = minrf.get("value");
     		if (lnminrf > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcminrf = lnminrf.toString();
	     		var lnlength = lcminrf.length;
				if (lnlength == 2 || lcminrf > "6" || (lcminrf == "6" && lnlength == 1)) {
					ldrf.setMinutes(lnminrf);
					minrf.set("value", pad(lcminrf, "00"));
					back_menu5.focus(true);
				}
			}
		});

		on(refer_list, "click", function() {
			var obj = selected_row("refer_list");
			refer_value.set("value", obj.label);
			lnreferto = obj.value;
		});
		
		on(btn_clear_refer, "click", function() {
			refer_value.set("value", "");
			lnreferto = 0;
		});
		
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////
//// stemi_menu6    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var stemi_menu6 = reg.byId("stemi_menu6");
		var back_menu6 = reg.byId("back_menu6");
		
		var stemi1 = reg.byId("stemi1");
		var stemi2 = reg.byId("stemi2");
		var stemi3 = reg.byId("stemi3");
		//////////////////
		//// Events //////
		//////////////////
		on(back_menu6, "click", function() {
			// ปรับข้อมูล is_stemi
			lcstm = sw_stemi.innerText;
			lnsearch = lcstm.search("YES");
			if (lnsearch > 0) {lnstemi = 1;}
			else {lnstemi = 0;}
			stemi1_list()
			stemi_menu6.performTransition("stemi_v2", -1, "slide", null);
		});
		
		on(stemi1, "click", function() {
			var csw = sw_status("stemi1", "sw_stemi");
			if (csw== "on") {
				lnstemi = 1; }
			else {
				lnstemi = 0;
				ldsk = "";
				lnnosk = 0;
				lnreferto = 1;
				datesk.set("value", "");
				hrsk.set("value", "");
				minsk.set("value", "");
				sk_value.set("value", "");
			}
			stemi2_list();
			stemi3_list();
		});
		
		on(stemi2, "click", function() {
			stemi_menu6.performTransition("menu6_sk", 1, "slide", null);
		});
		
		on(stemi3, "click", function() {
			stemi_menu6.performTransition("menu6_refer", 1, "slide", null);
		});
		//////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// result    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var result = reg.byId("result");
		var back_result = reg.byId("back_result");		
		var result_list = reg.byId("result_list");
		var result_title = reg.byId("result_title");
		//////////////////
		//// Events //////
		//////////////////
		on(result_title, "click", function() {
			// ปรับข้อมูล is_stemi
			var isback = back_result.get("focused");
			if (isback == true) {
				stemi1_list()
				result.performTransition("stemi_v2", -1, "slide", null);
			}
		});
		
		on(result_list, "click", function() {
			var cobj = selected_row("result_list");
			var lcsel = cobj.value;
			lcsource = "result";
			lcvartype = "C";
			lccode = "F";
			if (lcsel == "1" || lcsel == "2") {
				// diagnosis
				//// แสดง txt_list
				txt_title.set("label", "Definite Diagnosis");
				clearList("txt_list");
				var list_add = txt_list.store.newItem({label: "NSTEMI", value : "NSTEMI"});
				var list_add = txt_list.store.newItem({label: "STEMI", value : "STEMI"});
				var list_add = txt_list.store.newItem({label: "(ANTERIOR WALL)", value : "(ANTERIOR WALL)"});
				var list_add = txt_list.store.newItem({label: "(IFWMI)", value : "(IFWMI)"});
				var list_add = txt_list.store.newItem({label: "WITH CHF", value : "WITH CHF"});
				var list_add = txt_list.store.newItem({label: "WITH DM", value : "WITH DM"});
				var list_add = txt_list.store.newItem({label: "WITH POST ARREST", value : "WITH POST ARREST"});
				var list_add = txt_list.store.newItem({label: "WITH POST SK", value : "WITH POST SK"});
				var list_add = txt_list.store.newItem({label: "WITH SHOCK", value : "WITH SHOCK"});
				
				lcoldtxt = lcdiag;
				txt_return.set("value", lcoldtxt);
				lcfnc = "rs_list()";
				lcvar = "lcdiag";
				result.performTransition("txt_input", 1, "slide", null);
				
			} else if (lcsel == "3" || lcsel == "4") {
				// Treatment
				//// แสดง txt_list
				txt_title.set("label", "Treatments");
				clearList("txt_list");
				var list_add = txt_list.store.newItem({label: "AT KAD", value : "AT KAD"});
				var list_add = txt_list.store.newItem({label: "AT LM-LAD", value : "AT LM-LAD"});
				var list_add = txt_list.store.newItem({label: "AT MID LAD", value : "AT MID LAD"});
				var list_add = txt_list.store.newItem({label: "AT PROX LAD", value : "AT PROX LAD"});
				var list_add = txt_list.store.newItem({label: "AT RCA", value : "AT RCA"});
				var list_add = txt_list.store.newItem({label: "CCU", value : "CCU"});
				var list_add = txt_list.store.newItem({label: "CPR", value : "CPR"});
				var list_add = txt_list.store.newItem({label: "DOUBLE VESSELS DISEASE :", value : "DOUBLE VESSELS DISEASE :"});
				var list_add = txt_list.store.newItem({label: "ENOXA SC 1 DAY", value : "ENOXA SC 1 DAY"});
				var list_add = txt_list.store.newItem({label: "FAIL PPCI TO LCX", value : "FAIL PPCI TO LCX"});
				var list_add = txt_list.store.newItem({label: "IABP", value : "IABP"});
				var list_add = txt_list.store.newItem({label: "LAD MOD 70%", value : "LAD MOD 70%"});
				var list_add = txt_list.store.newItem({label: "LCX MID LCX", value : "LCX MID LCX"});
				var list_add = txt_list.store.newItem({label: "MILD STENOSIS AROUND 20%", value : "MILD STENOSIS AROUND 20%"});
				var list_add = txt_list.store.newItem({label: "MILD STENOSIS AROUND 30-40%", value : "MILD STENOSIS AROUND 30-40%"});
				var list_add = txt_list.store.newItem({label: "OCCLUSION AT DISTAL PART", value : "OCCLUSION AT DISTAL PART"});
				var list_add = txt_list.store.newItem({label: "PHARMACOINVASIVE PCI", value : "PHARMACOINVASIVE PCI"});
				var list_add = txt_list.store.newItem({label: "POBA TO LAD", value : "POBA TO LAD"});
				var list_add = txt_list.store.newItem({label: "PPCI", value : "PPCI"});
				var list_add = txt_list.store.newItem({label: "RCA MID RCA", value : "RCA MID RCA"});
				var list_add = txt_list.store.newItem({label: "RCA OCCLUSION 100%", value : "RCA OCCLUSION 100%"});	
				var list_add = txt_list.store.newItem({label: "SINGLE VESSEL DISEASE :", value : "SINGLE VESSEL DISEASE :"});
				var list_add = txt_list.store.newItem({label: "TROMBOLYTIC AGENT : SK", value : "TROMBOLYTIC AGENT : SK"});
				var list_add = txt_list.store.newItem({label: "WITH DES", value : "WITH DES"});

				lcoldtxt = lctreatment;
				txt_return.set("value", lcoldtxt);
				lcfnc = "rs_list()";
				lcvar = "lctreatment";
				result.performTransition("txt_input", 1, "slide", null);
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// report    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var report = reg.byId("report");
		var back_rpt = reg.byId("back_rpt");		
		var rpt_list = reg.byId("rpt_list");
		var rpt_title = reg.byId("rpt_title")
		//////////////////
		//// Events //////
		//////////////////
		on(rpt_title, "click", function() {
			var isback = back_rpt.get("focused");
			if (isback == true) {
				report.performTransition("stemi_v2", -1, "slide", null);
			}
		});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////
//// txt_input    ////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var txt_input = reg.byId("txt_input");
		var box_search = reg.byId("box_search");
		var txt_list = reg.byId("txt_list");
		var txt_return = reg.byId("txt_return");
		var back_txt = reg.byId("back_txt");
		var txt_title = reg.byId("txt_title");
		var txt_delete = reg.byId("txt_delete");

		//////////////////
		//// Events //////
		//////////////////
		on(txt_title, "click", function() {
			var isback = back_txt.get("focused");
			// Back
			if (isback == true) {
				box_search.set("value", "");
				txt_input.performTransition(lcsource, -1, "slide", null);
				if (lccode != "T") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(lcfnc);
			}
			// Delete
			var isdel = txt_delete.get("focused");
			if (isdel == true) {
				txt_return.set("value", "");
			}
		});
		
		on(box_search, "keyup", function() {
			lcsearchtext = box_search.get("value").trim().toUpperCase();
	    	txt_list.setQuery({label:lcsearchtext + "*"});
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
		});
		//////////////////
		///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// view_input   /////////////////
///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_input = reg.byId("view_input");
		var back_view_input = reg.byId("back_view_input");
		var view_input_title = reg.byId("view_input_title");
		var input1 = reg.byId("input1");
		var tb1 = reg.byId("tb1");
		var cancel1 = reg.byId("cancel1");
		var tb2 = reg.byId("tb2");
		var cancel2 = reg.byId("cancel2");
		var tb3 = reg.byId("tb3");
		var cancel3 = reg.byId("cancel3");
		var tb4 = reg.byId("tb4");
		var cancel4 = reg.byId("cancel4");
		var tb5 = reg.byId("tb5");
		var cancel5 = reg.byId("cancel5");
		var tb6 = reg.byId("tb6");
		var cancel6 = reg.byId("cancel6");
		
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view_input_title, "click", function() {
			lcbt = tb2.get("value");
			lcpr = tb3.get("value");
			lcrr = tb4.get("value");
			lcsyst = tb5.get("value");
			lcdias = tb6.get("value");
			er_list();
			back("back_view_input", "view_input", "stemi_menu1_1");
		});

		on(tb2, "keyup", function() {
			var ctxt = tb2.get("value");
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel2.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if (len1 == 2 && (ctxt.substr(0, 1) == "3" || ctxt.substr(0, 1) == "4")) {tb2.set("value", ctxt + ".");}
				if (len1 == 4 && ctxt.substr(3, 1) == ".") {
					tb2.set("value", ctxt.substr(0, 3));
					tb2.focus(true);}
				if (len1 == 4 && ctxt.substr(3, 1) != ".") {
					lcbt = ctxt;
					tb3.focus(true);
					// selectOnFocus
					var len2 = tb3.get("value").length;
					tb3.domNode.selectionStart = 0;
					tb3.domNode.selectionEnd = len2;
				}
			} else {
				cancel2.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel2, "click", function() {
			tb2.set("value", "");
			cancel2.domNode.style.backgroundImage = "none";
		});
		
		on(tb3, "keyup", function() {
			var ctxt = tb3.get("value").trim();
			lcpr = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel3.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 2) || len1 == 3) {
					lcpr = ctxt;
					tb4.focus(true);
					// selectOnFocus
					var len2 = tb4.get("value").length;
					tb4.domNode.selectionStart = 0;
					tb4.domNode.selectionEnd = len2;
				}
			} else {
				cancel3.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel3, "click", function() {
			tb3.set("value", "");
			cancel3.domNode.style.backgroundImage = "none";
		});
		
		on(tb4, "keyup", function() {
			var ctxt = tb4.get("value");
			lcrr = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel4.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 1) || len1 == 3) {
					lcrr = ctxt;
					tb5.focus(true);
					// selectOnFocus
					var len2 = tb5.get("value").length;
					tb5.domNode.selectionStart = 0;
					tb5.domNode.selectionEnd = len2;
				}
			} else {
				cancel4.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel4, "click", function() {
			tb4.set("value", "");
			cancel4.domNode.style.backgroundImage = "none";
		});
		
		on(tb5, "keyup", function() {
			var ctxt = tb5.get("value");
			lcsyst = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel5.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 3) || len1 == 3) {
					lcsyst = ctxt;
					tb6.focus(true);
					// selectOnFocus
					var len2 = tb6.get("value").length;
					tb6.domNode.selectionStart = 0;
					tb6.domNode.selectionEnd = len2;
				}
			} else {
				cancel5.domNode.style.backgroundImage = "none";
			}
		});
		on(cancel5, "click", function() {
			tb5.set("value", "");
			cancel5.domNode.style.backgroundImage = "none";
		});
		
		on(tb6, "keyup", function() {
			var ctxt = tb6.get("value");
			lcdias = ctxt;
			var len1 = ctxt.length;
			if (len1 > 0) {
				cancel6.domNode.style.backgroundImage = 'url("cross1.jpg")';
				if ((len1 == 2 && ctxt.substr(0, 1) > 2) || len1 == 3) {
					lcdias = ctxt;
					cancel1.focus(true);
				}
			} else {
				cancel6.domNode.style.backgroundImage = "none";
			}
		});

		on(cancel6, "click", function() {
			tb6.set("value", "");
			cancel6.domNode.style.backgroundImage = "none";
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
		calendar1.set("value", lddate0);
		
		var hr01 = reg.byId("hr01");
		var min01 = reg.byId("min01");

		var lchour = "";
		var lcmin = "";
		var lnhour = 0;
		var lnminute = 0;

		//////////////////
		//// Events //////
		//////////////////
		
		on(select_dt, "beforeTransitionIn", function() {
			calendar1.set("value", lddate0);
			lchour = lddate0.getHours().toString();
			hr01.set("value", pad(lchour, "00"));
			lcmin = lddate0.getMinutes().toString();
			min01.set("value", pad(lcmin, "00"));
		});
		
		on(select_dt_title, "click", function() {
			var isback = back_select_dt.get("focused");
			if (isback == true) {
				var cmacro = lcvar + " = lddate0";
				eval(cmacro);
				eval(gcfunction);
				select_dt.performTransition(gcsource_view, -1, "swirl", null);
			}
		});
		
		on(calendar1, "change", function() {
			lnhour = lddate0.getHours();
			lnminute = lddate0.getMinutes();
			lddate0 = calendar1.get("value");
			lddate0.setHours(lnhour);
			lddate0.setMinutes(lnminute);
		});
		
		on(hr01, "click", function() {
			hr01.domNode.selectionStart = 0;
			hr01.domNode.selectionEnd = 2;
		});
		
		on(min01, "click", function() {
			min01.domNode.selectionStart = 0;
			min01.domNode.selectionEnd = 2;
		});
		
		on(hr01, "keyup", function() {
     		lnhr1 = hr01.get("value");
     		if (lnhr1 > 23) {
     			alert ("ข้อมูลผิดพลาด !!!");}
			else {
				var lchr1 = lnhr1.toString();
	     		var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate0.setHours(lnhr1);
					hr01.set("value", pad(lchr1, "00"));
					min01.focus(true);
					min01.domNode.selectionStart = 0;
					min01.domNode.selectionEnd = 2;
				}
			}
		});
		
		on(min01, "keyup", function() {
     		lnmin1 = min01.get("value");
     		if (lnmin1 > 59) {
     			alert ("ข้อมูลผิดพลาด !!!");}
     		else {
	     		var lcmin1 = lnmin1.toString();
	     		var lnlength = lcmin1.length;
				if (lnlength == 2 || lcmin1 > "6" || lcmin1 == "6" && lnlength == 1) {
					lddate0.setMinutes(lnmin1);
					min01.set("value", pad(lcmin1, "00"));
					calendar1.focus(true);
				}
			}
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////
	});
});