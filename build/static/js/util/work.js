define("util/work",["jquery","util/file","util/adaptor","util/hash","api","util/user","util/cookie","util/ajax"],function(a){function b(){var a=c(".jsBack"),b=c(".file-con");this.init=function(c){c&&c.length&&c[0]&&"/"!=c[0]||(c=[]),0==c.length?a.addClass("disable"):a.removeClass("disable"),e.destroy(),b.addClass("loading"),h({url:f.getFileList,data:{path:"/"+c.join("/"),token:g.token},success:function(a){b.removeClass("loading"),a&&d.init(a)},error:function(){}})}}var c=a("jquery"),d=a("util/file"),e=a("util/adaptor"),f=a("api"),g=a("util/user"),h=a("util/ajax");return new b});