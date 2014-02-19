module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-contrib-*').forEach(grunt.loadNpmTasks);

    var _ = grunt.util._;

    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    var requireJsOptions = {
        baseUrl: yeomanConfig.app + '/scripts',
        dir: yeomanConfig.dist + '/scripts',
        mainConfigFile: yeomanConfig.app + '/scripts/app.build.js',
        //name: "main",
        preserveLicenseComments: false,
        useStrict: true,
        wrap: true,
        done:function(done, output) {
            grunt.task.run(['copy:require_to_dist']);
            done();
        }
    };

    var bannerOptions = {
        stripBanners: false,
        banner: 'requirejs.config({\
                                    config: {\
                                       "app/Application": { \
                                            developer:"<%= developer.name %>", \
                                            date: "<%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>"\
                                        }\
                                    }\
                                });'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        developer: grunt.file.readJSON('developer.json'),
       
        connect: {
            server:{
                options:{
                    port: 8000,
                    base: ".",
                    keepalive: false
                }
            }
        },

        jshint: {
            files: [yeomanConfig.app+'/**/*.js', '!'+yeomanConfig.app+'/bower/**/*.js', '!'+yeomanConfig.app+'/css/**/*.js', '!' + yeomanConfig.app+ '/scripts/jst.js', '!' + yeomanConfig.app+ '/scripts/vendor/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        requirejs: {
            deploy: {
                options: _.extend({optimize: 'uglify2', name:'main'}, requireJsOptions)
            },
            debug: {
                options: _.extend({ generateSourceMaps: true, optimize: 'none', name:'main' }, requireJsOptions)
            },
            compile_css: {
                options: {
                    cssIn: "app/css/main.css",
                    out: "dist/css/main.css"
                }
            }
        },
        jasmine : {
            src : ['scripts/**/*.js'],
            options : {
                host: 'http://127.0.0.1:8000/',
                keepRunner:true,  
                specs : ['./specs/main.js', './specs/*Spec.js'],
                //helpers: ,
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfigFile: [yeomanConfig.app + '/scripts/app.build.js', './specs/config.js'],
                    requireConfig: {
                        baseUrl: yeomanConfig.app + '/scripts/'
                    }
                }
            }
        },
        clean: ['dist/*', yeomanConfig.app+'/css/structure/*'],
        copy: {
            dist: {
                files: [
                { expand: true, dot: true, cwd: yeomanConfig.app, dest: yeomanConfig.dist, src: [
                        'index.html', 'data.json'
                    ]}
                ]
            },
            require_to_dist: {
                files: [
                { expand: true, dot: true, cwd: yeomanConfig.app+'/bower/requirejs/', dest: yeomanConfig.dist+'/scripts/', src: [
                        'require.js'
                    ]}
                ]
            },
            bower_libs: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/bower/', src: ['**'], dest: yeomanConfig.dist +'/bower/'} 
                ]
            },
            amd_not_compiled: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/scripts/', src: ['**'], dest: yeomanConfig.dist +'/scripts/'} 
                ]
            },
            resources: {
                files: [
                    {expand: true, cwd: yeomanConfig.app+'/img/', src: ['**'], dest: yeomanConfig.dist +'/img/'},
                    {expand: true, cwd: yeomanConfig.app+'/fonts/', src: ['**'], dest: yeomanConfig.dist +'/fonts/'}
                ]
            },
            jst: {
                files: [{
                    expand: true, dot: true, cwd: yeomanConfig.app + '/scripts/', dest: yeomanConfig.dist + '/scripts/', src: [
                        'jst.js'
                    ]}
                ]
            }
        },
        concat: {          
            amd_not_compiled: {
                options: bannerOptions,
                src: [yeomanConfig.app+'/scripts/app.build.js', yeomanConfig.app+'/scripts/main.js'],
                dest: yeomanConfig.dist +'/scripts/main.js'
            },
            deploy: {
                options: bannerOptions,
                src:[yeomanConfig.dist +'/scripts/main.js'],
                dest: yeomanConfig.dist +'/scripts/main.js'
            },
            theme_and_structure: {
                //src: ['app/css/main.css', yeomanConfig.app+'/css/structure/*.css'],
                src: [yeomanConfig.app+'/css/structure/*.css', 'app/css/main.css'],
                dest: 'app/css/main.css'
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    amd: true,
                    processName: function(filePath) {
                        return filePath.split('/').pop().split('.')[0];
                    }
                },
                files: {
                    'app/scripts/jst.js': [yeomanConfig.app+'/scripts/app/**/*.hbs', yeomanConfig.app+'/scripts/ui/**/*.hbs']
                }
            }
        },
        sass: {
            theme: {
                options: {
                    style: 'compact' /*nested/compressed/compact/expanded*/
                },
                files: {
                    'app/css/main.css': yeomanConfig.app+'/sass/main.scss'
                }
            },
            structure: {
                options: {
                    style: 'compact'
                },
                files: [{
                    expand: true,
                    src: [yeomanConfig.app+'/scripts/app/**/*.scss', yeomanConfig.app+'/scripts/ui/**/*.scss'],
                    dest: yeomanConfig.app+'/css/structure',
                    ext: '.css',
                    flatten: true
                }]
            }
        },
        watch: {
            theme: {
                files: yeomanConfig.app+'/sass/**/*',
                tasks: 'sass:theme'
            },
            structure: {
                files: yeomanConfig.app+'/scripts/app/**/*',
                tasks: 'sass:structure'
                
            }
        }
    });

    var baseTasks =  [ 'jshint', 'clean', 'copy:dist', 'handlebars', 'copy:resources', 'sass', 'concat:theme_and_structure', 'requirejs:compile_css' ];
    var deployTasks = baseTasks.slice();
    var debugTasks = baseTasks.slice();
    var buildTasks = baseTasks.slice();
    
    deployTasks.splice(4,0, 'requirejs:deploy', 'concat:deploy');
    debugTasks.splice(4,0, 'requirejs:debug', 'concat:deploy');
    buildTasks.splice(4,0, 'copy:bower_libs', 'copy:amd_not_compiled', 'copy:require_to_dist', 'concat:amd_not_compiled');
    
    //full build, optimised and uglified
    grunt.registerTask('deploy',  deployTasks);
    //full build, optimised and with source mapping
    grunt.registerTask('debug',  debugTasks);
    //full build, non-optimised (AMDs not combined)
    grunt.registerTask('build', buildTasks);

    //NOTE: the app/index2.html can be viewed without building but depends on handlebars templates to be precompiled and sass tasks to run 

    grunt.registerTask('test', ['connect:server', 'jasmine']);

    //plato -r -d report -x .json -l jshintrc app/scripts/app/
};