/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(a,b,c){"use strict";var d=b.event,e;d.special.smartresize={setup:function(){b(this).bind("resize",d.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",d.special.smartresize.handler)},handler:function(a,c){var d=this,f=arguments;a.type="smartresize",e&&clearTimeout(e),e=setTimeout(function(){b.event.handle.apply(d,f)},c==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Mason=function(a,c){this.element=b(c),this._create(a),this._init()},b.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},b.Mason.prototype={_filterFindBricks:function(a){var b=this.options.itemSelector;return b?a.filter(b).add(a.find(b)):a},_getBricks:function(a){var b=this._filterFindBricks(a).css({position:"absolute"}).addClass("masonry-brick");return b},_create:function(c){this.options=b.extend(!0,{},b.Mason.settings,c),this.styleQueue=[];var d=this.element[0].style;this.originalStyle={height:d.height||""};var e=this.options.containerStyle;for(var f in e)this.originalStyle[f]=d[f]||"";this.element.css(e),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var g=this;setTimeout(function(){g.element.addClass("masonry")},0),this.options.isResizable&&b(a).bind("smartresize.masonry",function(){g.resize()}),this.reloadItems()},_init:function(a){this._getColumns(),this._reLayout(a)},option:function(a,c){b.isPlainObject(a)&&(this.options=b.extend(!0,this.options,a))},layout:function(a,b){for(var c=0,d=a.length;c<d;c++)this._placeBrick(a[c]);var e={};e.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var f=0;c=this.cols;while(--c){if(this.colYs[c]!==0)break;f++}e.width=(this.cols-f)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:e});var g=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",h=this.options.animationOptions,i;for(c=0,d=this.styleQueue.length;c<d;c++)i=this.styleQueue[c],i.$el[g](i.style,h);this.styleQueue=[],b&&b.call(a),this.isLaidOut=!0},_getColumns:function(){var a=this.options.isFitWidth?this.element.parent():this.element,b=a.width();this.columnWidth=this.isFluid?this.options.columnWidth(b):this.options.columnWidth||this.$bricks.outerWidth(!0)||b,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((b+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(a){var c=b(a),d,e,f,g,h;d=Math.ceil(c.outerWidth(!0)/this.columnWidth),d=Math.min(d,this.cols);if(d===1)f=this.colYs;else{e=this.cols+1-d,f=[];for(h=0;h<e;h++)g=this.colYs.slice(h,h+d),f[h]=Math.max.apply(Math,g)}var i=Math.min.apply(Math,f),j=0;for(var k=0,l=f.length;k<l;k++)if(f[k]===i){j=k;break}var m={top:i+this.offset.y};m[this.horizontalDirection]=this.columnWidth*j+this.offset.x,this.styleQueue.push({$el:c,style:m});var n=i+c.outerHeight(!0),o=this.cols+1-l;for(k=0;k<o;k++)this.colYs[j+k]=n},resize:function(){var a=this.cols;this._getColumns(),(this.isFluid||this.cols!==a)&&this._reLayout()},_reLayout:function(a){var b=this.cols;this.colYs=[];while(b--)this.colYs.push(0);this.layout(this.$bricks,a)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(a){this.reloadItems(),this._init(a)},appended:function(a,b,c){if(b){this._filterFindBricks(a).css({top:this.element.height()});var d=this;setTimeout(function(){d._appended(a,c)},1)}else this._appended(a,c)},_appended:function(a,b){var c=this._getBricks(a);this.$bricks=this.$bricks.add(c),this.layout(c,b)},remove:function(a){this.$bricks=this.$bricks.not(a),a.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),b(a).unbind(".masonry")}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var f=function(b){a.console&&a.console.error(b)};b.fn.masonry=function(a){if(typeof a=="string"){var c=Array.prototype.slice.call(arguments,1);this.each(function(){var d=b.data(this,"masonry");if(!d){f("cannot call methods on masonry prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(d[a])||a.charAt(0)==="_"){f("no such method '"+a+"' for masonry instance");return}d[a].apply(d,c)})}else this.each(function(){var c=b.data(this,"masonry");c?(c.option(a||{}),c._init()):b.data(this,"masonry",new b.Mason(a,this))});return this}})(window,jQuery);
;/*
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright 2011, Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
;$(function(){var sWidth=250;var hasCompleted=false;if(watersetting.regionId>0){$("#ltNavCon>ul>li:eq(2)").addClass("navCur").find("span").html("周边");}
else if(watersetting.isbroad==0)
$("#ltNavCon>ul>li:eq(2)").addClass("navCur").find("span").html("国内");else
$("#ltNavCon>ul>li:eq(2)").addClass("navCur").find("span").html("出境");$(".disbt").remove();var InProgress=false,isqingchu=false;$(window).resize(ctWidth);function ctWidth(){var cw=$('#container').width()-0,winw=$(window).width()-0;var div=$("div.flowItemAd").siblings("div.flowItem");for(var l=4;l<50;l++){if(sWidth*l<winw&&winw<sWidth*(l+1)){$("div.flowItemAd").insertAfter(div.eq(l-2));$('#container').width(sWidth*l);}else if(sWidth*4>winw){$('#container').width(sWidth*4);$("div.flowItemAd").insertAfter(div.eq(2));}}
if($("div.flowItemAd").length==1){$('#container').masonry("destroy");}
$('#container').masonry({itemSelector:'.flowItem',columnWidth:sWidth,isAnimated:true});}
ctWidth();fouceAd('flowPicBtn','flowPic',4000);function fillPageview(){var footids="";$("em.qgNum[deffer]").each(function(){footids+=$(this).attr("deffer")+",";});if(footids!=""){$.getJSON("http://api.lotour.net/brandhome/API/SelectFootPageView?footids="+footids+"&callback=?",function(data){$.each(data,function(i,item){$("em.qgNum[deffer="+item.FootId+"]").html(item.RegionId).removeAttr("deffer");});});}}
fillPageview();function fillauthor(){var author="";$("div.flowPing[deffer]").each(function(){author+=$(this).attr("deffer")+",";});$("div.auther[deffer]").each(function(){author+=$(this).attr("deffer")+",";});$.getJSON("http://fw1.lotour.com/i/Common/GetMembersMessageByFw?memberIds="+author+"&callback=?",function(data){if(data.Success){var result=data.Result.Data;$.each(result,function(i,item){if($("div.flowPing[deffer="+item.MemberId+"]").length>0){$("div.flowPing[deffer="+item.MemberId+"]").each(function(){$(this).find("div.flowPingL img").attr("src","http://img.lotour.net/UserPhoto/"+item.Photo);$(this).find("a:lt(2)").attr("title",item.NickName).eq(1).html(item.NickName);$(this).removeAttr("deffer");});}
if($("div.auther[deffer="+item.MemberId+"]").length>0){$("div.auther[deffer="+item.MemberId+"]").each(function(){$(this).find("img").attr("src","http://img.lotour.net/UserPhoto/"+item.Photo);$(this).find("a:lt(1)").attr("title",item.NickName).eq(1).html(item.NickName);$(this).removeAttr("deffer");});}});}});}
fillauthor();$(".flowPic,.flowTxt").live("hover",function(){$(this).parent(".flowItem").toggleClass("flowItemOn");$(this).parent(".flowItem").find('.shareLy,.wechatLy').hide();})
$(".flowPic").live("hover",function(){$(this).siblings(".flowTxt").find("h2").toggleClass("picTit");})
$(".flowPing").live("hover",function(){$(this).toggleClass("flowPingOn");})
$("div.flowTab li:gt(0)").click(function(){var _this=$(this);$("div.flowTab li:gt(0)").removeClass("cur").find("i").removeClass("on");_this.addClass("cur").find("i").addClass("on");watersetting.order=$("div.flowTab li:gt(0)").index(_this);watersetting.pageIndex=1;isqingchu=true;fillPage();return false;})
function fillPage(){$.ajax({cache:false,type:"POST",dataType:"jsonp",url:"http://api.lotour.net/brandhome/water/SelectDiscoverList",data:watersetting,success:function(data){if(data.length<watersetting.pageSize){$("#ScrollLoadingDivID").addClass("sphl");hasCompleted=true;}
else{$("#ScrollLoadingDivID").removeClass("sphl");hasCompleted=false;}
if(isqingchu){$("#container > div").remove();$('#container').masonry("destroy").masonry({itemSelector:'.flowItem',columnWidth:sWidth,isAnimated:true});isqingchu=false;}
var tem=$("#waterTemplate").tmpl(data);$("#container").append(tem).masonry('appended',tem);fillauthor();fillPageview();watersetting.pageIndex++;InProgress=false;},error:function(xhr,status,errMsg){InProgress=false;alert(decodeURI(errMsg));}});}
function ScrollLoadPage(){if(hasCompleted)return;if(InProgress)return;InProgress=true;fillPage();}
if($('.flowItem').length<watersetting.pageSize){hasCompleted=true;$("#ScrollLoadingDivID").addClass("sphl");}
$(window).scroll(function(){if(0==$("#ScrollLoadingDivID").length){alert("没有指定ScrollLoadingDivID！");return;}
if("function"!=typeof(ScrollLoadPage)){alert("没有定义函数ScrollLoadPage！");return;}
if($("#ScrollLoadingDivID").offset().top<$(window).scrollTop()+$(window).height()){ScrollLoadPage();}
var st=$(document).scrollTop();if($(document).scrollTop()-206>=0){$(".flowHd").addClass("flowTabFix");if($.browser.msie&&($.browser.version=="6.0")&&!$.support.style){$(".flowHd").css("top",st)}}else if($(document).scrollTop()-206<0){$(".flowHd").removeClass("flowTabFix");if($.browser.msie&&($.browser.version=="6.0")&&!$.support.style){$(".flowHd").css("top",0)}}});$('.share').click(function(){$(this).siblings('.shareLy').toggle();return false})
$('.flowItem .shareLy a.wechat').click(function(){var div=$(this).siblings('.wechatLy');if(typeof($(this).attr("deffer"))!="undefined"){div.find("img").attr("src","http://api.lotour.net/brandhome/api/ShowPic?url="+$(this).attr("deffer"));$(this).removeAttr("deffer");}
$(this).siblings('.wechatLy').show();return false;})
$('.wechatLy i').click(function(){$(this).parent().hide();})
$('.flowClalist .word a').click(function(){var idx=$(this).index();$(this).addClass('on').siblings().removeClass('on');$('.flowClalist .citybox').eq(idx).removeClass('sphl').siblings('.citybox').addClass('sphl');return false})
$('.flowCla .qh').click(function(){$('.flowClalist').show()
return false})
$('.flowCla .close').click(function(){$('.flowClalist').hide()
return false})
$('.btad .cls').click(function(){$('.btad').remove();return false})
var scrollFunc=function(e){e=e||window.event;if(e.wheelDelta){if(e.wheelDelta>0){$('.btad').hide();}
if(e.wheelDelta<0){$('.btad').show();}}else if(e.detail){if(e.detail>0){$('.btad').show();}
if(e.detail<0){$('.btad').hide();}}}
if(document.addEventListener){document.addEventListener('DOMMouseScroll',scrollFunc,false);}
window.onmousewheel=document.onmousewheel=scrollFunc;});function fouceAd(btn,pic,t){$('.flowAd').each(function(){var adThis=$(this)
adThis.find('.'+btn+' a').hover(function(){var $this=$(this),$index=$(this).index();$this.addClass('hover').siblings().removeClass('hover');$this.parents('.flowAd').find('.'+pic+' li').eq($index).removeClass('sphl').siblings().addClass('sphl');return false;})
var d=setInterval(function(){if(adThis.find('.'+btn+' a.hover').index()==adThis.find('.'+btn+' a').length-1){adThis.find('.'+btn+' a').eq(0).trigger('mouseover');return false;}
adThis.find('.'+btn+' a.hover').next().trigger('mouseover')},t);})}
function sns_share_show(key,title,content,url,pic,tag){content='常来乐途旅游网，天天涨姿势，转一篇《'+content+'》，你们感受一下！（分享自 @乐途旅游网）';var from=key.split('_')[0];if(from=='wb'){var pop_url='http://api.lotour.com/PageService/SnsShare.aspx?key='+key+'&title='+encodeURIComponent(title)+'&content='+encodeURIComponent(content)+'&url='+encodeURIComponent(url)+'&pic='+encodeURIComponent(pic);return"window.open('"+pop_url+"', '_blank', 'scrollbars=no,width=600,height=480,left=75,top=20,status=no,resizable=yes');";}else if(from=='rr'){var pop_url='http://api.lotour.com/PageService/SnsShare.aspx?key='+key+'&title='+encodeURIComponent(title)+'&content='+encodeURIComponent(content)+'&url='+encodeURIComponent(url)+'&pic='+encodeURIComponent(pic);return"window.open('"+pop_url+"', '_blank', 'scrollbars=no,width=700,height=650,left=75,top=20,status=no,resizable=yes');";}else if(from=='qz'){var pop_url='http://api.lotour.com/PageService/SnsShare.aspx?key='+key+'&title='+encodeURIComponent(title)+'&content='+encodeURIComponent(content)+'&url='+encodeURIComponent(url)+'&pic='+encodeURIComponent(pic);return"window.open('"+pop_url+"', '_blank', 'scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');";}else if(from=='qt'){var pop_url='http://api.lotour.com/PageService/SnsShare.aspx?key='+key+'&title='+encodeURIComponent(title)+'&content='+encodeURIComponent(content)+'&url='+encodeURIComponent(url)+'&pic='+encodeURIComponent(pic);return"window.open('"+pop_url+"', '_blank', 'scrollbars=no,width=700,height=680,left=75,top=20,status=no,resizable=no,menubar=no,toolbar=no,scrollbars=no,location=yes');";}};$(function(){$("<link>").attr({rel:"stylesheet",type:"text/css",href:"http://css.lotour.net/ltFeedback.css"}).appendTo("head");$("<a href=\"javascript:void(0)\" class=\"ltFeedback\"><span></span></a><div class=\"ltFeedbackLayer\"><div class=\"ltFeedbackBg\"></div><div class=\"ltFeedbackIn\"><a class=\"cls\" href=\"javascript:void(0)\"></a><h5>意见反馈</h5><div class=\"con\"><textarea tips=\"嗨，这儿是你的地盘。请留下你的宝贵建议，或者无下限吐槽。总之，我们关注你的感受，相信我们为你改变!(200字以内)\">嗨，这儿是你的地盘。请留下你的宝贵建议，或者无下限吐槽。总之，我们关注你的感受，相信我们为你改变!(200字以内)</textarea><p>我们将为采纳的建议回馈小礼物哦，可留下你的联系方式!</p><ul><li>姓名：<input id=\"feedbackName\" tips=\"选填\" type=\"text\" value=\"选填\" maxlength=\"16\" /></li><li class=\"l2\">手机：<input id=\"feedbackTel\" tips=\"选填\" type=\"text\" value=\"选填\" maxlength=\"11\" /></li></ul><a href=\"javascript:void(0)\" class=\"send\">发 送</a><p class=\"tip\" style=\"display:none\">嗨，在你的地盘写点什么吧</p></div></div></div><div class=\"ltFeedbackLayer2\"><div class=\"ltFeedbackBg\"></div><div class=\"ltFeedbackIn\"><a class=\"cls\" href=\"javascript:void(0)\"></a><h5>意见反馈</h5><p>发送成功，谢谢！</p></div></div><div class=\"ltFeedbackShade\"></div>").appendTo("body");$('.ltFeedback').click(function(){$('.ltFeedbackLayer,.ltFeedbackShade').show();$('.ltFeedbackShade').css('height',$(document).height());$('.ltFeedbackLayer .con textarea,#feedbackTel,#feedbackName').val($(this).attr("tips")).removeClass('rt');})
$('.ltFeedbackLayer .cls,.ltFeedbackLayer2 .cls').click(function(){$('.ltFeedbackLayer,.ltFeedbackShade,.ltFeedbackLayer2').hide();});$('.ltFeedbackLayer .send').click(function(){var content=$.trim($('.ltFeedbackLayer .con textarea').val());if(content==''||content=='嗨，这儿是你的地盘。请留下你的宝贵建议，或者无下限吐槽。总之，我们关注你的感受，相信我们为你改变!(200字以内)'){$('.ltFeedbackLayer .con p.tip').html('嗨，在你的地盘写点什么吧').show();$('.ltFeedbackLayer .con textarea').focus();return false;}
var tel=$.trim($('#feedbackTel').val());tel=tel=='选填'?'':tel;var regPartton=/1[3-8]+\d{9}/;if(tel!=''&&!regPartton.test(tel)){$('.ltFeedbackLayer .con p.tip').html('手机号不正确！').show();$('#feedbackTel').focus();return false;}
var name=$.trim($('#feedbackName').val());name=name=='选填'?'':name;$('.ltFeedbackLayer .con p.tip').hide();$.ajax({url:'http://api.lotour.com/adwebservice/FeedbackService.asmx/SetFeedback?callback=?',data:{content:content,name:name,tel:tel,fromUrl:window.location.href},dataType:'jsonp',success:function(data){$('.ltFeedbackLayer').hide();$('.ltFeedbackLayer2').show();}});})
$('.ltFeedbackLayer .con textarea,.ltFeedbackLayer .con input').focusin(function(){var _this=$(this);if(_this.val()==_this.attr("tips")){_this.val('').addClass('rt')}}).focusout(function(){var _this=$(this);if(_this.val()==''){_this.val(_this.attr("tips")).removeClass('rt')}});});