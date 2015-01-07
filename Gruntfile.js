module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'package.json', 'addon/package.json', 'addon/lib/*.js', 'addon/data/js/*.js'],
            options: {
                moz: true,
                force: true, // don't stop when there is an error
                maxerr: 10000 // keep running no matter how many errors were found
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 2,
                success: true
            }
        },
        release: {
            options: {
            	file: 'package.json',
            	additionalFiles: ['addon/package.json'],
                bump: true,
                add: true,
                commit: true,
                tag: true,
                push: true,
                pushTags: true,
                npm: false,
                npmtag: false,
                github: {
                    repo: 'bobbyrne01/local-music-player-firefox',
                    usernameVar: 'GITHUB_USERNAME',
                    passwordVar: 'GITHUB_PASSWORD'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-release');

    grunt.registerTask('default', ['jshint']);
    grunt.task.run('notify_hooks');
};