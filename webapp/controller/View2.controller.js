sap.ui.define([
    "sap/ui/core/mvc/Controller",
    	"sap/m/MessageToast",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, ODataModel, JSONModel) {
    "use strict";

	var username = "LABS.SHAIMAA";
	var password = "Monairy123@1234567010";
	var sServiceUri = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUri);
    return Controller.extend("StandradUI5Application.controller.View2", {
 
			onDisplay: function() {
			var referenceNumber = this.byId("refNo").getValue();

			var oModel = new ODataModel(sServiceUri, {
				json: true,
				headers: {
					"Authorization": "Basic " + btoa(username + ":" + password),
					"SameSite": "None",
					"Secure": true
				}
			});
			this.getView().setModel(oModel, "GSHeaderSet");

			oModel.read("/GSHeaderSet(" + referenceNumber + ")", {
				success: function(oData) {
					this.byId("awl1").setValue(oData.ZX2GluFru);
					this.byId("akher1").setValue(oData.ZX4GluFru);
					this.byId("y1").setValue(oData.ZX5GluFru);
				//	this.byId("awl2").setValue(oData.ZTank1GluFru);
				//	this.byId("akher2").setValue(oData.ZTank2GluFru);
					this.byId("y2").setValue(oData.ZTank3GluFru);
					this.byId("br").setValue(oData.ZTank4GluFru);
					this.byId("bm").setValue(oData.ZTank5GluFru);
					this.byId("bg").setValue(oData.ZTank6GluFru);
					this.byId("bk").setValue(oData.ZTank7GluFru);
					this.byId("bv").setValue(oData.ZTank8GluFru);
					this.byId("br1").setValue(oData.ZTankFru1GluFru);
					this.byId("br2").setValue(oData.ZTankFru1GluFru);
					this.byId("bl").setValue(oData.ZTankFru2GluFru);
					this.byId("awl").setValue(oData.ZTank301RrGluFru);
					this.byId("aw").setValue(oData.ZTank302RrGluFru);
			//		this.byId("most").setValue(oData.Tc38aKtext);
			//		this.byId("mos").setValue(oData.ZdateGluFru);
			//		this.byId("mo1").setValue(oData.ZStatusGluFru);
					this.byId("sss11").setValue(oData.Zx6GluFru);
					this.byId("ss11").setValue(oData.Zx7GluFru);
					this.byId("ss111").setValue(oData.Zx8GluFru);
					this.byId("s").setValue(oData.Zy1GluFru);
					this.byId("s1").setValue(oData.Zy2GluFru);
					this.byId("ss1").setValue(oData.Zy3GluFru);
					this.byId("sd").setValue(oData.Zy4GluFru);

					var resultsModel = new JSONModel({
						results: [oData]
					});
					this.getView().setModel(resultsModel, "ResultsModel");
					console.log("ResultsModel data:", resultsModel.getData());
				}.bind(this),
				error: function() {
					MessageToast.show("Error fetching data");
				}
			});
		},
			onChange: function() {
			var referenceNumber = this.byId("refNo").getValue();

			var updatedData = {
				ZX2GluFru: parseFloat(this.byId("awl1").getValue()),
				ZX4GluFru: parseFloat(this.byId("akher1").getValue()),
				ZX5GluFru: parseFloat(this.byId("y1").getValue()),
			//	ZTank1GluFru: parseFloat(this.byId("awl2").getValue()),
			//	ZTank2GluFru: parseFloat(this.byId("akher2").getValue()),
				ZTank3GluFru: parseFloat(this.byId("y2").getValue()),
				ZTank4GluFru: parseFloat(this.byId("br").getValue()),
				ZTank5GluFru: parseFloat(this.byId("bm").getValue()),
				ZTank6GluFru: parseFloat(this.byId("bg").getValue()),
				ZTank7GluFru: parseFloat(this.byId("bk").getValue()),
				ZTank8GluFru: parseFloat(this.byId("bv").getValue()),
				ZTankFru1GluFru: parseFloat(this.byId("br1").getValue()),
				// ZTankFru1GluFru: parseFloat(this.byId("br2").getValue()),
				ZTankFru2GluFru: parseFloat(this.byId("bl").getValue()),
				ZTank301RrGluFru: parseFloat(this.byId("awl").getValue()),
				ZTank302RrGluFru: parseFloat(this.byId("aw").getValue()),
			//	Tc38aKtext: this.byId("most").getValue(),
			//	ZdateGluFru: this.byId("mos").getValue(),
			//	ZStatusGluFru: this.byId("mo1").getValue(),
				Zx6GluFru: parseFloat(this.byId("sss11").getValue()),
				Zx7GluFru: parseFloat(this.byId("ss11").getValue()),
				Zx8GluFru: parseFloat(this.byId("ss111").getValue()),
				Zy1GluFru: parseFloat(this.byId("s").getValue()),
				Zy2GluFru: parseFloat(this.byId("s1").getValue()),
				Zy3GluFru: parseFloat(this.byId("ss1").getValue()),
				Zy4GluFru: parseFloat(this.byId("sd").getValue())

			};

			oModel.update("/GSHeaderSet(" + referenceNumber + ")", updatedData, {
				method: "PUT",
				success: function() {
					MessageToast.show("Data updated successfully.");
				},
				error: function() {
					MessageToast.show("Error updating data.");
				}
			});
		},
				onCreate: function() {
			var newEntryData = {
				ZX2GluFru: parseFloat(this.byId("awl1").getValue()),
						ZX4GluFru: parseFloat(this.byId("akher1").getValue()),
					 ZX5GluFru: parseFloat(this.byId("y1").getValue()),
				//	 ZTank1GluFru: parseFloat(this.byId("awl2").getValue()),
				//	 ZTank2GluFru: parseFloat(this.byId("akher2").getValue()),
					 ZTank3GluFru: parseFloat(this.byId("y2").getValue()),
					 ZTank4GluFru: parseFloat(this.byId("br").getValue()),
					 ZTank5GluFru: parseFloat(this.byId("bm").getValue()),
					 ZTank6GluFru: parseFloat(this.byId("bg").getValue()),
					 ZTank7GluFru: parseFloat(this.byId("bk").getValue()),
					 ZTank8GluFru: parseFloat(this.byId("bv").getValue()),
					 ZTankFru1GluFru: parseFloat(this.byId("br1").getValue()),
				//	 ZTankFru1GluFru: parseFloat(this.byId("br2").getValue()),
					 ZTankFru2GluFru: parseFloat(this.byId("bl").getValue()),
					 ZTank301RrGluFru: parseFloat(this.byId("awl").getValue()),
					 ZTank302RrGluFru: parseFloat(this.byId("aw").getValue()),
				//	 Tc38aKtext: this.byId("most").getValue(), 
				//	 ZdateGluFru: this.byId("mos").getValue(), 
				//	ZStatusGluFru: this.byId("mo1").getValue(),
					 		Zx6GluFru: parseFloat(this.byId("sss11").getValue()),

					Zx7GluFru: parseFloat(this.byId("ss11").getValue()),
					Zx8GluFru: parseFloat(this.byId("ss111").getValue()),
						Zy1GluFru: parseFloat(this.byId("s").getValue()),
							Zy2GluFru: parseFloat(this.byId("s1").getValue()),
					Zy3GluFru: parseFloat(this.byId("ss1").getValue()),
						Zy4GluFru: parseFloat(this.byId("sd").getValue())

			};

			oModel.create("/GSHeaderSet", newEntryData, {
				success: function(oData) {
					console.log("Data created successfully:", oData);
				},
				error: function(oError) {
					console.error("Error creating data:", oError);
				}
			});
				},
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },
        onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.oRouter.navTo("main", {}, true);
            }
        }
    });
});