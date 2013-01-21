Zens
----------------
Small one-wire sensor software for my temperature and electricity measurements. Written in 
Javascript it runs on Node, backed by MongoDb on my Raspberry Pi (gen1).

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
* Separate jobs from  application
* Make graphs for > 1 month durations
* Separate system configuration from code
* Buy raspberry camera and connect ;)
