/*
 Collaborative Campaign Tool
 GRAVITEAM by SPACEBUFFS
 
 Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver
 
 collections.js is used to interact with the database.
 
 Version 4.0
 4/28/2015
 
 */

ActivitiesModel = new Mongo.Collection('activities');
ChatModel = new Mongo.Collection('chatMessages');
SessionsModel = new Mongo.Collection('sessions');
UserData = new Mongo.Collection('userdata');

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () { return ActivitiesModel.find({}); },
    chatMessages: function () { return ChatModel.find({}); },
    sessions: function() { return SessionsModel.find({}); }
  });
    
  //--------------------------CHAT--------------------------------------------
  Template.chat.chatMessages = function(){
      var do_sessions_exist = SessionsModel.find({}).count();
      if (do_sessions_exist === 0) { return ChatModel.find({}); }
      else { return ChatModel.find({session : current_session().createdAt}); }
  };


  //------------------------CHAT ARCHIVE-----------------------------------

  Template.chatarchive.events({
    "submit .session_select_form": function(event){
	var select_session = [new Date(), new Date(), "none"];
	var date = new Date(event.target.date.value);
	var sec = Date.parse(date);
        //search sessions by most recent first; go backwards in time
	var session_start = 0;
	var session_stop = new Date();
	var foundit = 0;
        SessionsModel.find({},{sort:{"sec": -1}}).forEach(function(myDocument) {
		session_start = myDocument.sec;
		pm = myDocument.ProjectManager;
		session_date = myDocument.createdAt;
		if ((sec <= session_stop) && (sec > session_start)) {
			select_session = [session_date, new Date(session_stop), pm];
			session_stop = session_start;
			foundit = 1;
		} else {
			session_stop = session_start; //last session stopped when this session started
		}
	});
	if (foundit === 0) {
		document.getElementById("selected_session").innerHTML = "<br><b>No session exists at that time.";
		document.getElementById("chat_messages").innerHTML = "";
	}
	if (foundit === 1) {
		document.getElementById("selected_session").innerHTML = "<br><b>Session Info</b><br>Session start: "+select_session[0]+"<br>Session stop: "+select_session[1]+"<br>Project Manager: "+select_session[2]+"<br><b>_____________________________________________</b><p></p>";
		document.getElementById("chat_messages").innerHTML = "<b>Chat messages for this session:</b><p></p>";
		ChatModel.find({session : select_session[0]}).forEach(function(myDocument) {
			document.getElementById("chat_messages").innerHTML += "Message: "+myDocument.chatMessage+"<br>By: "+myDocument.name+"<br>Sent: "+myDocument.createdAtTime+", "+myDocument.createdAtDate+"<p></p>";
		});
	}
	return false; //prevent refresh
    }
  });

  //---------------------------CHAT and SESSIONS------------------------------------------
  current_session = function(){
	var session = new Object;
	SessionsModel.find({},{sort:{"sec": 1}}).forEach(function(myDocument) {
		session = myDocument; //return most recent session object
	});
	return session;
  };

  Template.chat.events({
	"submit .new-chatMessage": function(event){
		var chatMessage = event.target.chatMessage.value;
		var date = new Date();
		var session = current_session();
		var session_time = session.createdAt;
		ChatModel.insert({
			chatMessage : chatMessage,
			createdAtTime : date.toLocaleTimeString(),
			createdAtDate : date.toLocaleDateString(),
			name : Meteor.user().profile.Name, 
			//set session to the most recently created session in the DB
			session : session_time
		});
	       //refresh form if submit is successful
	       event.target.chatMessage.value = "";
	       return false;
	}
  });

//-----------------------ACTIVITIES--------------------------------------

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

	var notes = event.target.notes.value;
        var owner = Meteor.user();
	var approved = owner.profile.isAdmin; 
        //considered accepted if last updater was an admin when he/she updated it

        //javascript assumes this date is LOCAL. But when presented to the user, it will format it to UTC.
	var startdate_str = startdate
	var stopdate_str = stopdate
        startdate = new Date(startdate)
        stopdate = new Date(stopdate)

	ActivitiesModel.insert({
	instrument: instrument,
	createdAt: new Date(),
	experiment: experiment,
	startdate: startdate,
	stopdate: stopdate,
	startdate_str: startdate_str,
	stopdate_str: stopdate_str,
	notes:notes,
	owner:owner,
        approved:approved
        });

       if (owner.profile.isAdmin === true) { alert("Activity approved and added to timeline."); }
       else { alert("Activity submitted for approval."); }
       location.reload();
       return false;
  }});

  Template.activity.helpers({
    approved: function() {
	if (this.approved === true) { return "Activity is approved." }
	else { return "Activity waiting on approval." }
    },

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
	};
	var notes = event.target.notes.value;
        //update the owner
        var newowner = Meteor.user();
        var approved = newowner.profile.isAdmin; 
	var startdate_str = startdate
	var stopdate_str = stopdate
        startdate = new Date(startdate)
        stopdate = new Date(stopdate)

        ActivitiesModel.update({_id:this._id},{$set: 
          {
	  instrument: instrument,
	  experiment: experiment,
	  startdate: startdate,
	  stopdate: stopdate,
	  startdate_str: startdate_str,
	  stopdate_str: stopdate_str,
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

//-----------------------PROFILE and PROJECT MANAGEMENT----------------------------

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

Template.editprofile.events({
    "submit .user_info": function(event){
    var name = event.target.fullname.value;
    var oldname = Meteor.user().profile.Name; //will need this to check who PM is in case they change their name
    var email = event.target.email.value; //***MUST DO FROM SERVER SIDE
    var isAdmin = document.getElementById("isAdmin").checked;
    var do_sessions_exist = SessionsModel.find({}).count();
    var pm = current_session().current_ProjectManager;
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

    if (pm !== "none" && isAdmin && do_sessions_exist !== 0) {
	if (pm != name && pm != oldname) {
	    alert("Sorry, currently "+pm+" is project manager.\nYour activities will need to be approved by them.");
	    return false;
	}
    }
    if (pm === "none" && isAdmin) {
	alert("The last project manager logged out,\nso you are now the new Project Manager for this session.");
	SessionsModel.update(current_session()._id, {$set: {'current_ProjectManager': name}});
    }
    if (do_sessions_exist === 0 && isAdmin) {
	alert("You are now the Project Manager for a new session.");
	var session_time = new Date();
	SessionsModel.insert({
		createdAt: session_time,
		sec: Date.parse(session_time), //for easier sorting
		ProjectManager: name,
		current_ProjectManager: name //so can have diff PMs for the same session
	});
    }
    if (!isAdmin && pm === name) {
	alert("You will no longer be Project Manager for this session.\nAnother user can now become Project Manager.")
	SessionsModel.update(current_session()._id, {$set: {'current_ProjectManager': "none"}});
    }

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

Template.whiteboard.rendered=function() {
  document.getElementById('timeline_frame').style.height= div_height+"px"
}

} //-----------------------------------------------------end client code
