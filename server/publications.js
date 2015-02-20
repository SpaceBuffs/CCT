/*

*/
Meteor.publish('ActivitiesModel', function () {
   return ActivitiesModel.find({},{
   	limit: 3
   	//sort: {timeCreated: -1}
   }); 
}); 