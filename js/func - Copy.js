

$(function() {DisplayLogonScreen();});



/*! waitForImages jQuery Plugin 2017-02-20 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){var b="waitForImages",c=function(a){return a.srcset&&a.sizes}(new Image);a.waitForImages={hasImageProperties:["backgroundImage","listStyleImage","borderImage","borderCornerImage","cursor"],hasImageAttributes:["srcset"]},a.expr[":"]["has-src"]=function(b){return a(b).is('img[src][src!=""]')},a.expr[":"].uncached=function(b){return!!a(b).is(":has-src")&&!b.complete},a.fn.waitForImages=function(){var d,e,f,g=0,h=0,i=a.Deferred(),j=this,k=[],l=a.waitForImages.hasImageProperties||[],m=a.waitForImages.hasImageAttributes||[],n=/url\(\s*(['"]?)(.*?)\1\s*\)/g;if(a.isPlainObject(arguments[0])?(f=arguments[0].waitForAll,e=arguments[0].each,d=arguments[0].finished):1===arguments.length&&"boolean"===a.type(arguments[0])?f=arguments[0]:(d=arguments[0],e=arguments[1],f=arguments[2]),d=d||a.noop,e=e||a.noop,f=!!f,!a.isFunction(d)||!a.isFunction(e))throw new TypeError("An invalid callback was supplied.");return this.each(function(){var b=a(this);f?b.find("*").addBack().each(function(){var b=a(this);b.is("img:has-src")&&!b.is("[srcset]")&&k.push({src:b.attr("src"),element:b[0]}),a.each(l,function(a,c){var d,e=b.css(c);if(!e)return!0;for(;d=n.exec(e);)k.push({src:d[2],element:b[0]})}),a.each(m,function(a,c){var d=b.attr(c);return!d||void k.push({src:b.attr("src"),srcset:b.attr("srcset"),element:b[0]})})}):b.find("img:has-src").each(function(){k.push({src:this.src,element:this})})}),g=k.length,h=0,0===g&&(d.call(j),i.resolveWith(j)),a.each(k,function(f,k){var l=new Image,m="load."+b+" error."+b;a(l).one(m,function b(c){var f=[h,g,"load"==c.type];if(h++,e.apply(k.element,f),i.notifyWith(k.element,f),a(this).off(m,b),h==g)return d.call(j[0]),i.resolveWith(j[0]),!1}),c&&k.srcset&&(l.srcset=k.srcset,l.sizes=k.sizes),l.src=k.src}),i.promise()}});



/*jQuery.thermometer - https://github.com/noahcooper/jQuery.thermometer*/

(function($) {
  $.fn.thermometer = function(options) {
    var settings = $.extend({
      percent: 0, 
      orientation: 'horizontal', 
      animate: true, 
      speed: 1000
    }, options || {});
    
    return this.each(function() {
      var _percent = $(this).data('percent') || settings.percent, 
      _orientation = $(this).data('orientation') || settings.orientation, 
      _animate = $(this).data('animate') === false ? false : settings.animate, 
      _speed = $(this).data('speed') || settings.speed;
      var _class;
      /* set the orientation */
      _orientation = _orientation.toLowerCase() === 'vertical' ? 'v' : 'h';
      
      /* set min and max percentage */
      if(isNaN(_percent) || _percent < 0) {
        _percent = 0;
      }
      else if(_percent > 100) {
        _percent = 100;
      }
      
      /* override the default "slow" duration used by jQuery.animate() */
      if($.type(_speed) === 'string' && _speed.toLowerCase() === 'slow') {
        _speed = 1500;
      }
		
	  if( _percent > 49) {
      _class="hot";
      } else {
      _class="cold";
      }
		
      
      $(this).html('<div class="thermometer-outer thermometer-outer-' + _orientation + '">' + 
                     '<div class="thermometer-inner-' + _class + '">' + 
                     '</div>' + 
                   '</div>');
      
      var initialInnerSize = _animate ? 0 : (_percent + '%');
      if(_orientation === 'v') {
        $(this).find('.thermometer-outer').css('position', 'relative');
        $(this).find('.thermometer-inner-' + _class).css({
          position: 'absolute', 
          bottom: '0', 
          height: initialInnerSize
        });
      }
      else {
        $(this).find('.thermometer-inner-' + _class).css('width', initialInnerSize);
      }
      
      if(_animate) {
        var animateProperties = {};
        if(_orientation === 'v') {
          animateProperties.height = _percent + '%';
        }
        else {
          animateProperties.width = _percent + '%';
        }
        $(this).find('.thermometer-inner-'+ _class).animate(animateProperties, _speed);
      }
    });
  };
})(jQuery);

//Generic functions
function AjaxCall(url) {
return	$.ajax({                                      
	  url: url,                           
	  dataType: 'text'
	});	  
}

function SubStr(a, b, str) {
	var result;
	if (typeof str !== 'undefined') {
		if (str.length > b)	{
			result = str.substring(a,b) + "..";
		} else {
			result = str;
		}
	} else {
		result = ''
	}
	return result;
}

//User login & security
function SetAction(ActionValue) {
	switch(ActionValue) {
		case null,"0":
		$('#LoginSignUpLink').html("Log in"); 
		$('#BoxTitle').html("Sign Up");
		$('#LoginSignUpText').html("Already a member?");	
		ActionType = "1";
		break;
	
	case "1":
		$('#LoginSignUpLink').html("Sign me up!"); 
		$('#BoxTitle').html("Log in");
		$('#LoginSignUpText').html("Not a member yet?");
		//$( "#login" ).attr( "placeholder", "Username" );	
	
		ActionType = "0"; 
		break;
	}
	
}

function GetDefaultGroup_CB(data){
	var GlobalGroupArray = JSON.parse(data);
	
	store.set('selected_group_id', GlobalGroupArray[0].id);
	store.set('global_group_id', GlobalGroupArray[0].id);
	store.set('global_group_name', GlobalGroupArray[0].Group_name);			  
	store.set('selected_group_name', GlobalGroupArray[0].Group_name);
	store.set('update_freq', GlobalGroupArray[0].update_freq);
	store.set('Interval', 48);
	store.set('group_privacy', GlobalGroupArray[0].Anonymous);
	store.set('UserIsOwner','false');
	
	//trend.innerHTML = "24h"
	header_groups_text.innerHTML = SubStr(0,21,GlobalGroupArray[0].Group_name);
	
	$( "#48" ).addClass( "TrendDetailsMenuButtonSelected" );
	$("#Privacy_status").removeClass();

	if(GlobalGroupArray[0].Anonymous == '0') {$("#Privacy_status").addClass("PublicMemberIco_dark");}
	if(GlobalGroupArray[0].Anonymous == '-1') {$("#Privacy_status").addClass("PrivateMemberIco_dark");}
	
	SelectedGroupData();
	UpdateMetaphore();	
}

function GetDefaultGroup() { 
	AjaxCall('db/get_global_group.php?user_id=' + store.get('userid')).done(GetDefaultGroup_CB);
}

function UserIsLogged() {
	if (typeof store.get('userid') === 'undefined' || store.get('userid') === null) {
		return false;
		
	} else {
		if (store.get('userid')) {
				return true;
			
			} else {
				return false;
		}
	}
}

function LogonScreen(ShowHide) {

	if (ShowHide == "hide") {
		$("#LoginBkgrd").css({'display': 'none'});
		$("#Animation_container,#SlideOutMenu,#selected_group,#trend_data,#user_data,#MemberList_container").css({'display':'block'});
		header_groups_text.innerHTML = SubStr(0,21,store.get('selected_group_name'));
		CurrentlyLoggedUser.innerHTML = store.get('username');

	} else {
		$("#Animation_container,#SlideOutMenu,#selected_group,#trend_data,#user_data,#MemberList_container").css({'display':'none'});
		$("#LoginBkgrd").css({'display': 'block'});	
	}
}

