/* Populate sidebar from JSON */
var items;


$(function() {
    $.ajax({
        url: "quiz.json",
        dataType: "json",
        type: "get",
        success: function(data, status, xhr) {
	      
            if (data["items"]) {
                if (data["items"].length) {
                    items = data["items"];
                 
                    for (x in items) {
                        $('#leftnav').append("<li role='presentation' ><a href='#' class='leftnavlink'>"+items[x].title+"</a></li>");
                    }
                       $('.leftnavlink').on('click', function() {
	      $("#jquery_jplayer_1").jPlayer('pause');
	      });
                    
                    
                    $('.leftnavlink').on('click', function() {
						loadItem(items[$(this).parent().index()], $(this).parent().index());
					});
					
					loadItem(items['0'], 0);
					$('#youtube-player-container').fitVids();
                }
            }
        }
    })
})


function loadItem(item, index) {
	
	
	if(item.type=="video") {
	
		$('#exercise-container').css('display','none');
		$('#youtube-player-container').css('display','block');
		$('#ytvideoplayer').attr("src", "http://www.youtube.com/embed/"+ item.videoid +"?rel=0&autoplay=0&showinfo=0");
		
      } else {
		$('#exercise-container').css('display','block');
		$('#youtube-player-container').css('display','none');
		$('#questionsdiv').html('');
	
		for (y in item.questions) {
			$('#questionsdiv').append('<div class="row"><div class="col-md-12" id="question_'+y+'"><h4>'+item.questions[y].questiontext+'</h4></div><div id="question_'+y+'_answers"></div></div>');
			for (z in item.questions[y].answers) {
		     $('#question_'+y+'_answers').append('<div  class="col-md-3"><button id="q_'+y+'_answer_'+z+'" class="btn btn-large btn-block quizanswer">'+item.questions[y].answers[z].answertext+'</button></div>');
		  
		     
			}
			$('#questionsdiv').append('<hr />');
			for (w in item.questions[y].correct) {
			
			   $('#q_'+y+'_answer_'+item.questions[y].correct[w].correctanswer).addClass('correct');
			   }
			 
		}
	
		$('.quizanswer').on('click', function() {
	if($(this).hasClass('correct')){
		$(this).removeClass('btn-primary').addClass('btn-success');
	} else {
		$(this).shake().removeClass('btn-primary').addClass('btn-danger');
	}
});

	}
	
	
	
}






/* Handle answer click */

$('.quizanswer').on('click', function() {
	if($(this).hasClass('correct')){
		$(this).removeClass('btn-primary').addClass('btn-success');
	} else {
		$(this).shake().removeClass('btn-primary').addClass('btn-danger');
	}
});

/* AUDIO PLAYER JS */

