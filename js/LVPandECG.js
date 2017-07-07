var ECGchart = undefined;
var LVPchart = undefined;
var ECGurls = [];
var LVPurls = [];
var ECGs = [];
var LVPs = [];
var ECGTexts = [];
var LVPTexts = [];
var ecgIndicator = undefined;
var lvpIndicator = undefined;
var maxECGTime = 0.0, maxLVPTime = 0.0;
var minECGTime = 0.0, minLVPTime = 0.0;
var currentECGName = 'None';
var currentLVPName = 'None';
var timeLineOffset = 0.0;


require(["dojo/ready"], function(ready){
	ready(function(){
		require([ "dojo/_base/declare", "dojo/dom-construct","dojox/charting/Chart", "dojox/charting/plot2d/StackedLines", "dojox/charting/plot2d/Grid", "dojox/charting/themes/Claro", "dojox/charting/axis2d/Default", "dojox/charting/plot2d/Indicator",
		"dojox/charting/themes/Tom"], 
			function(declare, domConstruct, Chart, StackedLines, Grid, Claro, axis2dDefault, plot2dIndicator, tomTheme){
				ready(function(){
						tomTheme.chart.fill="transparent";
						tomTheme.plotarea.fill = "transparent";
						tomTheme.chart.stroke = "transparent";
						/* get the html element (dom) where we want the chart to be drawn on */
						var chartDom = document.getElementById("rightECG");
						/* create the chart on the dom */
						ECGchart = new Chart(chartDom);
						ECGchart.setTheme(tomTheme);
						/* add the x-axis */
						ECGchart.addAxis("x", {type: "Invisible", majorLabels: false,
							minorTicks: false,
							minorLabels: false,
							microTicks: false});		
						/* add the y-axis */
						ECGchart.addAxis("y", {type: "Invisible", vertical: true,
							majorLabels: false,
							minorTicks: false,
							minorLabels: false,
							microTicks: false});
						/* optional add the grid */
						ECGchart.addPlot("grid", { type: Grid,
							hMajorLines: false,
							hMinorLines: false, 
							vMajorLines: false,
							vMinorLines: false,
							majorHLine: { color: "green", width: 0.2 },
							majorVLine: { color: "red", width: 0.2 } });
					   ECGchart.addPlot("time", { type: plot2dIndicator,
		        			vertical: true,
		        			lineStroke: { color: "#00ccff"},
		        			labels: null,
		        			stroke: null,
		        			outline: null,
		        			fill: null,
		        			offset: { y: -7, x: -10 },
		        			values: 0.0});
						ecgIndicator = ECGchart.getPlot("time");

						/* get the html element (dom) where we want the chart to be drawn on */
						var chartDom = document.getElementById("rightLVP");
						/* create the chart on the dom */
						LVPchart = new Chart(chartDom);
						LVPchart.setTheme(tomTheme);
						/* add the x-axis */
						LVPchart.addAxis("x", {type: "Invisible",
							majorLabels: false,
							minorTicks: false,
							minorLabels: false,
							microTicks: false});
						/* add the y-axis */
						LVPchart.addAxis("y", {
							vertical: true,
							min: -40,
							max: 160,
							minorTicks: false,
							majorTickStep: 40,
							titleFont: "normal normal normal 11pt Helvetica",
							title:"(mmHg)",
							titleFontColor:[120, 120, 120]
						});
						/* optional add the grid */
						LVPchart.addPlot("grid", { type: Grid,
							hMajorLines: false,
							hMinorLines: false, 
							vMajorLines: false,
							vMinorLines: false,
							majorHLine: { color: "green", width: 0.2 },
							majorVLine: { color: "red", width: 0.2 } });
						LVPchart.addPlot("time", { type: plot2dIndicator,
		        			vertical: true,
		        			lineStroke: { color: "#00ccff"},
		        			labels: null,
		        			stroke: null,
		        			outline: null,
		        			fill: null,
		        			offset: { y: -7, x: -10 },
		        			values: 0.0});
						lvpIndicator = LVPchart.getPlot("time");
						loadFirstPage();
					});
			});
	});
});

var showLVPInternal = function(chartName) {
	if (chartName != currentLVPName) {
		var currentLVP = LVPs[chartName];
		maxLVPTime = currentLVP[currentLVP.length - 1]['x'];
		minLVPTime = currentLVP[0]['x'];
		LVPchart.removeSeries(currentLVPName);
		LVPchart.removeSeries("Normal");
		currentLVPName = chartName;
		var colourName = "lime";
		if (chartName == "CompensatedFailure" || chartName == "SmallInfarct")
			colourName = "orange";
		else if (chartName == "DecompensatedFailure" || chartName == "LargeInfarct")
			colourName = "red";
		LVPchart.addSeries(chartName, currentLVP, { stroke: {color: colourName, width: 2}});
		if (chartName == "CompensatedFailure" || chartName == "DecompensatedFailure" ||  chartName == "SmallInfarct" || chartName == "LargeInfarct") {
			LVPchart.addSeries("Normal", LVPs["Normal"], { stroke: {color: "#003000", width: 2}});
		}
		LVPchart.render();
		LVPchart.resize('100%','100%');
	}
}

