Template.sendMessageTemplate.events({
    'submit #sendMessage' : function(e, t) {
        e.preventDefault();

        /*var sendMessage = function (fromId, toId, msg){
        var from = Meteor.users.findOne(fromId);
        var to = Meteor.users.findOne(toId);
        var fromEmail = contactEmail(from);
        var toEmail = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase()),;*/

        this.unblock();

            Email.send({
                to: toEmail,
                from: fromEmail,
                replyTo: fromEmail||undefined,
                subject: "GraviTeam Member: "+from.username+" has requested a password change!",
                text: "Hello " +to.username+", You are trying to reset you password.\n"+Meteor.absoluteUrl()+"\n",
            }); 
        }
})