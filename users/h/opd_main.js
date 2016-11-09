// กำหนดตัวยแปร ผู้ป่วยใน
var lcwardno = "";
var lcvisit = "";
var lchnumber = "";
var lcanumber = "";
var lcptfname = "";
var lcptlname = "";
var lcbirth = "";
var lcadr = "";
var lcampur = "";
var lcprovince = "";
var lczip = "";
var lctel = "";
var lnheight = 0;

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
	"dojox/charting/plot2d/Grid",
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(popup, mitem, menu, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Grid, xhr){
		ready(function(){
		var info_opd = new ifws({data:{items:[]}});

//// User defined Function
		
		function roundrectdata(pcphp, pccontent, pclist, pclabel, pcvalue1, pcvalue2, pcvalue3, pcvalue4, pcvalue5, pcvalue6)
			{
				var listObj = reg.byId(pclist);
				// แจ้งผลการนำข้อมูลเข้า Store
				function saveDone(){}
				function saveFailed(){alert("Save failed.");}
				// Clear ข้อมูลใน List			
				function deleteList(items, request){
			    	if(items ){
			       		var del;
						for(del = 0; del < items.length; del++){
				   			var item = items[del];
							listObj.store.deleteItem(item);
				   			listObj.store.save();
			    		}
			    	}
		   		}
		   					
		   		// Clear Round Rect
				var old_member = listObj.getChildren();
				for (x=0; x<old_member.length; x++) {
					var old_item = old_member[x].label;
					listObj.store.fetch({query:{label: old_item}, onComplete: deleteList, queryOptions: {deep:true}});
				}
						
				var lcurl = ip_address + pcphp + "?" + pccontent;
				xhr.get({
					url: lcurl,
					headers: { "X-Requested-With": null },
					load: function(result_return0){
						//var result_return = result_return0.replace(/[\n\r]*/g,'').replace(/\(|\)/g, " ");
						var result_return = result_return0.replace(/[\n\r]*/g,'');
						myData_obj = eval("(" + result_return + ")");
						if (pclist.trim() == "opd_patient") {info_opd.store = myData_obj;}
			       		var z;
			       		var n = myData_obj.items.length;
			    		for(z = 0; z < n; z++){
			        		var item = myData_obj.items[z];
			        		var newitem = eval(pclabel);
			        		var newvalue1 = eval(pcvalue1);
			        		var newvalue2 = eval(pcvalue2);
			        		var newvalue3 = eval(pcvalue3);
			        		var newvalue4 = eval(pcvalue4);
			        		var newvalue5 = eval(pcvalue5);
			        		var newvalue6 = eval(pcvalue6);
				    		var list_add = listObj.store.newItem({label: newitem, value: newvalue1, value2: newvalue2, value3: newvalue3, value4: newvalue4, value5: newvalue5, value6: newvalue6});
				    		listObj.store.save({onComplete: saveDone, onError: saveFailed});
			    		}
					},
					error: function() {alert("Failed " + pcphp + " !");}
				});
			}
			////
			function clearList(pcObject, pcStore)
			{
				function deleteFromList(items, request){
			    	if(items ){
			       		var del;
						for(del = 0; del < items.length; del++){
				   			var item = items[del];
							active_list.store.deleteItem(item);
				   			active_list.store.save();
			    		}
			    	}
		   		}
				var active_list = reg.byId(pcObject);
				var all_list = active_list.getChildren();
			    var list_selected = '';
			    for (nlist=0; nlist<all_list.length; nlist++){
		   			list_selected = all_list[nlist].value;
           			eval(pcStore + ".fetch({query:{value: list_selected}, onComplete: deleteFromList, queryOptions: {deep:true}});");
	           	}
			}
			
			 //// Delete Item จาก RoundRectDataList ต้องระบุ obj_name ก่อนใช้ function
			function deleteOneItem(items, request){
        			if(items ){
     	        		var i;
    				for(i = 0; i < items.length; i++){
    	        			var item = items[i];
    	        			var obj = reg.byId(obj_name);
    	        			obj.store.deleteItem(item);
    	        			obj.store.save();
           				}
            		}
       		}

//// จบ User Defined Function
			
//// กำหนดค่าการทำงาน
			var body_temp = reg.byId("body_temp");
			var pulse_rate = reg.byId("pulse_rate");
			var resp_rate = reg.byId("resp_rate");
			var bp_syst = reg.byId("bp_syst");
			var bp_dias = reg.byId("bp_dias");
			var weight = reg.byId("weight");
			var height = reg.byId("height");
			var waist = reg.byId("waist");
			var bt1 = reg.byId("bt1");
			var bt2 = reg.byId("bt2");
			var pr = reg.byId("pr");
			var rr = reg.byId("rr");
			var bps = reg.byId("bps");
			var bpd = reg.byId("bpd");
			var wt1 = reg.byId("wt1");
			var wt2 = reg.byId("wt2");
			var ht = reg.byId("ht");
			var wst = reg.byId("wst");

//// เลือกผู้ป่วย ////////////////////////////////////////////////////////////////////////
			// OPD Patient
     		var opt_sex = reg.byId("opt_sex");
			var opt_info = reg.byId("opt_info");
			var opt_hn = reg.byId("opt_hn");
			var opt_age = reg.byId("opt_age");

			var vsign_save = reg.byId("vsign_save");
			
     		var opd_patient = reg.byId("opd_patient");
     		var store_opd = new ifws({data:{items:[]}});
			opd_patient.store = null;
			opd_patient.setStore(store_opd);
			var get_opd = roundrectdata("opd_patient.php", "hn=0", "opd_patient", "item.reg_datetime.substr(11, 5) + '  #  ' + item.patient", "item.visit_id");

			on(opd_patient, "click", function() {
				vsign_save.set("disabled", false);
		     	var patients = opd_patient.getChildren();
			    var patient_id = "";
			    var a = 0;
		    	for (a=0; a<patients.length; a++){
			   		if (patients[a].checked == true) {break}
				}
		   		patient_id = patients[a].value;
	   			patient_info = patients[a].label;
	   			var fullname = patient_info.split(" ");
	   			lcptfname = fullname[4];
	   			lcptlname = fullname[6];
	   			opt_info.set("value", lcptfname + "  " + lcptlname);
	   			var sex0 = info_opd.store.items[a].sex;
	   			if (sex0 == "1") {var sex1 = "ชาย";}
	   			else {var sex1 = "หญิง";}
	   			opt_sex.set("value", sex1);
	   			lchnumber = info_opd.store.items[a].hn;
	   			opt_hn.set("value", "HN : " + lchnumber);
	   			var birth0 = info_opd.store.items[a].birthdate;
	   			lcbirth = JSON.stringify(birth0).substr(1, 10);
	   			var lcage = getAge(lcbirth, "");
	   			opt_age.set("value", lcage);
	   			lcvisit = info_opd.store.items[a].visit_id;
	   			var lcheight = info_opd.store.items[a].height;
	   			if (lcheight >"0") {height.set("value", lcheight);}
	   			else {height.set("value", "");}
			});
////////////////////////////////////////////////////////////////////////////////////
//// Body Temperature /////////////////////////////////////////////////////////////
		on(bt2, "click", function() {
			var t1 = bt1.get("value");
			var t2 = bt2.get("value");
			body_temp.set("value", t1+"."+t2);
		});
		on(bt1, "click", function() {
			var t1 = bt1.get("value");
			var t2 = bt2.get("value");
			body_temp.set("value", t1+"."+t2);
		});
///////////////////////////////////////////////////////////////////////////////////

//// Body Weight /////////////////////////////////////////////////////////////
		on(wt1, "click", function() {
			var w1 = wt1.get("value");
			var w2 = wt2.get("value");
			weight.set("value", w1+"."+w2);
		});
		on(wt2, "click", function() {
			var w1 = wt1.get("value");
			var w2 = wt2.get("value");
			weight.set("value", w1+"."+w2);
		});
///////////////////////////////////////////////////////////////////////////////////

//// Height /////////////////////////////////////////////////////////////
		on(ht, "click", function() {
			var ht1 = ht.get("value");
			height.set("value", ht1);
		});
///////////////////////////////////////////////////////////////////////////////////

//// Waist /////////////////////////////////////////////////////////////
		on(wst, "click", function() {
			var wst1 = wst.get("value");
			waist.set("value", wst1);
		});
///////////////////////////////////////////////////////////////////////////////////
//// Blood Pressure /////////////////////////////////////////////////////////////
		on(bps, "click", function() {
			var bp1 = bps.get("value");
			bp_syst.set("value",bp1);
		});
		on(bpd, "click", function() {
			var bp2 = bpd.get("value");
			bp_dias.set("value",bp2);
		});
///////////////////////////////////////////////////////////////////////////////////
//// Pulse Rate /////////////////////////////////////////////////////////////
		on(pr, "click", function() {
			var p_rate = pr.get("value");
			pulse_rate.set("value", p_rate);
		});
///////////////////////////////////////////////////////////////////////////////////
//// Respiratory Rate /////////////////////////////////////////////////////////////
		on(rr, "click", function() {
			var r_rate = rr.get("value");
			resp_rate.set("value", r_rate);
		});
///////////////////////////////////////////////////////////////////////////////////
//// บันทึกข้อมูล /////////////////////////////////////////////////////////////////////
			on(vsign_save, "click", function() {
				var lct = body_temp.get("value");
				var lcp = pulse_rate.get("value");
				var lcr = resp_rate.get("value");
				var lcsbp =bp_syst.get("value");
				var lcdbp = bp_dias.get("value");
				var lcwt = weight.get("value");
				var lch = height.get("value");
				var lcwc = waist.get("value");
				//alert (lcvisit + "T" + lct + "P" + lcp + "R" + lcr + "BP" + lcsbp + "/" + lcdbp + "Wt" + lcwt + "Ht" + lch + "Wc" + lcwc);
				//// Save mySQL
				xhr.get({
					url: ip_address + "vital_sign.php",
					content: {staff_id: gcstaff, visit_id: lcvisit, body_temp: lct, pulse_rate: lcp, resp_rate: lcr, bp_syst: lcsbp, bp_dias: lcdbp, weight: lcwt, height: lch, waist: lcwc },
					headers: { "X-Requested-With": null },
					load: function(result) 
						{
							var get_opd = roundrectdata("opd_patient.php", "hn=0", "opd_patient", "item.reg_datetime.substr(11, 5) + '  #  ' + item.patient", "item.visit_id");
						},
					error: function() {alert("Failed Vital Sign !");}
				});
				
				//// Clear Vital Signs เดิม
				body_temp.set("value", "");
				pulse_rate.set("value", "");
				resp_rate.set("value", "");
				bp_syst.set("value", "");
				bp_dias.set("value", "");
				weight.set("value", "");
				height.set("value", "");
				waist.set("value", "");
				vsign_save.set("checked", false);
				vsign_save.set("disabled", true);
				
				//// Clear รายชื่อผู้ป่วย
				opt_info.set("value", "");
				opt_sex.set("value", "");
				opt_age.set("value", "");
				opt_hn.set("value", "");
			});
			
//// Refresh ข้อมูลผู้ป่วย //////////////////////////////////////////////////////////////
			var opd_refresh = reg.byId("opd_refresh");
			on(opd_refresh, "click", function() {
				var get_opd = roundrectdata("opd_patient.php", "hn=0", "opd_patient", "item.reg_datetime.substr(11, 5) + '  #  ' + item.patient", "item.visit_id");
				opd_refresh.set("checked", false);
				//// Clear Vital Signs เดิม
				body_temp.set("value", "");
				pulse_rate.set("value", "");
				resp_rate.set("value", "");
				bp_syst.set("value", "");
				bp_dias.set("value", "");
				weight.set("value", "");
				height.set("value", "");
				waist.set("value", "");
				vsign_save.set("checked", false);
				vsign_save.set("disabled", true);
				
				//// Clear รายชื่อผู้ป่วย
				opt_info.set("value", "");
				opt_sex.set("value", "");
				opt_age.set("value", "");
				opt_hn.set("value", "");
			});

//// ลงทะเบียนตรวจผู้ป่วย //////////////////////////////////////////////////////////////
			var hn_reg = reg.byId("hn_reg");
			var btn_reg = reg.byId("btn_reg");
			on(btn_reg, "click", function() {
				//// ตรวจสอบชื่อ-นามสกุล และการลงทะเบียนตรวจผู้ป่วย รวมทั้งการนัด
				var hnumber = hn_reg.get("value")
				xhr.get({
					url: ip_address + "hn_reg_chk.php",
					content: {hn: hnumber },
					headers: { "X-Requested-With": null },
					load: function(result) {
						var nresult = result.length;
						if (nresult == 0) {
							alert ("ไม่พบ HN : " + hnumber + " กรุณาตรวจสอบ !!!");
							hn_reg.set("value", "");
						}
						else {
							var creturn = result.split(",");
							var fullname = creturn[0];
							var lchn = creturn[1];
							var lcinscl = creturn[2];
							lnheight = creturn[3];
							lcvisit = creturn[4];
							var ncheck = creturn[4].length;
							if (ncheck == 6) {alert ("คุณ" + fullname + " มีนัดพบแพทย์วันนี้ กรุณาส่งลงทะเบียนที่ห้องบัตร ...");}
							else if (ncheck == 10) {
								lctime = creturn[5].substr(0, 5);
								alert ("คุณ" + fullname + " ลงทะเบียนตรวจวันนี้แล้วเมื่อ " + lctime + " น. กรุณาตรวจสอบ ...");
								}
							else {
								var r = confirm("ต้องการลงทะเบียนตรวจ คุณ" + fullname + " HN " + lchn + " แผนกตรวจโรคทั่วไป ?");
								if (r == true) {
									xhr.get({
										url: ip_address + "hn_reg.php",
										content: {staff_id: gcstaff, hn: lchn, inscl: lcinscl, height: lnheight },
										headers: { "X-Requested-With": null },
										load: function() 
											{
												var get_opd = roundrectdata("opd_patient.php", "hn=0", "opd_patient", "item.reg_datetime.substr(11, 5) + '  #  ' + item.patient", "item.visit_id");
											},
										error: function() {alert("Failed Register!");}
									});
								}
							}
						}
					},
					error: function() {alert("Failed Vital Sign !");}
				});
				btn_reg.set("checked", false);
				hn_reg.set("value", "");
			});
			
////////////////////////////////////////////////////////////////////////////////////
    	});
	});