function DisplayLogonScreen() {
	var IsLogged = UserIsLogged();

	if (IsLogged) {

		HideAllSliders();
		LogonScreen("hide");
		SetTrendInterval("");
		UpdateMetaphore();

		$("#SplashScreen").css({"display":"block"});
		$('.element').waitForImages(function() {
    		$("#Application_container").css({"display":"block"});
			$("#SplashScreen").css({"display":"none"});
  		}, $.noop, true);
		

		
		window.setInterval(RefreshWeather, 1800000);
		$("#Privacy_status").removeClass();

		if(store.get('UserIsOwner') == 'true' && store.get('group_privacy') == '0' && store.get('UserIsMember') == 'true')	
			{$("#Privacy_status").addClass("PublicMemberIco_dark");}

		if(store.get('UserIsOwner') == 'true' && store.get('group_privacy') == '-1' && store.get('UserIsMember') == 'true') 			
			{$("#Privacy_status").addClass("PrivateMemberIco_dark");}

		if(store.get('UserIsOwner') == 'false' && store.get('group_privacy') == '-1' && store.get('UserIsMember') == 'true') 
			{$("#Privacy_status").addClass("PrivateMemberIco_dark");}

		if(store.get('UserIsOwner') == 'false' && store.get('group_privacy') == '0' && store.get('UserIsMember') == 'true') 
			{$("#Privacy_status").addClass("PublicMemberIco_dark");}

		
		if(store.get('UserIsOwner') == 'true') {
			$("#GroupLegend").css({"display":"block"});
		} else {
			$("#GroupLegend").css({"display":"none"});
		};
		
		MenuList();
		
	} else {
		$("#SplashScreen").css({"display":"none"});
		LogonScreen("show");
	}
}

function UserAuthentified_CB(data){
	var DataArray = JSON.parse(data);	
	if (DataArray != 'false'){
		$("#SplashScreen").css({"display":"block"});
		SetAction("0");
		store.set('userid', DataArray[0].id);
		store.set('username', DataArray[0].login);
		
		GetDefaultGroup();
		SetTrendInterval("");
		MenuList();
		
		LogonScreen("hide");
		
		$("#login").val(null);
		$("#pwd").val(null);
		$('.element').waitForImages(function() {$("#Application_container").css({"display":"block"});$("#SplashScreen").css({"display":"none"});}, $.noop, true);
	} else {
		alert("Invalid user login or password");
	}	
}

function LoginUser() {
	var login = document.getElementById("login").value;
	var pwd = document.getElementById("pwd").value;
	
	GetUserTimeZone();
	
	if (login.length>0) {
		switch(ActionType) {
			case "1" :
				AjaxCall('db/signup.php?login=' + login).done(SetAction("1"));
				break;

			case "0":								
				AjaxCall('db/get_userdata.php?login=' + login +'&pwd=' + pwd).done(UserAuthentified_CB); 
				break;
		}
	} else {
		alert("Please provide a login");
	}
}

function LogOut() {
	store.clear();
	store.remove('userid');
	store.remove('username');
	store.remove('global_group_id');
	store.remove('global_group_name');
	store.remove('selected_group_id');
	store.remove('selected_group_name');
	store.remove('UserIsOwner');
	store.remove('UserInputRequired');
	store.remove('Interval');
	store.remove('tempUnit');
	$("#login").val(null);
	$("#pwd").val(null);
	SetAction("1");
	$("#LoginBkgrd").css({'display': 'block'});
	$("#Application_container").css({'display':'none'});	
	MenuTL.reverse(0);
}

//Animation ----------------------------------

function SelectTL() {
	switch(SelectedIco) {
		case "cloud_slider_ico":
			SelectedTL = ["CloudsTL"];
			SelectedVars = ["CloudVal"];
			break;
		case "sun_rain_slider_ico":
		SelectedTL = ["SunTL","RaincloudsTL"];
		SelectedVars = ["SunVal","RainVal"];
			break;
		case "thunder_slider_ico":
			SelectedTL = ["ThunderTL"];
			SelectedVars = ["ThunderVal"];
			break;		
		case "sun_clouds_slider_ico":
			SelectedTL = ["SunTL","CloudsTL"];
			SelectedVars = ["SunVal","CloudVal"];
			break;
		case "rain_slider_ico":
			SelectedTL = ["RaincloudsTL"];
			SelectedVars = ["RainVal"];
			break;
		case "sun_slider_ico":
			SelectedTL = ["SunTL"];
			SelectedVars = ["SunVal"];
			break;
	}
}

function SetVariables(item) {
	eval("var " + item + " = document.getElementById('" + item + "')");
}

function AnimTo(tween,ObjName,x2,y2,scaleX2,scaleY2,autoalpha2,duration,delay,bkgrdYesNo) {
	
	tween.to(window[ObjName], duration, {y:y2,x:x2,scaleX:scaleX2,scaleY:scaleY2,autoAlpha:autoalpha2},delay);
	tween.pause();
	
}	

function AnimFromTo(tween,ObjName,x1,y1,scaleX1,scaleY1,autoalpha1,x2,y2,scaleX2,scaleY2,autoalpha2,zIndexVar,duration,delay,bkgrdYesNo) {
	
	tween.fromTo(	window[ObjName], 
					duration, 
					{x:x1,y:y1,scaleX:scaleX1,scaleY:scaleY1, autoAlpha:autoalpha1,zIndex:zIndexVar,display:"none"}, 
					{x:x2,y:y2,scaleX:scaleX2,scaleY:scaleY2,autoAlpha:autoalpha2,display:"block"},
					delay);
	
	tween.pause();
}	

function SetBkgrd(BkgrdIndex) {


	$("#ContentArea").css({'background': "linear-gradient(to top, rgba(255,255,255," + ( BkgrdIndex) + "), rgba(180,180,180," + ( BkgrdIndex) + "))"});
	$("#landscape,#grass").css({'filter': 'saturate(' + (1 - BkgrdIndex) + ')'});
	
	RainbowTL.progress(0).pause();
	GrassTL.progress(1-BkgrdIndex).pause();
	TreeTL.progress(1 - BkgrdIndex).pause();
	
	if(store.get('tempUnit') != 'Celsius' && store.get('tempUnit') != 'Farenheit'){ store.set('tempUnit','Celsius'); }
	
	$("#TempUnitText").html(store.get('tempUnit'));
	
	if(store.get('tempUnit') == 'Farenheit') {
		temp_indicator.innerHTML = Math.round(50*(1 - BkgrdIndex)+45,1) + "°F";
		$('#cbT').prop('checked', true); 
	} else {
		temp_indicator.innerHTML = Math.round((50*(1 - BkgrdIndex)+13)*5/9,1) + "°C";
		$('#cbT').prop('checked', false); 
	}
	
	var GaugeVal;
	
	if(100*(1 - BkgrdIndex)<20) {
		GaugeVal = 20;
	} else {
		GaugeVal = 100*(1 - BkgrdIndex);
	}
	
	if(GaugeVal>49) {
		$( "#thermo-bottom" ).removeClass( "thermo-bottom-cold" );				
		$( "#thermo-bottom" ).addClass( "thermo-bottom-hot" );		
	} else {
		$( "#thermo-bottom" ).removeClass( "thermo-bottom-hot" );		
		$( "#thermo-bottom" ).addClass( "thermo-bottom-cold" );
	}
	
	
	$('#thermometer').thermometer({percent: GaugeVal, speed: 'fast'});
}




//Time management

