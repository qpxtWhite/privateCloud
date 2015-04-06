/* 
* @Author: White
* @Email: weifengwang@pptv.com
* @Date:   2015-04-02 00:49:32
* @Last Modified time: 2015-04-07 00:20:03
*/

define(function(require, exports, module) {
    var $ = require('jquery');
    var adaptor = require('util/adaptor');
    var hash = require('util/hash');
    var api = require('api');
    var ajax = require('util/ajax');
    var user = require('util/user');
    var file = require('util/file');
    var _ = require('underscore');

    var tp_pop = '<div class="popup"><div class="pop-input"><input type="text" placeholder="请输入名称" /><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><img class="loading-img" src="images/loading.gif" /></div><a href="javascript:;" class="close">x</a></div></div>';
    var tp_movepop='<div class="popup"><div class="popwrap"><p>复制到：</p><div class="move-wrap"><%= listdata %></div><a href="javascript:;" class="close">x</a><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><img class="loading-img" src="images/loading.gif" /></div></div></div>';
    var tp_movelist = '<ul><% _.each(data, function(item){ if(item.type==\'dir\'){ while(item.path.substr(0,1)==\'/\' && item.path.substr(1,1)==\'/\'){item.path.substr(1)} if(item.path==\'/\'){item.path=\'\'} %>'+
                                    '<li><div class="filelist" data-path="<%= item.path %>"><i class="icon-arrow"></i><span><%= item.name %></span></div></li>'+
                                '<% }}) %></ul>';
    var $jsCopy = $('.jsCopy'),
        $jsMove = $('.jsMove'),
        $jsDelete = $('.jsDelete'),
        $jsRename = $('.jsRename'),
        $jsDownload = $('.jsDownload'),
        $jsNew = $('.jsNew');
    var $filecon = $('.file-con');
    $jsCopy.on('click', function(){
        if($(this).hasClass('disable')){
            return;
        }
        var movelist = _.template(tp_movelist, {variable: 'data'})([{name:'我的私有云', path:'/', type: 'dir'}]);
        var $pop = $(_.template(tp_movepop)({listdata: movelist}));
        var $select = null;
        var isloading = false;
        $('body').append($pop);
        $pop.on('click', '.jsSubmit', function(){
            if(!$select){
                return;
            }
            $(this).parent().addClass('loading');
            var fileobj = adaptor.get().obj;
            ajax({
                url: api.moveFile,
                data: {token:user.token, from_path:fileobj.path, to_path:$select.attr('data-path')+'/'+fileobj.name},
                success: function(data){
                    $pop.remove();
                    if(data.status==0){

                    } else {
                        alert('接口出错，请稍后再试');
                    }
                },
                error: function(){
                    $pop.remove();
                }
            })
        })
        $pop.on('click', '.filelist', function(ev){
            if(isloading){
                return;
            }
            if($select){
                $select.removeClass('select');
            }
            $select = $(this);
            $select.addClass('select');
            if($select.parent().hasClass('empty')){
                return;
            } else if($select.parent().hasClass('open')){
                $select.parent().removeClass('open');
            } else if($select.parent().hasClass('loaded')){
                $select.parent().addClass('open');
            } else {
                $select.parent().addClass('loading')
                isloading = true;
                ajax({
                    url: api.getFileList,
                    data: {path: $select.attr('data-path'), token:user.token},
                    success: function(data){
                        isloading = false;
                        $select.parent().removeClass('loading');
                        if(!data || data.length==0){
                            $select.parent().addClass('empty').addClass('loaded');
                        } else {
                            var count=0;
                            for(var i=0; i<data.length; i++){
                                if(data[i].type=='dir'){
                                    count++;
                                }
                            }
                            if(!count){
                                $select.parent().addClass('empty').addClass('loaded');
                            } else {
                                $select.parent().addClass('loaded').addClass('open').append(_.template(tp_movelist,{variable:'data'})(data));
                            }
                        }
                    },
                    error: function(){
                        isloading = false;
                        $select.parent().removeClass('loading').addClass('empty');
                        alert('接口出错，请稍后再试');
                    }
                })
            }
        })
    })
    $jsRename.on('click', function(){
        if($(this).hasClass('disable')){
            return;
        }
        var fileObj = adaptor.get();
        var $pop = $(tp_pop);
        $('body').append($pop);
        var $input = $pop.find('input[type=text]');
        $input.val(fileObj.obj.name);
        $pop.find('.jsSubmit').on('click', function(){
            if($input.val() == ''){
                return;
            }
            $(this).parent().addClass('loading');
            var newname = $input.val();
            var newpath = '/'+hash.get().path.join('/')+'/'+newname;
            ajax({
                url: api.rename,
                data: {old_dir: fileObj.obj.path, new_dir:newpath, token: user.token},
                success: function(data){
                    $pop.remove();
                    if(data.status==0){
                        fileObj.$el.find('.filename').html(newname)
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
    $jsNew.on('click', function(){
        if($(this).hasClass('disable')){
            return;
        }
        var $pop = $(tp_pop);
        $('body').append($pop);
        $pop.find('.jsSubmit').on('click', function(){
            var $input = $pop.find('input[type=text]');
            if($input.val() == ''){
                return;
            }
            $(this).parent().addClass('loading');
            var path = '/'+hash.get().path.join('/')+'/'+$input.val();
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
        if($(this).hasClass('disable')){
            return;
        }
        var obj = adaptor.get().obj;
        window.open(api.download+obj.path);
    });
    $jsDelete.on('click', function(){
        if($(this).hasClass('disable')){
            return;
        }
        var fileObj = adaptor.get();
        $filecon.addClass('loading');
        ajax({
            url: api.rmfile,
            data: {dir: fileObj.obj.path, token: user.token},
            success: function(data){
                $filecon.removeClass('loading');
                if(data.status==0){
                    fileObj.$el.remove();
                } else {
                    alert('接口出错，请稍后再试');
                }
            },
            error: function(){
                $filecon.removeClass('loading');
                alert('接口出错，请稍后再试');
            }
        })
    })
});