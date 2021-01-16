/* the functionality for the newtab page */
$(document).ready(function () {


    
    $("#connection-update").hide(); // hide the form
    $('#connection-display').hide(); // hide the list of all connections 
  
  
    onStart();
    pickThree();
  
  
  
    // when you click the 'add people' button, form becomes unhidden
    $("#connection-click").click(function () {
      $('#connection-update').toggle();
    });
  
   
  
    // https://stackoverflow.com/questions/16323360/submitting-html-form-using-jquery-ajax
  
    $("#add-connection").submit(function(event) { // when you click submit on form...
  
              /* stop form from submitting normally */
              event.preventDefault();
  
              // save name and frequency data
              // rn I'm not doing anything with the frequency data ngl
              var $form = $(this),
                  name = $form.find('input[name="name"]').val(),
                  freq = $form.find('select[name="frequency"]').val(),
                  
              form_array = [name, freq];
              
              // create a new connection using the information from the form
              newConnection(form_array);
            
              });
      
    $('#seeall').click(function(){
          
        getConnections();

        $('#connection-display').toggle(); // hide or show the full list of connections 
        //onStart(); //just in case it should still be hidden no matter what

  
      });
  
  
});

/* the supporting functions! may need to move these lmao */

function newConnection(info_array){
   
    // access the form info that was put into an array and sent to this function
    fullname = info_array[0];
    freq = info_array[1];
    
    // to the 'list' key...
    chrome.storage.sync.get("list", function(data) {
            
            data.list.push(info_array); // add this array as something stored within list array

            chrome.storage.sync.set({list: data.list}, function(){
                console.log("added to list");
            });
           
            // this console statement is for testing purposes to make sure something was put on ;)
            console.log(data.list);
        });  
  
}


function getConnections(){

    
    
    /* get all list info */
    chrome.storage.sync.get("list", function(data) {

        $('#connection-display').empty(); // reset what was there (this is def inefficient but idgaf rn )
        $('#connection-display').append("<p>All connections:</p>"); 
        for (var i = 0; i < data.list.length; i++){
            console.log(data.list[i][0]); // log name of connection 

            /* FOR LATER: is String() necessary?? */
            let to_append = "<div class = 'all-conn-display'>" + String(data.list[i][0]) + "</div>"; //idk if i need the string thing ngl
            $('#connection-display').append(to_append);

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
        shuffle(list_copy);

        let first_three = list_copy.slice(0, numPeople - 1);
        /* FOR LATER: play around with storing first_three based on day so
        that each time in a day when you open a new tab, 
        you're still looking @ same ppl
        */


        /* add these contacts*/

        for (var j = 0; j < first_three.length; j++){
            $('#to-connect-with').append("<div class = 'connection'>"+ `${first_three[j][0]}`+ "</div>");

        }

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