//Callback functions
function GetLastGroupUpdateDate_CB(data){
	var UpdateDateArray = JSON.parse(data);
	var UpdateDateRowCount = UpdateDateArray.length;
	var UserTime =  "";
	
	if (UpdateDateRowCount>0) {
		var LastUpdateDate = UpdateDateArray[0].LastUpdateByUser;
		var ServerStamp = moment.tz(LastUpdateDate, "UTC");
		if (store.get('UserInputRequired') == 'true'){
			var UserTime = ServerStamp.tz(store.get('timezone')).fromNow();
		}
		
	} 

	LastUpdate.innerHTML = UserTime;

	var UserTimeStrip1 = UserTime.replace("utes",'');
	var UserTimeStrip2 = UserTimeStrip1.replace("onds",'');
	
	LastUpdate_MemberList.innerHTML = UserTimeStrip2;	

	if (UserTime.length == 0) {
		$("#LastUpdate_MemberList").css({'display': 'none'});

	} else {
		$("#LastUpdate_MemberList").css({'display': 'block'});


	}
}

function UpdateMetaphore_CB(data){	

	var input_date = JSON.parse(data);	
	var LastUpdateDate = input_date[0].entered;
	var ServerStamp = moment.tz(LastUpdateDate, "UTC");
	var LocalServerTime = ServerStamp.tz(store.get('timezone'));
	var CurrentLocalTime = moment();
	var ElapsedTime = CurrentLocalTime.diff(LocalServerTime,'seconds');
	
	if(ElapsedTime > store.get('update_freq') && store.get('UserIsMember') == 'true' ) {
		store.set('UserInputRequired','true');
	} else {
		store.set('UserInputRequired','false');
		InsertGroupUpdateDate();
	}
	
	GetLastGroupUpdateDate();
	Logged_user_info();
	GetMood();
}

function IndicatorVar(element_id,TVar,steady0,up3,up4,down2,down1){	

	$(element_id).removeClass();
	
		if(Math.abs(TVar)<0.1){
			$(element_id).addClass(steady0);
		} else {
			if(TVar >= 0.1 && TVar <= 0.4){
				$(element_id).addClass(down2);
			} 

			if(TVar > 0.4) {
				$(element_id).addClass(down1);
			}

			if(TVar <= -0.1 && TVar >= -0.4){
				$(element_id).addClass(up3);
			} 

			if(TVar < -0.4) {
				$(element_id).addClass(up4);
			}
	}
}

function SetTrendInterval(thisItem){

	var ItemId = thisItem.id || store.get('Interval') || 48;

	if(thisItem.id){
		ItemId = ItemId.replace("F",'');
	};
	
	var ItemLabel = $("#" + ItemId + "F").text();
/*	var ButtonLabel;
	
		switch(ItemLabel) {		
		case "Today": 
			ButtonLabel = "Day"	
			break;

		case "Week": 
			ButtonLabel = "7d"	
			break;
			
		case "Month": 
			ButtonLabel = "Mo"	
			break;
		
		case "Year": 
			ButtonLabel = "Yr"	
			break;
	}*/
	
	
	$( ".TrendDetailsMenuButton" ).removeClass( "TrendDetailsMenuButtonSelected" );
	$( "#" + ItemId +"F" ).addClass( "TrendDetailsMenuButtonSelected" );
	store.set('Interval',ItemId);
	//trend.innerHTML = ButtonLabel;
	if(typeof(thisItem.id) == 'string') {SetTrend();};	
}

function SetTrend_CB(data){	
	var TrendData = JSON.parse(data);	

	
	var SunValdb_1 = TrendData[0].SunValAVG_1;
	var RainValdb_1 = TrendData[0].RainValAVG_1;
	var CloudValdb_1 = TrendData[0].CloudValAVG_1;
	var ThunderValdb_1 = TrendData[0].ThunderValAVG_1;
	var Trend1 = BkgrdEngine(SunValdb_1,CloudValdb_1,RainValdb_1,ThunderValdb_1);
	
	var SunValdb_2 = TrendData[0].SunValAVG_2;
	var RainValdb_2 = TrendData[0].RainValAVG_2;
	var CloudValdb_2 = TrendData[0].CloudValAVG_2;
	var ThunderValdb_2 = TrendData[0].ThunderValAVG_2;
	var Trend2 = BkgrdEngine(SunValdb_2,CloudValdb_2,RainValdb_2,ThunderValdb_2);
	
	var TrendVar = (Trend2 - Trend1)/Trend1;
	var TrendVarSun = (SunValdb_1 - SunValdb_2)/SunValdb_1 || SunValdb_1;
	var TrendVarClouds = (CloudValdb_1 - CloudValdb_2)/CloudValdb_1 || CloudValdb_1;
	var TrendVarRain = (RainValdb_1 - RainValdb_2)/RainValdb_1 || RainValdb_1;
	var TrendVarThunder = (ThunderValdb_1 - ThunderValdb_2)/ThunderValdb_1 || ThunderValdb_1;	
	console.log("TrendVarSun : " + TrendVarSun);
	console.log("TrendVarClouds : " + TrendVarClouds);
	console.log("TrendVarRain : " + TrendVarRain);
	console.log("TrendVarThunder : " + TrendVarThunder);
	
	
	IndicatorVar("#trend",TrendVar,"trendSteady","trendUp3","trendUp4","trendDown2","trendDown1");
	
	IndicatorVar("#ind_sun",TrendVarSun,"Indicator IndicatorSunSteady","Indicator IndicatorSunUp3","Indicator IndicatorSunUp4","Indicator IndicatorSunDown2","Indicator IndicatorSunDown1");
	
	IndicatorVar("#ind_clouds",TrendVarClouds,"Indicator IndicatorCloudsSteady","Indicator IndicatorCloudsUp3","Indicator IndicatorCloudsUp4","Indicator IndicatorCloudsDown2","Indicator IndicatorCloudsDown1");
	
	IndicatorVar("#ind_rain",TrendVarRain,"Indicator IndicatorRainSteady","Indicator IndicatorRainUp3","Indicator IndicatorRainUp4","Indicator IndicatorRainDown2","Indicator IndicatorRainDown1");
	
	IndicatorVar("#ind_thunder",TrendVarThunder,"Indicator IndicatorThunderSteady","Indicator IndicatorThunderUp3","Indicator IndicatorThunderUp4","Indicator IndicatorThunderDown2","Indicator IndicatorThunderDown1");
	
}

