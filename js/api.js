/* 
 * @Author: White
 * @Email: weifengwang@pptv.com
 * @Date:   2015-03-29 20:12:03
 * @Last Modified time: 2015-04-07 00:13:17
 */
define(function (require, exports, module) {
    var url1 = './api/v1/storage';
    var url2 = './open';
    var api = {
        // login: url1 + '?action=login',
        login: './login.php',
        // getFileList: url1 + '?action=get_server_file_list',
        getFileList: './getFileList.php',
        // mkdir: url1 + '?action=mkdir',
        mkdir: './mkdir.php',
        // rmfile: url1 + '?action=rm_file',
        rmfile: './mkdir.php',
        // rename: url1 + '?action=rename',
        rename: './mkdir.php',
        upload: url1 + '?action=upload',
        download: url2,
        // moveFile:url1+'?action=move_file'
        moveFile:'./mkdir.php'
    };
    return api;
})