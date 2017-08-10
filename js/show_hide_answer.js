var showQuestions = function(totalNumber, name) {
	var prefix = name + String(i) + "_";
	for (var i = 1; i < totalNumber+1; i++) {
		var prefix = name + String(i) + "_";
		var targetId = prefix + "q";
		document.getElementById(targetId).classList.remove('closed');
		document.getElementById(targetId).classList.add('open');
		targetId = prefix + "a";
		document.getElementById(targetId).classList.remove('open');
		document.getElementById(targetId).classList.add('closed');
		targetId = prefix + "d";
		document.getElementById(targetId).classList.remove('closed');
		document.getElementById(targetId).classList.add('open');
		targetId = prefix + "u";
		document.getElementById(targetId).classList.remove('open');
		document.getElementById(targetId).classList.add('closed');
		targetId = prefix + "block";
		document.getElementById(targetId).classList.remove('closed');
		document.getElementById(targetId).classList.add('show');
	}
}


var showAnswer = function(currentIndex, totalNumber, name) {
	for (var i = 1; i < totalNumber+1; i++) {
		var prefix = name + String(i) + "_";
		// var targetId = prefix + "q";
		// console.log(targetId)
		// document.getElementById(targetId).classList.remove('open');
		// document.getElementById(targetId).classList.add('closed');
		targetId = prefix + "a";
		document.getElementById(targetId).classList.remove('open');
		document.getElementById(targetId).classList.add('closed');
		// targetId = prefix + "d";
		// document.getElementById(targetId).classList.remove('open');
		// document.getElementById(targetId).classList.add('closed');
		targetId = prefix + "u";
		document.getElementById(targetId).classList.remove('open');
		document.getElementById(targetId).classList.add('closed');
		// targetId = prefix + "block";
		// console.log(targetId)
		// document.getElementById(targetId).classList.remove('open');
		// document.getElementById(targetId).classList.add('closed');
	}
	var prefix = name + String(currentIndex) + "_";
	var targetId = prefix + "q";
	document.getElementById(targetId).classList.remove('closed');
	document.getElementById(targetId).classList.add('open');
	targetId = prefix + "d";
	document.getElementById(targetId).classList.remove('open');
	document.getElementById(targetId).classList.add('closed');
	targetId = prefix + "a";
	document.getElementById(targetId).classList.remove('closed');
	document.getElementById(targetId).classList.add('open');
	targetId = prefix + "u";
	document.getElementById(targetId).classList.remove('closed');
	document.getElementById(targetId).classList.add('open');
	targetId = prefix + "block";
	document.getElementById(targetId).classList.remove('closed');
	document.getElementById(targetId).classList.add('open');
}

var showNormalQuestions = function(totalNumber) {
	var name = "normal_";
	showQuestions(totalNumber, name);
}

var showNormalAnswer = function(currentIndex, totalNumber) {
	var name = "normal_";
	showAnswer(currentIndex, totalNumber, name);
}

var showElectricityQuestions = function(totalNumber) {
	var name = "electricity_";
	showQuestions(totalNumber, name);
}

var showElectricityAnswer = function(currentIndex, totalNumber) {
	var name = "electricity_";
	showAnswer(currentIndex, totalNumber, name);
}

var showArrhythmiaQuestions = function(totalNumber) {
	var name = "arrhythmia_";
	showQuestions(totalNumber, name);
}

var showArrhythmiaAnswer = function(currentIndex, totalNumber) {
	var name = "arrhythmia_";
	showAnswer(currentIndex, totalNumber, name);
}

var showAttackQuestions = function(totalNumber) {
	var name = "attack_";
	showQuestions(totalNumber, name);
}

var showAttackAnswer = function(currentIndex, totalNumber) {
	var name = "attack_";
	showAnswer(currentIndex, totalNumber, name);
}

var showModerateQuestions = function(totalNumber) {
	var name = "moderate_";
	showQuestions(totalNumber, name);
}

var showModerateAnswer = function(currentIndex, totalNumber) {
	var name = "moderate_";
	showAnswer(currentIndex, totalNumber, name);
}

var showSevereQuestions = function(totalNumber) {
	var name = "severe_";
	showQuestions(totalNumber, name);
}

var showSevereAnswer = function(currentIndex, totalNumber) {
	var name = "severe_";
	showAnswer(currentIndex, totalNumber, name);
}

var showFailureQuestions = function(totalNumber) {
	var name = "failure_";
	showQuestions(totalNumber, name);
}

var showFailureAnswer = function(currentIndex, totalNumber) {
	var name = "failure_";
	showAnswer(currentIndex, totalNumber, name);
}

var showCompensatedQuestions = function(totalNumber) {
	var name = "compensated_";
	showQuestions(totalNumber, name);
}

var showCompensatedAnswer = function(currentIndex, totalNumber) {
	var name = "compensated_";
	showAnswer(currentIndex, totalNumber, name);
}

var showDecompensatedQuestions = function(totalNumber) {
	var name = "decompensated_";
	showQuestions(totalNumber, name);
}

var showDecompensatedAnswer = function(currentIndex, totalNumber) {
	var name = "decompensated_";
	showAnswer(currentIndex, totalNumber, name);
}
