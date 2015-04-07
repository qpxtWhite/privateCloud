/* 
* @Author: WhiteWang
* @Date:   2015-04-02 12:24:35
* @Last Modified by:   weifengwang
* @Last Modified time: 2015-04-07 19:40:16
*/

'use strict';
module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    grunt.initConfig({
        transport: {
            options: {
                debug: false,
                paths: ['.'],
                parsers : {
                    '.js' : [script.jsParser],
                    '.css' : [style.css2jsParser],
                    '.html' : [text.html2jsParser]
                }
            },
            util: {
                options: {
                    idleading : 'util/'
                },
                files: [{
                    cwd: 'js/util',
                    expand: true,
                    src : '**/*',
                    filter : 'isFile',
                    dest : 'build/js/util'
                }]
            },
            lib: {
                options: {
                    idleading: 'lib/'
                },
                files: [{
                    cwd: 'js/lib',
                    expand: true,
                    src : '**/*',
                    filter : 'isFile',
                    dest : 'build/js/lib'
                }]
            },
            main: {
                files:[{
                    cwd:'js',
                    expand: true,
                    src:'*.js',
                    filter: 'isFile',
                    dest:'build/js'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    {expand:true, src: ['index.html'], dest:'build/', filter:'isFile' },
                    {expand:true, src: ['images/**'], dest:'build/', filter:'isFile' },
                    {expand:true, src: ['js/**'], dest:'build/', filter:'isFile' }
                ]
            }
        },
        clean:{
            build:['build/']
        },
        concat:{
            main:{
                files:{
                    'build/js/util.js':['build/js/util/**.js'],
                    'build/js/lib.js':['build/js/lib/**.js'],
                    'build/js/main.js':['build/js/*.js']
                }
            }
        },
        uglify:{
            main:{
                files:[{
                    expand: true,
                    cwd: 'build/js',
                    src: '**/*.js',
                    dest:'build/js'
                }]
            }
        },
        cssmin:{
            main:{
                files:[{
                    expand: true,
                    cwd:'build/images',
                    src: '*.css',
                    dest:'build/images'
                }]
            }
        },
        imagemin:{
            main:{
                files:[{
                    expand:true,
                    cwd:'build/images',
                    src:'**/*.{png,jpg,gif}',
                    dest::'build/images'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', [
        'clean:build',
        'copy:main',
        'transport:main',
        'transport:util',
        'transport:lib',
        'concat:main',
        'uglify:main',
        'cssmin:main',
        'imagemin:main'
    ]);
};