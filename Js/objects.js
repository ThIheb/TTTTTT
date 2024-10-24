var items = []
var narratives = []
var currentSelection = []
var currentNarrative = ""
var currentValue = ""
var currentSort = ""


document.addEventListener("DOMContentLoaded", async function (event) {
	console.log("Ready to start with phase 4")
	console.log("Fetching JSON data");
		fetch("Js/infoPhase4.json")
		.then(response => response.json())

		.then(data => {
			console.log("Fetched data:", data);
	//fetch('infoPhase4.json')
	//	.then(response => response.json())
		//.then(data => {
			items = data.items
			var startWith = data.meta.startWith
			var item = items[startWith]

			narratives = data.meta.narratives
			currentNarrative = data.meta.startNarrative
			currentValue = data.meta.startValue
			prepareNarratives()
		})
		.catch(error => console.error("Error fetching JSON:", error));
});

function prepareNarratives() {
	currentSelection = items.filter(i =>
		i.info[currentNarrative]?.includes(currentValue)
	)
	currentSelection.sort((i, j) =>
		i['@sort'] < j['@sort'] ? -1 : 1
	)
	if (currentSelection.length == 0)
		currentSelection = items

	var index = currentSelection.findIndex(i => i['@sort'] == currentSort)
	if (index == -1) index = 0
	showInfo(index)
}

function showInfo(index) {
	var item = currentSelection[index]
	currentSort = item['@sort']
	inner("header", item.shortName);
	inner("type-info", item.info.Type);
	inner("fullHeader", item.shortName);
	byId("wireframeImg").src = item.image
	byId("wireframeImg").alt = item.shortName
	byId("bottomImg").src = item.secondImage
	byId("bottomImg").alt = item.shortName
	createInfoTable(item)
	inner("briefDesc", "<p>"+item.intro+"</p>", true)
	inner("shortInfo", item.shortInfo + '<a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="more()">More</a>');
	inner("longerInfo", "<p>" + item.longerInfo.join("</p><p>") + '<a type="button" class="btn btn-outline-dark btn-sm rounded-0  mx-2 ourButtons" onclick="less()">Less</a> or <a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="muchMore()">More</a></p>');
	hide("longerInfo")
	hide("fullInfo")
	inner("fullInfo", "<p>" + item.fullInfo.join("</p><p>") + '<a type="button" class="btn btn-outline-dark btn-sm rounded-0 mx-2 ourButtons" onclick="hideFullInfo()">Less</a>')

	prepareNavigationButtons(index)
	prepareKeyWords(item)
}

function more() {
	hide("shortInfo");
	show("longerInfo");
	hide("fullInfo");
}
function less() {
	hide("longerInfo");
	show("shortInfo");
	hide("fullInfo");
}
function muchMore() {
	hide("longerInfo");
	hide("shortInfo");
	show("fullInfo")
}
function hideFullInfo() {
	hide("longerInfo");
	show("shortInfo");
	hide("fullInfo");
}

function createInfoTable(item) {

	// Define the keys that should go into each section
	const firstSectionKeys = ["Designer", "Usage", "Space", "History"]; // Keys for the first section
	const secondSectionKeys = ["Date of Project", "History", "Dimensions", "Company", "Material", "Type"]; // Keys for the second section

	// Populate first section based on firstSectionKeys
	for (var key of firstSectionKeys) {
		if (item.info[key] !== null && item.info[key] !== undefined) {
			
				var value = item.info[key];
				var id = key+"Row"
				inner(key, item.info[key], true);
				//var row = document.getElementById(key).innerHTML;
				//console.log(key, id, variable);
				//button = '<a class="button" role="button" id="'+key+'Button'+'" href="#" onclick="changeNarrative1(\'' + key + '\',\'' + value + '\')">' + variable + '</a>';

				//console.log(button)
				//inner(key, button, true);
		}
	}
	$(document).ready(function() {$(".narrativeButton").on('click', function() {
        var narrative = $(this).find("td").attr("id");
        var value = $(this).find("td").text();
        changeNarrative1(narrative, value);
		console.log(narrative, value)
		});
	});
	
	// Populate second section based on secondSectionKeys
	for (var Secondkey of secondSectionKeys) {
		if (item.info[Secondkey] !== null && item.info[key] !== undefined) {
				var value = item.info[Secondkey];
				inner(Secondkey, value, true)
				 
		} else {
			Secondid = Secondkey
			inner(Secondid, "<p> error? </p>", true);
		}
		}
	}

function prepareNavigationButtons(index) {
	if (index > 0) {
		byId("buttonPrevious").disabled = false
		byId("buttonPrevious").onclick = () => showInfo(index - 1)
		byId("buttonPrevious").innerHTML = currentSelection[index - 1].shortName
	} else {
		byId("buttonPrevious").disabled = true
		byId("buttonPrevious").onclick = null
		byId("buttonPrevious").innerHTML = "None"
	}
	if (index < currentSelection.length - 1) {
		byId("buttonNext").disabled = false
		byId("buttonNext").onclick = () => showInfo(index + 1)
		byId("buttonNext").innerHTML = currentSelection[index + 1].shortName
	} else {
		byId("buttonNext").disabled = true
		byId("buttonNext").onclick = null
		byId("buttonNext").innerHTML = "None"
	}
	inner('narrative', currentNarrative + ": " + currentValue)
}

function prepareKeyWords(item) {
	var keywords = item.keywords.split(",")
	console.log(keywords)
	var kwDiv = '<p class="d-inline">'+keywords[0]+'</p><i class="bi bi-dot"></i><p class="d-inline">'+keywords[1]+'</p><i class="bi bi-dot"></i><p class="d-inline">'+keywords[2]+'</p>'
	inner("keyWords", kwDiv, true)
}

function changeNarrative1(narrative, value) {
	currentNarrative = narrative
	currentValue = value
	prepareNarratives()
}

function byId(id) {
	return document.getElementById(id)
}

function show(id) {
	document.getElementById(id).classList.remove('d-none')
}

function hide(id) {
	document.getElementById(id).classList.add('d-none')
}

function inner(id, content, emptyFirst = true) {
	if (emptyFirst) document.getElementById(id).innerHTML = "";
	document.getElementById(id).innerHTML += content;
}


