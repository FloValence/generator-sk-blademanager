"use strict";
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  	prompting: {
        roots: function () {
            this.prompt([{
                type    : 'input',
                name    : 'templatesDir',
                message : 'Specify the template directory',
                default : 'myApp/templates',
                store   : true
            },
            {
                type    : 'input',
                name    : 'referenceDir',
                message : 'Specify the template reference directory',
                default : 'myApp/templates/reference',
                store   : true
            }], 
            function (answers) {
                this.log(answers);
              	this.config.set('templatesDir', answers.templatesDir);
                this.config.set('referenceDir', answers.referenceDir);
                this.config.set('isConfigured', true);
            }.bind(this));

        }
    }
})