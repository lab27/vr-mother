'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        app: 'app',
        dist: 'dist',



        convert: {
            options: {
                explicitArray: false,
            },
            csv2json: {
                src: ['<%= app %>/data/tags.csv'],
                dest: '<%= app %>/data/tags.json'
            }
        },
        pageres: {
            screenshot: {
                options: {
                    urls: ['127.0.0.1:9000', '127.0.0.1:9000/explore.html', '127.0.0.1:9000/results.html'],
                    sizes: ['1200x800'],
                    dest: '<%= app %>/img/screenshots',
                    crop: true
                }
            }
        },


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

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    assets: '<%= app %>',
                    layout: '<%= app %>/templates/layouts/default.hbs',
                    data: '<%= app %>/data/*.{json,yml}',
                    partials: '<%= app %>/templates/partials/*.hbs',
                    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
                },
                files: {
                    '<%= app %>/': ['<%= app %>/templates/pages/*.hbs']
                }
            }
        },

        browserSync: {
            options: {
                notify: false,
                background: true
            },
            livereload: {
                options: {
                    files: [
                        '<%= app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= app %>/images/{,*/}*',
                        '.tmp/scripts/{,*/}*.js'
                    ],
                    port: 9000,
                    server: {
                        baseDir: ['.tmp', 'app'],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            },
            // test: {
            //   options: {
            //     port: 9001,
            //     open: false,
            //     logLevel: 'silent',
            //     host: 'localhost',
            //     server: {
            //       baseDir: ['.tmp', './test', config.app],
            //       routes: {
            //         '/bower_components': './bower_components'
            //       }
            //     }
            //   }
            // },
            dist: {
                options: {
                    background: false,
                    server: '<%= dist %>'
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
                    cwd: '<%= app %>/',
                    src: [
                        'fonts/**',
                        '**/*.html',
                        '!**/*.scss',
                        '!bower_components/**',
                        'bower_components/animate.css/animate.css',
                        'bower_components/slick-carousel/slick/slick.css',
                        'bower_components/slick-carousel/slick/slick-theme.css',
                        'bower_components/slick-carousel/slick/fonts/**',
                        'bower_components/slick-carousel/slick/ajax-loader.gif'
                    ],
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
            // postcss: {
            // 	files: '<%= app %>/scss/**/*.scss',
            // 	tasks: ['postcss']
            // },			
            livereload: {
                files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/scss/**/*.scss', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
                options: {
                    livereload: true
                }
            },
        },

        connect: {
            app: {
                options: {
                    port: 9002,
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

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer-core')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
            dist: {
                src: '<%= app %>/css/*.css'
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

    grunt.registerTask('default', [
        'convert',
        'assemble',
        'compile-sass',
        // 'postcss',

        'bower-install',
        'browserSync:livereload',
        'connect:app',
        'watch'
    ]);
    grunt.registerTask('validate-js', ['jshint']);
    grunt.registerTask('server-dist', ['connect:dist']);

    grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'validate-js', 'useminPrepare', 'copy:dist', 'newer:imagemin', 'concat', 'cssmin', 'uglify', 'usemin']);

};
