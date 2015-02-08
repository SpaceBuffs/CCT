//activity

//if (Meteor.isClient) {
  // This code only runs on the client
//  Template.body.helpers({
//    activities: function (instrument, createdAt, ) {
//      return db.activities.find({});
//    }
//  });

//  Template.body.helpers({
//    activities: [
//      { instrument: "Spectrometer", createdAt: new Date(), experiment: "spectroscopy", start_date: "2015/038-12:00:00", duration: "30:00:00" }
//    ]
//  });

//}

activities = {
 create : function(instrument, experiment, start_date, duration){
 Activities.insert({
 "instrument" : instrument,
 "experiment" : experiment,
 "start_date" : start_date,
 "duration" : duration
 });
 }//,

// rename : function(graph, new_name){
// GraphsModel.update({“_id” : graph},{
// $set : {“name” : new_name}
// });
// },

// delete : function(graph){
// GraphsModel.remove({“_id” : graph});
// },

// change_current : function(graph){
// Session.set(“current_graph”, graph);
// }

};
