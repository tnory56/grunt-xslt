/*
 * grunt-xslt
 * https://github.com/tnory56/grunt-xslt
 *
 * Copyright (c) 2014 Thomas Norberg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    xslt: {
      custom_options: {
        options: {
            replacements:{
                'srcTest/custom_template.xslt' : [
                    {
                        'header': [
                            '<link rel="stylesheet" href="/gassets/global-header-footer.min.css"/>',
                            'srcTest/global-header.html'
                        ]
                    },
                    {
                        'footer': [
                            'srcTest/global-footer.html',
                            '<script type="text/javascript" src="/gassets/global-footer.min.js"></script>'
                        ]
                    }
                ]
            }
        },
        files: {
               'tmp/custom_template.xslt':'srcTest/custom_template.xslt'
        }
      }
    },

    // Unit src.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'xslt']);//, 'nodeunit']);

  // By default, lint and run all src.
  grunt.registerTask('default', ['jshint', 'test']);

};
