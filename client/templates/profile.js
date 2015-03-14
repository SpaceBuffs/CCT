Template.profile.helpers({
    name: function() {return Meteor.users.find({}, {fields: {'name':1}})},
    username: function() {return Meteor.user().username},
    email: function() {return Meteor.user().emails[0].address},
    missions: function() {return Meteor.users.find({}, {fields: {'missions':1}})},
    isAdmin: function() {return Meteor.users.find({}, {fields: {'isAdmin':1}})}

});





Meteor.users.update(Meteor.userID(),{ $set:{fields: {'isAdmin':"dfj"}}});
Meteor.users.update(Meteor.userID(),{ $set:{'missions':"dfj"}});
Meteor.users.update({_id:this._id},{ $set:{'isAdmin':"dfj"}});
Meteor.users.update({_id:Meteor.user()._id}, {$set:{'name':"anmejfd"}});
Meteor.users.update({_id:user()._id}, {$set:{'name':"anmejfd"}});
Meteor.users.update({_id:user._id}, {$set:{'name':"anmejfd"}});
Meteor.users.update({_id:userId}, {$set:{'name':'anmejfd'}});

/*
Template.editprofile.events({
                            
                            
    users.update(Meteor.userID(),{ $set:{'isAdmin':"dfj"}});
    users.update(Meteor.userID(),{ $set:{'missions':"dfj"}});
    users.update({_id:this._id},{ $set:{'isAdmin':"dfj"}});
    users.update({_id:Meteor.user()._id}, {$set:{'name':"anmejfd"}});
    users.update({_id:user()._id}, {$set:{'name':"anmejfd"}});

                            });

Meteor.users.insert({
                    fields:{
                    isAdmin: 'yes'
                    },
                    });

*/
Template.profile.events({
    "submit .user_info": function(event){
    var isAdmin = event.target.isAdmin.value;
    
    Meteor.users.update({_id:this._id},{ $set:{'isAdmin':"isAdmin"}
                        
       // missions : missions,
    });
                     
    //refresh form if submit is successful
    //event.target.accountType.value = "";
    
    //alert("Chat pushed!");
    return false;
}});
