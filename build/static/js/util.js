define("util/adaptor",["jquery"],function(a){function b(){var a=c(".jsCopy"),b=c(".jsMove"),d=c(".jsDelete"),e=c(".jsRename"),f=c(".jsDownload"),g=null;this.set=function(c,h){a.removeClass("disable"),b.removeClass("disable"),d.removeClass("disable"),e.removeClass("disable"),f.removeClass("disable"),c&&"object"==typeof c?("dir"==c.type&&(f.addClass("disable"),a.addClass("disable")),g={},g.$el=h,g.obj=c):(a.addClass("disable"),b.addClass("disable"),d.addClass("disable"),e.addClass("disable"),f.addClass("disable"),g=null)},this.destroy=function(){this.set(null)},this.get=function(){return g}}var c=a("jquery");return new b}),define("util/ajax",["jquery"],function(a){function b(a){var b=c.extend(!0,{type:"GET",dataType:"json",success:function(){},error:function(){}},a);c.ajax(b)}var c=a("jquery");return b}),define("util/cookie",[],function(){function a(a){for(var c in a)b[c]=a[c]}var b={encode:!1,decode:!1,path:!1,domain:!1,duration:!1,secure:!1,document:document},c={write:function(c,d,e){if(a(e),b.encode&&(d=encodeURIComponent(d)),b.domain&&(d+="; domain="+b.domain),b.path&&(d+="; path="+b.path),b.duration){var f=new Date;f.setTime(f.getTime()+24*b.duration*36e5),d+="; expires="+f.toGMTString()}return b.secure&&(d+="; secure"),b.document.cookie=c+"="+d,this},read:function(a){var c=b.document.cookie.match("(?:^|;)\\s*"+a.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")+"=([^;]*)");return b.decode?c?decodeURIComponent(c[1]):null:c?c[1]:null},remove:function(d,e){return a(e),b.duration=-1,c.write(d,""),this}};return c}),define("util/file",["jquery","underscore","util/adaptor","util/hash","api"],function(a){function b(a){var b="unknow-icon";if("dir"==a.type)b="folder-icon";else{var c=/\.[^\.]+$/.exec(a.name);switch(c&&(c=c[0]),c){case".pdf":b="pdf-icon";break;case".doc":b="word-icon";break;case".xls":b="xls-icon";break;case".zip":b="zip-icon";break;default:b="unknow-icon"}}return b}function c(a){var c=f(k({fileIcon:b(a),fileName:a.name}));return c.on("mouseenter",function(){f(this).addClass("hover")}).on("mouseleave",function(){f(this).removeClass("hover")}).on("click",function(){f(this).siblings().removeClass("click"),f(this).addClass("click"),h.set(a,f(this))}).on("dblclick",function(){"dir"==a.type?i.set("work"+a.path):window.open(j.download+a.path)}),c}function d(a){for(;"/"==a.path.substr(0,1)&&"/"==a.path.substr(1,1);)a.path=a.path.substr(1);return a}function e(){this.init=function(a){l.children("ul").html(""),a.sort(function(a,b){return a.name&&b.name&&a.name<b.name?-1:1});for(var b=[],c=[],d=0;d<a.length;d++){var e=a[d];e.status||("dir"==e.type?b.push(e):c.push(e))}a=b.concat(c);for(var d=0;d<a.length;d++){var e=a[d];e.status||this.add(e)}},this.add=function(a){l.children("ul").append(c(d(a)))},this.prepend=function(a){l.children("ul").prepend(c(d(a)))}}var f=a("jquery"),g=a("underscore"),h=a("util/adaptor"),i=a("util/hash"),j=a("api"),k=g.template(f("#file_template").html()),l=f(".file-con");return new e}),define("util/hash",[],function(){function a(){var a={type:"",path:[]},b=window.location.hash;0===b.indexOf("#")&&(b=b.substr(1)),/\/$/.test(b)&&(b=b.substr(0,b.length-1));var c=b.indexOf("/");return-1==c?a.type=b:(a.type=b.substring(0,c),b.substr(c+1)&&(a.path=b.substr(c+1).split("/"))),a}return{get:function(){return a()},set:function(a){window.location.hash=a}}}),define("util/login",["jquery","util/user","util/cookie","util/ajax","api","util/hash"],function(a){var b=a("jquery"),c=a("util/user"),d=a("util/hash"),e=function(){var a=b("#login_template").html(),e=b(".wrapper"),f=b(".login-wrapper");this.show=function(){e.hide();var g=b(a);f.html(g);var h=this;g.find(".jsLogin").on("click",function(){var a=g.find("input[type=text]").val(),e=g.find("input[type=password]").val(),f=b(this);f.parent().addClass("loading"),c.login(a,e,function(){h.remove(),d.set("work")},function(){f.parent().removeClass("loading"),g.find(".error-msg").html("密码错误").show()})}),g.find("input[type=password]").on("focus",function(){g.find(".error-msg").hide()})},this.remove=function(){f.html("")}};return new e}),define("util/tool",["jquery","util/adaptor","util/hash","api","util/ajax","util/user","util/cookie","util/file","underscore"],function(a){var b=a("jquery"),c=a("util/adaptor"),d=a("util/hash"),e=a("api"),f=a("util/ajax"),g=a("util/user"),h=a("util/file"),i=a("underscore"),j='<div class="popup"><div class="pop-input"><input type="text" placeholder="请输入名称" /><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><a href="javascript:;" class="btnType1 jsCancel load-hidden" >取消</a><img class="loading-img" src="static/images/loading.gif" /></div><a href="javascript:;" class="close"></a></div></div>',k='<div class="popup"><div class="popwrap"><p>复制到：</p><div class="move-wrap"><%= listdata %></div><a href="javascript:;" class="close"></a><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><img class="loading-img" src="static/images/loading.gif" /></div></div></div>',l="<ul><% _.each(data, function(item){ if(item.type=='dir'){ while(item.path.substr(0,1)=='/' && item.path.substr(1,1)=='/'){item.path = item.path.substr(1)} %>"+'<li><div class="filelist" data-path="<%= item.path %>"><i class="icon-arrow"></i><span><%= item.name %></span></div></li><% }}) %></ul>',m='<div class="popup"><div class="pop-input deletepop"><p>确定要删除 <%= filename %> 吗？</p><div><a href="javascript:;" class="btnType1 jsSubmit load-hidden">确定</a><a href="javascript:;" class="btnType1 jsCancel load-hidden" >取消</a><img class="loading-img" src="static/images/loading.gif" /></div><a href="javascript:;" class="close"></a></div></div>',n=b(".jsCopy"),o=(b(".jsMove"),b(".jsDelete")),p=b(".jsRename"),q=b(".jsDownload"),r=b(".jsNew");$jsRefresh=b(".jsRefresh");var s=b(".file-con");n.on("click",function(){if(!b(this).hasClass("disable")){var a=i.template(l,{variable:"data"})([{name:"我的私有云",path:"/",type:"dir"}]),d=b(i.template(k)({listdata:a})),h=null,j=!1;b("body").append(d),d.on("click",".jsSubmit",function(){if(h){b(this).parent().addClass("loading");var a=c.get().obj,i="/"==h.attr("data-path")?h.attr("data-path")+a.name:h.attr("data-path")+"/"+a.name;f({url:e.moveFile,data:{token:g.token,from_path:a.path,to_path:i},success:function(a){d.remove(),0==a.status||alert("接口出错，请稍后再试")},error:function(){d.remove()}})}}),d.on("click",".filelist",function(){j||(h&&h.removeClass("select"),h=b(this),h.addClass("select"),h.parent().hasClass("empty")||(h.parent().hasClass("open")?h.parent().removeClass("open"):h.parent().hasClass("loaded")?h.parent().addClass("open"):(h.parent().addClass("loading"),j=!0,f({url:e.getFileList,data:{path:h.attr("data-path"),token:g.token},success:function(a){if(j=!1,h.parent().removeClass("loading"),a&&0!=a.length){for(var b=0,c=0;c<a.length;c++)if("dir"==a[c].type){b++;break}if(b){h.parent().addClass("loaded").addClass("open");var d=i.template(l,{variable:"data"}),e=d(a);h.parent().append(e)}else h.parent().addClass("empty").addClass("loaded")}else h.parent().addClass("empty").addClass("loaded")},error:function(){j=!1,h.parent().removeClass("loading").addClass("empty"),alert("接口出错，请稍后再试")}}))))})}}),p.on("click",function(){if(!b(this).hasClass("disable")){var a=c.get(),h=b(j);h.find(".pop-input").addClass("renamepop"),b("body").append(h);var i=h.find("input[type=text]");i.val(a.obj.name),i.focus(),h.find(".jsSubmit").on("click",function(){if(""!=i.val()){b(this).parent().addClass("loading");var c=i.val(),j="/"+d.get().path.join("/")+"/"+c;f({url:e.rename,data:{old_dir:a.obj.path,new_dir:j,token:g.token},success:function(b){h.remove(),0==b.status?a.$el.find(".filename").html(c):alert("接口出错，请稍后再试")},error:function(){h.remove(),alert("接口出错，请稍后再试")}})}})}}),$jsRefresh.on("click",function(){b(this).hasClass("disable")||(s.addClass("loading"),f({url:e.getFileList,data:{path:"/"+d.get().path.join("/"),token:g.token},success:function(a){s.removeClass("loading"),a&&h.init(a)}}))}),r.on("click",function(){if(!b(this).hasClass("disable")){var a=b(j);a.find(".pop-input").addClass("newpop"),b("body").append(a),a.find("input[type=text]").focus(),a.find(".jsSubmit").on("click",function(){var c=a.find("input[type=text]");if(""!=c.val()){b(this).parent().addClass("loading");var i="/"+d.get().path.join("/")+"/"+c.val();f({url:e.mkdir,data:{dir:i,token:g.token},success:function(b){a.remove(),0==b.status?h.prepend({status:0,name:c.val(),path:i,type:"dir"}):alert("接口出错，请稍后再试")},error:function(){a.remove(),alert("接口出错，请稍后再试")}})}})}}),q.on("click",function(){if(!b(this).hasClass("disable")){var a=c.get().obj;window.open(e.download+a.path)}}),o.on("click",function(){if(!b(this).hasClass("disable")){var a=c.get(),d=b(i.template(m)({filename:a.obj.name}));b("body").append(d),d.find(".jsSubmit").on("click",function(){b(this).parent().addClass("loading"),f({url:e.rmfile,data:{dir:a.obj.path,token:g.token},success:function(b){d.remove(),0==b.status?a.$el.remove():alert("接口出错，请稍后再试")},error:function(){d.remove(),alert("接口出错，请稍后再试")}})})}})}),define("util/upload",["jquery","api","util/user","util/cookie","util/ajax","util/hash","util/file","util/adaptor"],function(a){function b(){this.init=function(){var a=d(i),b={status:0,type:"file"};d("body").append(a),a.find("input[type=file]").on("change",function(){var h=d(this),i=c(h.val()),j="/",k=g.get().path;k&&0!=k.length?j=j+k.join("/")+"/"+i:j+=i,b.name=i,b.path=j;var l=e.upload+"&token="+f.token+"&path="+j;a.find("form").attr("action",l)}),a.find("input[type=submit]").on("click",function(){d(this).parent().addClass("loading")}),a.find("#uploadtg").on("load",function(){a.remove(),h.add(b)})}}function c(a){var b=/[^\\\/]*[\\\/]+/g;return a=a.replace(b,"")}var d=a("jquery"),e=a("api"),f=a("util/user"),g=a("util/hash"),h=a("util/file"),i='<div class="popup"><div class="pop-upload"><form method="post" enctype="multipart/form-data" target="uploadtg"><input type="file" name="file" /><div class="upsubmit"><input type="submit" value="上传" class="load-hidden" /><img class="loading-img" src="static/images/loading.gif" /></div></form><iframe name="uploadtg" id="uploadtg" width="0" height="0"></iframe><a href="javascript:;" class="close">x</a></div></div>';return new b}),define("util/user",["util/cookie","util/ajax","api","util/hash"],function(a){var b=a("util/cookie"),c=a("util/ajax"),d=a("api"),e=a("util/hash"),f=function(){this.username=b.read("username"),this.token=b.read("token"),this.isLogin=function(){var a=this.username||b.read("username"),c=this.token||b.read("token");return a&&c?!0:!1},this.login=function(a,e,f,g){var h=this;c({url:d.login,type:"POST",data:{user_name:a,password:e},success:function(c){0==c.status&&c.token?(b.write("username",a,{duration:7}),b.write("token",c.token,{duration:7}),h.username=a,h.token=c.token,f&&f()):g&&g()},error:function(){g&&g()}})},this.logout=function(){b.remove("username"),b.remove("token"),this.username=null,this.token=null,e.set("login")}};return new f}),define("util/work",["jquery","util/file","util/adaptor","util/hash","api","util/user","util/cookie","util/ajax"],function(a){function b(){var a=c(".jsBack"),b=c(".file-con");this.init=function(c){c&&c.length&&c[0]&&"/"!=c[0]||(c=[]),0==c.length?a.addClass("disable"):a.removeClass("disable"),e.destroy(),b.addClass("loading"),h({url:f.getFileList,data:{path:"/"+c.join("/"),token:g.token},success:function(a){b.removeClass("loading"),a&&d.init(a)},error:function(){}})}}var c=a("jquery"),d=a("util/file"),e=a("util/adaptor"),f=a("api"),g=a("util/user"),h=a("util/ajax");return new b});