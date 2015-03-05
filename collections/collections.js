/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

global.js is the file where we keep track of our collections

Version 2.02
1/25/2015
*/
Messages = new Meteor.Collection('messages');
//UserAccounts = new Mongo.Collection('user');
ActivitiesModel = new Mongo.Collection('activities');
ChatModel = new Mongo.Collection('chatMessages');

/*
ActivitiesModel.insert({"instrument": "Spectrometer", "createdAt": new Date(), "experiment": "spectroscopy", "start_date": new Date(2015, 1, 1), "duration": "40:00:00" });
ActivitiesModel.insert({"instrument": "CDA", "createdAt": new Date(), "experiment": "dust collection", "start_date": new Date(2015, 2, 1), "duration": "40:00:00" });
ActivitiesModel.insert({ "instrument": "Scatterometer", "createdAt": new Date(), "experiment": "scatter", "start_date": new Date(2015, 0, 1), "duration": "40:00:00" });
*/

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () {
      return ActivitiesModel.find({}); //might need to do db.activities.find({});
    }
    });
   Template.body.helpers({
    //Heather added to test something
    chatMessages: function () {
		return ChatModel.find({});
	}
  });
  

  //timeline functionality defined here: sort each activity in order by start_date,
  //and only return the activities defined in a date range (hard coded for now)
  var stop = new Date(2020, 0, 0);
  var start = new Date(1970, 0, 0);
  Template.timeline.events({
	"submit .new-timerange": function(event){ 
	var yy = event.target.StartYear.value;
	var mm = event.target.StartMonth.value-1;
	var hh = event.target.StartHour.value;
	var dd = event.target.StartDay.value;
	var hms = event.target.StartHMS.value;
	start = new Date(yy,mm,hh,dd);
	var yy = event.target.StopYear.value;
	var mm = event.target.StartMonth.value-1;
	var hh = event.target.StopHour.value;
	var dd = event.target.StopDay.value;
	var hms = event.target.StopHMS.value;
	stop = new Date(yy,mm,hh,dd);

	event.target.StartYear.value = "";
	event.target.StartMonth.value = "";
	event.target.StartHour.value = "";
	event.target.StartDay.value = "";
	event.target.StartHMS.value = "";
	event.target.StopYear.value = "";
	event.target.StopMonth.value = "";
	event.target.StopHour.value = "";
	event.target.StopDay.value = "";
	event.target.StopHMS.value = "";

	return false;
  }});

  Template.timeline.activities = function(){  
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }
  Template.chat.chatMessages = function(){
	  return ChatModel.find({});
  }

  //submit a new activity
  Template.aedactivity.events({
	"submit .new-activity": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var duration = event.target.duration.value;
	var notes = event.target.notes.value;
	
	ActivitiesModel.insert({
	instrument: instrument,
	createdAt : new Date(),
	experiment: experiment,
	start_date: new Date(startdate),
	duration: duration,
	notes:notes
        });

       //refresh form if submit is successful
       event.target.instrument.value = "";
       event.target.experiment.value = "";  
       event.target.startdate.value = "";
       event.target.duration.value = "";
       event.target.notes.value = "";

       alert("Activity Added!");
       window.location = "/timeline";
       return false;
  }});
  /*
   Template.chat.events({
	"submit .new-chatMessage": function(event){
	var chatMessage = event.target.chatMessage.value;
	
	ChatModel.insert({
		chatMessage: chatMessage,
		createdAt : new Date(),
        user_name : Meteor.user().username
        });

       //refresh form if submit is successful
       event.target.chatMessage.value = "";

       //alert("Chat pushed!");
       return false;
  }});*/

