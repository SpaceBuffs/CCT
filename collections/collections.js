/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

global.js is the file where we keep track of our collections

Version 3.0
4/10/2015
*/
Messages = new Meteor.Collection('messages');
//UserAccounts = new Mongo.Collection('user');
ActivitiesModel = new Mongo.Collection('activities');
ChatModel = new Mongo.Collection('chatMessages');
SessionsModel = new Mongo.Collection('sessions');
//sessionId = 0;

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () { return ActivitiesModel.find({}); },
    chatMessages: function () { return ChatModel.find({}); },
    sessions: function() { return SessionsModel.find({}); }
  });
  //--------------------------chat--------------------------------------------
  Template.chat.chatMessages = function(){
      var date = new Date();
	  return ChatModel.find({createdAtDate : {$gte: date.toLocaleDateString()}});
      //return ChatModel.find({session : {$gte: sessionId}});

  };


  //------------------------CHAT ARCHIVE-----------------------------------
  var select_session = [new Date(), "none"];
  Template.chatarchive.events({
    "submit .session_select_form": function(event){
	var date = new Date(event.target.date.value);
	alert ("Searching for session around "+date+"...");
	var sec = Date.parse(date);
        //search sessions by most recent first; go backwards in time
	var session_start = Date.parse(new Date());
	var session_stop = Date.parse(new Date());
        SessionsModel.find({},{sort:{"sec": 1}}).forEach(function(myDocument) {
		session_start = myDocument.sec;
		pm = myDocument.ProjectManager;
		session_date = myDocument.createdAt;
		if (sec <= session_stop && sec > session_start) {
			select_session = [session_date, pm];
			alert("found session: "+session_date);
			return false;
		} else {
			session_stop = session_start; //last session stopped when this session started
		}
	});
	//else, no sessions found!
    }
  });

  Template.chatarchive.chatmessages = function() {
    alert("Searching for chats with session time equal to "+select_session[0]+"...");
    return ChatModel.find({session : select_session[0]});
  };

  Template.chatarchive.helpers({
      session_createdAt: function() { return select_session[0]},
      ProjectManager: function() { return select_session[1]}
  });


  //---------------------------CHAT and SESSIONS------------------------------------------
  current_session = function(){
	var time = new Date();
	SessionsModel.find({},{sort:{"sec": 1}}).forEach(function(myDocument) {
		/*if (myDocument.sec > current_session) { 
			current_session = myDocument.sec; 
			session_time = myDocument.createdAt;
		};*/
		time = myDocument.createdAt;
	});
        return time;
  };

  //*****
  Template.chat.events({
	"submit .new-chatMessage": function(event){
		var chatMessage = event.target.chatMessage.value;
		var date = new Date();
		var session_time = current_session();

		ChatModel.insert({
			chatMessage : chatMessage,
			createdAtTime : date.toLocaleTimeString(),
			createdAtDate : date.toLocaleDateString(),
			name : Meteor.user().profile.Name, //**or name?
			//set session to the most recently created session in the DB
			session : session_time
		});
	       //refresh form if submit is successful
	       event.target.chatMessage.value = "";

	       return false;
	}
  });

