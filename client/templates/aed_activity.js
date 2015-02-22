//activity

GraviTeam.aedactivities = {
  create : function(instrument, createdAt, experiment, start_date, duration){
    ActivitiesModel.insert({
	"instrument": instrument,
	"createdAt" : createdAt,
	"experiment": experiment,
	"start_date": start_date,
	"duration": duration,
	"notes":notes
        });
  },
  new_date : function(activity, new_start_date){
    ActivitiesModel.update({"_id" : activity},
      {$set : { "start_date" : new_start_date }});
  },
  new_duration : function(activity, new_duration){
    ActivitiesModel.update({"_id" : activity},
      {$set : { "duration" : new_duration }});
  },
  delete : function(activity){
	ActivitiesModel.remove({"_id" : activity});
  },
  convert_to_epoch : function(start_date){
    var myDate = new Date(start_date); // Your timezone in form "July 1, 1978 02:30:00"
    var myEpoch = myDate.getTime()/1000.0;
    return myEpoch; //This is so we can order by start date
  }
}
