'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		sass: {
			options: {
				includePaths: ['<%= app %>/bower_components/foundation/scss']
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		pageres: {
	          screenshot: {
	              options: {
	                  urls: ['127.0.0.1:9000', '127.0.0.1:9000/explore.html','127.0.0.1:9000/results.html'],
	                  sizes: ['1200x800'],
	                  dest: '<%= app %>/img/screenshots',
	                  crop: true
	              }
	          }
	          // multipleUrls: {
	          //     options: {
	          //         urls: ['127.0.0.1:9000', '127.0.0.1:9000/explore.html','127.0.0.1:9000/results.html'],
	          //         sizes: ['w3counter'],
	          //         dest: '<%= app %>/img/screenshots',
	          //         crop: true,
	          //         delay: 5
	          //     }
	          // }
	    },

	    assemble: {
	      pages: {
	        options: {
	          flatten: true,
	          assets: '<%= app %>',
	          layout: '<%= app %>/templates/layouts/default.hbs',
	          data: '<%= app %>/data/*.{json,yml}',
	          partials: '<%= app %>/templates/partials/*.hbs',
	          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
	        },
	        files: {
	          '<%= app %>/': ['<%= app %>/templates/pages/*.hbs']
	        }
	      }
	    },


		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				}]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/img/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/img/'
				}]
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			assemble: {
		        files: ['<%= app %>/{data,templates}/{,*/}*.{md,hbs,yml,haml}'],
		        tasks: ['assemble']
		      },
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: true
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: true,
					hostname: '127.0.0.1'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: '127.0.0.1'
				}
			}
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'modernizr',
					'jquery-placeholder',
					'foundation'
				]
			}
		}

	});

	
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	
	grunt.registerTask('default', ['assemble','compile-sass', 'bower-install', 'connect:app','watch']);
	grunt.registerTask('validate-js', ['jshint']);
	grunt.registerTask('server-dist', ['connect:dist']);
	
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
