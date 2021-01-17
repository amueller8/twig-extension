/* the supporting functions! rn they are all at the top which is probably
a bit confusing. sorry but not sorry.
*/

function newConnection(info_array) {
    // access the form info that was put into an array and sent to this function
    // to the 'list' key...

    chrome.storage.sync.get("list", function(data) {
            
            if (data.list === undefined){
                data.list = [];
            }
            data.list.push(info_array); // add this array as something stored within list array

            chrome.storage.sync.set({list: data.list}, function(){
                console.log("added to list");
            });
           
            // this console statement is for testing purposes to make sure something was put on ;)
            //console.log(data.list);
        });  
  
}


function getConnections(){

    
    
    /* get all list info */
    chrome.storage.sync.get("list", function(data) {

        $('#connection-display').empty(); // reset what was there (this is def inefficient but idgaf rn )
        $('#connection-display').append("<p>All Connections: </p>"); 



        try {
            for (var i = 0; i < data.list.length; i++){
                console.log(data.list[i][0]); // log name of connection 
    
                /* FOR LATER: is String() necessary?? */
                let to_append = "<div class = 'all-conn-display'>" + "<p>" + String(data.list[i][0]) + "</p>" + "<span class='material-icons clearallconns'> person_remove </span>"+ "</div>"; //idk if i need the string thing ngl
                $('#connection-display').append(to_append);

    
            }

            $('.clearallconns').click(function(){
                let findthep = $(this).parent().children("p");

                let name = findthep[0].innerText;

                for (var j = 0; j < data.list.length; j++){
                    if (data.list[j][0] == name){
                        // remove one entry matching the name from the list
                        
                        //console.log(data.list, "before");
                        data.list.splice(j, 1);
                        //console.log(data.list, "after");

                        chrome.storage.sync.set({list: data.list}, function(){
                            console.log("removed??");

                        });

                        

                        

                    }
                }

                
                
                $(this).parent().remove();


                // access list 


            });

        } catch (TypeError) {
            ;
        }
        

       

    });



}

function pickConnections(numPeople){
    /* picks a certain number of ppl to reach out to that day.
    based on the current css and stuff I've written, I'm gonna
    call this with 3 as the input bc the circles get ugly w more haha
    */
   if (numPeople === 0){
       // can't show 0 people, what's the point??
       numPeople = 1;
   }

    chrome.storage.sync.get("list", function(data) {
        let list_copy = data.list;

        try {
            
            shuffle(list_copy);
            let first_three = list_copy.slice(0, numPeople);

            // comment out this try/catch block if things get messed up ;)
            /*
            try {
                
                todays_date = new Date();
                let day_of_week = todays_date.Day();
                
                chrome.storage.sync.get("dailyConnections", function(data) {
                    console.log(data.dailyConnections);
                    if (data.dailyConnections === undefined){
                       chrome.storage.sync.set({dailyConnections: [first_three, day_of_week]}, function(){
                            console.log('daily connections set as ', first_three);

                       });
                    } 
                    else if (data.dailyConnections[1] != day_of_week) {
                        chrome.storage.sync.set({dailyConnections: [first_three, day_of_week]});
                            console.log('daily connections reset as ', first_three);

                    } else {
                        console.log('same day??');
                    }

                });


                } catch {
                    //this kept running/executing 
                    console.log("somethings up");

                    

                }
            */

            
            
             
            for (var j = 0; j < first_three.length; j++){
                $('#to-connect-with').append("<div class = 'connection'>"+ "<p>" + `${first_three[j][0]}`+ "</p>" + "</div>");
    
            }
            
            // this lacks the frequency data 

            /*
            // this bit was part of trying to have the same daily connections set for a day
            chrome.storage.sync.get("dailyConnections", function(data){
                if (data.dailyConnections != undefined){
                    ppl_to_see = data.dailyConnections[0];
                    for (var j = 0; j < ppl_to_see.length; j++){
                    $('#to-connect-with').append("<div class = 'connection'>"+ `${ppl_to_see[j]}`+ "</div>");

                }


                }
                
            });
            */
    
            /* for these newly created connections... */
            // i played around with putting this code in the doc.ready
            // and if I remember correctly it wouldn't work?? bc the elements didn't
            // exist?? idek man
    
            /* alerts to ask if you connected */
            $('.connection').click(function(){
                console.log('connection clicked');
           
        
                let alert = window.confirm("Did you connect with this person today?");
                if (alert){
                    $(this).addClass('made-connection');
                } else {
                    ;
                }
    
            });

            let areDailyConnectionsPicked = true;
            console.log("the daily connections were picked");
    
    
    

        } catch (TypeError) {

            let areDailyConnectionsPicked = false;

            ;

        }
        

        
        
        /* FOR LATER: play around with storing first_three based on day so
        that each time in a day when you open a new tab, 
        you're still looking @ same ppl

        could use chrome.alarms
        */


        /* add these contacts*/

    });


}

// Knuth shuffle to be used on array
// in an ideal world, I will use this or something like it but
// figure out a way to adjust for the frequency data I already collected
// https://github.com/coolaj86/knuth-shuffle 
function shuffle(array) {
    // not my own shuffle
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}



/* maybe add something about the current date? and use it to save the 3 connections of the day */



/* the functionality for the newtab page */
$(document).ready(function () {

    /* for emergency reset purposes */
    
    /*
    chrome.storage.sync.set({list: []}, function(items) {
        console.log('list key created');

        items.list = [];
        
    }); */
    
    

    $("#connection-update").hide(); // hide the form
    $('#connection-display').hide(); // hide the list of all connections 
  
  
    let areDailyConnectionsPicked = false;
    pickConnections(3);
  
  
    // when you click the 'add people' button, form becomes unhidden
    $("#connection-click").click(function () {
      $('#connection-update').toggle();
    });
  
   
  
    // https://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
  
    $("#add-connection").submit(function(event) {

        /* stop form from submitting normally */
        
        event.preventDefault();

        var $form = $(this),
            name = $form.find('input[name="name"]').val(),
            //lname = $form.find('input[name="lname"]').val(),
            freq = $form.find('select[name="frequency"]').val(),
            
        form_array = [name, freq];
        
        newConnection(form_array);

        // check length list, if >= 3, pop up the circles

        chrome.storage.sync.get("list", function(data){
            if (!areDailyConnectionsPicked && data.list.length >= 0){
                console.log(data.list.length, "datalist");
                if(data.list.length < 2){
                    for (var j = 0; j < data.list.length; j++){
                        $('#to-connect-with').append("<div class = 'connection'>"+ `${data.list[j][0]}`+ "</div>");
    
                    }


                } else {
                    $('#to-connect-with').empty(); 
                    console.log('cleared');
                    pickConnections(3);
                }
            } else {
                $('#to-connect-with').empty();
                console.log('cleared');


            }


        });
         

        

        

    });

   
    
    $('#seeall').click(function(){
        
        
        // if people have been added from empty, pick connections again 
        
        getConnections();


        $('#connection-display').toggle(); // hide or show the full list of connections 
        //onStart(); //just in case it should still be hidden no matter what


      });

      /*
    $('#clearallconns').click(function(){
        console.log('clicked')
        //$('#connection-display').toggle(); // hide or show the full list of connections
        
        chrome.storage.sync.set({list: []}, function(items) {
            console.log('list key created');
    
            items.list = [];
            
        });
    
    });
    */
    


});
  


