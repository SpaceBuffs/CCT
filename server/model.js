/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

model.js is the file where we ?

Version 2.01
1/25/2015
*/
Accounts.config({
  forbidClientAccountCreation : false
});

//needed for user to update a collection
/*
ActivitiesModel.allow({
  update:function(userId, doc, fields, modifier) {
    //anyone can update the collection
    //you can write some filters to restrict the updating to only owner of the document
    return true;
    }
});*/
