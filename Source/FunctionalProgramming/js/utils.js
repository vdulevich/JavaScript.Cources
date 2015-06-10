//setTestResult data array
var data = [1, NaN, undefined, 4, 5];

var setTestResult = function (id, result) {
    var divs = document.getElementsByClassName('taskresult');
    divs[id - 1].style.backgroundColor = result ? "lightgreen" : "#ff3c00";
    divs[id - 1].innerHTML = result ? "Test pass" : "Error";
}
var setDataText = function () {
    var dataDivs = document.getElementsByClassName('data');
    for (var i = 0; i < dataDivs.length; i++) {
        dataDivs[i].innerHTML = ['Initial array [', data.toString(), ']'].join('');
    }
}