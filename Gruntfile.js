module.exports = function(grunt) {
    // Loads each task referenced in the packages.json file
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    require('time-grunt')(grunt);

    // Initiate grunt tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        moment: require('moment'),

        // Tasks

        zip_directories: {
            irep: {
                files: [{
                    filter: 'isDirectory',
                    expand: true,
                    cwd: './assets/public/',
                    src: ['*'],
                    dest: './build/tmp/'
                }]
            }
        },

        files_to_json: {
            files: {
                src: ['build/public/**/*.zip'],
                dest: 'build/files.json',
                options: {
                    name: 'template'
                }
            }
        },

        m2j: {
            release: {
                options: {
                    minify: false,
                    width: 10000
                },
                files: {
                    'build/content.json': ['content/*.md']
                },
            }
        },

        copy: {
            images: {
                expand: true,
                cwd: 'assets/illustrations',
                src: '**',
                dest: 'build/illustrations',
                filter: 'isFile'
            },
            versionate: {

                expand: true,
                cwd: 'build/tmp',
                //src: '**',
                dest: 'build/public',
                filter: 'isFile',
                src: [
                    '**/{,*/}*.zip'
                ],
                rename: function(dest, src) {
                    return dest + '/' + src.replace('.zip','.zip');
                }
            },
            dist: {
                expand: true,
                cwd: 'build/',
                src: '**',
                dest: 'dist',
                filter: 'isFile'
            },
        },
        clean: {
            dist: ['dist/**/*'],
            deploy: ['deploy/**/*'],
            build: ['build/**/*']
        },


        secret: grunt.file.readJSON('secret.json'),
        sftp: {
            stage: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.stage.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.stage.host %>',
                    username: '<%= secret.stage.username %>',
                    password: '<%= secret.stage.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            },
            prod: {
                files: {
                    "./": "dist/**"
                },
                options: {
                    path: '<%= secret.prod.path %>',
                    srcBasePath: "dist/",
                    host: '<%= secret.prod.host %>',
                    username: '<%= secret.prod.username %>',
                    password: '<%= secret.prod.password %>',
                    //privateKey: grunt.file.read('id_rsa'),
                    //passphrase: '<%= secret.passphrase %>',
                    showProgress: true,
                    createDirectories: true,
                    directoryPermissions: parseInt(755, 8)
                }
            }
        }
    });

    //grunt.registerTask('subtaskJs', ['jshint', 'concat:scripts', 'uglify']);
    grunt.registerTask('subtaskCss', ['sass', 'autoprefixer', 'cssmin']);


    grunt.registerTask('build', ['clean', 'zip_directories', 'copy:versionate', 'files_to_json', 'm2j', 'copy:images']);
    grunt.registerTask('dist', ['build', 'copy:dist']);
    grunt.registerTask('deploy', ['build', 'copy:dist']);



    grunt.registerTask('deploy-stage', ['deploy', 'sftp:stage']);
    grunt.registerTask('deploy-prod', ['deploy', 'sftp:prod']);

};
