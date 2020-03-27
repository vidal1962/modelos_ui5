sap.ui.define([
	"sap/m/Text",
	"sap/m/Label",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/core/ComponentContainer"
], function (Text, Label, XMLView, ComponentContainer) {
	"use strict";
	
/*	new Text({
		text: "Olá Mundo",
		width: "100%",
		textAlign: "End"
	}).placeAt("content");
	
	new Label({
		text: "texto do label"
	}).placeAt("content");*/
	
//	XMLView.create({
//		viewName: "cristiano1.vidal.walkthrough.view.Home"
//   ======
//	}).then(function (oView) {
//		oView.placeAt("content");
//	});

//	new XMLView({
//		viewName: "cristiano1.vidal.walkthrough.view.Home"
//	}).placeAt("content");

new ComponentContainer({
		name: "cristiano1.vidal.walkthrough",
		settings : {
			id : "walkthrough"
		},
		async: true
	}).placeAt("content");
});