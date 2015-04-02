/* 
* @Author: White
* @Email: weifengwang@pptv.com
* @Date:   2015-04-01 19:48:55
* @Last Modified time: 2015-04-02 01:08:18
*/

define(function(require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var adaptor = require('util/adaptor');
    var hash = require('util/hash');
    var api = require('api');

    var template = _.template($('#file_template').html());
    function getIcon(obj){
        var icon = 'unknow-icon';
        if(obj.type == 'dir'){
            icon =  'folder-icon';
        } else {
            var type = /\.[^\.]+$/.exec(obj.name);
            if(type){
                type = type[0];
            }
            switch(type){
                case '.pdf':
                    icon = 'pdf-icon';break;
                case '.doc':
                    icon = 'word-icon';break;
                case '.xls':
                    icon = 'xls-icon';break;
                case '.zip':
                    icon = 'zip-icon';break;
                default:
                    icon = 'unknow-icon';break;
            }
        }
        return icon;
    }
    function File(){
        this.init = function(data){
            var $ul = $('<ul>');
            for(var i=0; i<data.length; i++){
                var obj = data[i];
                if(!!obj.status){
                    continue;
                }
                while(obj.path.substr(0,1)=='/' && obj.path.substr(1,1)=='/'){
                    obj.path = obj.path.substr(1);
                }
                var $li = $(template({
                    fileIcon: getIcon(obj),
                    fileName: obj.name
                }));
                $li.on('mouseenter', function(){
                    $(this).addClass('hover');
                }).on('mouseleave', function(){
                    $(this).removeClass('hover');
                }).on('click', (function(obj){
                    return function(){
                        $(this).siblings().removeClass('click');
                        $(this).addClass('click');
                        adaptor.set(obj, $(this));
                    }
                })(obj)).on('dblclick', (function(obj){
                    return function(){
                        if(obj.type == 'dir'){
                            hash.set('work'+obj.path);
                        } else {
                            window.open(api.download+obj.path);
                        }
                    }
                })(obj));
                $ul.append($li);
            }
            return $ul;
        }
    }

    return new File();
});