//--------------------------------------------------------------------------------------
  function addrows(data) {
    //loop over each activity***
    //alert("timeline4");
    count = ActivitiesModel.count();
    //alert("timeline5");
    for (var i = 0; i < count; i++) {
        //alert("timeline6");
        var instrument = ActivitiesModel.find()[i].instrument;
        var group = ActivitiesModel.find()[i].instrument;
        var experiment = ActivitiesModel.find()[i].experiment;
        var start = ActivitiesModel.find()[i].start_date;
        var end = new Date(2017,1,1);	
        var activityText = "<div title='"+experiment+"' class='order'>"+experiment+"</div>";
        var instrText = "<img src='img/truck-icon.png' style='width:24px; height:24px; vertical-align: middle'>"+instrument;
        data.addRow([start,end,activityText,instrText]);
	alert("Added experiment for "+instrument);
    };
    return data
  };

  function drawVisualization() {
    //alert("timeline2");
    // Create and populate a data table.
    var data = new google.visualization.DataTable();
    //alert("timeline3");
    //data.addColumn('string', '_id');
    //data.addColumn('string', 'instrument');
    //data.addColumn('string', 'experiment');
    data.addColumn('datetime', 'start');
    data.addColumn('datetime', 'end');
    //data.addColumn('float', 'power');
    //data.addColumn('string', 'notes');
    data.addColumn('string','content');
    data.addColumn('string', 'group');
    //loop over each activity***
    //data = addrows(data);
	
    var _id = "A02345";
    var instrument = "CDA";
    var group = "CDA";
    var experiment = "dust collection";
    var start = new Date(2015,1,1);
    var end = new Date(2015,1,3);
    var power = 24;
    var notes = "dust collection for 5 hours"
    var content = "instrument: "+instrument+"\nexperiment: "+experiment+"\nnotes: "+notes;
    var activityText = "<div title='"+experiment+"' class='order'>"+experiment+"</div>";
    var instrText = "<img src='img/truck-icon.png' style='width:30px; height:30px; vertical-align: middle'>"+instrument;
    //data.addRow([_id,group,instrument,experiment,start,end,power,notes,content]);
    data.addRow([start,end,activityText,instrText]);

    var instrument = "Spectrometer";
    var group = "Spectrometer";
    var experiment = "spectroscopy";
    var start = new Date(2015,1,2);
    var end = new Date(2015,1,2,4);
    var power = 24;
    var notes = "spec for 5 hours"
    var content = "instrument: "+instrument+"\nexperiment: "+experiment+"\nnotes: "+notes;
    var activityText = "<div title='"+experiment+"' class='order'>"+experiment+"</div>";
    var instrText = "<img src='img/truck-icon.png' style='width:30px; height:30px; vertical-align: middle'>"+instrument;
    //data.addRow([_id,group,instrument,experiment,start,end,power,notes,content]);
    data.addRow([start,end,activityText,instrText]);

		var group = "Radar";
		var instrument = "Radar";
		var start = new Date(2015,1,4,3);
		var experiment = "radiometry";
		var end = new Date(2015,1,5,3);
		var content = "instrument: "+instrument+"\nexperiment: "+experiment+"\nnotes: "+notes;
		var activityText = "<div title='"+experiment+"' class='order'>"+experiment+"</div>";
		var instrText = "<img src='img/truck-icon.png' style='width:30px; height:30px; vertical-align: middle'>"+instrument;
		//data.addRow([_id,group,instrument,experiment,start,end,power,notes,content]);
		data.addRow([start,end,activityText,instrText]);

		var group = "Photometer";
		var instrument = "Photometer";
		var start = new Date(2015,1,3);
		var experiment = "Visual Photo";
		var end = new Date(2015,1,3,12);
		var content = "instrument: "+instrument+"\nexperiment: "+experiment+"\nnotes: "+notes;
		var activityText = "<div title='"+experiment+"' class='order'>"+experiment+"</div>";
		var instrText = "<img src='img/truck-icon.png' style='width:30px; height:30px; vertical-align: middle'>"+instrument;
		//data.addRow([_id,group,instrument,experiment,start,end,power,notes,content]);
		data.addRow([start,end,activityText,instrText]);

    // specify options
    var options = {
      width:  "90%",
      //height: "300px",
      height: "auto",
      layout: "box",
      editable: true,
      eventMargin: 5,  // minimal margin between events
      eventMarginAxis: 0, // minimal margin beteen events and the axis
      showMajorLabels: false,
      axisOnTop: true,
      // groupsWidth : "200px",
      groupsChangeable : true,
      groupsOnRight: false,
      stackEvents: true
    };

    // Instantiate our timeline object.
    timeline = new links.Timeline(document.getElementById('mytimeline'), options);

    // Draw our timeline with the created data and options
    timeline.draw(data);

    //alert("timeline successfully rendered!");
  };

  Template.timeline.rendered= function() {
        var timeline = null;
        //google.load("visualization", "1");
        // Set callback to run when API is loaded
        //google.setOnLoadCallback(drawVisualization());
	//also try:
        google.load("visualization", "1", {callback:drawVisualization});
        // Called when the Visualization API is loaded.
	//alert("timeline rendered funciton");
  };
//--------------------------------------------------------------------------------------

  //update and delete activities
  Template.activity.events({
    "submit .update_activity_form": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var duration = event.target.duration.value;
	var notes = event.target.notes.value;
        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  start_date: new Date(startdate),
	  duration: duration,
	  notes:notes
          }}
        );
        alert("Activity Updated!");
	return false;
    },
    "click .delete": function(){
      var c = confirm("Delete Activity?");
      if (c) {
	alert("Activity Deleted!");
        ActivitiesModel.remove(this._id); 
      }
      else {
	alert("Activity Unmodified."); 
      }
      //return false;
     }
  });

} //end client code



/*
if (Meteor.isServer) {
ActivitiesModel.allow({
  update:function(userId, doc, fields, modifier) {
    //anyone can update the collection
    //you can write some filters to restrict the updating to only owner of the document
    return true;
    }
});
}*/ //THIS BROKE IT
