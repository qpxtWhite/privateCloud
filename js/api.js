/* 
 * @Author: White
 * @Email: weifengwang@pptv.com
 * @Date:   2015-03-29 20:12:03
 * @Last Modified time: 2015-04-02 01:33:13
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
        rmfile: url1 + '?action=rm_file',
        rename: url1 + '?action=rename',
        upload: url1 + '?action=upload',
        download: url2
    };
    return api;
})