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
           template: 'profile'    
   });
 
   this.route('Whiteboard', { 
           path: '/whiteboard',        
           template: 'whiteboard',    
   });
  
   this.route('Chat', { 
           path: '/chat',        
           template: 'chat',    
   });

   this.route('ChatArchive', { 
           path: '/chatarchive',        
           template: 'chatarchive',    
   });

   this.route('3D Model', { 
           path: '/model3d',        
           template: 'model3d',    
   });

  this.route('Timeline Event', { 
           path: '/timeline',        
           template: 'timeline'    
   });
  this.route('AddActivity', { 
           path: '/add_activity',        
           template: 'aedactivity'    
   });
  this.route('activity', { 
           path: '/aed_activity',        
           template: 'aedactivity'    
   });
   this.route('SelectActivity', { 
           path: '/activity/:_id',  
           template: 'activity',
	   data: function(){
	       return ActivitiesModel.findOne({_id: this.params._id}); 
	   }
   });
   this.route('Edit Profile',{
            path: '/edit_profile',
            template: 'editprofile'
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
