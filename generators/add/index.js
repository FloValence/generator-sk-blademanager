'use strict';
var _ = require('lodash');
var yeoman = require('yeoman-generator');

var BladeBase = yeoman.Base.extend({
    getTemplate: function() {
        var that = this;
        that.fetch(
            'https://raw.githubusercontent.com/flovalence/sk-blade-' + that.appname + '/master/templates/main.ejs',
            that.destinationPath('temp/'),
            function (err) {
                if (err) that.log(err);

                var file = that.fs.read(that.destinationPath('temp/main.ejs'));

                that.fs.write(that.config.get('templatesDir') + '/blade-' + that.appname + '.ejs', file);
                that.log('Template blade-' + that.appname + ' has been added');
            }
        );
    },

    getReference: function() {
        var that = this;
        that.fetch(
            'https://raw.githubusercontent.com/flovalence/sk-blade-' + that.appname + '/master/sk-reference.json',
            that.destinationPath('temp/'),
            function (err) {
                if (err) that.log(err);

                var newRef = that.fs.readJSON(that.destinationPath('temp/sk-reference.json')),
                    allRef = that.fs.readJSON(that.destinationPath(that.config.get('templatesDir') + '/sk.json')) || {};

                allRef[that.appname] = newRef[that.appname];
                that.fs.writeJSON(that.destinationPath(that.config.get('templatesDir') + '/sk.json'), allRef);

                that.log('Template reference of blade-' + that.appname + ' has been added');
        });
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
        this.getTemplate();
        this.getReference();
    }
});