function BkgrdEngine(SunValx,CloudValx,RainValx,ThunderValx) {
	
	var		
			NegativeBkgrdFactor=0,
			PositiveBkgrdFactor=0,
			ActiveElements=0,
		
			BkgrdFactor = DefaultBkgrdFactor,
			
			PositiveWeatherVars = [SunValx], 
			NegativeWeatherVars = [CloudValx,RainValx,ThunderValx],
			PositiveActiveElements = 0,
			NegativeActiveElements = 0;
	
	for(var i = 0; i < PositiveWeatherVars.length; ++i){
		if(PositiveWeatherVars[i] !== 0)
			PositiveActiveElements++;
	}
	
	
	for(var i = 0; i < NegativeWeatherVars.length; ++i){
		if(NegativeWeatherVars[i] !== 0)
			NegativeActiveElements++;
	}
	
	ActiveElements = PositiveActiveElements + NegativeActiveElements;

	if(SunValx!=0){DefaultBkgrdFactor = 0.65;} else {DefaultBkgrdFactor = 0.65;};
	
	var CloudVal_DefBkgrdAdj = CloudValx*(1-DefaultBkgrdFactor);
	var ThunderVal_DefBkgrdAdj = ThunderValx*(1-DefaultBkgrdFactor);
	var RainVal_DefBkgrdAdj = RainValx*(1-DefaultBkgrdFactor);
	var SunVal_DefBkgrdAdj = (SunValx)*(1-DefaultBkgrdFactor);
	
	if(ActiveElements == 0) {
		BkgrdFactor = DefaultBkgrdFactor;
			} else {
				if(NegativeActiveElements==0){
					BkgrdFactor = (DefaultBkgrdFactor - SunValx*DefaultBkgrdFactor);
						} else {

							switch(NegativeActiveElements) {
									case 1:

										if(CloudValx!=0){NegativeBkgrdFactor = CloudVal_DefBkgrdAdj * 0.33};
										if(ThunderValx!=0){NegativeBkgrdFactor = ThunderVal_DefBkgrdAdj};
										if(RainValx!=0){NegativeBkgrdFactor = RainVal_DefBkgrdAdj * 0.66};
										break;
									case 2:

										if(CloudValx!=0&&ThunderValx!=0){NegativeBkgrdFactor = CloudVal_DefBkgrdAdj*(1-ThunderVal_DefBkgrdAdj) + ThunderVal_DefBkgrdAdj;};
										if(CloudValx!=0&&RainValx!=0){NegativeBkgrdFactor = CloudVal_DefBkgrdAdj*(1-RainVal_DefBkgrdAdj) + RainVal_DefBkgrdAdj;};
										if(ThunderValx!=0&&RainValx!=0){NegativeBkgrdFactor = RainVal_DefBkgrdAdj*(1-ThunderVal_DefBkgrdAdj) + ThunderVal_DefBkgrdAdj;};
										break;
									case 3:

										NegativeBkgrdFactor = CloudVal_DefBkgrdAdj*(1-ThunderVal_DefBkgrdAdj)+RainVal_DefBkgrdAdj*(1-ThunderVal_DefBkgrdAdj)+ThunderVal_DefBkgrdAdj;
										break;

								} 

									NegativeBkgrdFactor = NegativeBkgrdFactor + DefaultBkgrdFactor;
									BkgrdFactor = NegativeBkgrdFactor - SunVal_DefBkgrdAdj;
									if(BkgrdFactor>1){BkgrdFactor = 1};if(BkgrdFactor<0){BkgrdFactor = 0};
											}
			}

	return BkgrdFactor

}

function GetMood_CB(data){
	
	var UsersMoods = JSON.parse(data);
		
	SunValdb = UsersMoods[0].SunValAVG;
	//CloudValdb = 0.8;
	//CloudValdb = UsersMoods[0].CloudValAVG;
	if (UsersMoods[0].CloudValAVG > 0) { CloudValdb = Math.min(Math.max(UsersMoods[0].CloudValAVG, 0.1), 1)} else {CloudValdb = 0};
	if (UsersMoods[0].RainValAVG > 0) { RainValdb = Math.min(Math.max(UsersMoods[0].RainValAVG, 0.1), 1)} else {RainValdb = 0};
	if (UsersMoods[0].ThunderValAVG > 0) { ThunderValdb = Math.min(Math.max(UsersMoods[0].ThunderValAVG, 0.1), 1)} else {ThunderValdb = 0};
	//if (UsersMoods[0].SunValAVG > 0) {SunValAVG = Math.min(Math.max(UsersMoods[0].SunValAVG, 0.1), 1)} else {SunValAVG = 0};
	//CloudValdb = Math.min(Math.max(UsersMoods[0].CloudValAVG, 0.1), 1);
	//RainValdb = Math.min(Math.max(UsersMoods[0].RainValAVG, 0.1), 1);
	//ThunderValdb = Math.min(Math.max(UsersMoods[0].ThunderValAVG, 0.1), 1);	
	if (SunValdb == null) {SunValdb = 0};
	if (CloudValdb == null) {CloudValdb = 0};
	if (RainValdb == null) {RainValdb = 0};
	if (ThunderValdb == null) {ThunderValdb = 0};
	
	BkgrdFactor = BkgrdEngine(SunValdb,CloudValdb,RainValdb,ThunderValdb);
	console.log("BkgrdFactor:" + BkgrdFactor)
	SetBkgrd(BkgrdFactor);
	
	if (RainValdb!= 0 && SunValdb!= 0) {
		$("#rainbow").css({'display': 'block'});
		RainbowTL.progress((SunValdb*RainValdb)).pause()
	} else {
		$("#rainbow").css({'display': 'none'});

	};
	console.log("SunValdb:" + SunValdb);
	if (SunValdb != null && SunValdb != 0) {
		$("#sun").css({'display': 'block'});
		$("#sun").css({'filter': 'opacity(' + parseFloat(0.7 + SunValdb/3) + ') blur(' + parseFloat(25 - SunValdb * 25) + 'px) saturate(' + parseFloat(0.7 + SunValdb/3) + ')'});		
		SunTL.progress(SunValdb).pause();	
	} else {
		$("#sun").css({'display': 'none'});

	};

	CloudsTL.progress(CloudValdb).pause();
	SunTL.progress(SunValdb).pause();
		
	//CloudsTL.play(CloudValdb).addPause(CloudValdb);
	//ThunderTL.play(ThunderValdb).addPause(ThunderValdb);
	//CloudsTL.pause(1-CloudValdb);	
		
	RaincloudsTL.progress(RainValdb).pause();
	ThunderTL.progress(ThunderValdb).pause();


	
	UserList();
	Animation_container.style='display:none';
	$("#Animation_container").fadeIn("slow");
	
	console.log("UserInputRequired : " + store.get('UserInputRequired'))

	if (store.get('UserInputRequired') =='true' && store.get('UserIsMember') == 'true') {
		$("#LastUpdate").addClass("LastUpdateExpired");			
	} else {		
		$("#LastUpdate").removeClass("LastUpdateExpired");
	}
	
		if(store.get('UserIsMember') == 'true') {
		$("#UpdateMoodButton").removeClass("Inactive");
		$('#UpdateMoodButton').click(function(){ShowInputMoodInterface();});
	} else {
		$("#UpdateMoodButton").addClass("Inactive");
		$("#UpdateMoodButton").unbind('click');
	}
SetTrend();
}

//Functions
function InsertGroupUpdateDate() {
	AjaxCall('db/set_update_date.php?group_id=' + store.get('selected_group_id') + "&login_id=" + store.get('userid'));
}

function GetLastGroupUpdateDate() {
	AjaxCall('db/get_last_group_update_date.php?group_id=' + store.get('selected_group_id') + "&user_id=" + store.get('userid')).done(GetLastGroupUpdateDate_CB);
}

function UpdateMetaphore() {
	AjaxCall('db/get_last_inputdate.php?user_id=' + store.get('userid') + '&group_id=' + store.get('selected_group_id')).done(UpdateMetaphore_CB);
}
									 
function GetUserTimeZone() {
	if (!store.get('timezone')) {
	  var tz = jstz.determine() || 'UTC';
	  store.set('timezone',  tz.name());		
	}
}

function GetMood() {
	AjaxCall('db/get_mood.php?group_id=' + store.get('selected_group_id') + "&UserInputRequired=" + store.get('UserInputRequired') + "&user_id=" + store.get('userid')).done(GetMood_CB);	
}

function SetTrend() {
	AjaxCall("db/get_trend.php?group_id=" + store.get('selected_group_id') + "&user_id=" + store.get('userid') + "&Interval=" + store.get('Interval')).done(SetTrend_CB);	
}

