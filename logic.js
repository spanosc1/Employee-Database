var employeeData = new Firebase("https://saturday-data.firebaseio.com/");
employeeData.on('child_added', function(childSnapshot, prevChildKey) {
	var name = childSnapshot.val().employeeName;
	var role = childSnapshot.val().employeeRole;
	var start = childSnapshot.val().employeeStart;
	var rate = childSnapshot.val().employeeRate;
 	var newRow = $('<tr>');
	var nameData = $('<td>');
	var roleData = $('<td>');
	var startData = $('<td>');
	var rateData = $('<td>');
	var monthsData = $('<td>');
	var billedData = $('<td>');
	nameData.text(name);
	roleData.text(role);
	startData.text(start);
	rateData.text(rate);	
	var monthsWorked = $('<td>');
	var currentTime = new Date();
	var dateMonths = start.substr(3, 2);
	var dateYears = start.substr(6, 2);
	console.log(dateYears);
	var month = currentTime.getMonth() + 1;
	console.log(month);
	var year = currentTime.getFullYear();
	year = year + "";
	var yearTwoDigits = year.substr(2, 2);
	console.log(yearTwoDigits);
	if(dateYears > yearTwoDigits)
	{
		console.log("year is in 1900s");
		monthDiff = month - dateMonths;
		if(monthDiff < 0)
		{
			monthDiff = 12 + monthDiff;
			dateYears++;
		}
		var yearDiff = yearTwoDigits - dateYears + 100;
		var totalMonths = (yearDiff*12) + monthDiff;
	}
	else
	{
		console.log("year is in 2000s");
		if(dateYears == yearTwoDigits)
		{
			monthDiff = month- dateMonths
			var totalMonths = monthDiff;
		}
		else
		{
			monthDiff = month- dateMonths
			if(monthDiff < 0)
			{
				monthDiff = 12 + monthDiff;
				dateYears++;
			}
			var yearDiff = yearTwoDigits - dateYears;
			var totalMonths = (yearDiff*12) + monthDiff;	
		}
	}
	var totalBilled = totalMonths*rate;
	billedData.text(totalBilled);
	monthsData.text(totalMonths);
	newRow.append(nameData);
	newRow.append(roleData);
	newRow.append(startData);
	newRow.append(monthsData);
	newRow.append(rateData);
	newRow.append(billedData);
	$("#currentEmployees").append(newRow);
	console.log(totalMonths);
});
var name = "";
var role = "";
var start = "";
var rate = "";
var months = "";
var monthDiff = "";
$(".submit").on('click', function() {
	name = $("#employeeName").val();
	role = $("#employeeRole").val();
	start = $("#startDate").val();
	rate = $("#monthlyRate").val();
	employeeData.push({
    employeeName: name,
    employeeRole: role,
    employeeStart: start,
    employeeRate: rate,
    dateAdded: Firebase.ServerValue.TIMESTAMP
  });
	return false;
});