//-----------------------activities--------------------------------------

  Template.timeline.activities = function(){  
	return ActivitiesModel.find({},{sort:{"startdate": 1}});
  };

  //submit a new activity
  var instrument = "none";
  Template.aedactivity.events({
	"submit .select-instrument": function(event){
	instrument = event.target.instrument.value;
	if (instrument == "CDA") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Particle Analysis'>Particle Analysis</option><option value='Dust Collection'>Dust Collection</option><option value='Ion Collection'>Ion Collection</option><option value='Calibration for CDA'>Calibration for CDA</option></select>";
	}
	if (instrument == "HD Spectrograph") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Take Photo in Visual Spectrum'>Take Photo in Visual Spectrum</option<option value='Position Camera'>Position Camera</option></select>";
	}
	if (instrument == "Magnetometer") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Send Current to Make Magnetic Field'>Send Current to Make Magnetic Field</option><option value='Analyze Magnetic Field'>Analyze Magnetic Field</option></select>";
	}
	if (instrument == "Photometer") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Take Photo in Visual Spectrum'>Take Photo in Visual Spectrum</option><option value='Take Photo in Near Infared'>Take Photo in Near Infared</option><option value='Position Camera'>Position Camera</option></select>";
	}
	if (instrument == "Radar") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Radar'>Radar</option></select>";
	}
	if (instrument == "Scatterometer") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Particle Analysis'>Particle Analysis</option><option value='Dust Collection'>Dust Collection</option><option value='Ion Collection'>Ion Collection</option></select>";
	}
	if (instrument == "Spectrometer") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Take Photo in Visual Spectrum'>Take Photo in Visual Spectrum</option><option value='Position Camera'>Position Camera</option><option value='Measure Surface Gamma Rays'>Measure Surface Gamma Rays</option><option value='Map'>Map</option></select>";
	}
	if (instrument == "UV Spectrograph") {
	    document.getElementById("select-experiment").innerHTML = 
		"Experiment: <select name='experiment'><option value='Take Photo in Visual Spectrum'>Take Photo in Visual Spectrum</option><option value='Take Photo in Near Infared'>Take Photo in Near Infared</option><option value='Position Camera'>Position Camera</option></select>";
	}
	return false; //prevents refresh
	},
	"submit .new-activity": function(event){
        if (instrument == "none") {
		alert("Please select an instrument and experiment.");
		return false;
	};
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
        var date_regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
	var valid_date = (date_regex.test(startdate) && date_regex.test(stopdate));
	if (!valid_date) {
	    alert("Dates must be in UTC military format of the form: YYYY/MM/DD HH:MM:SS");
	    return false;
	}
	// YYYY/MM/DD HH:MM:SS
	//  /^\d{2}-\d{2}-\d{4}$/; for DD-MM-YYYY
	// ^([1-9]|[12]\d|3[0-6])$ for 1-36
	// ^([0-9]|[12]\d|3[0-6])$ for 00-23

	var notes = event.target.notes.value;
        var owner = Meteor.user();
	var approved = owner.profile.isAdmin;  //***may not exist
        //considered accepted if last updater was an admin when she updated it

        //javascript assumes this date is LOCAL. But when presented to the user, it will format it to UTC.
        startdate = new Date(startdate)
        stopdate = new Date(stopdate)

	ActivitiesModel.insert({
	instrument: instrument,
	createdAt: new Date(),
	experiment: experiment,
	startdate: startdate,
	stopdate: stopdate,
	notes:notes,
	owner:owner,
        approved:approved
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
       if (owner.profile.isAdmin === true) { alert("Activity approved and added to timeline."); }
       else { alert("Activity submitted for approval."); }
       //window.close();
       //window.opener.location.reload();
       location.reload();
       return false;
  }});

  //If user is not an admin, don't show approve/update/delete buttons
  //If activity is already accepted, don't show approve buttons
  //***May want to change this so a non-admin can still udpate/delete activities

  //show in UTC***
  //dates are saved in the DB as an ISODate variable in the form: 
  //Thu Apr 02 2015 21:38:57 GMT-0600 (MDT)
  //what we want: Apr 02 2015 21:38:57
  //Since can't save without a timezone, just chop of this last part, since users added activities in UTC
  //but the created At date is in local, so just cut off the timezone amount first
  //also cut off day of week by starting the substring at 4
  Template.activity.helpers({
    approved: function() {
	if (this.approved === true) { return "Activity is approved." }
	else { return "Activity waiting on approval." }
    },
/*
    approve_shown: function() { 
         if (Meteor.user().profile.isAdmin !== true) {  //if not an admin, never display
	    document.getElementById("approve_buttons").style.display = 'none'; }
         else if (this.accepted === false) { //if an admin but not accepted, show
            document.getElementById("approve_buttons").style.display = 'block'; }
         else { //if an admin and accepted
	    document.getElementById("approve_buttons").style.display = 'none'; }
	},
*/
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

  Template.activity.rendered= function() {
        if (Meteor.user().profile.isAdmin !== true) {  //if not an admin, never display
	    document.getElementById("approve_buttons").style.display = 'none'; }
        if (Meteor.user().profile.isAdmin !== true && this.approved === false) { //if an admin but not accepted, show
            document.getElementById("approve_buttons").style.display = 'block'; }
        if (Meteor.user().profile.isAdmin === true && this.approved === true) { //if an admin and accepted
	    document.getElementById("approve_buttons").style.display = 'none'; }
  }

  //update and delete activities
  var instrument = "none";
  Template.activity.events({
    "submit .update_activity_form": function(event){
	//if (Meteor.user().profile.isAdmin !== true) {
	//    alert("You must be a project manager to approve an activity.");
	//}//***
	var instrument = event.target.instrument.value;
        if (instrument == "none") {
		alert("Please select an instrument and experiment.");
		return false;
        };
	var experiment = event.target.experiment.value;
	var startdate = event.target.startdate.value;
	var stopdate = event.target.stopdate.value;
        var date_regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
	var valid_date = (date_regex.test(startdate) && date_regex.test(stopdate));
	if (!valid_date) {
	    alert("Dates must be in UTC military format of the form: YYYY/MM/DD HH:MM:SS");
	    return false;
	};
	var notes = event.target.notes.value;
        //update the owner
        var newowner = Meteor.user();
        var approved = newowner.profile.isAdmin; 

        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  startdate: new Date(startdate),
	  stopdate: new Date(stopdate),
	  //duration: duration,
	  notes:notes,
	  owner:newowner,
	  approved:approved
          }}
        );
        alert("Activity Updated!");
        window.close();
        window.opener.location.reload();
	return false;
    },
    "click .delete": function(){
	//if (Meteor.user().profile.isAdmin !== true) {
	//    alert("You must be a project manager to approve an activity.");
	//}//***
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
	if (Meteor.user().profile.isAdmin !== true) {
	    alert("You must be a project manager to approve an activity.");
	}
        else if (this.approved) {
	    alert("Already approved.");
	    return false;
	}
	else { //if you're an admin and it's not accepted
            //else, update the owner; colors will update on timeline refresh
            var newowner = Meteor.user();
            var approved = newowner.profile.isAdmin; 
            ActivitiesModel.update({_id:this._id},{$set: 
              {
	      owner:newowner,
	      approved:approved
              }}
            );
            alert("Activity approved!");
            window.close();
            window.opener.location.reload();
        }
    }
  });

