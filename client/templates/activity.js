//activity

GraviTeam.activities = {
  create : function(instrument, createdAt, experiment, start_date, duration, notes){
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
  new_notes : function(activity, new_notes){
	  ActivitiesModel.update({"_id" : activity},
	  {$set : { "notes" : new_notes }});
  },
  delete : function(activity){
	ActivitiesModel.remove({"_id" : activity});
  }
}
