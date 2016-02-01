# awscontest
This is for AWS hackster contest.
# WARNING
You have to cut the protective cover of wires for current measurement. It might be dangerous to do so. Please think before acting.

##What it do :
Simple 

First read the current reading with arduino then forward it to Dragonboard for further analysis (AI part). If it detects something funny it sends a message to to Amazon IoT it forwards the data to SNS it sends an email and an email if required it seems simple right. If you need help don't understand something you can send an email to mustafaunal_@_outlook.com

I'm new to this share code thing so if it doesn't work on your machine ( it works on mine :-) ) i might have uploaded someting wrong. please send me an email.

## Warning 
The AI algortihm in this example is simple. If you dont understand how this thing works or why this thing works. Please watch online lessons on Youtube or Edx or Coursera or < insert your favorite onlien lesson provider here >

English is not my first language so beware of some strange usage of English.

Hope you enjoy this system

## Softwares Used

Limdu for AI https://github.com/erelsgl/limdu
AWS SDK for IoT https://github.com/aws/aws-iot-device-sdk-js
AWS SDK for PHP https://github.com/aws/aws-sdk-php
AWS SDK for PHP Messaging validator https://github.com/aws/aws-php-sns-message-validator 
Twilo PHP SDK for SMS https://www.twilio.com/docs/php/install ( I use Twilo because Amazon SNS can only send SMS in USA :-( ))
For Arduino Power Code openenergymonitor.org
For printing floats http://playground.arduino.cc/Code/PrintFloats

use npm for node packages use composer for php packages they will make your life easier.

## Gotchas
You have to install php-curl library for twilo sdk to work. Then you should restart apache.
Only one active wire should go inside current sensor otherwise they cancel out each other.
For the system to work you should supply Arduino with external power 9V would be enough. USB power supply will lead to strange current readings due to ADC errors. (I use 5V pin)
You should change IP addresses, Certificate files etc. or the system will not work.
For 33 ohms I use three 100 ohms resistor in parallel. 







