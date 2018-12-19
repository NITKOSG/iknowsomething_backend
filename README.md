# I know Something

This would be a social network for nit kkr where students can react out to other with no problem and can get guidance in a new way.

## Steps to setup the API:
* Install nodejs for your os, to run the server, from 
[download node.js](https://nodejs.org/en/download/)

Note: You will need to make a config.js file in the project directory.
It's structure is similar to [config.js gist url](https://gist.github.com/war-turtle/208fab08315bc627982c7b7d7b423a90).
just add your mongodb url in the config.js file.

* Run the following command in the project directory to install all the required packages
```bash
npm install
```

* Run the following command in the project directory to run the server in development mode in linux
```bashu online thodi der mein

npm run dev
```

* To generate the Swagger API Docs in linux , run
```bash
npm run dev_gen
```

* To run the above commands in windows, type:
```bash
npm run dev_win
npm run dev_win_gen
```

## To run using docker-compose:
* Install Docker and then run:
```bash
docker-compose up
```
you will need to write mongo container if your are not using MLAB.

# Features to be added in the near future:

## Blog System!

  - It will give students opportunity to share their success or failure with everyone.
  - It will help students to write on a technology or a pseudo research papers where they can get reviews or appreciated by others.
  - It will be a new way to publish their write ups or content for magazines clubs.


## Project System
  - Would be main feature for NITKOSG.
  - People can discuss about their projects by filtering the technology tags in which they are interested.
  - Would be a new platform for students to contribute together or learn from other students/seniors projects.

## Question Paper/ Notes System
 - Would be replacement of campify.
 - Students can upload and take refernce of question papers of any year or sessionals.

## Events Meetings or talks
 - Students of same interest can make event or hold meetings to discuss something.
 - Other people also can join that meeting by seeing the events or meeting in the talks.

## Chat Sytems
 - There will be system like irc to talk to all people.
 - There would be person or public/private channels to chat with other people.

## Rules
 - Students can only join after verification of their institute email ids or id cards.
 - No fake ids or students on the social system
 - There will be option to report about any post or activity to make the social network clean.
