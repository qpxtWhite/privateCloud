/* 
* @Author: WhiteWang
* @Date:   2015-04-02 12:24:35
* @Last Modified by:   weifengwang
* @Last Modified time: 2015-04-12 17:45:39
*/

'use strict';
module.exports = function(grunt) {
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        version: '<%= pkg.version %>',
        transport: {
            options: {
                debug: false,
                paths: ['static/js', 'static/js/lib', 'static/js/util', 'static/js/core'],
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
                    cwd: 'static/js/util',
                    expand: true,
                    src : '**/*',
                    filter : 'isFile',
                    dest : 'build/static/js/util'
                }]
            },
            lib: {
                options: {
                    idleading: 'lib/'
                },
                files: [{
                    cwd: 'static/js/lib',
                    expand: true,
                    src : '**/*',
                    filter : 'isFile',
                    dest : 'build/static/js/lib'
                }]
            },
            main: {
                files:[{
                    cwd:'static/js',
                    expand: true,
                    src:'*.js',
                    filter: 'isFile',
                    dest:'build/static/js'
                }]
            }
        },
        copy: {
            index: {
                options: {
                    process: function(content, srcpath){
                        return content.replace(/<\%=pkg\.version\%>/g, 'v_'+pkg.version);
                    }
                },
                src: 'index.html',
                dest: 'build/index.html'
            },
            stc: {
                expand:true,
                src:'static/**',
                dest: 'build/'
            }
        },
        clean:{
            build:['build/']
        },
        concat:{
            main:{
                files:{
                    'build/static/js/util.js':['build/static/js/util/**.js'],
                    'build/static/js/lib.js':['build/static/js/lib/**.js'],
                    'build/static/js/main.js':['build/static/js/*.js']
                }
            }
        },
        uglify:{
            main:{
                files:[{
                    expand: true,
                    cwd: 'build/static/js',
                    src: '**/*.js',
                    dest:'build/static/js'
                }]
            }
        },
        cssmin:{
            main:{
                files:[{
                    expand: true,
                    cwd:'build/static/images',
                    src: '**/*.css',
                    dest:'build/static/images'
                }]
            }
        },
        compress: {
            main: {
                options: {
                    archive: function(){
                        var date = new Date();
                        var d = date.getDate();
                        if(d<10){
                            d = '0'+d;
                        }
                        var m = date.getMonth()+1;
                        if(m<10){
                            m = '0'+m;
                        }
                        var y = date.getFullYear();
                        var h = date.getHours();
                        if(h<10){
                            h = '0'+h;
                        }
                        var min = date.getMinutes();
                        if(min<10){
                            min='0'+min;
                        }
                        return 'build-'+y+m+d+h+min+'.zip';
                    }
                },
                expand: true,
                src: ['build/**/*'],
                dest: '/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('default', [
        'clean:build',
        'copy:index',
        'copy:stc',
        'transport:main',
        'transport:util',
        'transport:lib',
        'concat:main',
        'uglify:main',
        'cssmin:main',
        'compress:main'
    ]);
};