(function($) {
	'use strict';
	$('audio[controls]').before(function(){
		var song = this;
			song.controls=false;
		var player_box = document.createElement('div');
			$(player_box).addClass($(song).attr('class') + ' well container-fluid playa');
		var data_sec = document.createElement('section');
			$(data_sec).addClass('collapse');
		var toggle_holder = document.createElement('div');
			$(toggle_holder).addClass('btn-group row-fluid');
		var data_toggle = document.createElement('a');
			$(data_toggle).html('<i class="icon-reorder"></i>');
			$(data_toggle).addClass('btn btn-block');
			$(data_toggle).attr('style', 'opacity:0.3');
			$(data_toggle).click(function (){$(data_sec).collapse('toggle');});
			$(data_toggle).attr('title', 'Details');
			$(data_toggle).tooltip({'container': 'body', 'placement': 'top', 'html': true});
			$(toggle_holder).append(data_toggle);
		var data_table = document.createElement('table');
			$(data_table).addClass('table table-condensed');
		var player = document.createElement('section');
			$(player).addClass('btn-group row-fluid');
		var load_error = function(){
			console.log('error');
			$(player_box).find('.btn').addClass('disabled');
			$(player_box).find('input[type="range"]').hide();
			$(player_box).find('.icon-spin').text('Error');
			$(player_box).find('.icon-spin').parent().attr('title', 'There was an error loading the audio.');
			$(player_box).find('.icon-spin').parent().tooltip('fixTitle');
			$(player_box).find('.icon-spin').removeClass('icon-spinner icon-spin');
		};
		var addPlay = function() {
			var play = document.createElement('button');
				$(play).addClass('btn disabled span1');
			play.setPlayState = function(toggle){
					$(play).removeClass('disabled');
				if (toggle === 'play') {
					$(play).html('<i class="icon-play"></i>');
					$(play).click(function () {
						song.play();
					});
				}
				if (toggle === 'pause') {
					$(play).html('<i class="icon-pause"></i>');
					$(play).click(function () {
						song.pause();
					});
				}
			};
			$(song).on('play', function(){play.setPlayState('pause');});
			$(song).on('canplay', function(){play.setPlayState('play');});
			$(song).on('pause', function(){play.setPlayState('play');});
			var timeout = 0;
			var loadCheck = setInterval(function() {
				if(isNaN(song.duration) === false){
					play.setPlayState('play');
					clearInterval(loadCheck);
					return true;
				}
				if(song.networkState === 3 || timeout === 75){
					load_error();
					clearInterval(loadCheck);
					return false;
				}
				timeout++;
			}, 50);
			
			$(player).append(play);
		};
		var addSeek = function() {
			var seek = document.createElement('input');
				$(seek).attr({
					'type': 'range',
					'min': 0,
					'value': 0,
					'class': 'seek'
				});
			seek.progress = function () {
				var bg = 'rgba(223, 240, 216, 1) 0%';
				bg += ', rgba(223, 240, 216, 1) ' + ((song.currentTime/song.duration) * 100) + '%';
				bg += ', rgba(223, 240, 216, 0) ' + ((song.currentTime/song.duration) * 100) + '%';
				for (var i=0; i<song.buffered.length; i++){
					if (song.buffered.end(i) > song.currentTime && isNaN(song.buffered.end(i)) === false && isNaN(song.buffered.start(i)) === false){
						var bufferedstart;
						var bufferedend;
						if (song.buffered.end(i) < song.duration) {
							bufferedend = ((song.buffered.end(i)/song.duration) * 100);
						}
						else {
							bufferedend = 100;
						}
						if (song.buffered.start(i) > song.currentTime){
							bufferedstart = ((song.buffered.start(i)/song.duration) * 100);
						}
						else {
							bufferedstart = ((song.currentTime/song.duration) * 100);
						}
						bg += ', rgba(217, 237, 247, 0) ' + bufferedstart + '%';
						bg += ', rgba(217, 237, 247, 1) ' + bufferedstart + '%';
						bg += ', rgba(217, 237, 247, 1) ' + bufferedend + '%';
						bg += ', rgba(217, 237, 247, 0) ' + bufferedend + '%';
					}						
				}
				$(seek).css('background', '-webkit-linear-gradient(left, ' + bg + ')');
				//These may be re-enabled when/if other browsers support the background like webkit
				//$(seek).css('background','-o-linear-gradient(left,  ' + bg + ')');
				//$(seek).css('background','-moz-linear-gradient(left,  ' + bg + ')');
				//$(seek).css('background','-ms-linear-gradient(left,  ' + bg + ')');
				//$(seek).css('background','linear-gradient(to right,  ' + bg + ')');
				$(seek).css('background-color', '#ddd');
			};
			seek.set = function () {
				$(seek).val(song.currentTime);
				seek.progress();
			};
			seek.slide = function () {
				song.currentTime = $(seek).val();
				seek.progress();
			};
			seek.init = function () {
				$(seek).attr({
					'max': song.duration,
					'step': song.duration / 100
				});
				seek.set();
			};
			seek.reset = function () {
				$(seek).val(0);
				song.currentTime = $(seek).val();
				if(!song.loop){song.pause();}
				else {song.play();}
			};
			var seek_wrapper = document.createElement('div');
				$(seek_wrapper).addClass('btn disabled span4');

			$(seek_wrapper).append(seek);
			$(seek).on('change', seek.slide);
			$(song).on('timeupdate', seek.init);
			$(song).on('loadedmetadata', seek.init);
			$(song).on('loadeddata', seek.init);
			$(song).on('progress', seek.init);
			$(song).on('canplay', seek.init);
			$(song).on('canplaythrough', seek.init);
			$(song).on('ended', seek.reset);
			if(song.readyState > 0){
				seek.init();
			}
			$(player).append(seek_wrapper);
		};
		var addTime = function() {
			var time = document.createElement('a');
				$(time).addClass('btn span3');
				$(time).tooltip({'container': 'body', 'placement': 'right', 'html': true});
			time.twodigit = function (myNum) {
				return ("0" + myNum).slice(-2);
			};
			time.timesplit = function (a) {
				if (isNaN(a)){return '<i class="icon-spinner icon-spin"></i>';}
				var hours = Math.floor(a / 3600);
				var minutes = Math.floor(a / 60) - (hours * 60);
				var seconds = Math.floor(a) - (hours * 3600) - (minutes * 60);
				var timeStr = time.twodigit(minutes) + ':' + time.twodigit(seconds);
				if (hours > 0) {
					timeStr = hours + ':' + timeStr;
				}
				return timeStr;
			};
			time.showtime = function () {
				$(time).html(time.timesplit(song.duration));
				$(time).attr({'title': 'Click to Reset<hr style="padding:0; margin:0;" />Position: ' + (time.timesplit(song.currentTime))});
				if (!song.paused){
					$(time).html(time.timesplit(song.currentTime));
					$(time).attr({'title': 'Click to Reset<hr style="padding:0; margin:0;" />Length: ' + (time.timesplit(song.duration))});
				}
				$(time).tooltip('fixTitle');
			};
			$(time).click(function () {
				song.pause();
				song.currentTime = 0;
				time.showtime();
				$(time).tooltip('fixTitle');
				$(time).tooltip('show');
			});
			$(time).tooltip('show');
			$(song).on('loadedmetadata', time.showtime);
			$(song).on('loadeddata', time.showtime);
			$(song).on('progress', time.showtime);
			$(song).on('canplay', time.showtime);
			$(song).on('canplaythrough', time.showtime);
			$(song).on('timeupdate', time.showtime);
			if(song.readyState > 0){
				time.showtime();
			}
			else {
				$(time).html('<i class="icon-spinner icon-spin"></i>');
			}
			$(player).append(time);
		};
		var addMute = function() {
			var mute = document.createElement('button');
				$(mute).addClass('btn span1');
			mute.checkVolume = function () {
				if (song.volume > 0.5 && !song.muted) {
					$(mute).html('<i class="icon-volume-up"></i>');
				} else if (song.volume < 0.5 && song.volume > 0 && !song.muted) {
					$(mute).html('<i class="icon-volume-down"></i>');
				} else {
					$(mute).html('<i class="icon-volume-off"></i>');
				}
			};
			$(mute).click(function () {
				if (song.muted) {
					song.muted = false;
					song.volume = song.oldvolume;
				} else {
					song.muted = true;
					song.oldvolume = song.volume;
					song.volume = 0;
				}
				mute.checkVolume();
			});
			mute.checkVolume();
			$(song).on('volumechange', mute.checkVolume);
			$(player).append(mute);
		};
		var addVolume = function() {
			var volume = document.createElement('input');
				$(volume).attr({
					'type': 'range',
					'min': 0,
					'max': 1,
					'step': 1 / 100,
					'value': 1
				});
			volume.slide = function () {
				song.muted = false;
				song.volume = $(volume).val();
			};
			volume.set = function () {
				$(volume).val(song.volume);
			};
			var vol_wrapper = document.createElement('div');
				$(vol_wrapper).addClass('btn disabled span3');
			$(vol_wrapper).append(volume);
			$(volume).on("change", volume.slide);
			$(song).on('volumechange', volume.set);
			$(player).append(vol_wrapper);
		};
		var addAlbumArt = function() {
			var albumArt = document.createElement('img');
				$(albumArt).addClass('thumbnail');
				$(albumArt).attr('src', $(song).data('infoAlbumArt'));
			$(data_sec).append(albumArt);
		};
		var addInfo = function(title, dataId) {
			var row = document.createElement('tr');
			var head = document.createElement('th');
			var data = document.createElement('td');
			$(head).html(title);
			$(data).html($(song).data(dataId));
			$(row).append(head);
			$(row).append(data);
			$(data_table).append(row);
		};
		var addData = function() {
			if (typeof($(song).data('infoAlbumArt')) !== 'undefined'){ addAlbumArt();}
			if (typeof($(song).data('infoArtist')) !== 'undefined'){ addInfo('Artist', 'infoArtist');}
			if (typeof($(song).data('infoTitle')) !== 'undefined'){ addInfo('Title', 'infoTitle');}
			if (typeof($(song).data('infoAlbumTitle')) !== 'undefined'){ addInfo('Album', 'infoAlbumTitle');}
			if (typeof($(song).data('infoLabel')) !== 'undefined'){ addInfo('Label', 'infoLabel');}
			if (typeof($(song).data('infoYear')) !== 'undefined'){ addInfo('Year', 'infoYear');}
			if ($(data_table).html() !== ""){
				$(data_sec).append(data_table);
				$(player_box).append(toggle_holder);
				$(player_box).append(data_sec);
			}
		};
		var addPlayer = function() {
			if ($(song).data('play') !== 'off'){ addPlay();}
			if ($(song).data('seek') !== 'off'){ addSeek();}
			if ($(song).data('time') !== 'off'){ addTime();}
			if ($(song).data('mute') !== 'off'){ addMute();}
			if ($(song).data('volume') !== 'off'){ addVolume();}
			$(player_box).append(player);
		};
		var addAttribution = function() {
			var attribution = document.createElement('small');
				$(attribution).addClass('pull-right muted');
			if (typeof($(song).data('infoAttLink')) !== 'undefined'){
				var attribution_link = document.createElement('a');
					$(attribution_link).addClass('muted');
					$(attribution_link).attr('href', $(song).data('infoAttLink'));
					$(attribution_link).html($(song).data('infoAtt'));
				$(attribution).append(attribution_link);
			}
			else {
				$(attribution).html($(song).data('infoAtt'));
			}
			$(player_box).append(attribution);
		};
		var fillPlayerBox = function() {
			addData();
			addPlayer();
			if (typeof($(song).data('infoAtt')) !== 'undefined'){ addAttribution();}
		};
		fillPlayerBox();
		$(song).on('error', function(){
			load_error();
		});
		return player_box;
	});
})(jQuery);

