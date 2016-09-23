/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/dom",
 	"dojo/on"
], function(ready, reg, dom, on){
     ready(function(){
         // logic that requires that Dojo is fully initialized should go here
		var menu_pop = reg.byId("menu_pop");
		var menu_staff = dom.byId("menu_staff");
		var menu_admin = dom.byId("menu_admin");
		
		on(menu_pop, "click", function() {			
			var val = menu_pop.get("checked");
			if (val == true) {
				menu_staff.set("checked", false);
				menu_admin.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/person.html";
			}
		});
		
		on(menu_staff, "click", function() {
			var val = menu_staff.get("checked");
			if (val == true) {
				menu_pop.set("checked", false);
				menu_admin.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/staff.html";
			}
		});
		
		on(menu_admin, "click", function() {
			var val = menu_admin.get("checked");
			if (val == true) {
				menu_pop.set("checked", false);
				menu_staff.set("checked", false);
				window.location.href = "http://m30.phoubon.in.th/admin_menu.html";
			}
		});
     });
});
