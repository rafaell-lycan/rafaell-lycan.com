module.exports = function (grunt){

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
   //'use strict';
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
         js: {
            options: {
               separator: ';'
            },
            src: ['assets/js/plugins.js','assets/js/main.js'],
            dest: 'assets/js/main.min.js'
         },
      },
      uglify: {
         options: {
           mangle: false
         },
         js: {
           files: {
             'assets/js/main.min.js': ['assets/js/main.min.js']
           }
         }
       },
      less: {
        default: {
          options: {
            paths: ['assets/css/'],
            compress: true,
          },
          files: {
            "assets/css/style.css": "assets/less/style.less"
          }
        }
      },
      watch: {
        js: {
          files: ['assets/js/*.js'],
          tasks: ['concat:js', 'uglify:js'],
          options: {
            livereload: true,
          }
        },
        less: {
            files: ['assets/less/*.less'],
            tasks: ['less'],
            options: {
              livereload: true,
            },
         },
      }
   });

   grunt.registerTask('default', ['concat','uglify', 'less','watch']);
};