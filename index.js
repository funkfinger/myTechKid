'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SUPPORTS: [
                'Did you try rebooting?',
                'Try rebooting it and checking again.',
                'Turning off and on the device may fix it.',
                'Restart and try again.',
                'Sometimes multiple reboots will work.',
                'Try unplugging and plugging it back in.',
                'Turn it off and on and try again.',
                'Reboot it again.',
                'Have you tried powering it off?',
                'Sometimes a reboot will fix it.'
            ],
            SKILL_NAME: 'Tech Support Kid',
            SUPPORT_MESSAGE_INTROS: [
              "Sure. ",
              "OK. ",
              "No problem. "
            ],
            HELP_MESSAGE: 'Before you call your kids, let me help you with you tech support problem.',
            HELP_REPROMPT: "Do you need support? If so, don't call your kid, ask me.",
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetSupport');
    },
    'GetNewSupportIntent': function () {
        this.emit('GetSupport');
    },
    'TechnicalSupportIntent': function () {
        this.emit('GetSupport');
    },
    'GetSupport': function () {
      const supportIntroArray = this.t('SUPPORT_MESSAGE_INTROS');
      const supportIntroIndex = Math.floor(Math.random() * supportIntroArray.length);
      const randomSupportIntro = supportIntroArray[supportIntroIndex];
      
      const supportArr = this.t('SUPPORTS');
      const supportIndex = Math.floor(Math.random() * supportArr.length);
      const randomSupport = supportArr[supportIndex];

      // Create speech output
      const speechOutput = randomSupportIntro + randomSupport;
      this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomSupport);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
