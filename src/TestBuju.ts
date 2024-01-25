class TestBuju extends eui.Component implements  eui.UIComponent {
	
	

	public mGroup:eui.Group;

	// count = 0
	
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/TestSkin.exml"

	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init()
	}
	
	public init(){
		// this.myButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.buttonHandler,this)

		let lab = new eui.Label()
		lab.text = "手动创建的label"
		lab.size = 40
		lab.textColor = 0xff0000
		this.mGroup.addChild(lab)
	}

	// buttonHandler(e: egret.TouchEvent){
	// 	this.count ++ 
	// 	egret.log("===点击次数：",this.count)
	// 	this.mLab.text = "点击了" + this.count + "次"
	// }
	
}