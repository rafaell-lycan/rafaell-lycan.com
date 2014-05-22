module.exports = function (grunt){

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

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
         }
       }, // end Uglify

      less: { // Compile LESS files
        default: {
          options: {
            paths: ['assets/css/'],
            compress: true,
          },
          files: { // Dest : Origin
            "assets/css/style.css": "assets/less/style.less"
          }
        }
      }, // end less

      watch: { // Watch JS and LESS folder
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
      }, // end watch

   });

   grunt.registerTask('build', ['concat', 'uglify', 'less', 'watch']);
   grunt.registerTask('default', ['build']);
};