//Button actions
function RefreshWeather_CB(data){	
	var input_date = JSON.parse(data);	
	var LastUpdateDate = input_date[0].entered;
	var ServerStamp = moment.tz(LastUpdateDate, "UTC");
	var LocalServerTime = ServerStamp.tz(store.get('timezone'));
	var CurrentLocalTime = moment();
	var ElapsedTime = CurrentLocalTime.diff(LocalServerTime,'seconds');
	
	if(ElapsedTime > store.get('update_freq') && store.get('UserIsMember') == 'true') {
		store.set('UserInputRequired','true');
		$("#LastUpdate").addClass("LastUpdateExpired");
		ShowInputMoodInterface();
	} else {
		store.set('UserInputRequired','false');
		InsertGroupUpdateDate();
		GetLastGroupUpdateDate();
		GetMood();
	}
		if(store.get('UserIsMember') == 'true') {
		$("#UpdateMoodButton").removeClass("Inactive");
		$('#UpdateMoodButton').click(function(){ShowInputMoodInterface();});
	} else {
		$("#UpdateMoodButton").addClass("Inactive");
		$("#UpdateMoodButton").unbind('click');
	}
	
	
}

function RefreshWeather() {
	AjaxCall('db/get_last_inputdate.php?user_id=' + store.get('userid') + '&group_id=' + store.get('selected_group_id')).done(RefreshWeather_CB);
}

function ValidateMoodInput() {
				
	$.each(SelectedVars, function( index, value ) {	
		eval(value + "= ico_val" ); 
	});

	$.each(AllWeatherVars, function( index, value ) {
		if ($.inArray(value,SelectedVars) ==-1) {eval(value + " = 0" );} 
	});
	
	HideAllSliders();
	
	AjaxCall("db/insert_mood.php?SunVal=" + SunVal + "&CloudVal="+CloudVal + "&RainVal="+RainVal + "&ThunderVal="+ThunderVal+ "&login="+store.get('username')+ "&login_id="+store.get('userid') + "&weather_symbol=" + weather_symbol).done(UpdateMetaphore());
	
	
	ico_click =0;ico_val=0;	
	MoodInput_Container.style='display:none';
	SelectedElement = '';
	
}



function HideAllSliders() {
	$('.slider_widget').css({'display': 'none'});
$( ".Level1,.Level2,.Level3" ).css({'display': 'none'});
	$(".slider_ico").css({'opacity': '0.65'});
	$(".slider_ico").unbind('mouseout');
	$(".slider_ico").mouseout(
		function() {
			$(this).css({'opacity': '0.65'});
		}
	);
}

function ShowInputMoodInterface() {
	MoodInput_Container.style='display:block !important';

}

function ShowSettingsMenu() {	
	$("#MemberList_container,#CurrentlyLoggedUser").css({'display':'block'});	
	$("#SettingsMenu_container,#Settings_join_groups,#Settings_leave_groups,#Settings_create_groups,#Settings_group_privacy").css({'display':'none'});	

	user_groups_list.style='display:none';
	Group_menu_container.style='display:none';
	
	MenuTL.to("#SlideOutMenu", 0.5, {x:"100%"},0);
	MenuTL.restart();
}

function TrendDetailsShow() {		
	
	if (TrendDetailsDisplay === false) {		
		TrendDetailsTL.to("#TrendDetails", 0.3, {y:"-100%"},0);
		TrendDetailsTL.restart();
		TrendDetailsDisplay = true;
	} else {
		TrendDetailsTL.reverse(-0.1);
		TrendDetailsDisplay = false;		
	}
}


function TrendDetailsHide() {
	if (TrendDetailsDisplay === true) {
		TrendDetailsTL.reverse(-0.1);
		TrendDetailsDisplay = false;				
	}
}


function ParametersEvents() {
	$("#MemberList_container").css({'display': 'none'});
	$("#Back,#SettingsMenu_container,#CurrentlyLoggedUser").css({'display': 'block'});
	MenuTL.to("#SlideOutMenu", 0.5, {x:"100%"},0);
	MenuTL.restart();
}


function JoinGroupsEvents() {
	$("#SettingsMenu_container,#Settings_leave_groups,#Settings_group_privacy").css({'display': 'none'});
	$("#Settings_join_groups").css({'display': 'block'});

	$(".JoinLeaveButton").prop('value', "Select a group");
	$(".JoinLeaveButton").prop('disabled', true);
	
	MenuItem = "JoinGroupsList";
	JoinLeaveGroups(2);
}

function LeaveGroupsEvents() {
	$("#SettingsMenu_container,#Settings_join_groups,#Settings_group_privacy").css({'display': 'none'});
	$("#Settings_leave_groups").css({'display': 'block'});

	$(".JoinLeaveButton").prop('value', "Select a group");
	$(".JoinLeaveButton").prop('disabled', true);
	
	MenuItem = "LeaveGroupsList";
	JoinLeaveGroups(1);
}

function PrivacyEvents() {
	$("#SettingsMenu_container,#Settings_join_groups,#Settings_leave_groups").css({'display': 'none'});
	$("#Settings_group_privacy").css({'display': 'block'});
	
	MenuItem = "PrivacyList";
	JoinLeaveGroups(1);
}

function CreateGroupMenuEvents() {
	$("#SettingsMenu_container,#Settings_join_groups,#Settings_group_privacy,#Settings_leave_groups").css({'display': 'none'});
	$("#Settings_create_groups").css({'display': 'block'});
}

function GoBack(thisItem) {
	var clickedItem = thisItem.id
	
	switch(clickedItem) {		
		case "SettingsMenu": 
			$("#CurrentlyLoggedUser,#MemberList_container").css({'display': 'block'});
			$("#SettingsMenu_container,#Settings_join_groups").css({'display': 'none'});	
			break;

		case "Settings_JoinGroups": 
			$("#SettingsMenu_container").css({'display': 'block'});
			$("#Settings_join_groups").css({'display': 'none'});	
			break;
			
		case "SettingsCreateGroups": 
			$("#CurrentlyLoggedUser,#MemberList_container").css({'display': 'none'});
			$("#Settings_create_groups").css({'display': 'none'});	
			SettingsMenu_container.style='display:block';
			break;
		
		case "Settings_LeaveGroups": 
			$("#SettingsMenu_container").css({'display': 'block'});
			$("#Settings_leave_groups").css({'display': 'none'});
			break;
			
		case "Settings_GroupPrivacy": 
			$("#SettingsMenu_container").css({'display': 'block'});
			$("#Settings_group_privacy").css({'display': 'none'});
			break;
	}
}

function CloseWindow(thisItem) {
	var clickedItem = thisItem.id
	
	switch(clickedItem) {		
		case "MemberList_Close": 
		case "Settings_Close": 
		case "Settings_join_groups_Close":
		case "Settings_create_groups_Close":
		case "Settings_leave_groups_Close":
		case "Settings_group_privacy_Close":
			MenuTL.reverse(-0.3);
			break;

		case "MoodInput_Close": 
			MoodInput_Container.style='display:none';
			ico_click =0;ico_val=0;	
			break;
			
		case "FrequencyOptions_Close": 
			$("#FrequencyOptions").css({'display': 'none'});
			break;
	}
	

}
 
