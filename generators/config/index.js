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
            }], 
            function (answers) {
                this.config.set('templatesDir', answers.templatesDir);
                this.config.set('isConfigured', true);
                this.log('All configured !');
            }.bind(this));
        }
    }
});