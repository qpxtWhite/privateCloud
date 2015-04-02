/* 
* @Author: White
* @Email: weifengwang@pptv.com
* @Date:   2015-04-01 19:18:25
* @Last Modified time: 2015-04-02 00:35:40
*/

define(function(require, exports, module) {
    var $ = require('jquery');
    var file = require('util/file');
    var adaptor = require('util/adaptor');
    var api = require('api');
    var user = require('util/user');
    var ajax = require('util/ajax');

    function Work(){
        var $back = $('.jsBack');
        var $space = $('.file-con');
        this.init = function(path){
            if(!path || !path.length || !path[0] || path[0]=='/'){
                path = [];
            }
            if(path.length == 0){
                $back.addClass('disable');
            } else {
                $back.removeClass('disable');
            }
            adaptor.destroy();
            $space.addClass('loading');
            ajax({
                url: api.getFileList,
                data: {path: '/'+path.join('/'), token: user.token},
                success: function(data){
                    $space.removeClass('loading');
                    if(data && data.length && data.length>0){
                        var $ul = file.init(data);
                        $space.children('ul').html($ul.children());
                    }
                }
            })

        }
    }

    return new Work();
});