function InputIconManager(thisItem) {
		
	SelectedIco = thisItem.id;
	SelectTL();
	SliderName = SelectedIco.replace("_ico", "");
	weather_symbol = SelectedIco.replace("_slider_ico", "");
	$('.slider_ico:not(#' + SliderName + '_ico)').css({'opacity': '0.20'});
	$('.slider_widget:not(.' + SliderName + ')').css({'display': 'none'});
	$('#validate_button').css({'display': 'block'});

	if (typeof SelectedElement === 'undefined' || SelectedElement ==='' || SelectedElement.length < 1){SelectedElement = SliderName;}

	if(SelectedElement == SliderName && SelectedElement.length>0) {

		if(ico_click < 4) {
			ico_click = ico_click + 1;ico_val = ico_val + (1/3);}	
		} else {
			ico_click = 1;ico_val = (1/3);
			SelectedElement = SliderName;
		}

	if(ico_click > 3 || ico_val > 1) {
		ico_click = 1;ico_val = (1/3);
	}
	$( ".Level1,.Level2,.Level3" ).css({'display': 'block'});
	switch(ico_click) {		
		case 1: 
			$( ".Level1" ).removeClass( "LevelOff" );
			$( ".Level2,.Level3" ).addClass( "LevelOff" );
			break;

		case 2: 
			$( ".Level2,.Level1" ).removeClass( "LevelOff" );
			$( ".Level3" ).addClass( "LevelOff" );
			break;

		case 3: 	
			$( ".Level3,.Level2,.Level1" ).removeClass( "LevelOff" );
			break;

		default:
			$( ".Level1" ).addClass( "LevelOff" );
	}

	$("#" + SelectedIco).unbind('mouseout');

	$( ".slider_ico:not(#" + SliderName + "_ico)" ).mouseout(
		  function() {
			$(thisItem).css({'opacity': '0.20'});ico_click =0;
		  }
	);
}


function JoinLeaveGroupEvent() {
	SelectedGroupId = SelectedGroupId.replace("x", "");
	console.log(SelectedGroupId);
	cbId = "cb" + MenuItem + SelectedGroupId;
	if (eval( "cb" + MenuItem + SelectedGroupId + ".checked")) {
		var PrivacyStatus = -1;
	} else {
		var PrivacyStatus = 0;
	}

	if (SelectedGroupId != store.get('global_group_id')) {
		$.ajax({
		  type:"get",
		  url:"db/join_group.php?user_id=" + store.get('userid')+"&group_id=" + SelectedGroupId +"&group_name=" + SelectedGroupName + "&GrpButtonCaption=" + GrpButtonCaption + "&privacy_status=" + PrivacyStatus,
		  success : function () {						  
			  			  $(".JoinLeaveButton").prop('value', "Select a group");
						  $(".JoinLeaveButton").prop('disabled', true);

						  if (GrpButtonCaption == "Join") {
							  MenuTL.reverse(-0.3);
							  store.set('selected_group_id', SelectedGroupId);							  
			  				  JoinLeaveGroups(2);
							  
						  } else {
							   JoinLeaveGroups(1);
							  if(SelectedGroupId == store.get('selected_group_id')){
								  store.set('selected_group_id', store.get('global_group_id'));	
							  }						  
					  }
			  SelectedGroupData();MenuList();		  
		  }
		});
	}
}

function CreateGroup() {
	var groupName = document.getElementById("groupname").value.substring(0,25);
	$.ajax({
	  type:"get",
	  url:"db/create_group.php?owner_id="+store.get('userid')+"&owner_name=" + store.get('username') +"&group_name=" +  groupName + "&access_type=1&update_freq=" + SelectedOptionId,
	  success : function () {MenuList();Settings_create_groups.style='display:none';}
	
	});
}

function ShowGroupsMenu() {
	if ($("#user_groups_list").is(':hidden')) {
	user_groups_list.style='display:block';
	Group_menu_container.style='display:block';
	} else {
	user_groups_list.style='display:none';
	Group_menu_container.style='display:none';
	
	} 
}


//Dropdown menus and lists
function UserList_CB(data) {

	var DataArray = JSON.parse(data);
	var RowCount = DataArray.length;
	var RowContent = '';
	var x = 0;  
	
	if (RowCount>0){
		
		var Group_name = DataArray[0].group_name;

		for (i = 0; i < RowCount; i++) {

			var ServerStamp = moment.tz(DataArray[i].entered, "UTC");
			var UserTime =  ServerStamp.tz(store.get('timezone')).format("YYYYMMDD,HH:mm");
			var ElapsedTime = moment(UserTime,"YYYYMMDD,HH:mm").fromNow();
			var login = DataArray[i].login; 
			var SunVal = DataArray[i].SunVal; 
			var RainVal = DataArray[i].RainVal; 
			var CloudVal = DataArray[i].CloudVal; 
			var ThunderVal = DataArray[i].ThunderVal; 
			var WeatherSymbol = DataArray[i].WeatherSymbol; 
			var Anonymous = DataArray[i].Anonymous; 
			var WeatherValue;
			var ProgressOn;
			var tdClass;
			var tdClassUserLogin;
			var ProgressClass1;
			var ProgressClass2;
			var ProgressClass3;
			
			
			switch (WeatherSymbol) {
			case "sun":
				WeatherValue = SunVal;
				break;
			case "sun_clouds":
			case "cloud":
				WeatherValue = CloudVal;
				break;
			case "rain":
			case "sun_rain":
				WeatherValue = RainVal;
				break;
			case "thunder":
				WeatherValue = ThunderVal;
				break;
			default:
				WeatherValue = 0;			
			}

			if (SunVal > 0) {
				ProgressOn = 'cProgressOnSun';
				tdClass="rowSunny";
				tdClassUserLogin="rowSunny";
			} else {
				ProgressOn = 'cProgressOnOther';
				tdClass="rowRainy";
				tdClassUserLogin="rowRainy";
					}

			if(Anonymous == "-1")	{tdClassUserLogin="rowAnonymous"; }
			
			WeatherStyle ="c" + WeatherSymbol;
			ProgressClass1 = '';
			ProgressClass2 = '';
			ProgressClass3 = '';

			if (WeatherValue > 0 && WeatherValue  <= 0.34) {ProgressClass1=ProgressOn;ProgressClass2="cProgressOff";ProgressClass3="cProgressOff";}
			if (WeatherValue > 0.34 && WeatherValue  <= 0.67) {ProgressClass1=ProgressOn;ProgressClass2=ProgressOn;ProgressClass3="cProgressOff";}
			if (WeatherValue > 0.67) {ProgressClass1=ProgressOn;ProgressClass2=ProgressOn;ProgressClass3=ProgressOn;}

			if(Anonymous == "-1")	{x = x+1; var loginName = "Anonymous"; } else { var loginName = login }
				RowContent += 	"<tr>" +
											"<td class='tdStyle_1'><div id='UserLogin' class='" + tdClassUserLogin + "'>" + loginName + "</div><div id='UserInputDate' class='" + tdClass + "'>" + ElapsedTime + "</div></td>" +
											"<td class='tdStyle_1'>" +
												"<div id='cProgressBkgrd'>" +
												"<div id='cProgressBullet1' class='" + ProgressClass1 + "'></div>" +
												"<div id='cProgressBullet2' class='" + ProgressClass2 + "'></div>" +
												"<div id='cProgressBullet3' class='" + ProgressClass3 + "'></div>" +
												"</div>" +
											"</td><td class = 'tdStyle_1 " + WeatherStyle + "' ></td>" +
										"</tr>"
		
	  }
  }
  if(RowCount == 0){
	RowContent = "<tr><td class='tdStyle_6'>Still no members in your group</td></tr>";
  	MemberCountValue.innerHTML = "0 Members"
	MembersCount.innerHTML = "0"
	
  } else {
	  
	  	MembersCount.innerHTML = RowCount
		if(RowCount > 4) {
			$('#MembersCount').each(function () {
				$(this).prop('Counter',0).animate({
					Counter: $(this).text()
				}, {
					duration: 1500,
					easing: 'swing',
					step: function (now) {
						$(this).text(Math.ceil(now));
					}
				});
			});
		}
	  if (x == 0) {
	  	MemberCountValue.innerHTML = RowCount + " Members";
		
	  } else {
		MemberCountValue.innerHTML = RowCount + " Members<span style='color:darkgrey;margin-left:4vh;'>" + x + " Anonymous</span>";
	  }
	  
  };
	

	
  $('#MemberList_GroupName').html(Group_name);
  $('#MemberList_table').html("<table  border='0' cellspacing='0' cellpadding='0' width='100%'>" + RowContent + "</table>"); 

}

