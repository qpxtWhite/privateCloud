/* 
 * @Author: White
 * @Email: weifengwang@pptv.com
 * @Date:   2015-03-28 13:58:02
 * @Last Modified time: 2015-04-02 01:38:08
 */
define(function (require, exports, module) {
    var $ = require('jquery');
    require('lib/jquery.hashchange')($);
    var hash = require('util/hash');
    var user = require('util/user');
    var login = require('util/login');
    var work = require('util/work');
    require('util/tool');

    $(window).hashchange(function(){
        var h = hash.get();
        switch (h.type){
            case 'login':
                if(user.isLogin()){
                    hash.set('work');
                } else {
                    login.show();
                }
                break;
            case 'work':
                if(user.isLogin()){
                    $('.wrapper').show();
                    $('.userArea span').html(user.username);
                    work.init(h.path);
                } else {
                    hash.set('login');
                }
                break;
            default:
                hash.set('work');
                break;
        }
    });
    $('.jsLogout').on('click', function(){
        user.logout();
    })
    $('.jsBack').on('click', function(){
        if($(this).hasClass('disable')){
            return;
        }
        var path = hash.get().path;
        path.pop();
        hash.set('work/'+path.join('/'));
    })
    $('body').on('click', '.popup .close', function(){
        $(this).parents('.popup').remove();
    })
    $(window).hashchange();
});