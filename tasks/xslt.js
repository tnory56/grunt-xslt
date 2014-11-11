/*
 * grunt-xslt
 * https://github.com/tnory56/grunt-xslt
 *
 * Copyright (c) 2014 Thomas Norberg
 * Licensed under the MIT license.
 */

'use strict';
var path = require('path');
var chalk = require('chalk');
module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('xslt', 'This plugin will help create xslt files from html template.', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            replacements: {}
        });

        this.files.forEach(function (file) {
            var fixedSrc = '';
            var modifiedSrc = '';
            file.src.filter(function (filepath) {
                var src = grunt.file.read(filepath, 'utf8', function (err) {
                    if (err) {
                        return grunt.log.writeln(err);
                    }
                });
                if(modifiedSrc === '' && fixedSrc === '') {
                    fixedSrc = src.replace(/(\r\n|\n|\r)/gm, "");
                    modifiedSrc = fixedSrc;
                }
                if (typeof options.replacements[filepath] !== 'undefined') {
                    var replacements = options.replacements[filepath];
                    for (var replaceme in replacements) {
                        var txtReplace = replacements[replaceme];
                        for (var r in txtReplace) {
                            var thingsToReplace = txtReplace[r];
                            var theData = '';
                            for (var things in thingsToReplace){
                                var theFile = thingsToReplace[things];
                                if(grunt.file.exists(theFile)){
                                    theData += grunt.file.read(theFile);
                                } else {
                                    theData += theFile;
                                }
                            }
                            var regex = new RegExp('(<xsl:template name="' + r + '">)(.*?)(<\/xsl:template>)', 'gi');
                            if(fixedSrc.match(regex) != null) {
                                modifiedSrc = modifiedSrc.replace(regex, '$1' + theData + '$3');
                            }
                        }
                    }
                }
                grunt.file.write(file.dest, modifiedSrc);

                grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created');
            });
        });
    });

};