function UserList() {
	AjaxCall('db/get_user_moods.php?group_id=' + store.get('selected_group_id') + "&UserInputRequired=" + store.get('UserInputRequired') + "&user_id=" + store.get('userid')).done(UserList_CB);
}

function Logged_user_info_CB(data) {

	var DataArray = JSON.parse(data);
	var RowCount = DataArray.length;

	if (RowCount>0){

		var ServerStamp = moment.tz(DataArray[0].entered, "UTC");
		var UserTime =  ServerStamp.tz(store.get('timezone')).format("YYYYMMDD,HH:mm");
		var ElapsedTime = moment(UserTime,"YYYYMMDD,HH:mm").fromNow();
		var id = DataArray[0].id; 
		var SunVal = DataArray[0].SunVal; 
		var RainVal = DataArray[0].RainVal; 
		var CloudVal = DataArray[0].CloudVal; 
		var ThunderVal = DataArray[0].ThunderVal; 
		var WeatherSymbol = DataArray[0].WeatherSymbol; 
		var WeatherStyle ="c" + WeatherSymbol;
		var ProgressClass1 = ''; 
		var ProgressClass2 = ''; 
		var ProgressClass3 = '';
		
		switch (WeatherSymbol) {
			case "sun":
				var WeatherValue = SunVal;
				break;
			case "sun_clouds":
			case "cloud":
				var WeatherValue = CloudVal;
				break;
			case "rain":
			case "sun_rain":
				var WeatherValue = RainVal;
				break;
			case "thunder":
				var WeatherValue = ThunderVal;
				break;
				default:
				var WeatherValue = 0;
		}

		if (SunVal > 0) {
			var ProgressOn = "cProgressOnSun";
			var rowClass="rowSunny";
		} else {
			var ProgressOn = "cProgressOnOther";
			var rowClass="rowRainy";
		}			

		if (WeatherValue > 0 && WeatherValue  <= 0.34) {ProgressClass1=ProgressOn;ProgressClass2="cProgressOff";ProgressClass3="cProgressOff";}
		if (WeatherValue > 0.34 && WeatherValue  <= 0.67) {ProgressClass1=ProgressOn;ProgressClass2=ProgressOn;ProgressClass3="cProgressOff";}
		if (WeatherValue > 0.67) {ProgressClass1=ProgressOn;ProgressClass2=ProgressOn;ProgressClass3=ProgressOn;}

		$('#UserDataRowMe,#cProgressBullet1Me,#cProgressBullet2Me,#cProgressBullet3Me,#WeatherIcoMe').removeClass();
		$('#UserDataRowMe').addClass(rowClass);
		$('#cProgressBullet1Me').addClass(ProgressClass1);
		$('#cProgressBullet2Me').addClass(ProgressClass2);
		$('#cProgressBullet3Me').addClass(ProgressClass3);
		$('#WeatherIcoMe').addClass("tdStyle_2 " + WeatherStyle );
		$('#UserInputDateMe').html(ElapsedTime);

	}

}

function Logged_user_info() {
	AjaxCall('db/get_logged_user_mood.php?user_id=' + store.get('userid')).done(Logged_user_info_CB);
}

 
function SetGroupPrivacy(GroupId,RowId,Owner,user_id) {

if(GroupId != null && user_id != '-1') {
	var icoId = "#ico" + RowId;

	$(icoId).removeClass();
	
	
	if(GroupId ==  store.get('selected_group_id')){
		$("#Privacy_status").removeClass();
		if(Owner == true && $("#cb" + MenuItem + RowId).is(':checked')) {$("#Privacy_status").addClass("PublicMemberIco_dark");store.set('group_privacy','0');}

		if(Owner == true && !$("#cb" + MenuItem + RowId).is(':checked')) {$("#Privacy_status").addClass("PrivateMemberIco_dark");store.set('group_privacy','-1');}

		if(Owner == false && !$("#cb" + MenuItem + RowId).is(':checked')) {$("#Privacy_status").addClass("PrivateMemberIco_dark");store.set('group_privacy','-1');}

		if(Owner == false && $("#cb" + MenuItem + RowId).is(':checked')) {$("#Privacy_status").addClass("PublicMemberIco_dark");store.set('group_privacy','0');}	
		
		if(Owner == 'true') {
			$("#GroupLegend").css({"display":"block"});
		} else {
			$("#GroupLegend").css({"display":"none"});
		};
	}
	
	if(Owner == true && $("#cb" + MenuItem + RowId).is(':checked')) {$(icoId).addClass("PublicOwnerIco");}

	if(Owner == true && !$("#cb" + MenuItem + RowId).is(':checked')) {$(icoId).addClass("PrivateOwnerIco");}

	if(Owner == false && !$("#cb" + MenuItem + RowId).is(':checked')) {$(icoId).addClass("PrivateMemberIco");}

	if(Owner == false && $("#cb" + MenuItem + RowId).is(':checked')) {$(icoId).addClass("PublicMemberIco");}

	if($("#cb" + MenuItem + RowId).is(':checked')) {
		var PrivacyStatus = "0";
	} else {
		var PrivacyStatus = "-1";
	}
	
	AjaxCall('db/set_group_privacy.php?user_id=' + store.get('userid') + '&group_id=' + GroupId + '&privacy_status=' + PrivacyStatus);
	
	setTimeout(MenuList, 1000);
	setTimeout(UserList, 1000);

	}
}

function SetTempUnit() {
	
	if($("#cbT").is(':checked')) {
		$("#TempUnitText").html("Farenheit");
		store.set('tempUnit','Farenheit');
		temp_indicator.innerHTML = Math.round(50*(1 - BkgrdFactor)+45,1) + "°F";
	}
		
	if(!$("#cbT").is(':checked')) {
		$("#TempUnitText").html("Celsius");
		store.set('tempUnit','Celsius');
		temp_indicator.innerHTML = Math.round((50*(1 - BkgrdFactor)+13)*5/9,1) + "°C";
	}	
}

