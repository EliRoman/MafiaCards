if (Meteor.isServer) {

  Meteor.startup(function() {

    return Meteor.methods({

		removeAllPosts: function() {
			return Posts.remove({});
		}

    });

  });

}

// grants access to a function that clears the database