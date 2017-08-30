objects.forEach(SetVariables);

document.addEventListener("DOMContentLoaded", function(event) {

    window.onload = function SetAnimation() {
		//if (document.readyState == 'complete') {
		/*--Clouds--*/
		CloudsTL.set([cloud1,cloud2,cloud3], {css:{height:"10%",width:"20%",position:"absolute"}});

		/*0-50%*/	
		AnimFromTo(CloudsTL,"cloud1","-180%","630%",1,1,0.65,"300%","630%",5,1,0.5,2,1,0);
		AnimFromTo(CloudsTL,"cloud2","-250%","630%",1,1,0.8,"130%","630%",5,2,0.5,6,1,0);
		AnimFromTo(CloudsTL,"cloud3","-400%","630%",1,1,0.7,"50%","630%",5,1,0.62,4,1,0);


		/*50-100%*/
		AnimTo(CloudsTL,"cloud1",null,"170%",7,2,0.7,3,3);
		AnimTo(CloudsTL,"cloud2",null,"330%",8,3,0.92,3,3);
		AnimTo(CloudsTL,"cloud3",null,"90%",7,3,0.85,3,3);


		/*--RainClouds--*/
		RaincloudsTL.set([cloudRain1,cloudRain2,cloudRain3], {css:{height:"5%",width:"15%",position:"absolute"}});

		/*0-50%*/	
		AnimFromTo(RaincloudsTL,"cloudRain1","-100%","1360%",1,1,0.25,"385%","1360%",5,2,0.4,8,1,0);
		AnimFromTo(RaincloudsTL,"cloudRain2","-200%","1250%",0.5,0.5,0.05,"255%","1360%",3,2,0.8,12,1,0);
		AnimFromTo(RaincloudsTL,"cloudRain3","-100%","1360%",1,1,0.25,"130%","1360%",5,3,0.5,10,1,0);
		AnimFromTo(RaincloudsTL,"drops","-200%","1550%",1,4,1,"50%","1850%",12,8,0.6,1,1,0);

		/*50-100%*/
		AnimTo(RaincloudsTL,"cloudRain1",null,"500%",7,6,0.8,3,1);
		AnimTo(RaincloudsTL,"cloudRain2",null,"500%",9,8,1,3,1);
		AnimTo(RaincloudsTL,"cloudRain3",null,"500%",11,10,1,3,1);
		AnimTo(RaincloudsTL,"drops",null,"1350%",13,13,2,3,1);

		/*--Thunder--*/
		ThunderTL.set([cloudBlitz1,cloudBlitz2,cloudBlitz3,thunderSky], {css:{height:"4%",width:"11%",position:"absolute"}});

		/*0-50%*/	
		AnimFromTo(ThunderTL,"cloudBlitz1","-50%","1750%",1,1,0.3,"650%","2050%",2,3,0.2,14,1,0);	
		AnimFromTo(ThunderTL,"cloudBlitz2","-100%","1750%",2,2,0.2,"450%","2050%",3,5,0.4,18,1,0);	
		AnimFromTo(ThunderTL,"cloudBlitz3","-50%","1750%",1,1,0.2,"150%","2050%",5,4,0.3,16,1,0);
		AnimFromTo(ThunderTL,"thunderSky","-50%","1950%",4,4,0.7,"250%","2350%",18,4,0.7,1,1,0);

		/*50-100%*/
		AnimTo(ThunderTL,"cloudBlitz1",null,"1650%",7,8,0.4,3,1);
		AnimTo(ThunderTL,"cloudBlitz2",null,"950%",13,15,1,3,1);
		AnimTo(ThunderTL,"cloudBlitz3",null,"1400%",11,14,0.6,3,1);
		AnimTo(ThunderTL,"thunderSky",null,"1050%",20,26,1,3,1);

		/*--Sun--*/		
		SunTL.fromTo("#sun",1, {x:"110%",y:"70%",scaleX:1.5,scaleY:1.5},{x:"55%",y:"15%",scaleX:2.5,scaleY:2.5},0);

		/*--grass--*/
		GrassTL.fromTo("#grass",1, {y:"60%",scaleY:1},{y:"16%",scaleY:1.5},0);

		/*--rainbow--*/
		RainbowTL.set([rainbow], {css:{width:"100%",height:"25%",position:"absolute"}});
		AnimFromTo(RainbowTL,"rainbow","25%","260%",1.5,0.7,0.6,"15%","220%",2.5,2.5,1,1,1,0);

		SetBkgrd(DefaultBkgrdFactor);
	//}
	};
});	
	