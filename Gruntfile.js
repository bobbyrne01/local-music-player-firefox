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
		jsbeautifier: {
			files: ['<%= jshint.files %>', 'addon/data/html/view.html', 'addon/data/html/FrameView.html'],
			options: {
				js: {
					braceStyle: "collapse",
					breakChainedMethods: false,
					e4x: false,
					evalCode: false,
					indentChar: "\t",
					indentLevel: 0,
					indentSize: 1,
					indentWithTabs: true,
					jslintHappy: true,
					keepArrayIndentation: false,
					keepFunctionIndentation: false,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					spaceBeforeConditional: true,
					spaceInParen: false,
					unescapeStrings: false,
					wrapLineLength: 0
				},
				html: {
					braceStyle: "collapse",
					indentChar: "\t",
					indentScripts: "keep",
					indentSize: 1,
					maxPreserveNewlines: 10,
					preserveNewlines: true,
					unformatted: ["a", "sub", "sup", "b", "i", "u"],
					wrapLineLength: 0
				}
			}
		},
		validation: {
			options: {
				stoponerror: false,
				reset: true,
				relaxerror: ['Empty heading.'] // localization id placed as attribute to heading
			},
			files: {
				src: ['addon/data/html/*.html']
			}
		},
		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['addon/data/css/*.css']
			}
		},
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: 'addon/',
					src: ['lib/*.js'],
					dest: 'dist/'
				}, {
					expand: true,
					cwd: 'addon/',
					src: ['locale/*.properties'],
					dest: 'dist/'
				}, {
					expand: true,
					cwd: 'addon/data/html/',
					src: ['*.html'],
					dest: 'dist/data/html/'
				}, {
					expand: true,
					cwd: 'addon/data/css/',
					src: ['*.css'],
					dest: 'dist/data/css/'
				}, {
					expand: true,
					cwd: 'addon/data/js/',
					src: ['*.js'],
					dest: 'dist/data/js/'
				}, {
					expand: true,
					cwd: 'addon/',
					src: ['package.json'],
					dest: 'dist/'
				}]
			}
		},
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					expand: true,
					cwd: 'addon/data/images/',
					src: ['*.png'],
					dest: 'dist/data/images/',
					ext: '.png'
				}]
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
		}
	});

	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks("grunt-jsbeautifier");
	grunt.loadNpmTasks('grunt-html-validation');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-release');

	grunt.registerTask('default', ['jsbeautifier', 'jshint', 'validation', 'csslint']);
	grunt.registerTask('build', ['copy', 'imagemin']);
	grunt.task.run('notify_hooks');
};
