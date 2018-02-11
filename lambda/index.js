
/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');


//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const APP_ID = '';

const SKILL_NAME = 'HackerMan';
const GET_FACT_MESSAGE = "Check it: ... It's ";
const GET_FACT_MESSAGE_1 = " but for ";
const HELP_MESSAGE = 'You can request a hack idea, you can request an advance hack idea, or, you can say exit and be lame... What can I enlighten you?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Happy Hacking!';



//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const tech = [
    'Spotify',
    'Shazam',
    'Turn Signals',
    'Amazon',
    'social skills',
    'Uber',
    'PostMates',
    'Hover',
    'Waymo',
    'Airbnb',
    'Lime Bike',
    'Mobile Ordering',
    'SnapChat',
    'FaceBook',
    'Google',
    'Amazon',
    'Twitch',
    'The Stock Market',
    'Cars',
    'Instagram',
    'Netflix',
    'Uncommon hacks',
    'Churches',
    'Waterbottles',
    'Duolingo',
    'FM radio',
    'Bitcoin',
    'LinkedIn',
    'animal',
    'Twitter'
];

const nouns = [
  'People',
  'Social Skills',
  'Apples',
  'companies',
  'beds',
  'floors',
  'people who spend 3 hours a day at the gym',
  'light switches',
  'celery', 'celery','celery','celery','celery','celery',
  'empty buildings',
  'puppies',
  'hackathons', 'hackathons', 'hackathons',
  'memes',
  'Amazon Alexa',
  'playing cards',
  'airports',
  'trains',
  'food, like... the GOOD kind',
  'Canada',
  'college students who don\'t take notes in class',
  'all the trees',
  'parking spaces',
  'people who need love',
  'people that butt dial',
  'bad presenters',
  'zoos',
  'shoes',
  'outerspace',
  'Jackie Chan',
  'old moldy drywall',
  'the exact same thing... but BETTER.',
  'friendship',
  'coffee',
  'pay checks',
  'families',
  'immigration reform',
  'replacing the electoral college',
  'applying for jobs',
  'professors',
  'getting married',
  'Typewritters'
];

const buzzwords = [
   'Machine Learning',
   'BlockChain',
   'Virtual Reality',
   'Augmented Reality',
   '3D printing',
   'Facial Tracking',
   'Facial Recognition',
   'Motion Sensors',
   'L-E-D lights',
   'Neural Networks',
   'Natural Language Processing',
   'Data Science',
   'a rest A-P-I',
   'celery',
   'a team of interns',
   'touch screens',
   'everything narrated by Morgan Freeman',
   'Artificial Intelligence',
   'Cross Platform Developement',
   'everything hosted on the cloud',
   'contextual analysis'
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

};

var idea = "Sorry fam, No ideas";

const handlers = {

    'LaunchRequest': function () {
        this.emit(':responseReady');
    },


    'getHack': function () {
        const factArr = tech;
        const nounArr = nouns;
        const factIndex = Math.floor((Math.floor(Math.random() * factArr.length) + Math.floor(Math.random() * factArr.length))/2);
        const randomTech = factArr[factIndex];
        const nounIndex = Math.floor(Math.random() * nounArr.length);
        const randomNoun = nounArr[nounIndex];

        var speechOutput = "Check it. It's" +  randomTech  + "<break time='400ms'/> <emphasis level='moderate'>but for</emphasis> " + "<prosody pitch= 'low'>" + randomNoun + "</prosody>";
        idea =  "So it's" +  randomTech  + "<break time='200ms'/> <emphasis level='moderate'>but for</emphasis> " + "<prosody pitch= 'low'>" + randomNoun + "</prosody>"
        var reprompt = "<break time='400ms' /> Would you like a more advanced hack idea?";
        speechOutput = speechOutput + reprompt;
        this.response.cardRenderer(SKILL_NAME, randomTech, randomNoun);

        this.emit(':ask', speechOutput, reprompt);
    },

    'AMAZON.YesIntent': function () {
        const buzzIndex = Math.floor(Math.random() * buzzwords.length);
        const randomBuzz = buzzwords[buzzIndex];
        var speechOutput = "and do it with <break time='300ms'/>" + randomBuzz;
        idea = idea +"<break time = '150ms'/>" +  speechOutput;
        this.emit(':tell', idea);
    },
    'AMAZON.NoIntent': function () {
        this.response.speak("That's probably for the best, you're not ready for anything more advanced.");
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};
