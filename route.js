/*



*/
Router.configure({    
   timelineTemplate: 'timeline',
   profileTemplate: 'profile',
   whiteboardTemplate: 'whiteboard',
   chatTemplate: 'chat',
   chatArchiveTemplate: 'chatarchive',
   notFoundTemplate: 'notFound',
   loadingTemplate: 'loading',
   model3dTemplate: 'model3d',
   addactivityTemplate: 'aed_activity',
   selectactivityTemplate: 'activity',
   profileEditTemplate: 'profileEdit'
});

Router.map(function() {

   this.route('home', {path: '/'} );
   //this.route('Dashboard_page', {path: '/dashboard'} );

   // menus 
   this.route('my profile', { 
           path: '/profile',        
	  // this template will be rendered until the subscriptions are ready
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('userData', this.params._id);
	  },
	  action: function () {
	    this.render('profile');
	  }  
   });
 
   this.route('Whiteboard', { 
           path: '/whiteboard',    
	  // this template will be rendered until the subscriptions are ready
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('whiteboard');
	  }    
   });
  
   this.route('Chat', { 
          path: '/chat',
	  // this template will be rendered until the subscriptions are ready
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('userData', this.params._id);
	  },
	  action: function () {
	    this.render('chat');
	  }
   });

   this.route('ChatArchive', { 
           path: '/chatarchive',        
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('userData', this.params._id);
	  },
	  action: function () {
	    this.render('chatarchive');
	  }    
   });

   this.route('3D Model', { 
           path: '/model3d',        
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('model3d');
	  }  
   });

  this.route('Timeline Event', { 
	  // this template will be rendered until the subscriptions are ready
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('timeline');
	  },
          path: '/timeline'  
   });
  this.route('AddActivity', { 
           path: '/add_activity',        
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('aedactivity');
	  }   
   });
  this.route('activity', { 
          path: '/aed_activity',   
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('aedactivity');
	  }       
   });
   this.route('loading', {
            path: '/loading',
            template: 'loading'
   });
   this.route('SelectActivity', { 
           path: '/activity/:_id',  
	  // this template will be rendered until the subscriptions are ready
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('ActivitiesModel', this.params._id);
	  },
	  action: function () {
	    this.render('activity');
	  },
	   data: function(){
	       return ActivitiesModel.findOne({_id: this.params._id}); 
	   }
   });

   this.route('Edit Profile',{
          path: '/edit_profile',
	  loadingTemplate: 'loading',
	  waitOn: function () {
	    // return one handle, a function, or an array
	    return Meteor.subscribe('userData', this.params._id);
	  },
	  action: function () {
	    this.render('editprofile');
	  }
    });
  
});

var requireLogin = function() { 
  if (! Meteor.user()) {
   // If user is not logged in render home
   this.render('home');
 } else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
// Before any routing run the requireLogin function. 
// Except in the case of "home". 
// Note that you can add more pages in the exceptions if you want. (e.g. timeline, chat ...) 
Router.onBeforeAction(requireLogin, {except: ['home']});
