'use strict';
var path = require('path');
var _ = require('lodash');
var yeoman = require('yeoman-generator');

    var dest = {};
        dest.templates = 'app/templates';
        dest.reference = 'app/templates/reference';

var BladeBase = yeoman.Base.extend({
    getTemplate: function() {
        var that = this;
        this.fetch(
            'https://raw.githubusercontent.com/flovalence/sk-blade-' + this.appname + '/master/templates/main.ejs',
            dest.templates,
            function (err) {
                that.log(err);
                that.log('Template : ' + that.appname + ' has been loaded');
            }
        );
    },

    getReference: function() {
        var that = this;
        this.fetch(
            'https://raw.githubusercontent.com/flovalence/sk-blade-' + this.appname + '/master/sk-reference.json',
            dest.reference, 
            function (err) {
                that.log(err);
                that.log('Reference : ' + that.appname + ' has been loaded');
        });
    }
});

module.exports = BladeBase.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);

        this.argument('appname', { type: String, required: true });

        this.appname = _.kebabCase(this.appname);

        console.log(this.appname);

    },

    createBladeFiles: function () {
        this.getTemplate();
        this.getReference();
    }
});

