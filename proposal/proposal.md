# CSCI S-33a: Project Proposal
## Due: Friday, July 27 at 6pm

#### Your name

Mark McDonald

#### Your teaching fellow's name

Rodrigo Daboin Sanchez <daboinsanchez@college.harvard.edu>

#### Which language(s) will you use for your project?

HTML/CSS/SCSS
Javascript
SQLite
Python
(not certain if Flask or Django is best yet)


#### What will (likely) be the title of your project?

I have two proposals.  I would like to do the second option, but not sure if I can do this in a week.

Option1: Chatterbox v2
Option2: GroupRide

#### In just a sentence or two, summarize your project. (e.g. "A website that lets you check the weather in different cities.")

Option1: A website that allows registered users to create chat channels and participate in chat channels (expansion of Project2 using persistent storage and user authentication)
Option2: A website that will allow cyclists to plan group rides.  Ride organizers and make the GPS file available and choose to make the ride public or by invitation only.  Users will be able to provide feedback on the route selected so that future ride orginzaed by users can choose a route with decent ratings.

#### Where will your project ultimately live? (e.g. within CS50 IDE, Heroku, AWS, some commerical web host...)

I don't understand this question.  This project will be setup like all the other projects we have done in this class and will be run locally.  If there is a requirement to host this, I will host it to Heroku.

#### In a paragraph or more, detail your project. What will it do? What features will it have?

Option 1: Chatterbox will follow the same guidelines as Project2 excep the storage will be persistent and users will require authenication.  I will need to finish with Project3 before I can determine if Django or Flask is the best approach.  The database storage will be dependent on which approach is taken.  With Flask, I would likely use SQLalchemy.  I would also need to make this mobile-resonsive which will require a new design for the front end.

Option 2:  GroupRide is significantly more complex.  All users will require registration to particpate in the site.  Any user can be a ride organizer.  When a user chooses to setup a ride, he/she must decide if the ride is public or private.  Any rider wishing to join will only have access to the start time and start address if they select to join the ride.  (This way the ride organizer has an idea of how large the group will be).  All users who have access to a posted ride will be able to see who has opted to join the ride.  Private rides can only be seen by users who were invited by the ride organizer.   Each organized ride, will have a route.  Each route can receive comments by users so that the route can be evaluated by others.  When organizing a ride, a ride organizer can choose to select an existing route or create a new route.  Completed rides will be kept in a completed list of rides.  Users will be able to see upcoming rides separate from previous rides.  No geographc restrictions will be included.

Due to time constaints, I may have to curtail come of these functions.  For example, disallowing someone from joining a ride after it has started or ensuring that multuple routes are not uploaded.  If I have time, I would like to integrate some GPS analysis functionality that will calculate a GPS's distance and vertical feet of climbing.  I would also like to try to use an API (from Strava) to post the GPS ride on a map - I am not sure if I will have time to do all of this, but I would really like to.  Realisitically, if I could just get the most basic functions completed (user registration, route creation, ride creation, public/private, mobile-resonsiveness), I would be very happy.  I would prefer to pursue this option as it is a longer-term project that I would like to work on in my own time, but would need some flexibiilty in scope.

<hr>

- In the world of software, most everything takes longer to implement than you expect. And so it's not uncommon to accomplish less in a fixed amount of time than you hope.

#### In a sentence or list, define a GOOD outcome for your project. What WILL you accomplish no matter what?

Option 1: A functional chat application that works on a computer browser and mobile device.  Persistent storage of all channels with user authentication.
Option 2: A application working on a browser and mobile device with user authentication and persistent storage.  The ability for a user to create a route and a ride.  Allow users to join a ride and make comments on a route.  The ability for all users to see all routes stored on the site and the associated comments.

#### In a sentence or list, define a BETTER outcome for your project. What do you THINK you will accomplish in time?

Option 2: A more refined front-end that is more appealing.  The ability for the channel owner to delete posts on the channel or the entire channel.
Option 2: The ability to make a ride private so that only other users of the site can be invited.  Only invited users can see a ride they are invited to.  The ability to allow users to confirm that they will join a ride and display this status to anyone viewing details of the ride.

#### In a sentence or list, define a BEST outcome for your project. What do you HOPE you will accomplish in time?

Option 1: The ability for users to hide (or subsequently unhide) channels that they are not interested in.  The ability for a channel creator to make private channels that are only viewable by others that are invited to join the channel.

#### In a paragraph or more, outline your next steps. What new skills do you need to acquire? What topics will you need to research?

Option 1: If I do this application in Django, I'll need to figure out how channels in Django work.  From what I have seen, this may not be easy and possibily prohibitive.
			The first step is to create an authentication process.
			Next, moving the chat channels and data to persistent storage.
			After that, updating the design and making it mobile-responsive.


Option 2: Storing files on the server.  Using a complex API (Strava).  Displaying maps and map overlays.
			First step, data model design and user process definition.  Make scope a list of requirements.
			Next, basic front end design.  Decide how many different pages are needed and what parts are in HTML, CSS and Javascript.
			Then, review Strava API and determine if it can help with the mapping.  If not, see if other API's for builtin functionality can help.
			Determine if Flask or Django is best.
			
			
			
