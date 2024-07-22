sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, ODataModel, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("StandradUI5Application.controller.View1", {
        onInit: function () {
            var sServiceUrl = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
            var oModel = new ODataModel(sServiceUrl, {
                useBatch: false,
                defaultBindingMode: "TwoWay"
            });

            oModel.attachMetadataFailed(function() {
                MessageToast.show("Failed to load OData service metadata.");
            });

            this.getView().setModel(oModel);
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        },

        onSearch: function () {
            var sQuery = this.byId("searchField").getValue();

            if (sQuery) {
                var sPath = "/GSHeaderSet(" + sQuery + ")";
                var oModel = this.getView().getModel();


                this.byId("productsTable").unbindItems();

                oModel.read(sPath, {
                    success: function (oData) {
                        console.log("Data fetched successfully:", oData);

                      
                        var aData = [oData];
                        var oJSONModel = new JSONModel({ results: aData });
                        this.getView().setModel(oJSONModel, "detailModel");

                    
                        this.byId("productsTable").bindItems({
                            path: "detailModel>/results",
                            template: new sap.m.ColumnListItem({
                                cells: [
                                    new sap.m.Text({ text: "{detailModel>ZX2GluFru}" }),
                                    new sap.m.Text({ text: "{detailModel>ZX4GluFru}" }),
                                    new sap.m.Text({ text: "{detailModel>ZX5GluFru}" })
                                ],
                                type: "Navigation",
                                press: this.onPress.bind(this)
                            })
                        });
                    }.bind(this),
                    error: function (oError) {
                        console.error("Error occurred: ", oError);
                        MessageToast.show("Failed to fetch data. Please check the entered value and try again.");
                    }
                });
            } else {
                MessageToast.show("Please enter a search query.");
            }
        },
         onGoPress: function () {
            var oModel = this.getView().getModel();
            var sPath = "/GSHeaderSet";
            this.byId("productsTable").unbindItems();

            oModel.read(sPath, {
                success: function (oData) {
                    console.log("Data fetched successfully:", oData);

                    var oJSONModel = new JSONModel({ results: oData.results });
                    this.getView().setModel(oJSONModel, "detailModel");

                    this.byId("productsTable").bindItems({
                        path: "detailModel>/results",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({ text: "{detailModel>ZrefNumber}" }),
                                new sap.m.Text({ text: "{detailModel>Tc38aKtext}" }),
                                new sap.m.Text({ text: "{detailModel>ZdateGluFru}" }),
                                new sap.m.Text({ text: "{detailModel>ZStatusGluFru}" })
                            ],
                            type: "Navigation",
                            press: this.onPress.bind(this)
                        })
                    });
                }.bind(this),
                error: function (oError) {
                    console.error("Error occurred: ", oError);
                    MessageToast.show("Failed to fetch data.");
                }
            });
        },
      
         
        onPress: function (oEvent) {
    var sQuery = this.byId("searchField").getValue();
    if (sQuery) {
        this.oRouter.navTo("view2", {
            query: sQuery
        });
    } else {
        MessageToast.show("Please enter a search query.");
    }
}



      
    });
});