//-----------------------------------------------profile

Template.profile.helpers({
    //username and email are controlled by Meteor:
    //username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    //However, extra profile info can be saved under profile.parametername:
    name: function() { return Meteor.user().profile.Name; },
    missions: function() { return Meteor.user().profile.missions; },
    isAdmin: function() { return Meteor.user().profile.isAdmin; },
    isprojectmanager: function() {
	if (Meteor.user().profile.isAdmin === true) {
		return "You are a project manager. All activities you create and edit will be automatically approved on the timeline. You have the authority to approve other user's activities.";
	}
	else {
		return "You are not a project manager. All activities submitted by you will appear as unapproved on the timeline until approved by a project manager.";
	}
    }
});

Template.editprofile.helpers({
    //username and email are controlled by Meteor, need to update from the SERVER side: NOT DONE YET***
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    //However, extra profile info can be saved under profile.parametername:
    name: function() { return Meteor.user().profile.Name; },
    //missions: function() { return Meteor.user().profile.missions; },
    isAdmin: function() { return Meteor.user().profile.isAdmin; },
    isprojectmanager: function() {
	if (Meteor.user().profile.isAdmin === true) {
		return "You are a project manager. All activities you create and edit will be automatically approved on the timeline. You have the authority to approve other user's activities.";
	}
	else {
		return "You are not a project manager. All activities submitted by you will appear as unapproved on the timeline until approved by a project manager.";
	}
    }
});

pm_exists = function() {
    //****************
    //find out if a project manager currently exists.
    var pmexists = false;
    var pm = "none";
    Meteor.users.find({}).forEach(function(myDocument) {
        if (myDocument.profile.isAdmin === true) { 
            pmexists = true; 
            pm = myDocument.profile.Name;
        };
    });
    return [pmexists, pm];
};

Template.editprofile.events({
    "submit .user_info": function(event){
    var name = event.target.fullname.value;
    var oldname = Meteor.user().profile.Name; //will need this to check who PM is in case they change their name
    //var username = event.target.user.value;
    var email = event.target.email.value; //***MUST DO FROM SERVER SIDE
    var isAdmin = document.getElementById("isAdmin").checked;//event.target.isAdmin.value;
    var pm = pm_exists();
    if (pm[0] && isAdmin) {
	if (pm[1] != name && pm[1] != oldname) {
	    alert("Sorry, currently "+pm[1]+" is project manager.\nYour activities will need to be approved by them.");
	    return false;
	}
    }
    if (name == "" || email == "") {
	alert("Please fill in full name and e-mail fields.");
	return false;
    }
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
  if (Meteor.user().profile.isAdmin === true) { document.getElementById("isAdmin").checked = true; }
  var missions = Meteor.user().profile.missions;
  for (var counter=0; counter < missions.length; counter++) {
      document.getElementById(missions[counter]).checked = true;
  }
};

//------------end profile code

} //-----------------------------------------------------end client code