function JoinLeaveGroups_CB(data){ 
	var DataArray = JSON.parse(data);
	var RowCount = DataArray.length;
	var RowContent='';
	
	if (RowCount>0){

		for (i = 0; i < RowCount; i++) {
			var id = DataArray[i].id; 
			var user_id = DataArray[i].user_id; 
			var grp_id = DataArray[i].group_id; 
			var group_name = DataArray[i].Group_name;
			var owner_id = DataArray[i].Owner_id;
			var anonymous = DataArray[i].Anonymous;
			var owner = false;
			var IcoClass;

			if(grp_id == null && owner_id == store.get('userid')){IcoClass = "OwnerIco";owner = true}
			
			if(grp_id == null && owner_id != store.get('userid')){IcoClass = "";};

			if(grp_id != null && owner_id == store.get('userid')){
				if(anonymous == "0") {IcoClass = "PublicOwnerIco";}
				if(anonymous == "-1") {IcoClass = "PrivateOwnerIco";}
				owner = true;
			};

			if(grp_id != null && owner_id != store.get('userid')){
				if(anonymous == "0") {IcoClass = "PublicMemberIco";}
				if(anonymous == "-1") {IcoClass = "PrivateMemberIco";}
				owner = false;
			};

			switch(anonymous) {
			case null:
				var TogglePrivacy = 0;
				var checked = "";
				break;

			case "0":
				var TogglePrivacy = -1;
				var checked = "";
				break;

			case "-1":
				var TogglePrivacy = 0;
				var checked = "checked";
				break;
			}

			RowContent += "<tr id='x" + id + "'><td  class='tdStyle_8'>" +  group_name + "<div id='ico" + id + "' class='" + IcoClass + "'></div></td><td class='RowId'>" + user_id + "</td></tr><tr id='" + MenuItem + id + "' class='GroupParameters'><td class='tdStyle_7'><input type='checkbox' id='cb" + MenuItem + id + "' class='cbx hidden' " + checked + "/><label for='cb" + MenuItem + id + "' class='lbl' onclick='SetGroupPrivacy(" + grp_id + "," + id + "," + owner + "," + user_id + ");'></label>Join anonymously</td><td></td></tr>";   
			
		}

		$('#' + MenuItem).html("<table id='grp_list' border='0' cellspacing='0' cellpadding='0' width='100%' ><tbody>" + RowContent + "</tbody></table>"); 

		$('table#grp_list tr:not(.GroupParameters)').click(function(event) {

			$('table#grp_list tr').removeClass('highlighted');
			$(".GroupParameters").css("display", "none");
			$(this).addClass('highlighted');

			var currentRow=$(this).closest("tr");          
			SelectedGroupId = $(this).closest('tr').attr('id');;
			SelectedGroupName = currentRow.find("td:eq(0)").text(); 
			
			if (MenuItem != 'LeaveGroupsList') {
				$("#" +MenuItem +  SelectedGroupId.replace("x", "")).css("display", "table-row");
			}

			if (SelectedGroupId.replace("x", "") != store.get('global_group_id')) {

				var IsMember=currentRow.find("td:eq(1)").text(); 

				if(IsMember ==  '-1'){
					
					GrpButtonCaption = "Join";
					$(".JoinLeaveButton").addClass('AddButton');
					$(".JoinLeaveButton").removeClass('RemoveButton');
				} else { 
					GrpButtonCaption = "Leave";
					$(".JoinLeaveButton").addClass('RemoveButton');
					$(".JoinLeaveButton").removeClass('AddButton');
				}	
				$(".JoinLeaveButton").prop('value', GrpButtonCaption);
				$(".JoinLeaveButton").prop('disabled', false);
			} else {
				$(".JoinLeaveButton").prop('value', "You can't leave this group");
				$(".JoinLeaveButton").prop('disabled', true);
			}

		 });  
	}
} 

function JoinLeaveGroups(i) {
	AjaxCall('db/groups_list.php?user_id=' + store.get('userid') + '&list=' + i).done(JoinLeaveGroups_CB);
}


function SelectedGroupData_CB(data){ 
	var SelectedGroupArray = JSON.parse(data);
	var SelectedGroupCount = SelectedGroupArray.length;
	console.log("SelectedGroupCount:" + SelectedGroupCount);
	
	if (SelectedGroupCount>0){
		store.set('UserIsOwner',SelectedGroupArray[0].IsOwner);
		store.set('UserIsMember',SelectedGroupArray[0].IsMember);
		store.set('selected_group_name',SelectedGroupArray[0].Group_name);	
		store.set('update_freq', SelectedGroupArray[0].update_freq);
		store.set('group_privacy', SelectedGroupArray[0].IsPrivate);
		header_groups_text.innerHTML =  SubStr(0,21,SelectedGroupArray[0].Group_name);
		console.log("store.get('UserIsMember'):" + store.get('UserIsMember'))
		$("#Privacy_status").removeClass();

		if(SelectedGroupArray[0].IsOwner == 'true' && SelectedGroupArray[0].IsPrivate == '0' && SelectedGroupArray[0].IsMember == 'true') {$("#Privacy_status").addClass("PublicMemberIco_dark");}

		if(SelectedGroupArray[0].IsOwner == 'true' && SelectedGroupArray[0].IsPrivate == '-1' && SelectedGroupArray[0].IsMember == 'true') {$("#Privacy_status").addClass("PrivateMemberIco_dark");}

		if(SelectedGroupArray[0].IsOwner == 'false' && SelectedGroupArray[0].IsPrivate == '-1' && SelectedGroupArray[0].IsMember == 'true') {$("#Privacy_status").addClass("PrivateMemberIco_dark");}

		if(SelectedGroupArray[0].IsOwner == 'false' && SelectedGroupArray[0].IsPrivate == '0' && SelectedGroupArray[0].IsMember == 'true') {$("#Privacy_status").addClass("PublicMemberIco_dark");}

		if(SelectedGroupArray[0].IsOwner == 'true') {
			$("#GroupLegend").css({"display":"block"});
		} else {
			$("#GroupLegend").css({"display":"none"});
		};	

		UpdateMetaphore();
		
	} 	
} 



function SelectedGroupData() {
	AjaxCall('db/get_selected_group_data.php?user_id=' + store.get('userid') + '&group_id=' + store.get('selected_group_id')).done(SelectedGroupData_CB);
}

function MenuListItemClickEvent(event) {
	$('table#user_grp_list tr').removeClass('highlighted');
	$(this).addClass('highlighted');
	
	var SelectedGroupIdMenu = $(this).closest('tr').attr('id');
	store.set('selected_group_id', SelectedGroupIdMenu);
	SelectedGroupData();

	user_groups_list.style='display:none';
	Group_menu_container.style='display:none';

}

function FrequencyOptionsClickEvent(event) {
	$('table#frequencyOptions_list tr').removeClass('highlighted');
	$(this).addClass('highlighted');
       
	SelectedOptionId = $(this).closest('tr').attr('id');
	SelectedOptionText = $(this).closest('tr').find("td:eq(0)").text();
	$('#update_freq').html(SelectedOptionText);

	FrequencyOptions.style='display:none';
}

function ShowFrequencyOptions() {
	FrequencyOptions.style='display:block';
}

function MenuList_CB(data){ 
	var MenuListRowContent='';
	MenuListdataArray = JSON.parse(data);
	if (!(typeof MenuListdataArray === 'undefined' || MenuListdataArray == null)) { 
		MenuListRowCount = MenuListdataArray.length;
			if (MenuListRowCount>0){
			TableStart = "<table id='user_grp_list' border='0' cellspacing='0' cellpadding='0' width='100%'>";
			TableEnd = "</table>";

			for (i = 0; i < MenuListRowCount; i++) {
			var id = MenuListdataArray[i].id; 
			var UserIsMember = MenuListdataArray[i].IsMember; 
			var group_name = MenuListdataArray[i].Group_name;	
			var UserIsOwner = MenuListdataArray[i].IsOwner;	
			var Update_freq = MenuListdataArray[i].update_freq;
			var anonymous = MenuListdataArray[i].Anonymous;
			var IcoClass;	
			
			if(UserIsMember == 'true'){
				if(UserIsOwner == 'true'){	
					if(anonymous == "0") {IcoClass = "PublicOwnerIco";}
					if(anonymous == "-1") {IcoClass = "PrivateOwnerIco";}
				} else {
					
					if(anonymous == "0") {IcoClass = "PublicMemberIco";}
					if(anonymous == "-1") {IcoClass = "PrivateMemberIco";}
				} 
			
			} else {
				if(UserIsOwner == 'true'){IcoClass = "OwnerIco";}
			} 
			
			MenuListRowContent += "<tr id=" + id + "><td id=" + id + " class='tdStyle_1'>" +  group_name + "</td><td align='right' class='tdStyle_1'><div class='" + IcoClass + "'></div></td></tr>";     
			}

			$('#user_groups_list').html(TableStart + MenuListRowContent + TableEnd); 
			
			$('table#user_grp_list tr').removeClass('highlighted');
			$('#' + store.get('selected_group_id')).addClass('highlighted');	
				
			$('table#user_grp_list tr').click(MenuListItemClickEvent);
		} 
	}
} 

function MenuList() {
	AjaxCall('db/user_groups_list.php?user_id=' + store.get('userid')).done(MenuList_CB);
}

