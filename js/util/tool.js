/* 
* @Author: White
* @Email: weifengwang@pptv.com
* @Date:   2015-04-02 00:49:32
* @Last Modified time: 2015-04-03 00:39:08
*/

define(function(require, exports, module) {
    var $ = require('jquery');
    var adaptor = require('util/adaptor');
    var hash = require('util/hash');
    var api = require('api');
    var ajax = require('util/ajax');
    var user = require('util/user');
    var file = require('util/file');

    var tp_pop = '<div class="popup"><div class="pop-input"><input type="text" placeholder="请输入名称" /><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><img class="loading-img" src="images/loading.gif" /></div><a href="javascript:;" class="close">x</a></div></div>';
    var $jsCopy = $('.jsCopy'),
        $jsMove = $('.jsMove'),
        $jsDelete = $('.jsDelete'),
        $jsRename = $('.jsRename'),
        $jsDownload = $('.jsDownload'),
        $jsNew = $('.jsNew');
    $jsNew.on('click', function(){
        var $pop = $(tp_pop);
        $('body').append($pop);
        $pop.find('.jsSubmit').on('click', function(){
            $input = $('input[type=text]');
            if($input.val() == ''){
                return;
            }
            $(this).parent().addClass('loading');
            var path = '/'+hash.get().path.join('/')+$input.val();
            ajax({
                url: api.mkdir,
                data: {dir: path, token: user.token},
                success: function(data){
                    $pop.remove();
                    if(data.status==0){
                        file.add({
                            status: 0,
                            name:$input.val(),
                            path: path,
                            type: 'dir'
                        })
                    } else {
                        alert('接口出错，请稍后再试');
                    }
                },
                error: function(){
                    $pop.remove();
                    alert('接口出错，请稍后再试');
                }
            })
        })
    });
    $jsDownload.on('click', function(){
        var obj = adaptor.get().obj;
        window.open(api.download+obj.path);
    })
});