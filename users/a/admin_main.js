// Public Variables
var lccid = "";
var lctown = "";
var lcname = "";
var lcsex = "";
var lcphone1 = "";
var lcstaff = "";
var lcstaffname = "";
var ln60 = 0;
var lcgroup = "";
var lnplus = 0;
var lcscore ="";
var lcorder = "";

function mydate(edate, withtime)
 {
 	var mday = edate.getDate();
 	var mmonth = edate.getMonth() + 1;
 	var myear = edate.getFullYear();
 	var nhour = edate.getHours();
 	var mhour = nhour.toString();
 	if(mhour.length == 1){mhour = "0" + mhour;}
 	var nmin = edate.getMinutes();
 	var mmin = nmin.toString();
 	if(mmin.length == 1){mmin = "0" + mmin;}
 	if (typeof(withtime) == 'undefined')
 	{
 	return myear.toString() + "." + mmonth.toString() + "." + mday.toString();
 	}
 	else
 	{
 	return myear.toString() + "." + mmonth.toString() + "." + mday.toString() + " " + mhour + ":" + mmin + " น.";
 	}
 }

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
		
		function roundrectdata(pcphp, pccontent, pclist, pclabel, pcvalue1, pcvalue2, pcvalue3, pcvalue4, pcvalue5, pcvalue6, pcvalue7, pcvalue8, pcvalue9, pcvalue10, pcvalue11, pcvalue12, pctext)
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
				var lcurl = ip_address + pcphp + "?" + pccontent;
				xhr.get({
					url: lcurl,
					headers: { "X-Requested-With": null },
					load: function(result_return0){
						//var result_return = result_return0.replace(/[\n\r]*/g,'').replace(/\(|\)/g, " ");
						var result_return = result_return0.replace(/[\n\r]*/g,'');
						myData_obj = eval("(" + result_return + ")");
						//if (pclist.trim() == "opd_patient") {info_opd.store = myData_obj;}
			       		var z;
			       		var n = myData_obj.items.length;
			       		if (n > 0) {
			       			// Clear Round Rect
							var old_member = listObj.getChildren();
							for (x=0; x<old_member.length; x++) {
								var old_item = old_member[x].label;
								listObj.store.fetch({query:{label: old_item}, onComplete: deleteList, queryOptions: {deep:true}});
							}
				    		for(z = 0; z < n; z++){
				        		var item = myData_obj.items[z];
				        		var newitem = eval(pclabel);
				        		var newvalue1 = eval(pcvalue1);
				        		var newvalue2 = eval(pcvalue2);
				        		var newvalue3 = eval(pcvalue3);
				        		var newvalue4 = eval(pcvalue4);
				        		var newvalue5 = eval(pcvalue5);
				        		var newvalue6 = eval(pcvalue6);
				        		var newvalue7 = eval(pcvalue7);
				        		var newvalue8 = eval(pcvalue8);
				        		var newvalue9 = eval(pcvalue9);
				        		var newvalue10 = eval(pcvalue10);
				        		var newvalue11 = eval(pcvalue11);
				        		var newvalue12 = eval(pcvalue12);
				        		if (typeof(pctext) != "undefined") {
				        			var list_add = listObj.store.newItem({label: newitem, value: newvalue1, value2: newvalue2, value3: newvalue3, value4: newvalue4, value5: newvalue5, value6: newvalue6, value7: newvalue7, value8: newvalue8, value9: newvalue9, value10: newvalue10, value11: newvalue11, value12: newvalue12, rightText: pctext});
				        		}
				        		else {
					    			var list_add = listObj.store.newItem({label: newitem, value: newvalue1, value2: newvalue2, value3: newvalue3, value4: newvalue4, value5: newvalue5, value6: newvalue6, value7: newvalue7, value8: newvalue8, value9: newvalue9, value10: newvalue10, value11: newvalue11, value12: newvalue12});
								}					    			
					    		listObj.store.save({onComplete: saveDone, onError: saveFailed});
				    		}
				    	}
				    	else {
				    		var nchk = pccontent.search("alpha");
				    		if (nchk >= 0) {	alert ("ไม่พบข้อมูล");}
				    		else {
				    			// Clear Round Rect
								var old_member = listObj.getChildren();
								for (x=0; x<old_member.length; x++) {
									var old_item = old_member[x].label;
									listObj.store.fetch({query:{label: old_item}, onComplete: deleteList, queryOptions: {deep:true}});
								}
				    		}
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
//// จบ UDF ///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

     var staff_v7 = reg.byId("staff_v7");
     var staff_v8 = reg.byId("staff_v8");
     var staff_v9 = reg.byId("staff_v9");
     var staff_v10 = reg.byId("staff_v10");
     var staff_v11 = reg.byId("staff_v11");
     var staff_v12 = reg.byId("staff_v12");
     var staff_v13 = reg.byId("staff_v13");
     var staff_v14 = reg.byId("staff_v14");
     var staff_v15 = reg.byId("staff_v15");
     
//// Back Button //////////////////////////////////////////
     var back_adl1 = reg.byId("back_adl1");
     var back_adl2 = reg.byId("back_adl2");
     var back_adl3 = reg.byId("back_adl3");
     var back_adl4 = reg.byId("back_adl4");
     var back_adl5 = reg.byId("back_adl5");
     var back_adl6 = reg.byId("back_adl6");
     var back_adl7 = reg.byId("back_adl7");
     var back_adl8 = reg.byId("back_adl8");
     var back_adl9 = reg.byId("back_adl9");
     var back_adl10 = reg.byId("back_adl10");
     
     on(back_adl1, "click", function() {
     	adl1.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl2, "click", function() {
     	adl2.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl3, "click", function() {
     	adl3.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl4, "click", function() {
     	adl4.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl5, "click", function() {
     	adl5.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl6, "click", function() {
     	adl6.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl7, "click", function() {
     	adl7.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl8, "click", function() {
     	adl8.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl9, "click", function() {
     	adl9.performTransition("staff_v15", -1, "slide", null);
     });
     on(back_adl10, "click", function() {
     	adl10.performTransition("staff_v15", -1, "slide", null);
     });
     
     var back_v7 = reg.byId("back_v7");
     on(back_v7, "click", function() {
     	staff_v7.performTransition("staff_v8", -1, "slide", null);
     });
     var back_v8 = reg.byId("back_v8");
     on(back_v8, "click", function() {
     	staff_v8.performTransition("staff_v9", -1, "slide", null);
     });
     var back_v12 = reg.byId("back_v12");
     on(back_v12, "click", function() {
     	staff_v12.performTransition("staff_v7", -1, "slide", null);
     });
     var back_v13 = reg.byId("back_v13");
     on(back_v13, "click", function() {
     	staff_v13.performTransition("staff_v10", -1, "slide", null);
     });
     var back_v14 = reg.byId("back_v14");
     on(back_v14, "click", function() {
     	staff_v14.performTransition("staff_v12", -1, "slide", null);
     });
     var back_v15 = reg.byId("back_v15");
     on(back_v15, "click", function() {
     	staff_v15.performTransition("staff_v14", -1, "slide", null);
     });
     var back_v11 = reg.byId("back_v11");
     on(back_v11, "click", function() {
     	staff_v11.performTransition("staff_v9", -1, "slide", null);
     });
     var back_p0 = reg.byId("back_p0");
     on(back_p0, "click", function() {
     	adl_plus.performTransition("staff_v15", -1, "slide", null);
     });
     
     var back_p1 = reg.byId("back_p1");
     var back_p2 = reg.byId("back_p2");
     var back_p3 = reg.byId("back_p3");
     var back_p4 = reg.byId("back_p4");
     var back_p5 = reg.byId("back_p5");
     var back_p6 = reg.byId("back_p6");
     
     on(back_p1, "click", function() {
     	adlp1.performTransition("adl_plus", -1, "slide", null);
     });
     on(back_p2, "click", function() {
     	adlp2.performTransition("adl_plus", -1, "slide", null);
     });
     on(back_p3, "click", function() {
     	adlp3.performTransition("adl_plus", -1, "slide", null);
     });
     on(back_p4, "click", function() {
     	adlp4.performTransition("adl_plus", -1, "slide", null);
     });
     on(back_p5, "click", function() {
     	adlp5.performTransition("adl_plus", -1, "slide", null);
     });
     on(back_p6, "click", function() {
     	adlp6.performTransition("adl_plus", -1, "slide", null);
     });
     
     var back_v10 = reg.byId("back_v10");
     on(back_v10, "click", function() {
     	staff_v10.performTransition("staff_v11", -1, "slide", null);
     });
     
     var back_pp = reg.byId("back_pp");
     on(back_pp, "click", function() {
     	pps_person.performTransition("staff_v13", -1, "slide", null);
     });
     
     var back_pm = reg.byId("back_pm");
     on(back_pm, "click", function() {
     	pps_main.performTransition("pps_person", -1, "slide", null);
     });
     
     var back_pp1 = reg.byId("back_pp1");
     on(back_pp1, "click", function() {
     	pps1.performTransition("pps_main", -1, "slide", null);
     });
     var back_pp2 = reg.byId("back_pp2");
     on(back_pp2, "click", function() {
     	pps2.performTransition("pps_main", -1, "slide", null);
     });
     var back_pp3 = reg.byId("back_pp3");
     on(back_pp3, "click", function() {
     	pps3.performTransition("pps_main", -1, "slide", null);
     });
     var back_pp4 = reg.byId("back_pp4");
     on(back_pp4, "click", function() {
     	pps4.performTransition("pps_main", -1, "slide", null);
     });
     var back_pp5 = reg.byId("back_pp5");
     on(back_pp5, "click", function() {
     	pps5.performTransition("pps_main", -1, "slide", null);
     });
	
///////////////////////////////////////////////////////////
     var btn_data = reg.byId("btn_data");
     var btn_fct = reg.byId("btn_fct");
     
//// กดปุ่ม pop_adl
		var pop_adl = reg.byId("pop_adl");
		on(pop_adl, "click", function() {
			pop_pps.set("checked", false);
			staff_v9.performTransition("staff_v8", 1, "slide", null);
		});
////

//// กดปุ่ม pop_pps
		var pop_pps = reg.byId("pop_pps");
		on(pop_pps, "click", function() {
			pop_adl.set("checked", false)
			staff_v9.performTransition("staff_v11", 1, "slide", null);
		});
////
     
		var pps_title = reg.byId("pps_title");
	
		var pps_case = reg.byId("pps_case");
		var pps100 = reg.byId("pps100");
		var pps90 = reg.byId("pps90");
		var pps80 = reg.byId("pps80");
		var pps70 = reg.byId("pps70");
		var pps60 = reg.byId("pps60");
		var pps50 = reg.byId("pps50");
		var pps40 = reg.byId("pps40");
		var pps30 = reg.byId("pps30");
		var pps20 = reg.byId("pps20");
		var pps10 = reg.byId("pps10");
		
		var p100 = reg.byId("p100");
		var p90 = reg.byId("p90");
		var p80 = reg.byId("p80");
		var p70 = reg.byId("p70");
		var p60 = reg.byId("p60");
		var p50 = reg.byId("p50");
		var p40 = reg.byId("p40");
		var p30 = reg.byId("p30");
		var p20 = reg.byId("p20");
		var p10 = reg.byId("p10");
		
		var ps100 = reg.byId("ps100");
		var ps90 = reg.byId("ps90");
		var ps80 = reg.byId("ps80");
		var ps70 = reg.byId("ps70");
		var ps60 = reg.byId("ps60");
		var ps50 = reg.byId("ps50");
		var ps40 = reg.byId("ps40");
		var ps30 = reg.byId("ps30");
		var ps20 = reg.byId("ps20");
		var ps10 = reg.byId("ps10");
		
	var tumbon_pps = reg.byId("tumbon_pps");
	var store_tpps = new ifws({data:{items:[]}});
	tumbon_pps.store = null;
	tumbon_pps.setStore(store_tpps);
    
    var old_total = reg.byId("old_total");
    var adl_visit = reg.byId("adl_visit");
    var pop_data = reg.byId("pop_data");
	var store_adldata = new ifws({data:{items:[]}});
	pop_data.store = null;
	pop_data.setStore(store_adldata);
	var data_new = roundrectdata("pop_data.php", "hn=0", "pop_data", "item.age_group + ' ปี (M=' + item.male + ' : F=' + item.female + ') # ' + item.total", "item.age_group");

//// กดปุ่ม Back จาก Admin กลับ Main Menu
		var back_admin = reg.byId("back_admin");
		on(back_admin, "click", function() {
			window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
		});
////
		
//// แสดง Graph
		xhr.get({
			url: ip_address + "pop_data.php",
			content: { hn: 0 },
			headers: { "X-Requested-With": null },
			load: function(result) {
				// กำจัด chr(10) chr(13)
			   	var json1 = result.replace(/[\n\r]*/g,'');
			   	var myData = eval("(" + json1 + ")");
			   	// ผล ADL แสดงเป็น Graph
			   	var item = myData.items;
			   	var item_list = [];
			   	var item_list1 = [];
			   	var item_list2 = [];

			   	var item_label = [];
			   	var item_cnt = item.length;
				for (i = 0; i < item_cnt; i++)
				{
					item_list[i] = parseFloat(item[i]["total"]);
					ln60 = ln60 + item_list[i];
					item_list1[i] = parseFloat(item[i]["male"]);
					item_list2[i] = parseFloat(item[i]["female"]);
					item_label[i] = item[i]["age_group"];
				}
				var age_graph = Chart(dom.byId("age_graph"));
				age_graph.destroy();
				var age_graph = Chart(dom.byId("age_graph")).
			        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true, labels: [
						{value: 1, text: "60-70"},
						{value: 2, text: "71-80"},
						{value: 3, text: "81-90"},
						{value: 4, text: "91-100"},
						{value: 5, text: "> 100"}
					]}).
			        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true  }).
			        addPlot("default", { type: Columns, gap: 20 }).
			        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
			        addSeries("Series A", item_list1, {stroke: {color: "blue", width: 1}}).
			        addSeries("Series B", item_list2, {stroke: {color: "red", width: 1}}).
			        render();
			    old_total.set("value", ln60);
			    
//// ADL Summary //////////////////////////////////////////
	    		xhr.get({
					url: ip_address + "adl_summary.php",
					headers: { "X-Requested-With": null },
					load: function(result1) 
						{
							var adl_result = result1.split(",");
							var lnvisit = parseFloat(adl_result[0]);
							var lncase = parseFloat(adl_result[1]);
							var lnavg = parseFloat(adl_result[2]);
							var lngr1 = parseFloat(adl_result[3]);
							var lngr2 = parseFloat(adl_result[4]);
							var lngr3 = parseFloat(adl_result[5]);
							var lngreen = parseFloat(adl_result[6]);
							var lnyellow = parseFloat(adl_result[7]);
							var lnred = parseFloat(adl_result[8]);
							adl_case.set("value", lncase);
							var lnpercent = (lncase*100/ln60).toFixed(2);
							adl_percent.set("value", lnpercent);
							adl_visit.set("value", lnvisit);
							group1.set("value", lngr1);
							group2.set("value", lngr2);
							group3.set("value", lngr3);
							percent1.set("value", (lngr1*100/lncase).toFixed(2));
							percent2.set("value", (lngr2*100/lncase).toFixed(2));
							percent3.set("value", (lngr3*100/lncase).toFixed(2));
							ngreen.set("value", lngreen);
							nyellow.set("value", lnyellow);
							nred.set("value", lnred);
							pgreen.set("value", (lngreen*100/lncase).toFixed(2));
							pyellow.set("value", (lnyellow*100/lncase).toFixed(2));
							pred.set("value", (lnred*100/lncase).toFixed(2));
						},
					error: function() {alert("Failed ADL Score !");}
				});

//// PPS Summary				
				pps100.set("value", "");
				pps90.set("value", "");
				pps80.set("value", "");
				pps70.set("value", "");
				pps60.set("value", "");
				pps50.set("value", "");
				pps40.set("value", "");
				pps30.set("value", "");
				pps20.set("value", "");
				pps10.set("value", "");
				
				p100.set("value", "");
				p90.set("value", "");
				p80.set("value", "");
				p70.set("value", "");
				p60.set("value", "");
				p50.set("value", "");
				p40.set("value", "");
				p30.set("value", "");
				p20.set("value", "");
				p10.set("value", "");
				
				xhr.get({
					url: ip_address + "pps_summary.php",
					headers: { "X-Requested-With": null },
					load: function(result) 
						{
							var pps_result = result.split(",");
							var lncase = parseFloat(pps_result[1]);
							pps_case.set("value", lncase);
							if (lncase > 0) {
								var lnlength = pps_result.length;
								for (s=2; s<lnlength; s++){
						   			var txt = pps_result[s].split("=");
						   			var lnumber = parseFloat(txt[1]);
						   			var lnpercent = (lnumber*100/lncase).toFixed(2);
						   			var txt1 = eval("pps" + txt[0].trim() + ".set('value'," + txt[1].trim() + ")");
						   			var txt2 = eval("p" + txt[0].trim() + ".set('value'," + lnpercent.toString() + ")");
						   		}
							}
						},
					error: function() {alert("Failed PPS Score !");}
				});
			 }
		});

///////////////////////////////////////////////////////////////////////////////////
		var adl_case = reg.byId("adl_case");
		var adl_percent = reg.byId("adl_percent");
		var group1 = reg.byId("group1");
		var group2 = reg.byId("group2");
		var group3 = reg.byId("group3");
		var percent1 = reg.byId("percent1");
		var percent2 = reg.byId("percent2");
		var percent3 = reg.byId("percent3");
		var ngreen = reg.byId("ngreen");
		var nyellow = reg.byId("nyellow");
		var nred = reg.byId("nred");
		var pgreen = reg.byId("pgreen");
		var pyellow = reg.byId("pyellow");
		var pred = reg.byId("pred");
		
		var g1 = reg.byId("g1");
		var g2 = reg.byId("g2");
		var g3 = reg.byId("g3");
		
		var adl_group = reg.byId("adl_group");
		var tumbon_group = reg.byId("tumbon_group");
		var store_tumbon = new ifws({data:{items:[]}});
		tumbon_group.store = null;
		tumbon_group.setStore(store_tumbon);
		
		on(g1, "click", function() {
			lcgroup = "1";
			lnplus = 0;
			adl_group.set("label", "รายการกลุ่มติดสังคม (>=12)");
			var new_score = roundrectdata("tumbon_adl.php", "adl_group=1", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 on(g2, "click", function() {
			lcgroup = "2";
			lnplus = 0;
			adl_group.set("label", "รายการกลุ่มติดบ้าน (5-11)");
			var new_score = roundrectdata("tumbon_adl.php", "adl_group=2", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 on(g3, "click", function() {
			lcgroup = "3";
			lnplus = 0;
			adl_group.set("label", "รายการกลุ่มติดเตียง (0-4)");
			var new_score = roundrectdata("tumbon_adl.php", "adl_group=3", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 
		var c1 = reg.byId("c1");
		var c2 = reg.byId("c2");
		var c3 = reg.byId("c3");
		
		on(c1, "click", function() {
			lcgroup = "1";
			lnplus = 1;
			adl_group.set("label", "รายการกลุ่มสีเขียว (>20)");
			var new_score = roundrectdata("tumbon_adlplus.php", "adl_group=1", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 on(c2, "click", function() {
			lcgroup = "2";
			lnplus = 1;
			adl_group.set("label", "รายการกลุ่มสีเหลือง (10-20)");
			var new_score = roundrectdata("tumbon_adlplus.php", "adl_group=2", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 on(c3, "click", function() {
			lcgroup = "3";
			lnplus = 1;
			adl_group.set("label", "รายการกลุ่มสีแดง (<10)");
			var new_score = roundrectdata("tumbon_adlplus.php", "adl_group=3", "tumbon_group", "item.hosp_name + '  # ' + item.amount + ' คน'", "item.hosp_id");
		   	staff_v8.performTransition("staff_v7", 1, "slide", null);
		 });
		 
//// เลือก ADL รายตำบล //////////////////////////////
		var pop_adl_title = reg.byId("pop_adl_title");
		var adl_pop = reg.byId("adl_pop");
		var store_adlpop = new ifws({data:{items:[]}});
		adl_pop.store = null;
		adl_pop.setStore(store_adlpop);
		
		on(tumbon_group, "click", function() {
			var all_list = tumbon_group.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break;}
		   	}
			lchosp = all_list[s].value;
			if (lnplus == 0) {
				var new_score = roundrectdata("tumbon_adl_pop.php", "adl_group=" + lcgroup + "&hosp_id=" + lchosp, "adl_pop", "item.fname + '  ' + item.lname + '  ADL=' + item.nadl", "item.cid", "item.fname", "item.lname");}
			else {
				var new_score = roundrectdata("tumbon_plus_pop.php", "adl_group=" + lcgroup + "&hosp_id=" + lchosp, "adl_pop", "item.fname + '  ' + item.lname + '  ADL=' + item.nadl", "item.cid", "item.fname", "item.lname");}
			staff_v7.performTransition("staff_v12", 1, "slide", null);
		});
//// เลือกชื่อคนในรายการ ADL
		var adl_series = reg.byId("adl_series");
		var store_aseries = new ifws({data:{items:[]}});
		adl_series.store = null;
		adl_series.setStore(store_aseries);
		on(adl_pop, "click", function() {
			var all_list = adl_pop.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break;}
		   	}
			lccid = all_list[s].value;
			lcname = all_list[s].value2 + "  " + all_list[s].value3;
			pop_adl_title.set("label", "ADL : " + lcname);
			var adl_new = roundrectdata("adl_cid.php", "cid=" + lccid , "adl_series", "item.cdate + '  --> ' + item.nadl + ' + ' + item.naddition + ' คะแนน'", "item.adl_date", "item.adl", "item.adl1", "item.house1_txt", "item.house3_txt", "item.cg_name", "item.cg_relate", "item.dv_name", "item.dv_need", "item.econ_pb", "item.comp_diag", "item.nadl");
			/// หาข้อมูล ADL
		  	xhr.get({
				url: ip_address + "adl_cid.php",
				content: { cid: lccid, ord: "1" },
				headers: { "X-Requested-With": null },
				load: function(result) {
					// กำจัด chr(10) chr(13)
				   	var json1 = result.replace(/[\n\r]*/g,'');
				   	var myData = eval("(" + json1 + ")");
				   	// ผล ADL แสดงเป็น Graph
				   	var item = myData.items;
				   	var item_list = [];
				   	var item_list2 = [];
				   	var item_list3 = [];
				   	var item_cnt = item.length;
					for (i = 0; i < item_cnt; i++)
					{
						item_list[i] = parseFloat(item[i]["nadl"]);
						item_list2[i] = parseFloat(item[i]["naddition"]);
						item_list3[i] = parseFloat(item[i]["ntotal"]);
					}
					var adl_chart = Chart(dom.byId("adl_chart"));
					adl_chart.destroy();
					var adl_chart = Chart(dom.byId("adl_chart")).
				        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true  }).
				        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
				        addPlot("default", { type: Lines }).
				        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
				        addSeries("Series A", item_list, {stroke: {color: "blue", width: 4}}).
				        addSeries("Series B", item_list2, {stroke: {color: "red", width: 4}}).
				        addSeries("Series C", item_list3, {stroke: {color: "black", width: 8}}).
				        render();
					// จบการแสดง Graph
				},
				error: function() {
					alert("Failed ADL Graph !");
				}				
		  	});
			///////////////////////////////////////////////////////
		    staff_v12.performTransition("staff_v14", 1, "slide", null);
		 });
		 
		var adl_detail = reg.byId("adl_detail");
		var store_adetail = new ifws({data:{items:[]}});
		adl_detail.store = null;
		adl_detail.setStore(store_adetail);
		var adl_score = reg.byId("adl_score");
		 
		 on(adl_series, "click", function() {
		 	clearList("adl_detail", "store_adetail");
			var all_list = adl_series.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break;}
		   	}
		 
			lcscore = all_list[s].value2;
			//// แสดงคะแนน ADL เดิม
			lclabel = all_list[s].value12;
			lcscore1 = lcscore.substr(0, 1);
			var list_add = adl_detail.store.newItem({label: "Feeding = " + lcscore1, value : lcscore1, value1 : "1"});
			lcscore2 = lcscore.substr(1, 1);
			var list_add = adl_detail.store.newItem({label: "Grooming = " + lcscore2, value : lcscore2, value1 : "2"});
			lcscore3 = lcscore.substr(2, 1);
			var list_add = adl_detail.store.newItem({label: "Transfer = " + lcscore3, value : lcscore3, value1 : "3"});;
			lcscore4 = lcscore.substr(3, 1);
			var list_add = adl_detail.store.newItem({label: "Toilet Use = " + lcscore4, value : lcscore4, value1 : "4"});
			lcscore5 = lcscore.substr(4, 1);
			var list_add = adl_detail.store.newItem({label: "Mobility = " + lcscore5, value : lcscore5, value1 : "5"});
			lcscore6 = lcscore.substr(5, 1);
			var list_add = adl_detail.store.newItem({label: "Dressing = " + lcscore6, value : lcscore6, value1 : "6"});;
			lcscore7 = lcscore.substr(6, 1);
			var list_add = adl_detail.store.newItem({label: "Stairs = " + lcscore7, value : lcscore7, value1 : "7"});;
			lcscore8 = lcscore.substr(7, 1);
			var list_add = adl_detail.store.newItem({label: "Bathing = " + lcscore8, value : lcscore8, value1 : "8"});
			lcscore9 = lcscore.substr(8, 1);
			var list_add = adl_detail.store.newItem({label: "Bowels = " + lcscore9, value : lcscore9, value1 : "9"});
			lcscore10 = lcscore.substr(9, 1);
			var list_add = adl_detail.store.newItem({label: "Bladder = " + lcscore10, value : lcscore10, value1 : "10"});;
			
			adl_detail.store.save();
			adl_score.set("label", "รายละเอียด ADL = " + lclabel + " คะแนน");
			
			
			lctitle0 = all_list[s].label;
			lctitle1 = lctitle0.split("+");
			lctitle = lctitle1[1];
			lcscorep = all_list[s].value3;
			//// แสดงคะแนน ADL Plus เดิม
			lcscorep1 = lcscorep.substr(0, 1);
			var list_add = adlp_detail.store.newItem({label: "สภาพบ้าน = " + lcscorep1, value : lcscorep1, value1 : "1"});
			lcscorep2 = lcscorep.substr(1, 1);
			var list_add = adlp_detail.store.newItem({label: "ผู้ดูแล = " + lcscorep2, value : lcscorep2, value1 : "2"});
			lcscorep3 = lcscorep.substr(2, 1);
			var list_add = adlp_detail.store.newItem({label: "การเข้าถึงบริการ = " + lcscorep3, value : lcscorep3, value1 : "3"});;
			lcscorep4 = lcscorep.substr(3, 1);
			var list_add = adlp_detail.store.newItem({label: "อุปกรณ์ = " + lcscorep4, value : lcscorep4, value1 : "4"});
			lcscorep5 = lcscorep.substr(4, 1);
			var list_add = adlp_detail.store.newItem({label: "เศรษฐกิจ = " + lcscorep5, value : lcscorep5, value1 : "5"});
			lcscorep6 = lcscorep.substr(5, 1);
			var list_add = adlp_detail.store.newItem({label: "โรคประจำตัว = " + lcscorep6, value : lcscorep6, value1 : "6"});;
			
			adlp_detail.store.save();
			adlp_score.set("label", "เศรษฐกิจสังคม =" + lctitle);
			
			staff_v14.performTransition("staff_v15", 1, "slide", null);
		});
		
		//// กดดูรายละเอียดคะแนนแต่ละข้อ
		var adl1 = reg.byId("adl1");
		var adl1_0 = reg.byId("adl1_0");
		var adl1_1 = reg.byId("adl1_1");
		var adl1_2 = reg.byId("adl1_2");
		
		var adl2 = reg.byId("adl2");
		var adl2_0 = reg.byId("adl2_0");
		var adl2_1 = reg.byId("adl2_1");
		
		var adl3 = reg.byId("adl3");
		var adl3_0 = reg.byId("adl3_0");
		var adl3_1 = reg.byId("adl3_1");
		var adl3_2 = reg.byId("adl3_2");
		var adl3_3 = reg.byId("adl3_3");
		
		var adl4 = reg.byId("adl4");
		var adl4_0 = reg.byId("adl4_0");
		var adl4_1 = reg.byId("adl4_1");
		var adl4_2 = reg.byId("adl4_2");
		
		var adl5 = reg.byId("adl5");
		var adl5_0 = reg.byId("adl5_0");
		var adl5_1 = reg.byId("adl5_1");
		var adl5_2 = reg.byId("adl5_2");
		var adl5_3 = reg.byId("adl5_3");
		
		var adl6 = reg.byId("adl6");
		var adl6_0 = reg.byId("adl6_0");
		var adl6_1 = reg.byId("adl6_1");
		var adl6_2 = reg.byId("adl6_2");
		
		var adl7 = reg.byId("adl7");
		var adl7_0 = reg.byId("adl7_0");
		var adl7_1 = reg.byId("adl7_1");
		var adl7_2 = reg.byId("adl7_2");
		
		var adl8 = reg.byId("adl8");
		var adl8_0 = reg.byId("adl8_0");
		var adl8_1 = reg.byId("adl8_1");
		
		var adl9 = reg.byId("adl9");
		var adl9_0 = reg.byId("adl9_0");
		var adl9_1 = reg.byId("adl9_1");
		var adl9_2 = reg.byId("adl9_2");
		
		var adl10 = reg.byId("adl10");
		var adl10_0 = reg.byId("adl10_0");
		var adl10_1 = reg.byId("adl10_1");
		var adl10_2 = reg.byId("adl10_2");
		
		on(adl_detail, "click", function() {
			//// Clear คะแนนทุกข้อ
			adl1_0.set("checked", false);
			adl1_1.set("checked", false);
			adl1_2.set("checked", false);
			
			adl2_0.set("checked", false);
			adl2_1.set("checked", false);
			
			adl3_0.set("checked", false);
			adl3_1.set("checked", false);
			adl3_2.set("checked", false);
			adl3_3.set("checked", false);
			
			adl4_0.set("checked", false);
			adl4_1.set("checked", false);
			adl4_2.set("checked", false);
			
			adl5_0.set("checked", false);
			adl5_1.set("checked", false);
			adl5_2.set("checked", false);
			adl5_3.set("checked", false);
			
			adl6_0.set("checked", false);
			adl6_1.set("checked", false);
			adl6_2.set("checked", false);
			
			adl7_0.set("checked", false);
			adl7_1.set("checked", false);
			adl7_2.set("checked", false);
			
			adl8_0.set("checked", false);
			adl8_1.set("checked", false);
			
			adl9_0.set("checked", false);
			adl9_1.set("checked", false);
			adl9_2.set("checked", false);
			
			adl10_0.set("checked", false);
			adl10_1.set("checked", false);
			adl10_2.set("checked", false);
			
			//// ระบุรายการที่เลือก
			lcorder = "";
			lcscore = "";
			var all_list = adl_detail.getChildren();
			var sx = 0;
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){
					sx = s;}
		   	}
			lcscore = all_list[sx].value;
			lcorder = all_list[sx].value1;
			//// แสดงรายละเอียด ADL รายข้อ
			var lcpage = "adl" + lcorder;
			var lcbutton = "adl" + lcorder + "_" + lcscore;
			var lcmacro = lcbutton + '.set("checked", true)';
			eval(lcmacro);
			staff_v15.performTransition(lcpage, 1, "slide", null);
		});
		
		var adl_plus = reg.byId("adl_plus");
		var btn_plus = reg.byId("btn_plus");
		var adlp_detail = reg.byId("adlp_detail");
		var store_apdetail = new ifws({data:{items:[]}});
		adlp_detail.store = null;
		adlp_detail.setStore(store_apdetail);
		var adlp_score = reg.byId("adlp_score");
		
		on(btn_plus, "click", function() {
		   staff_v15.performTransition("adl_plus", 1, "slide", null);
		 });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		 
//// กดปุ่มดูรายละเอียด PPS รายตำบล
		on(ps100, "click", function() {
			lcscore = "100";
			pps_title.set("label", "รายการคะแนน PPS = 100%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		on(ps90, "click", function() {
			lcscore = "90";
			pps_title.set("label", "รายการคะแนน PPS = 90%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps80, "click", function() {
			lcscore = "80";
			pps_title.set("label", "รายการคะแนน PPS = 80%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps70, "click", function() {
			lcscore = "70";
			pps_title.set("label", "รายการคะแนน PPS = 70%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps60, "click", function() {
			lcscore = "60";
			pps_title.set("label", "รายการคะแนน PPS = 60%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps50, "click", function() {
			lcscore = "50";
			pps_title.set("label", "รายการคะแนน PPS = 50%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps40, "click", function() {
			lcscore = "40";
			pps_title.set("label", "รายการคะแนน PPS = 40%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps60, "click", function() {
			lcscore = "60";
			pps_title.set("label", "รายการคะแนน PPS = 60%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps30, "click", function() {
			lcscore = "30";
			pps_title.set("label", "รายการคะแนน PPS = 30%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 on(ps20, "click", function() {
			lcscore = "20";
			pps_title.set("label", "รายการคะแนน PPS = 20%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		on(ps10, "click", function() {
			lcscore = "10";
			pps_title.set("label", "รายการคะแนน PPS = 10%");
			var new_score = roundrectdata("tumbon_pps.php", "score=" + lcscore, "tumbon_pps", "item.hosp_name + ' # ' + item.amount", "item.hosp_id");
		   staff_v11.performTransition("staff_v10", 1, "slide", null);
		 });
		 
//// เลือก PPS รายตำบล //////////////////////////////
		var pps_pop = reg.byId("pps_pop");
		var store_ppspop = new ifws({data:{items:[]}});
		pps_pop.store = null;
		pps_pop.setStore(store_ppspop);
		
		on(tumbon_pps, "click", function() {
			var all_list = tumbon_pps.getChildren();
	    	for (s=0; s<all_list.length; s++){
		   		if (all_list[s].focused == true){ break;}
		   	}
			lchosp = all_list[s].value2;
			var new_score = roundrectdata("tumbon_pps_pop.php", "score=" + lcscore + "&hosp_id=" + lchosp, "pps_pop", "item.fname + '  ' + item.lname + '  PPS=' + item.npps + '%'", "item.cid");
			staff_v10.performTransition("staff_v13", 1, "slide", null);
		});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
	});
});