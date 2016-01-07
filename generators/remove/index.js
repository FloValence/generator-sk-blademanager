'use strict';
var _ = require('lodash');
var yeoman = require('yeoman-generator');

var BladeBase = yeoman.Base.extend({
    delTemplate: function() {
        this.fs.delete(this.config.get('templatesDir') + '/blade-' + this.appname + '.ejs');
        this.log('Template blade-' + this.appname + ' has been removed');
    },

    delReference: function() {
        var allRef = this.fs.readJSON(this.destinationPath(this.config.get('templatesDir') + '/sk.json')) || {};

        delete allRef[this.appname];

        this.fs.writeJSON(this.destinationPath(this.config.get('templatesDir') + '/sk.json'), allRef);

        this.log('Template reference of blade-' + this.appname + ' has been removed');
    }
});

module.exports = BladeBase.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('appname', { type: String, required: true });

        this.appname = _.kebabCase(this.appname);
    },

    config: function() {
        if (this.config.get('isConfigured')) return;
        this.config.set('templatesDir', 'myApp/templates');
    },

    createBladeFiles: function () {
        this.delTemplate();
        this.delReference();
    }
});

