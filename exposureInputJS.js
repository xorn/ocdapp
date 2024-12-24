var tableData;
var mainBar = document.getElementById("mainBar");
var loadingData = false;

// This function is called once the HTML page is fully loaded by the browser
document.addEventListener("DOMContentLoaded", function () {
	// Load from storage with promise
	Promise.all([loadTables()])
		.then(function (values) {
			loadingData = true;
			tableData = values[0];
			console.log(tableData.length);
			tableData.forEach((table) => {
				console.log(table.length);
				addTable();
				var selectedTable = document.getElementById("table" + getTableNum());
				console.log("table: table" + getTableNum());
				var rowNum = 0;
				var columnNum = 1;
				table.forEach(function (entry) {
					console.log(entry);
					if (rowNum === 0) {
						var tableName = selectedTable.rows[rowNum].cells[0];
						console.log("entry: entry" + rowNum + (columnNum - 1));
						rowNum = rowNum + 2;
					} else {
						if (entry !== "") {
							try {
								var data = document.getElementById(
									"table" +
										getTableNum() +
										"-row" +
										rowNum +
										"-col" +
										(columnNum - 1) +
										"-content"
								);
								data.innerText = entry;
							} catch {
								console.log("Error: Cannot set saved text");
							}
						}

						// New row
						if (columnNum % 3 === 0) {
							rowNum++;
							columnNum = 1;
						} else {
							columnNum++;
						}
					}
				});
			});
			loadingData = false;
			updateTables();
		})
		.catch(function (err) {
			// Handle loading error
			console.log("Error: " + err);
		});
});

// Check for local storage data
function findPrevTables() {
	var exists = true;
	if (JSON.parse(localStorage.getItem("tableData")) === null) {
		exists = false;
	}
	return exists;
}

// Load tables from local storage
function loadTables() {
	var loadedData;
	if (findPrevTables()) {
		loadedData = JSON.parse(localStorage.getItem("tableData"));
		console.log("Data Loaded");
	} else {
		loadedData = [];
		console.log("No data to load");
	}
	return loadedData;
}

// User creates new table (updates)
function createNewTable() {
	tableData = loadTables();
	addTable();
	updateTables();
}

// Adds table (no update)
function addTable() {
	var tbl = document.createElement("table");

	for (let i = 0; i < 7; i++) {
		const tr = tbl.insertRow();
		for (let j = 0; j < 3; j++) {
			const td = tr.insertCell();
			var id = "table" + (getTableNum() + 1) + "-row" + i + "-col" + j;
			var span = document.createElement("span");
			setAttributes(
				span,
				"id",
				id + "-content",
				"class",
				"observable",
				"contenteditable",
				"true",
				"style",
				"border: 1px solid #CCC; width: 103px; display: inline-block; white-space: nowrap; overflow: hidden;"
			);
			td.setAttribute("id", "td" + i + j);
			if (i === 0 && j === 0) {
				var exposureText = document.createElement("input");
				setAttributes(
					exposureText,
					"placeholder",
					"name",
					"class",
					"observable",
					"style",
					"width: 230px;"
				);
				td.appendChild(document.createTextNode("Exposure: "));
				td.appendChild(exposureText);
				td.setAttribute("colSpan", "3");
				break;
			} else if (i === 1) {
				//displays the table text that's already there (non-editable)
				if (j === 0) {
					td.appendChild(document.createTextNode("Initial Anxiety Level"));
				} else if (j === 1) {
					td.appendChild(document.createTextNode("Final Anxiety Level"));
				} else if (j === 2) {
					td.appendChild(document.createTextNode("Elapsed Time"));
				}
			} else if (i >= 2) {
				td.appendChild(span);
			}
		}
	}
	mainBar.appendChild(tbl);
	setAttributes(tbl, "id", "table" + getTableNum(), "class", "exposureTable");
	tbl.style.float = "left";

	// Add observers to entry boxes
	var observables = document.querySelectorAll(".observable");
	console.log(observables);
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			console.log(mutation);
			if (!loadingData) {
				updateTables();
			}
		});
	});

	var config = {
		characterData: true,
		subtree: true,
	};
	observables.forEach(function (node) {
		observer.observe(node, config);
	});
}

// Put tables into localstorage
function updateTables() {
	var tempTables = [];
	for (let k = 0; k < getTableNum(); k++) {
		var currTable = [];
		try {
			var tableName = table.rows[0].getElementsByTagName("span")[0].innerText;
			currTable.push(tableName);
		} catch {
			currTable.push("");
		}
		for (let i = 2; i < 7; i++) {
			for (let j = 0; j < 3; j++) {
				try {
					var entry = document.getElementById(
						"table" + (k + 1) + "-row" + i + "-col" + j + "-content"
					);
					console.log(
						"Got ID: " +
							"table" +
							(k + 1) +
							"-row" +
							i +
							"-col" +
							j +
							"-content"
					);
					currTable.push(entry.innerText);
					console.log("Pushed to save");
				} catch {
					console.log("No val to save");
					currTable.push("");
				}
			}
		}
		tempTables.push(currTable);
	}
	if (tempTables !== null) {
		localStorage.setItem("tableData", JSON.stringify(tempTables));
	}
}

// Remove all tables
function clearTables() {
	const tables = document.querySelectorAll(".exposureTable");
	tables.forEach((table) => {
		table.remove();
	});
	localStorage.removeItem("tableData");
	updateTables();
}

// Helper function to set multiple attributes at once (without looking oogly)
function setAttributes(elem /* attribute, value pairs go here */) {
	for (var i = 1; i < arguments.length; i += 2) {
		elem.setAttribute(arguments[i], arguments[i + 1]);
	}
}

// Return number of tables
function getTableNum() {
	return mainBar.children.length;
}