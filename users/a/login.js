// Login

require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/on",
 	"dojo/_base/xhr" // use xhr to make ajax call to remote server
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
 ], function(ready, reg, on, xhr){
		ready(function(){
			//// กดปุ่ม FCT ////////////////////////////////////////////////////////////////////////////////////////////////////////
			var welcome = reg.byId("welcome");
			var user_id = reg.byId("user_id");
			var password = reg.byId("password");
			var btn_login = reg.byId("btn_login");
			var btn_admin = reg.byId("btn_admin");
			var btn_pop = reg.byId("btn_pop");
			var btn_fct = reg.byId("btn_fct");
			var pop_search = reg.byId("pop_search");
			var hosp_id = reg.byId("hosp_id");
			var hosp_name = reg.byId("hosp_name");
			var btn_hosp = reg.byId("btn_hosp");
			
			on(btn_login, "click", function() {
				var log_status = btn_fct.get("disabled");
				if (log_status == true) {
					gcstaff = user_id.get("value");
					var psw_input = password.get("value");
					var psw0 = psw_input.toUpperCase();
					xhr.get({
						url: ip_address + "staff_search.php",
						content: {staff_id: gcstaff},
						headers: { "X-Requested-With": null },
						load: function(result) 
							{
								// ตรวจสอบ Password จากตาราง staff
								var staff = result.split(",");
								gcstaffid = staff[2];
								lcstaffcid = staff[3];
								var psw_ok = staff[1];
								var lnadmin = staff[4];
								var lchosp = staff[5];
					    		var pnumber = parseInt(psw_ok.substr(0, 1));
					    		var lnLength = psw_ok.length;
					    		var psw = '';
					    		for (lnCnt = 1;  lnCnt <= lnLength -1; lnCnt++)
									{psw = psw + String.fromCharCode(psw_ok.charCodeAt(lnCnt) - 17 - pnumber - lnCnt - 1);}
					    		if (psw == psw0) {
									welcome.set("value", "ยินดีต้อนรับ คุณ" + staff[0].trim() + "\nสู่ระบบ mBase for Mobile");
									user_id.set("value", "");
									password.set("value", "");
									btn_fct.set("disabled", false);
									btn_login.set("label", "Log Out");
									pop_search.set("disabled", false);
									hosp_id.set("value", lchosp);
									//// ระบุเครือข่าย
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
									////
									if (lnadmin == 1) {
										btn_admin.set("disabled", false);
									}
					    		}
					    		else {
					    			welcome.set("value", "รหัสผ่านไม่ถูกต้อง!!! \nไม่สามารถเข้าระบบได้ ...");
					    		}
							},
						error: function() {}
					});
				}
				else {
						btn_login.set("label", "Log In");
						btn_fct.set("disabled", true);
						pop_search.set("disabled", true);
						user_id.set("value", "");
						password.set("value", "");
						btn_admin.set("disabled", true);
						welcome.set("value", "กรุณากรอก User ID และ Password");
				}
			});
///////////////////////////////////////////////////////////////////////////////////
    	});
	});