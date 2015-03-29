module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'assets/css/style.css' : 'src/less/style.less'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'assets/js/main.min.js': ['assets/js/main.min.js']
        }
      },
    },
    jekyll: {
      options: {
        drafts: true
      },
      dist: {
        options: {
          dest: './_publish',
          config: '_config.yml'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['src/less/**/*.less'],
        tasks: ['less', 'jekyll']
      },
      js: {
        files: ['src/js/**/.js'],
        tasks: ['uglify', 'jekyll']
      },
      html: {
        files: ['**/*.html', '!./node_modules/*.html'],
        tasks: ['jekyll'],
        options: {
          spawn: false,
        }
      },
      markdown: {
        files: ['_drafts/*.md', '_posts/*.md'],
        tasks: ['jekyll'],
        options: {
          spawn: false,
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: './_publish'
        }
      }
    },

  });

  grunt.registerTask('dev', ['less', 'uglify', 'jekyll', 'connect', 'watch']);
  grunt.registerTask('build', ['less', 'uglify', 'jekyll']);
  grunt.registerTask('default', ['dev']);
};