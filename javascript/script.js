var currentDay = $("#currentDay");
var containerDiv = $(".container");

currentDay.text(moment().format("dddd, MMMM Do"));

var timeArray = [
    {timeStr: "09", timeInt: 9, ampm: "am"},
    {timeStr: "10", timeInt: 10, ampm: "am"},
    {timeStr: "11", timeInt: 11, ampm: "am"},
    {timeStr: "12", timeInt: 12, ampm: "pm"},
    {timeStr: "13", timeInt: 1, ampm: "pm"},
    {timeStr: "14", timeInt: 2, ampm: "pm"},
    {timeStr: "15", timeInt: 3, ampm: "pm"},
    {timeStr: "16", timeInt: 4, ampm: "pm"},
    {timeStr: "17", timeInt: 5, ampm: "pm"}
];

for (var i=0;i<timeArray.length;i++) {
    var rowDiv = $("<div>");
    rowDiv.addClass("row");

    var hourSpan = $("<span>");
    hourSpan.addClass("hour");
    hourSpan.text(timeArray[i].timeInt+timeArray[i].ampm.toUpperCase());

    var text = $("<textarea>");
    if (moment().isBefore(moment(moment().format("YYYY-MM-DD ")+timeArray[i].timeStr+moment().format(":mm:ss")))) {
        text.addClass("future");
    } else if (moment().isSame(moment(moment().format("YYYY-MM-DD ")+timeArray[i].timeStr+moment().format(":mm:ss")),"hour")) {
        text.addClass("present");
    } else {
        text.addClass("past");
    }
    text.val(localStorage.getItem("row"+i));

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

$(".saveBtn").on("click", function() {
    var rowNum = parseInt($(this).attr("id"));
    localStorage.setItem("row"+rowNum,$(this).prev().val());
});