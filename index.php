<?php include('includes/header.php');?>
<div class="container">
<div class="row" id="pagecontent">
   <div class="col-md-3 ">
      <ul class="nav nav-pills nav-stacked" id="leftnav">
      </ul>
   </div>
   <div class="col-md-9">
      <!-- Example row of columns -->
      <div class="row questionrow" >
         <div id="youtube-player-container">
            <iframe id="ytvideoplayer" src=""  frameborder="0" allowfullscreen></iframe>
         </div>
         <div id="exercise-container">
            <div class="col-md-6">
               <div id="jquery_jplayer_1" class="jp-jplayer"></div>
               <div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
                  <div class="jp-type-single">
                     <div class="jp-gui jp-interface">
                        <div class="jp-controls">
                           <button class="jp-play" role="button" tabindex="0">play</button>
                           <button class="jp-stop" role="button" tabindex="0">stop</button>
                        </div>
                        <div class="jp-progress">
                           <div class="jp-seek-bar">
                              <div class="jp-play-bar"></div>
                           </div>
                        </div>
                        <div class="jp-time-holder">
                           <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
                           <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
                           <div class="jp-toggles">
                              <button class="jp-repeat" role="button" tabindex="0">repeat</button>
                           </div>
                        </div>
                     </div>
                     <div class="jp-details">
                        <div class="jp-title" aria-label="title">&nbsp;</div>
                     </div>
                     <div class="jp-no-solution">
                        <span>Update Required</span>
                        To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                     </div>
                  </div>
               </div>
            </div>
            <div class="col-md-6">
               <div class="well questionwell">
                  <h3>
                  Question Here!
               </div>
            </div>
            <div class="col-md-6">
               <button class="btn btn-large btn-block btn-primary quizanswer correct">Correct Answer 1</button>
            </div>
            <div class="col-md-6">
               <button class="btn btn-large btn-block btn-primary quizanswer">Incorrect Answer 2</button>
            </div>
            <div class="col-md-6">
               <button class="btn btn-large btn-block btn-primary quizanswer">Incorrect Answer 3</button>
            </div>
            <div class="col-md-6">
               <button class="btn btn-large btn-block btn-primary quizanswer">Incorrect Answer 4</button>
            </div>
         </div>
      </div>
   </div>
</div>
<?php include("includes/footer.php");?>