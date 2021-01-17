# twig-extension

## Inspiration

Even though everyone has been spending lots of time online due to the pandemic, a feeling of social connectedness is hard to come by. I know that I personally continue to set goals to text/call a certain number of people a week, but I often miss these targets. I wanted to take advantage of the fact that most people are spending lots of time on their computers to encourage people to reach out more.

## What it does

Twig is here to help give you a little nudge to reach out ("branch out") to the people you want to connect with.
It's designed as a lightweight Chrome extension and each time you open a new tab, it serves you up three people that you could reach out. Hopefully, it can do something as simple as inspire you to text one of your friends before you jump into watching another episode of your favorite Netflix show.

You simply enter the name of a friend and how often you want to connect with them. Twig will remember who you input so you don't have to do it each time you quit Chrome.

The user then has the option to check off if you’ve communicated with them or not to hold yourself accountable. 
You can remove connections too, but hopefully you continue to expand your network of people you're socially involved with.

## How I built it
I built twig using HTML/CSS and jQuery, as well as some Chrome-specific APIs that are built for extensions.

## Challenges I ran into
Building this alone over a short period of time was quite tricky; if my weekend schedule had been more open I would have loved to have some teammates to bounce ideas off of! 
I ran out of time for writing a function that referred to the frequency data that was collected, so for now the suggested connections are random picks. I also wanted to use the chrome.alarms API or something similar to schedule the standardization of three new picks being made each day.

## Accomplishments that I'm proud of
I am really proud of doing this all on my own and of the way I utilized chrome storage set/get requests in order to keep the connections stored persistently!         

## What I learned
I learned a lot more about Chrome's developer-oriented APIs as well as refreshed my jQuery skills.
Also, Chrome is transitioning its manifest version for extensions to version 3, and I had only used version 2 before, so I definitely learned a few new subtle differences there. 

## What's next for twig
I hope to implement picking people to connect with based on desired connection frequency and scheduling the picking daily in order to keep the same people in front of you for 24 hours/across each new tab. 

If I can make these adjustments, look out for twig on the Extension store! 


# How do I run twig?

Download the source files from this repo.
Go to chrome://extensions.
Turn on Developer Mode.
Click the "Load Unpacked" button at the top.
Select the local folder with downloaded files.
Twig should be at your fingertips!!



