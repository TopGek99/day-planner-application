// first three lines add the current day at the top of the page using moment.js
var currentDay = $("#currentDay");
var containerDiv = $(".container");
currentDay.text(moment().format("dddd, MMMM Do"));

// creating an array of objects to contain the information needed for each row of the day planner
// note: ampm member only stores "a" or "p" as "m" is a common char between them and can be added later
var timeArray = [
    {timeStr: "09", timeInt: 9, ampm: "a"},
    {timeStr: "10", timeInt: 10, ampm: "a"},
    {timeStr: "11", timeInt: 11, ampm: "a"},
    {timeStr: "12", timeInt: 12, ampm: "p"},
    {timeStr: "13", timeInt: 1, ampm: "p"},
    {timeStr: "14", timeInt: 2, ampm: "p"},
    {timeStr: "15", timeInt: 3, ampm: "p"},
    {timeStr: "16", timeInt: 4, ampm: "p"},
    {timeStr: "17", timeInt: 5, ampm: "p"}
];

// loop populates the page with the day planner's individual rows on each iteration
for (var i=0;i<timeArray.length;i++) {
    var rowDiv = $("<div>");
    rowDiv.addClass("row");

    // line 27 uses the object at the ith position in timeArray to display the hour
    var hourSpan = $("<span>");
    hourSpan.addClass("hour");
    hourSpan.text(timeArray[i].timeInt+timeArray[i].ampm.toUpperCase()+"M");

    // rowMoment is a moment including the current date, and the hour respective to the current row
    var rowMoment = moment(moment().format("YYYY-MM-DD ")+timeArray[i].timeStr);
    var text = $("<textarea>");
    // if/else if/else checks if the current moment is before, the same as (in the hour component)
    // or after (left as an else as it is the only other possibility) the hour of the current row
    if (moment().isBefore(rowMoment)) {
        text.addClass("future");
    } else if (moment().isSame(rowMoment,"hour")) {
        text.addClass("present");
    } else {
        text.addClass("past");
    }
    // populates the row with the text associated with it in local storage, if any
    text.val(localStorage.getItem("row"+i));

    // line 47 gives the save button an id to use as reference in the event listener applied to it
    var saveButton = $("<button>");
    saveButton.addClass("saveBtn");
    saveButton.attr("id",i);
    var saveIcon = $("<i>");
    saveIcon.addClass("fa fa-save");
    saveButton.append(saveIcon);
    

    rowDiv.append(hourSpan);
    rowDiv.append(text);
    rowDiv.append(saveButton);
    containerDiv.append(rowDiv);
}

// save button event listener added to get the id from the save button that was clicked and save the
// respective text in local storage
$(".saveBtn").on("click", function() {
    var rowNum = parseInt($(this).attr("id"));
    localStorage.setItem("row"+rowNum,$(this).prev().val());
});