var rescaleXAxis = function(viewData) {
	var len = viewData.length;
	var max_x = viewData[len - 1].x;
	for (var i = 0; i < len; i++) {
		viewData[i].x = viewData[i].x / max_x * 100.0;
	}
	
	return viewData;
}

var onLVPLoaded = function(xmlhttp, chartName) {
	return function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var viewData = JSON.parse(xmlhttp.responseText);
			var newViewData = rescaleXAxis(viewData);
			LVPs[chartName] = newViewData;
			showLVPInternal(chartName);
		}
	};
}

var showECGInternal = function(chartName) {
	if (chartName != currentECGName) {
		var currentECG = ECGs[chartName];
		maxECGTime = currentECG[currentECG.length - 1]['x'];
		minECGTime = currentECG[0]['x'];
		ECGchart.removeSeries(currentECGName);
		ECGchart.removeSeries("Normal");
		currentECGName = chartName;
		var colourName = "lime";

		if (chartName == "CompensatedFailure" || chartName == "SmallInfarct")
			colourName = "orange";
		else if (chartName == "DecompensatedFailure" || chartName == "LargeInfarct")
			colourName = "red";
		ECGchart.addSeries(chartName, currentECG, { stroke: {color: colourName, width: 2}});
		if (chartName == "CompensatedFailure" || chartName == "DecompensatedFailure" ||  chartName == "SmallInfarct" || chartName == "LargeInfarct") {
			ECGchart.addSeries("Normal", ECGs["Normal"], { stroke: {color: "#003000", width: 2}});
		}
		ECGchart.render();
		ECGchart.resize('100%','100%');
	}
}

var onECGLoaded = function(xmlhttp, chartName) {
	return function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var viewData = JSON.parse(xmlhttp.responseText);
			var newViewData = rescaleXAxis(viewData);
			ECGs[chartName] = newViewData;
			showECGInternal(chartName);
		}
	};
}

function showECGAndLVP(chartName, timeOffset) {
	timeLineOffset = timeOffset;
	if (ECGs[chartName]) {
		showECGInternal(chartName);
	} else {
		var xmlhttp = new XMLHttpRequest();	
		xmlhttp.onreadystatechange = onECGLoaded(xmlhttp, chartName);
		requestURL = ECGurls[chartName];
		xmlhttp.open("GET", requestURL, true);
		xmlhttp.send();
	}
	
	if (LVPs[chartName]) {
		showLVPInternal(chartName);
	} else {
		var xmlhttp = new XMLHttpRequest();	
		xmlhttp.onreadystatechange = onLVPLoaded(xmlhttp, chartName);
		requestURL = LVPurls[chartName];
		xmlhttp.open("GET", requestURL, true);
		xmlhttp.send();
	}
	if (ECGTexts[chartName])
		document.getElementById('ECGDescription').innerHTML = ECGTexts[chartName];
	if (LVPTexts[chartName])
		document.getElementById('LVPDescription').innerHTML = LVPTexts[chartName];
}

function updateIndicator(normaliseTime) {
	if (lvpIndicator && (currentLVPName != ' None') &&
		ecgIndicator && (currentECGName != ' None') &&
		document.getElementById('rightInformation').className == "open") 
	{
		var lvpTime = normaliseTime * (maxLVPTime - minLVPTime) + minLVPTime;
		var ecgTime = normaliseTime * (maxECGTime - minECGTime) + minECGTime;
		if (timeLineOffset != 0.0) {
			lvpTime = lvpTime + timeLineOffset;
			ecgTime = ecgTime + timeLineOffset;
			if (lvpTime > maxLVPTime) {
				lvpTime = lvpTime - maxLVPTime + minLVPTime;
			} else if ( lvpTime < minLVPTime) {
				lvpTime = maxLVPTime - (minLVPTime - lvpTime);
			}
			if (ecgTime > maxECGTime) {
				ecgTime = ecgTime - maxECGTime + minECGTime;
			} else if ( ecgTime < minECGTime) {
				ecgTime = maxECGTime - (minECGTime - ecgTime);
			}
		}
		lvpIndicator.opt.values = [lvpTime];
		ecgIndicator.opt.values = [ecgTime];
		lvpIndicator.dirty = true;
		lvpIndicator.render();
		ecgIndicator.dirty = true;
		ecgIndicator.render();
	}
}
