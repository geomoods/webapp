var SelectedIco,
	SelectedTL,
	SelectedVars,
	SelectedElement,

	ico_click =0,
	ico_val=0,
	DefaultBkgrdFactor = 0.65,
AllWeatherVars = ["SunVal","CloudVal","RainVal","ThunderVal"], 
	objects = [	"ContentArea",
				"sun",
				"sunbkgrd",
				"landscape",
				"rainbow",
				"treeLeafless",
				"treeAutumn",
				"treeNormal",
				"treeSpring",
				"treeSummer",
				"cloud1",
				"cloud2",
				"cloud3",
				"cloudRain1",
				"cloudRain2",
				"cloudRain3",
				"cloudBlitz1",
				"cloudBlitz2",
				"cloudBlitz3",
				"grass",
				"drops"
			  ],
	login,
	user_id,
	ActionValue = document.getElementById("Action").value,

	MenuTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	user_dataTL = new TimelineLite({onUpdateParams: ["{self}"]}),	
	TrendDetailsTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	DropDownMenuTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	CloudsTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	RaincloudsTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	ThunderTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	SunTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	LandscapeTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	GrassTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	RainbowTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	TreeTL = new TimelineLite({onUpdateParams: ["{self}"]}),
	TrendDetailsDisplay = false,
	weather_symbol,
	SelectedOptionId=3600,
	ActionType = "0",
	SelectedSettingsMenu = "0";
