sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/odata/ODataModel",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, ODataModel, JSONModel) {
	"use strict";

	var username = "LABS.SHAIMAA";
	var password = "Monairy123@1234567010";
	var sServiceUri = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
	var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUri);

	return Controller.extend("StandradUI5Application.controller.View2", {
		onInit: function() {
	
			
			 var oEditModel = new JSONModel({
                isEditable: false
            });
            this.getView().setModel(oEditModel, "editModel");
        
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getRoute("view2").attachPatternMatched(this.onRouteMatched, this);
		
		},
				   


		onRouteMatched: function(oEvent) {

			var oArguments = oEvent.getParameter("arguments");
			var sQuery = oArguments.query;

			if (sQuery) {
				this.fetchData(sQuery);
			}
		},

		fetchData: function(referenceNumber) {
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

					this.byId("refrencenumber").setText(oData.ZrefNumber);
					this.byId("shift").setText(oData.Tc38aKtext);
					this.byId("date").setText(oData.ZdateGluFru);
					this.byId("status").setText(oData.ZStatusGluFru);

				this.byId("awl1").setValue(oData.ZX2GluFru);
					this.byId("akher1").setValue(oData.ZX4GluFru);
					this.byId("y1").setValue(oData.ZX5GluFru);
					this.byId("awl2").setValue(oData.ZTank1GluFru);
					this.byId("akher2").setValue(oData.ZTank2GluFru);
					this.byId("y2").setValue(oData.ZTank3GluFru);
					this.byId("br").setValue(oData.ZTank4GluFru);
					this.byId("bm").setValue(oData.ZTank5GluFru);
					this.byId("bg").setValue(oData.ZTank6GluFru);
					this.byId("bk").setValue(oData.ZTank7GluFru);
					this.byId("bv").setValue(oData.ZTank8GluFru);
					this.byId("br1").setValue(oData.ZTankFru1GluFru);
				
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
			this.getView().getModel("editModel").setProperty("/isEditable", true);
		},
		onOk: function () {
		
			   var referenceNumber = this.byId("refrencenumber").getText();
            if (!referenceNumber) {
                MessageToast.show("Reference Number is missing.");
                return;
            }

			var updatedData = {
			ZX2GluFru: parseFloat(this.byId("awl1").getValue()),
				ZX4GluFru: parseFloat(this.byId("akher1").getValue()),
				ZX5GluFru: parseFloat(this.byId("y1").getValue()),
				ZTank1GluFru: parseFloat(this.byId("awl2").getValue()),
				ZTank2GluFru: parseFloat(this.byId("akher2").getValue()),
				ZTank3GluFru: parseFloat(this.byId("y2").getValue()),
				ZTank4GluFru: parseFloat(this.byId("br").getValue()),
				ZTank5GluFru: parseFloat(this.byId("bm").getValue()),
				ZTank6GluFru: parseFloat(this.byId("bg").getValue()),
				ZTank7GluFru: parseFloat(this.byId("bk").getValue()),
				ZTank8GluFru: parseFloat(this.byId("bv").getValue()),
				ZTankFru1GluFru: parseFloat(this.byId("br1").getValue()),
			
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
			 this.getView().getModel("editModel").setProperty("/isEditable", false);
		},
	

	
	onCreate: function() {
    var oView = this.getView();
    
   
    oView.byId("awl1").setValue("");
    oView.byId("akher1").setValue("");
    oView.byId("y1").setValue("");
    oView.byId("y2").setValue("");
    oView.byId("br").setValue("");
    oView.byId("bm").setValue("");
    oView.byId("bg").setValue("");
    oView.byId("bk").setValue("");
    oView.byId("bv").setValue("");
    oView.byId("br1").setValue("");
    oView.byId("bl").setValue("");
    oView.byId("sss11").setValue("");
    oView.byId("ss11").setValue("");
    oView.byId("ss111").setValue("");
    oView.byId("s").setValue("");
    oView.byId("s1").setValue("");
    oView.byId("ss1").setValue("");
    oView.byId("sd").setValue("");
    oView.byId("awl").setValue("");
    oView.byId("aw").setValue("");
  	oView.byId("awl2").setValue("");
  	oView.byId("akher2").setValue("");

  
    sap.m.MessageToast.show("Fields cleared for new entry");
},
onSave: function() {
	 this.getView().getModel("editModel").setProperty("/isEditable", false);
    var oView = this.getView();

    var newEntryData = {
        ZX2GluFru: parseFloat(oView.byId("awl1").getValue()),
        ZX4GluFru: parseFloat(oView.byId("akher1").getValue()),
        ZX5GluFru: parseFloat(oView.byId("y1").getValue()),
        ZTank3GluFru: parseFloat(oView.byId("y2").getValue()),
        ZTank4GluFru: parseFloat(oView.byId("br").getValue()),
        ZTank5GluFru: parseFloat(oView.byId("bm").getValue()),
        ZTank6GluFru: parseFloat(oView.byId("bg").getValue()),
        ZTank7GluFru: parseFloat(oView.byId("bk").getValue()),
        ZTank8GluFru: parseFloat(oView.byId("bv").getValue()),
        ZTankFru1GluFru: parseFloat(oView.byId("br1").getValue()),
        ZTankFru2GluFru: parseFloat(oView.byId("bl").getValue()),
        Zx6GluFru: parseFloat(oView.byId("sss11").getValue()),
        Zx7GluFru: parseFloat(oView.byId("ss11").getValue()),
      	ZTank301RrGluFru: parseFloat(oView.byId("awl").getValue()),
		ZTank302RrGluFru: parseFloat(oView.byId("aw").getValue()),
        Zx8GluFru: parseFloat(oView.byId("ss111").getValue()),
        Zy1GluFru: parseFloat(oView.byId("s").getValue()),
        Zy2GluFru: parseFloat(oView.byId("s1").getValue()),
        Zy3GluFru: parseFloat(oView.byId("ss1").getValue()),
        Zy4GluFru: parseFloat(oView.byId("sd").getValue()),	
        ZTank1GluFru: parseFloat(oView.byId("awl2").getValue()),
        ZTank2GluFru: parseFloat(oView.byId("akher2").getValue())
      
				
    };

    oModel.create("/GSHeaderSet", newEntryData, {
        success: function(oData) {
            sap.m.MessageToast.show("Data created successfully");
       
        },
        error: function(oError) {
            sap.m.MessageToast.show("Error creating data");
            console.error("Error creating data:", oError);
        }
    });
},





		onNavBack: function() {
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