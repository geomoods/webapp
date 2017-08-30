$(document).click(function(event) { 
    if(!$(event.target).closest('.slider_ico').length) {
		HideAllSliders();ico_click =0;ico_val=0;
    }        
});

$( ".slider_ico" ).mouseover(function() {$(this).css({'opacity': '1'});});

$( ".slider_ico" ).mouseout(function() {$(this).css({'opacity': '0.65'});});

$( ".slider_ico" ).click(function(event) {InputIconManager(this);});

$( "#validate_button" ).click(function() {ValidateMoodInput();});

$( ".cancel" ).click(function(event) {CloseWindow(this);});

$( "#header_groups_text,#user_groups_list_footer" ).click(function() {ShowGroupsMenu();})

$( "#Parameters" ).click(function() {ParametersEvents();});

$( ".Back" ).click(function() {GoBack(this);});

$( "#JoinMenu" ).click(function() {JoinGroupsEvents();});

$( "#LeaveMenu" ).click(function() {LeaveGroupsEvents();});

$( "#PrivacyMenu" ).click(function() {PrivacyEvents();});

$( "#CreateGroupMenu" ).click(function() {CreateGroupMenuEvents();});

$( "#SandwichIcon" ).click(function() {ParametersEvents();});

$( "#trend" ).click(function() {TrendDetailsShow();});

$( "#selected_group" ).click(function() {TrendDetailsHide();});

$( "#ContentArea" ).click(function() {
	
	if (TrendDetailsDisplay == false) {
	Update_container.style='display:block';
	$("#ContentArea").addClass("Applyfilter");
	} 
	TrendDetailsHide();
});

$( "#Update_container,#trend_data,#selected_group,#user_data" ).click(function() {Update_container.style='display:none';$("#ContentArea").removeClass("Applyfilter");$("#ContentArea").css({'background': "linear-gradient(to top, rgba(255,255,255," + ( BkgrdFactor) + "), rgba(180,180,180," + ( BkgrdFactor) + "))"});});

$( ".TrendDetailsMenuButton" ).click(function(event) {SetTrendInterval(this);});

$( "#MembersList" ).click(function() {ShowSettingsMenu();});

$( ".Update" ).click(function() {RefreshWeather();});

$( "#LoginButton" ).click(function() {LoginUser();});	

$( ".JoinLeaveButton" ).click(function() {JoinLeaveGroupEvent();});	

$( "#CreateGroupButton" ).click(function() {CreateGroup();});	

$( "#cbT" ).click(function() {SetTempUnit();});	

$( "#update_freq" ).click(function() {ShowFrequencyOptions();});	 

$('#groupname').keyup(function(){$('#CreateGroupButton').prop('disabled', this.value == "" ? true : false);});

$('#UpdateMoodButton,#LastUpdate_MemberList').click(function(){ShowInputMoodInterface();});

$('table#frequencyOptions_list tr').click(FrequencyOptionsClickEvent);

$( "#LoginSignUpLink" ).click(function() {SetAction(ActionType);});

$( "#Logout" ).click(function() {LogOut();});
