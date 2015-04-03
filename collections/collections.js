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
//--------------------------chat--------------------------------------------
  Template.chat.chatMessages = function(){
	  return ChatModel.find({});
  };

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

//-----------------------activities--------------------------------------
  /*  Template.timeline.activities = function(){  
	return ActivitiesModel.find({"start_date": {$gt: start, $lt: stop}},{sort:{"start_date": 1}});
  }*/

  Template.timeline.activities = function(){  
	return ActivitiesModel.find({},{sort:{"startdate": 1}});
  };

  //submit a new activity
  Template.aedactivity.events({
	"submit .new-activity": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
	//var duration = event.target.duration.value;
	var notes = event.target.notes.value;
        var owner = Meteor.user();
	var accepted = owner.profile.isAdmin; 
        //***considered accepted if last updater was an admin when she updated it

        //***javascript assumes this date is LOCAL. Force it to be UTC...
        startdate = new Date(startdate)
        stopdate = new Date(stopdate)
        //startdate = new Date(startdate.getTime() - startdate.getTimezoneOffset() * 60000);
        //stopdate = new Date(stopdate.getTime() - stopdate.getTimezoneOffset() * 60000);

	ActivitiesModel.insert({
	instrument: instrument,
	createdAt: new Date(),
	experiment: experiment,
	startdate: startdate,//new Date(startdate),
	stopdate: stopdate,//new Date(stopdate),
	notes:notes,
	owner:owner,
        accepted:accepted
        });

/*
       //refresh form if submit is successful
       event.target.instrument.value = "";
       event.target.experiment.value = "";  
       event.target.startdate.value = "";
       event.target.stopdate.value = "";
       //event.target.duration.value = "";
       event.target.notes.value = "";
*/
       if (owner.profile.isAdmin) { alert("Activity accepted and added to timeline."); }
       else { alert("Activity submitted for approval."); }

       //window.location = "/timeline";
       return false;
  }});

  //If user is not an admin, don't show approve/update/delete buttons
  //***May want to change this so a non-admin can still udpate/delete activities
  Template.activity.rendered=function() {
    if (!Meteor.user().profile.isAdmin) {
      document.getElementById("approve_buttons").style.display = 'none';
    }
  };

  //show in UTC***
  //dates are saved in the DB as an ISODate variable in the form: 
  //Thu Apr 02 2015 21:38:57 GMT-0600 (MDT)
  //what we want: Apr 02 2015 21:38:57
  //Since can't save without a timezone, just chop of this last part, since users added activities in UTC
  //but the created At date is in local, so just cut off the timezone amount first
  //also cut off day of week by starting the substring at 4
  Template.activity.helpers({
    createdAtUTC: function() { 
        str= new Date(this.createdAt.getTime() + this.createdAt.getTimezoneOffset() * 60000);
	str = String(str);
	str = str.substring(4,str.indexOf(" GMT"));
	return str; },  
    startdateUTC: function() {
	str = String(this.startdate);
	str = str.substring(4,str.indexOf(" GMT"));
	return str; },
    stopdateUTC: function() {
	str = String(this.stopdate);
	str = str.substring(4,str.indexOf(" GMT"));
	return str; }
  });

  //update and delete activities
  Template.activity.events({
    "submit .update_activity_form": function(event){
	var instrument = event.target.instrument.value;
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
	//var duration = event.target.duration.value;
	var notes = event.target.notes.value;
        //update the owner
        var newowner = Meteor.user();
        var accepted = newowner.profile.isAdmin; 

        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  startdate: new Date(startdate),
	  stopdate: new Date(stopdate),
	  //duration: duration,
	  notes:notes,
	  owner:newowner,
	  accepted:accepted
          }}
        );
        alert("Activity Updated!");
        //window.close();
        window.opener.location.reload();
	return false;
    },
    "click .delete": function(){
      var c = confirm("Delete Activity?");
      if (c) {
        ActivitiesModel.remove(this._id); 
        alert("Activity Deleted!");
	window.close();
        window.opener.location.reload();
      }
      else {
	alert("Activity Unmodified."); 
      }
      //return false;
     },
    "click .approve": function(){
        if (this.accepted) {
	    alert("Already approved.");
	    return false;
	};
        //else, update the owner; colors will update on timeline refresh
        var newowner = Meteor.user();
        var accepted = newowner.profile.isAdmin; 
        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  owner:newowner,
	  accepted:accepted
          }}
        );
        alert("Activity approved!");
        //window.close();
        window.opener.location.reload();
    }
  });

//-----------------------------------------------profile

//***TAKE AWAY ADMIN PRIVELEDGES WHEN USER LOGS OUT - CURRENTLY NOT WORKING
/*
var logoutbutton = document.getElementById("login-buttons-logout"); //grab the element
logoutbutton.onclick = function() {
    alert("Aaaaah! No longer admin.");
    //Meteor.users.update(Meteor.userId(),{$set:{'profile.isAdmin': false}});
};
*/


Template.profile.helpers({
    //username and email are controlled by Meteor:
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    //However, extra profile info can be saved under profile.parametername:
    name: function() { return Meteor.user().profile.Name; },
    missions: function() { return Meteor.user().profile.missions; },
    isAdmin: function() { return Meteor.user().profile.isAdmin; }
});

Template.editprofile.helpers({
    //username and email are controlled by Meteor, need to update from the SERVER side: NOT DONE YET***
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    //However, extra profile info can be saved under profile.parametername:
    name: function() { return Meteor.user().profile.Name; },
    //missions: function() { return Meteor.user().profile.missions; },
    isAdmin: function() { return Meteor.user().profile.isAdmin; }
});

Template.editprofile.events({
    "submit .user_info": function(event){
    var name = event.target.fullname.value;
    //var username = event.target.user.value;
    var email = event.target.email.value; //***MUST DO FROM SERVER SIDE
    var isAdmin = document.getElementById("isAdmin").checked;//event.target.isAdmin.value;

    var checkBoxes = document.getElementsByTagName('input');
    var missions = [];
    for (var counter=0; counter < checkBoxes.length; counter++) {
      if (checkBoxes[counter].name == "mission" && checkBoxes[counter].checked == true) {
	missions.push(checkBoxes[counter].value);
        }
    }

    //var missions = event.target.mission.value;
    Meteor.users.update(Meteor.userId(),{$set:
        {
	 'profile.Name': name,
         'profile.isAdmin': isAdmin,
	 //username: username,
         email: email,
         'profile.missions': missions
        }}
    );
    alert("Your account has been updated.");
    window.location="/profile";
    return false;
}});

Template.editprofile.rendered=function() {
  if (Meteor.user().profile.isAdmin == true) { document.getElementById("isAdmin").checked = true; }
  var missions = Meteor.user().profile.missions;
  for (var counter=0; counter < missions.length; counter++) {
      document.getElementById(missions[counter]).checked = true;
  }
};

//------------end profile code

} //-----------------------------------------------------end client code
