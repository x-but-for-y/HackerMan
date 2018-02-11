
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

const APP_ID = 'amzn1.ask.skill.1d35cd4e-a6f7-49ce-bf51-11d32a00045b';

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
    'Apple',
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
    'Stock Market'
];

const nouns = [
  'people',
  'social skills',
  'apples'
];
"outputSpeech": {
    "type": "SSML",
    "ssml": "<speak>This output speech uses SSML.</speak>"
};

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('getHack');
    },

    'getHack': function () {
        const factArr = tech;
        const nounArr = nouns;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomTech = factArr[factIndex];
        const nounIndex = Math.floor(Math.random() * nounArr.length);
        const randomNoun = nounArr[nounIndex]
        const speechOutput = {
          "type": "SSML",
          "ssml":  "<speak>Check it: ... it's <break time='2s'/>" + randomTech +
            "<break time='2s'/>" + GET_FACT_MESSAGE_1 + "<emphasis level='strong'>" +
            randomNoun + "</emphasis> " + "speak>"
          };


        this.response.cardRenderer(SKILL_NAME, randomTech, randomNoun);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.YesIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.NoIntent': function () {
        this.response.speak(STOP_MESSAGE);
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
