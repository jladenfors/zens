Zens
----------------
A one-wire sensor software for my temperature and electricity measurements. Written in purely in
Javascript it runs on Node, backed by MongoDb on my Raspberry Pi.

Techniques *you* might find interesting
* Angular frontend using RequireJs for dependecies and Bootstrap. 
* Mocha testcases
* Npm build process
* NodeJs backend in two different processes (jobs/http-server)

#Mocha testcase
Run "npm test" for mocha test cases, which should even work on your TeamCity instance ;)

# Run it! 
* Install Node
* Clone project
* Run "sudo npm install" to download dependencies 
* Start your mongodb instance
* Configure your installation in js/system_conf.js
* Use the init.d scripts to start the client app and the job runner.

#Todo
* Add minification to build process
* Write tests for frontend
* Switch to grunt for build
* See if mongo queries can run faster
* Make grahs configurable one time period
* Create Min/Max graphs
* Make graphs for > 1 month durations
* Buy raspberry pi compatible camera and connect ;)

#Resources
* http://www.raspberrypi.org/
* http://www.mongodb.org/
* http://angularjs.org/
* http://requirejs.org/
* http://nodejs.org/

