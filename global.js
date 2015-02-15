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
	var stop = new Date(2015, 9, 2);
	var start = new Date(2014, 0, 0);
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }
  
  Template.aedactivity.events({
	"submit .new-activity": function(event){
	var instrument = event.target.insturment.value;
	var expirement = event.target.expirement.value;
	//var startdate = event.target.startdate.value;
	//startdate = new Date(startdate);
	var duration = event.target.duration.value;
	var notes = event.target.notes.value;
	
	ActivitiesModel.insert({
	instrument: instrument,
	createdAt : new Date(),
	experiment: experiment,
	//start_date: start_date, //TO DO: FIX THIS
	start_date: new Date(),
	duration: duration,
	notes:notes
	
     });
     
     event.target.startdate.value = "";
     event.target.duration.value = "";
     event.target.notes.value = "";
     
     return false;
  }
});
}
