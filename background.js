chrome.runtime.onInstalled.addListener(function() {
    chrome.alarms.onAlarm.addListener(function(alarm) {
        alert("Beep");
      });

    
    chrome.storage.sync.set({list: []}, function(items) {
        console.log('list key created');
        
      });
    chrome.storage.sync.set({dailyConnections: undefined}, function(items) {
        console.log('dailyConnections key created');
        
      });
    
    
});

/* these next 2 ones are redundant bc i ran them in runtime.OnInstalled
but tbh I'm just desperate rn so i'm leaving them here just in case */
chrome.storage.sync.set({list: []}, function(items) {
    console.log('list key created');
    
  });
chrome.storage.sync.set({dailyConnections: undefined}, function(items) {
    console.log('dailyConnections key created');
    
  });


//ability to click on icon of extension to open new tab
// creds to ryanfarney and chrome documentation :)
// https://medium.com/@ryanfarney/creating-a-chrome-extension-that-will-open-in-a-new-tab-bc06b7eb54aa 
chrome.Action.onClicked.addListener(function(){
    chrome.tabs.create({'url': 'chrome://newtab'});
    
    

});

