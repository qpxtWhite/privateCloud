/* 
* @Author: WhiteWang
* @Date:   2015-04-02 12:24:35
* @Last Modified by:   weifengwang
* @Last Modified time: 2015-04-02 19:25:57
*/

'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        transport: {
            options: {
                paths: ['js/util/'],
                debug: false
            },
            util: {
                files: [{
                    src: ['js/util/*.js'],
                    dest: ['dist']
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');

    grunt.registerTask('default', ['transport:util']);
};