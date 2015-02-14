/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

global.js is the file where we keep track of our collections

Version 2.02
1/25/2015
*/

UserAccounts = new Mongo.Collection('user');

// activities
ActivitiesModel = new Mongo.Collection('activities');

ActivitiesModel.insert({"instrument": "Spectrometer", "createdAt": new Date(), "experiment": "spectroscopy", "start_date": new Date(2015, 1, 1), "duration": "40:00:00" });

ActivitiesModel.insert({"instrument": "CDA", "createdAt": new Date(), "experiment": "dust collection", "start_date": new Date(2015, 2, 1), "duration": "40:00:00" });

ActivitiesModel.insert({"instrument": "Scatterometer", "createdAt": new Date(), "experiment": "scatter", "start_date": new Date(2015, 0, 1), "duration": "40:00:00" });
//to test. This is how you would insert an activity from the command line or by code***

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () {
      return ActivitiesModel.find({}); //might need to do db.activities.find({});
    }
  });

  //timeline functionality defined here: sort each activity in order by start_date,
  //and only return the activities defined in a date range (hard coded for now)
  Template.timeline.activities = function(){
	var stop = new Date(2015, 1, 2);
	var start = new Date(2014, 0, 0);
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }
}

//window.load = function() {
//  var div1 = document.getElementById('app_window').innerHTML;
//  var div2 = "There's the div 2 contents!";
//  var div3 = "There's the div 3 contents!";

// document.getElementById('div1').onclick = function() {
//   document.getElementById('app_window').innerHTML = div1;
// }
// document.getElementById('div2').onclick = function() {
//   document.getElementById('app_window').innerHTML = div2;
// }
// document.getElementById('div3').onclick = function() {
//   document.getElementById('app_window').innerHTML = div3;
// }
//}

//--------------------------------------------------------------
