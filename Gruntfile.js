module.exports = function (grunt){

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-jekyll');

   // Project configuration
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      concat: { // Concat JS files
         js: {
            options: {
               separator: ';'
            },
            src: ['assets/js/plugins.js','assets/js/main.js'],
            dest: 'assets/js/main.min.js'
         },
      }, // end Concat

      uglify: { // Minify JS files
         options: {
           mangle: false
         },
         js: {
           files: {
             'assets/js/main.min.js': ['assets/js/main.min.js']
           }
         },
       }, // end Uglify

      less: { // Compile LESS files
        default: {
          options: {
            paths: ['assets/css/'],
            compress: true,
          },
          files: { // Dest : Origin
            "assets/css/style.css": "assets/less/style.less"
          },
        }
      }, // end less

      watch: { // Watch JS and LESS folder
        js: {
          files: ['assets/js/*.js'],
          tasks: ['concat:js', 'uglify:js','jekyll'],
          options: {
            livereload: true,
          }
        },
        less: {
            files: ['assets/less/*.less'],
            tasks: ['less','jekyll'],
            options: {
              livereload: true,
            },
         },
         html: {
            files: ['./**/*.html','!./node_modules/*.html'],
            tasks: ['jekyll'],
            options: {
              livereload: true,
            },
         },
         markdown: {
            files: ['./_drafts/*.md','./_posts/*.md'],
            tasks: ['jekyll'],
            options: {
              livereload: true,
            },
         },
      }, // end watch

      jekyll: {
        build: {
          options: {
            config: '_config.yml',
            drafts: true,
            dest: " ./_publish"
          },
        },
      },

      connect: { // Start a server in localhost:4000
        server: {
          options: {
            port: 4000,
            hostname: '*',
            base: './_publish',
            livereload: true
          }
        }
      } // end connect

   });

   grunt.registerTask('build', ['concat', 'uglify', 'less', 'jekyll', 'connect', 'watch']);
   grunt.registerTask('default', ['build']);
};