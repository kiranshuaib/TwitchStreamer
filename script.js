var channels=["ESL_SC2", "OgamingSC2", "freecodecamp", "storbeck", "RobotCaleb","brunofin" ];
var baseUrl="https://wind-bow.gomix.me/twitch-api";

$(document).ready(function getChannelsData()
{
   var html=[];
   var closedTwitch=[];
  channels.forEach(function(channel)
    {
      $.getJSON(baseUrl+'/streams/'+channel+'/', function(dataStreams)
        {
         $.getJSON(baseUrl+'/channels/'+channel+'/',function(dataChannel)
           {

			if(dataChannel.status===400 ||dataChannel.status===404)
               {
                 closedTwitch.push(channel+' closed or does not exist!<br>');
               }
            else
			  {
				var status=dataStreams.stream!=null?"online":"ofline";
				html.push("<a href='"+dataChannel.url+"' target='_blank'>");
				html.push("<div class='row streammerRow "+status+"'>");
				html.push("<div class='col-xs-2 col-md-2 streamerImage'>");
				html.push('<img class="streamerImg" src="' + dataChannel.logo + '"alt="Image">');
				html.push('</div>');//image end
				html.push("<div class='col-xs-3 col-md-3 channelName'>");
				html.push("<p>"+channel+"</p>");
				html.push("</div>");//channel end
				html.push("<div class='col-xs-7 col-md-7 streamerMessage'>");
				if(status=="online")
				  {
					html.push("<p>"+dataChannel.status+"</p>");
				  }
				else
				  {
					html.push("<p>OFLINE</p>");
				  }
				html.push("</div>");
				html.push("</div>");
				html.push("</a>");
				$(".streammers").html(html.join(''));
$(".closedTwitchAccount").html(closedTwitch.join(''));
              }
          })
            })

    })
 });


  $(".onlineClick").on("click",function()
                       {
    $(".ofline").hide();
    $(".online").show();
    $(".onlineClick").addClass("statusButtonActive");
    $(".oflineClick").removeClass("statusButtonActive");
    $(".allClick").removeClass("statusButtonActive");
  });
  $(".oflineClick").on("click",function()
                       {
    $(".ofline").show();
    $(".online").hide();
     $(".onlineClick").removeClass("statusButtonActive");
    $(".oflineClick").addClass("statusButtonActive");
    $(".allClick").removeClass("statusButtonActive");
  });
  $(".allClick").on("click",function()
                       {
    $(".ofline").show();
    $(".online").show();
     $(".onlineClick").removeClass("statusButtonActive");
    $(".oflineClick").removeClass("statusButtonActive");
    $(".allClick").addClass("statusButtonActive");

});