/* Shake */

(function ($) {
    $.fn.shake = function (options) {
        // defaults
        var settings = {
            'shakes': 2,
            'distance': 10,
            'duration': 400
        };
        // merge options
        if (options) {
            $.extend(settings, options);
        }
        // make it so
        var pos;
        return this.each(function () {
            $this = $(this);
            // position if necessary
            pos = $this.css('position');
            if (!pos || pos === 'static') {
                $this.css('position', 'relative');
            }
            // shake it
            for (var x = 1; x <= settings.shakes; x++) {
                $this.animate({ left: settings.distance * -1 }, (settings.duration / settings.shakes) / 4)
                    .animate({ left: settings.distance }, (settings.duration / settings.shakes) / 2)
                    .animate({ left: 0 }, (settings.duration / settings.shakes) / 4);
            }
        });
    };
}(jQuery));

/* Fitvids */

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );


/* YouTube Plugin */

/*! jQuery TubePlayer - v1.1.7 - 2013-09-24
* https://github.com/nirvanatikku/jQuery-TubePlayer-Plugin
* Copyright (c) 2013 Nirvana Tikku; Licensed MIT */
!function(a){"use strict";function b(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=0|16*Math.random(),c="x"==a?b:8|3&b;return c.toString(16)})}var c=".tubeplayer",d="jquery-youtube-tubeplayer",e="opts"+c,f={inited:!1,ytplayers:{},inits:[],iframeScriptInited:!1,State:{UNSTARTED:-1,ENDED:0,PLAYING:1,PAUSED:2,BUFFERING:3,CUED:5},Error:{BAD_INIT:0,INVALID_PARAM:2,NOT_FOUND:100,NOT_EMBEDDABLE:101,CANT_PLAY:150}};a.tubeplayer={events:{},TubePlayer:f},a.tubeplayer.defaults={afterReady:function(){},stateChange:function(b){var c=this.onPlayer;return function(d){var e=a("#"+b).parent();switch("object"==typeof d&&(d=d.data),d){case f.State.UNSTARTED:return c.unstarted[b].call(e);case f.State.ENDED:return c.ended[b].call(e);case f.State.PLAYING:return c.playing[b].call(e);case f.State.PAUSED:return c.paused[b].call(e);case f.State.BUFFERING:return c.buffering[b].call(e);case f.State.CUED:return c.cued[b].call(e);default:return null}}},onError:function(b){var c=this.onErr;return function(d){var e=a("#"+b).parent();switch("object"==typeof d&&(d=d.data),d){case f.Error.BAD_INIT:case f.Error.INVALID_PARAM:return c.invalidParameter[b].call(e);case f.Error.NOT_FOUND:return c.notFound[b].call(e);case f.Error.NOT_EMBEDDABLE:case f.Error.CANT_PLAY:return c.notEmbeddable[b].call(e);default:return c.defaultError[b].call(e)}}},qualityChange:function(b){var c=this;return function(d){var e=a("#"+b).parent();return"object"==typeof d&&(d=d.data),c.onQualityChange[b].call(e,d)}},onQualityChange:{},onPlayer:{unstarted:{},ended:{},playing:{},paused:{},buffering:{},cued:{}},onErr:{defaultError:{},notFound:{},notEmbeddable:{},invalidParameter:{}}};var g={width:425,height:355,allowFullScreen:"true",initialVideo:"DkoeNLuMbcI",start:0,preferredQuality:"auto",showControls:!0,showRelated:!1,playsinline:!1,annotations:!0,autoPlay:!1,autoHide:!0,loop:0,theme:"dark",color:"red",showinfo:!1,modestbranding:!0,protocol:"http",wmode:"transparent",swfobjectURL:"ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js",loadSWFObject:!1,allowScriptAccess:"always",playerID:"tubeplayer-player-container",iframed:!0,onPlay:function(){},onPause:function(){},onStop:function(){},onSeek:function(){},onMute:function(){},onUnMute:function(){},onPlayerUnstarted:function(){},onPlayerEnded:function(){},onPlayerPlaying:function(){},onPlayerPaused:function(){},onPlayerBuffering:function(){},onPlayerCued:function(){},onQualityChange:function(){},onError:function(){},onErrorNotFound:function(){},onErrorNotEmbeddable:function(){},onErrorInvalidParameter:function(){}};a.fn.tubeplayer=function(b,d){var e=a(this),g=typeof b;return 0===arguments.length||"object"===g?e.each(function(){f.init(a(this),b)}):"string"===g?e.triggerHandler(b+c,"undefined"!=typeof d?d:null):void 0};var h=function(a){return function(b,c){var d=f.getPkg(b);if(d.ytplayer){var e=a(b,c,d);return"undefined"==typeof e&&(e=d.$player),e}return d.$player}};a.tubeplayer.getPlayers=function(){return f.ytplayers},f.init=function(h,j){if(h.hasClass(d))return h;var k=a.extend({},g,j);k.playerID+="-"+b(),h.addClass(d).data(e,k);for(var l in i)h.bind(l+c,h,i[l]);return f.initDefaults(a.tubeplayer.defaults,k),a("<div></div>").attr("id",k.playerID).appendTo(h),f.initPlayer(h,k),h},f.getPkg=function(a){var b=a.data,c=b.data(e),d=f.ytplayers[c.playerID];return{$player:b,opts:c,ytplayer:d}},f.iframeReady=function(b){return f.inits.push(function(){new YT.Player(b.playerID,{videoId:b.initialVideo,width:b.width,height:b.height,playerVars:{autoplay:b.autoPlay?1:0,autohide:b.autoHide?1:0,controls:b.showControls?1:0,loop:b.loop?1:0,playlist:b.loop?b.initialVideo:"",rel:b.showRelated?1:0,fs:b.allowFullScreen?1:0,wmode:b.wmode,showinfo:b.showinfo?1:0,modestbranding:b.modestbranding?1:0,iv_load_policy:b.annotations?1:3,start:b.start,theme:b.theme,color:b.color,playsinline:b.playsinline},events:{onReady:function(c){f.ytplayers[b.playerID]=c.target;var e=a(c.target.getIframe()).parents("."+d);a.tubeplayer.defaults.afterReady(e)},onPlaybackQualityChange:a.tubeplayer.defaults.qualityChange(b.playerID),onStateChange:a.tubeplayer.defaults.stateChange(b.playerID),onError:a.tubeplayer.defaults.onError(b.playerID)}})}),f.inits.length>=1&&!f.inited?function(){for(var a=0;a<f.inits.length;a++)f.inits[a]();f.inited=!0}:(f.inited&&f.inits.pop()(),window.onYouTubePlayerAPIReady)},f.initDefaults=function(a,b){var c=b.playerID,d=a.onPlayer;d.unstarted[c]=b.onPlayerUnstarted,d.ended[c]=b.onPlayerEnded,d.playing[c]=b.onPlayerPlaying,d.paused[c]=b.onPlayerPaused,d.buffering[c]=b.onPlayerBuffering,d.cued[c]=b.onPlayerCued,a.onQualityChange[c]=b.onQualityChange;var e=a.onErr;e.defaultError[c]=b.onError,e.notFound[c]=b.onErrorNotFound,e.notEmbeddable[c]=b.onErrorNotEmbeddable,e.invalidParameter[c]=b.onErrorInvalidParameter},f.initPlayer=function(a,b){b.iframed?f.initIframePlayer(a,b):f.initFlashPlayer(a,b)},f.initIframePlayer=function(a,b){if(!f.iframeScriptInited){var c=document.createElement("script");c.src=b.protocol+"://www.youtube.com/iframe_api";var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d),f.iframeScriptInited=!0}window.onYouTubePlayerAPIReady=f.iframeReady(b)},f.initFlashPlayer=function(b,c){c.loadSWFObject?(c.swfobjectURL=c.swfobjectURL.replace("http://",""),c.swfobjectURL=c.swfobjectURL.replace("https://",""),c.swfobjectURL=c.protocol+"://"+c.swfobjectURL,a.getScript(c.swfobjectURL,f.init_flash_player(c))):f.init_flash_player(c)()},f.init_flash_player=function(b){return function(){if(!window.swfobject)return alert("YouTube Player couldn't be initialized. Please include swfobject."),void 0;var c=["//www.youtube.com/v/"];c.push(b.initialVideo),c.push("?&enablejsapi=1&version=3"),c.push("&playerapiid="+b.playerID),c.push("&rel="+(b.showRelated?1:0)),c.push("&autoplay="+(b.autoPlay?1:0)),c.push("&autohide="+(b.autoHide?1:0)),c.push("&loop="+(b.loop?1:0)),c.push("&playlist="+(b.loop?b.initialVideo:"")),c.push("&controls="+(b.showControls?1:0)),c.push("&showinfo="+(b.showinfo?1:0)),c.push("&modestbranding="+(b.modestbranding?1:0)),c.push("&iv_load_policy="+(b.annotations?1:3)),c.push("&start="+b.start),c.push("&theme="+b.theme),c.push("&color="+b.color),c.push("&playsinline="+b.playsinline),c.push("&fs="+(b.allowFullScreen?1:0)),window.swfobject.embedSWF(c.join(""),b.playerID,b.width,b.height,"8",null,null,{allowScriptAccess:b.allowScriptAccess,wmode:b.wmode,allowFullScreen:b.allowFullScreen},{id:b.playerID}),window.onYouTubePlayerReady=function(b){var c=document.getElementById(b),e=b.replace(/-/g,""),g=a.tubeplayer.defaults;a.tubeplayer.events[e]={stateChange:g.stateChange(b),error:g.onError(b),qualityChange:g.qualityChange(b)},c.addEventListener("onStateChange","$.tubeplayer.events."+e+".stateChange"),c.addEventListener("onError","$.tubeplayer.events."+e+".error"),c.addEventListener("onPlaybackQualityChange","$.tubeplayer.events."+e+".qualityChange"),f.ytplayers[b]=c;var h=a(c).parents("."+d);a.tubeplayer.defaults.afterReady(h)}}},f.getVideoIDFromURL=function(a){a=a||"";var b=a.indexOf("?"),c=a.substring(b,a.length),d=c.indexOf("v=");if(d>-1){var e=c.indexOf("&",d);return-1===e&&(e=c.length),c.substring(d+"v=".length,e)}return""};var i={opts:h(function(a,b,c){return c.opts}),cue:h(function(a,b,c){c.ytplayer.cueVideoById(b,0,c.opts.preferredQuality)}),play:h(function(a,b,c){"object"==typeof b?c.ytplayer.loadVideoById({videoId:b.id,startSeconds:b.time,suggestedQuality:c.opts.preferredQuality}):"undefined"!=typeof b?c.ytplayer.loadVideoById({videoId:b,startSeconds:0,suggestedQuality:c.opts.preferredQuality}):c.ytplayer.playVideo(),c.opts.onPlay(b)}),pause:h(function(a,b,c){c.ytplayer.pauseVideo(),c.opts.onPause(c)}),stop:h(function(a,b,c){c.ytplayer.stopVideo(),c.opts.onStop(c)}),seek:h(function(a,b,c){if(/:/.test(b)){var d=b.split(":").reverse();b=0;for(var e=0;e<d.length;e++)b+=Math.pow(60,e)*(0|d[e])}c.ytplayer.seekTo(b,!0),c.opts.onSeek(b)}),mute:h(function(a,b,c){c.$player.attr("data-prev-mute-volume",c.ytplayer.getVolume()),c.ytplayer.mute(),c.opts.onMute(c)}),unmute:h(function(a,b,c){c.ytplayer.unMute(),c.ytplayer.setVolume(c.$player.attr("data-prev-mute-volume")||50),c.opts.onUnMute()}),isMuted:h(function(a,b,c){return c.ytplayer.isMuted()}),volume:h(function(a,b,c){return"undefined"==typeof b?c.ytplayer.getVolume()||0:(c.ytplayer.setVolume(b),c.$player.attr("data-prev-mute-volume",c.ytplayer.getVolume()),void 0)}),quality:h(function(a,b,c){return"undefined"==typeof b?c.ytplayer.getPlaybackQuality():(c.ytplayer.setPlaybackQuality(b),void 0)}),playbackRate:h(function(a,b,c){return"undefined"==typeof b?c.ytplayer.getPlaybackRate():(c.ytplayer.setPlaybackRate(b),void 0)}),data:h(function(a,b,c){var d={},e=c.ytplayer;return d.videoLoadedFraction=e.getVideoLoadedFraction(),d.bytesLoaded=e.getVideoBytesLoaded(),d.bytesTotal=e.getVideoBytesTotal(),d.startBytes=e.getVideoStartBytes(),d.state=e.getPlayerState(),d.currentTime=e.getCurrentTime(),d.duration=e.getDuration(),d.videoURL=e.getVideoUrl(),d.videoEmbedCode=e.getVideoEmbedCode(),d.videoID=f.getVideoIDFromURL(d.videoURL),d.availableQualityLevels=e.getAvailableQualityLevels(),d.availablePlaybackRates=e.getAvailablePlaybackRates(),d}),videoId:h(function(a,b,c){return f.getVideoIDFromURL(c.ytplayer.getVideoUrl())}),size:h(function(b,c,d){"undefined"!=typeof c&&c.width&&c.height&&(d.ytplayer.setSize(c.width,c.height),a(d.ytplayer).css(c))}),destroy:h(function(b,g,h){h.$player.removeClass(d).data(e,null).unbind(c).html(""),delete f.ytplayers[h.opts.playerID];var i=a.tubeplayer.defaults,j=["unstarted","ended","playing","paused","buffering","cued"];return a.each(j,function(a,b){delete i.onPlayer[b][h.opts.playerID]}),j=["defaultError","notFound","notEmbeddable","invalidParameter"],a.each(j,function(a,b){delete i.onErr[b][h.opts.playerID]}),delete i.onQualityChange[h.opts.playerID],delete a.tubeplayer.events[h.opts.playerID],"destroy"in h.ytplayer&&h.ytplayer.destroy(),a(h.ytplayer).remove(),null}),player:h(function(a,b,c){return c.ytplayer})}}(jQuery);