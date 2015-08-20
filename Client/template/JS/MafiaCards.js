if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set('inSession', false);
    Session.set('form_changed', Date.now() );
  });

  playerCount=0;
  numMafia=0;
  var i = 0;

  Template.MafiaCards.helpers({
    inSession: function () {
      return Session.get('inSession');
    }
  });

  Template.Phase1.helpers({//here here here
    player: function(){
      console.log(players.find());
      return players.find();
    },

    form_changed: function () {
      return Session.get('form_changed');
    }
  });

  Template.Phase1.form_changed = function(){
    return Session.get('form_changed');
  };

  function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }

  Template.Phase1.events({
    'click #btnGetNameFields': function () {
      // Meteor.call('removeAllPosts');
      // players.remove({}); 

      //on input; calc and populate variables
      playerCount = document.getElementById("totalNum").value;
      numMafia = Math.round(playerCount / 3);

      roles = new Array(playerCount);//assign variables to collection
      

      //assignes roles to array based on numMafia, then shuffles the array
      for ( i = 0; i <= numMafia; i++) {
          roles[i] = "Mafia";
      };
      for ( i = numMafia; i < playerCount; i++) {
          roles[i] = "Town";
      };
      roles = shuffle(roles);

      for ( i = 0; i < playerCount; i++) {//assigning all player data to allPlayers array
        if (roles[i]=="Mafia") {
          players.insert({
            name: ("player"+i),
            role: roles[i],
            playerNum: i,
            img: "/image/mafia.png"
          });
        };

        if (roles[i]=="Town") {
          players.insert({
            name: ("player"+i),
            role: roles[i],
            playerNum: i,
            img: "/image/town.png"
          });
        };

      };

      // Session.set('inSession', true);
      Session.set('form_changed', Date.now() );//changed to make template update
    },
    'keyup input.pName': function (e){
      if (e.type == "keyup" && e.which == 13) {//on input of enter update database
        
        players.update({
          "_id": this._id
        }, { $set:
            {"name": document.getElementById(this._id).value}
        });
      }
    },
    'click #btnSubmit': function (){

      Session.set('inSession', true);
    },
    'click .delete': function (){
            players.remove(this._id);
    }
  });

  Template.town.helpers({
    inPlayer: function(){
      return players.find({
      });
    }
    // ,
    // outPlayer: function(){
    //   return players.find({
    //     in: "False"
    //   });
    // }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //on startup
  });
}

Math.random()