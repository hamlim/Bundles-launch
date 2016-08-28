module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded' //compressed for dev
                },
                files: {
                    'assets/css/prod/main.css': 'assets/css/src/main.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('css', ['sass']);

};
