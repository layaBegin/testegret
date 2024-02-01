class TestBuju extends eui.Component implements  eui.UIComponent {
	
	

	public mGroup:eui.Group;

	public mScroll:eui.Scroller;
	public mCheckBox:eui.CheckBox;
	public mToggleSwitch:eui.ToggleSwitch;
	public mSlider:eui.HSlider;
	public mProgressBar:eui.ProgressBar;
	public mEditablText:eui.EditableText;


	//新建一个背景图片
    private background:eui.Image = new eui.Image();


	private toggleBtns:Array<eui.ToggleButton> = [];

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/TestSkin.exml"
		this.once( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		// this.init()
		// this.testSlibing()
		// this.testGetChild()
		// this.testMask()
		// this.testText()
		// this.loadImage()
		this.loadRemoteText()
		this.loadRemoteImage()
		this.setCheckBox()
		this.initRadioButtonWithGroup()
		this.setToggleSwitch()
		this.initToggleBar()
		this.initHSlider()
		// this.initProgressBar()
		this.setInput()
		this.testScroller()
		this.testDataGroup()
		this.testTween()
	}

	//测试缓动动画
	testTween(){
		var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill( 0x00ff00 );
        shp.graphics.drawRect( 0, 0, 100, 100 );
        shp.graphics.endFill();
        shp.x = 50;
        this.addChild( shp );
        // var tw = egret.Tween.get( shp );
        // tw.wait(1000).to( {x:150}, 1000 );
		var tw = egret.Tween.get( shp, { loop:true} );
		tw.to( {x:250}, 500 ).call( function(){ console.log( "右上角" ) } ).wait( 100 )
    	.to( {y:250}, 500 ).call( function(){ console.log( "右下角" ) } ).wait( 100 )
    	.to( {x:50}, 500 ).call( function(){ console.log( "左下角" ) } ).wait( 100 )
    	.to( {y:50}, 500 ).call( function(){ console.log( "左上角" ) } ).wait( 100 );
	}


	private testDataGroup(){
		//先创建一个数组
        var sourceArr:any[] = [];
        for (var i:number = 1; i < 5; i++){
        	//给数据中添加一个含有"label"属性的对象
            sourceArr.push({label:"item"+i});
        }
        //用ArrayCollection包装
        var myCollection:eui.ArrayCollection = new eui.ArrayCollection(sourceArr);

        var dataGroup:eui.DataGroup = new eui.DataGroup();
        dataGroup.dataProvider = myCollection;
        dataGroup.percentWidth = 100;
        dataGroup.percentHeight = 100;
        this.addChild(dataGroup);

        dataGroup.itemRenderer = LabelRenderer;
	}

	private testScroller(){
		//创建一个列表
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5]);
		//创建一个 Scroller
        var scroller = this.mScroll;
        scroller.height = 160;
        scroller.viewport = list;
        this.addChild(scroller);
		//创建一个按钮，点击后改变 Scroller 滚动的位置
        var btn = new eui.Button();
        btn.x = 200;
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moveScroller,this);
	}

	//  private moveScroller():void{
    // 	//点击按钮后改变滚动的位置
    //     var sc = this.mScroll;
    //     sc.viewport.scrollV += 10;
    //     if ((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
    //       console.log("滚动到底部了");
    //     }
    // }

	private moveScroller(): void {
		//点击按钮后改变滚动的位置
		var sc = this.mScroll;
		sc.viewport.scrollV += 10;

		if((sc.viewport.scrollV + sc.height) >= sc.viewport.contentHeight) {
			console.log("滚动到底部了");
		}
		//停止正在滚动的动画
		sc.stopAnimation();
	}


	//输入文本
	private setInput(){
		this.mEditablText.addEventListener(egret.Event.CHANGE,this.onChang,this);
		//指定图片素材，这里使用上面的图片，并放入相应文件夹下    
        this.background.source = "resource/assets/Slider/track.png";  
        //指定图片的九宫格，我们可以复习一下前面章节的内容
        this.background.scale9Grid = new egret.Rectangle(1.5,1.5,20,20); 
        //指定其宽和高，用来当做背景.
        this.background.width = 500;                                       
        this.background.height = 200;
        //将背景添加到显示列表
        this.addChild(this.background);                                    
        //指定默认文本，用户可以自己输入，也可以将其删除
        this.mEditablText.text = "my EditableText";
		this.mEditablText.textColor = 0x2233cc;                          
        //指定我们的文本输入框的宽和高    
        this.mEditablText.width = this.background.width;                 
        this.mEditablText.height = this.background.height; 
        //设置我们的文本左边距为零
        this.mEditablText.left = 0;  
		
		// this.mEditablText.displayAsPassword = true;   
	}

	private onChang(e:egret.Event){
    	egret.log(e.target.text);
	}

	//进度条
	private initProgressBar():void{
		this.mProgressBar.maximum = 210;//设置进度条的最大值
		this.mProgressBar.minimum = 0;//设置进度条的最小值
		this.mProgressBar.width = 200;
		this.mProgressBar.height = 30;
		// this.addChild(this.mProgressBar);
		this.mProgressBar.value = 42;//设置进度条的初始值
		//用timer来模拟加载进度
		var timer:egret.Timer = new egret.Timer(10,0);
		timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandler,this);
		timer.start();
	}
	private timerHandler():void{
		this.mProgressBar.value += 1;
		egret.log("===进度：",this.mProgressBar.value)
		if(this.mProgressBar.value>=210){this.mProgressBar.value=0;}
	}

	

	//滑动器
	private initHSlider():void {
		var hSlider: eui.HSlider = this.mSlider;
		hSlider.width = 200;
		hSlider.minimum = 0;//定义最小值
		hSlider.maximum = 100;//定义最大值
		hSlider.value = 10;//定义默认值
		hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeSliderHandler, this);
		this.addChild(hSlider);
	}

	private changeSliderHandler(evt: eui.UIEvent): void {
		console.log(evt.target.value);
	}

	
	private initToggleBar():void {
		for (var i: number = 0; i < 4; i++) {
			var btn: eui.ToggleButton = new eui.ToggleButton();
			btn.label = i + 1 + "";
			btn.y = 100;
			btn.width = 80;
			btn.height = 60;
			btn.x = 20 + i * 80;
			btn.addEventListener(eui.UIEvent.CHANGE, this.toggleChangeHandler, this);
			this.toggleBtns.push(btn);
			this.addChild(btn);
		}
	}

	private toggleChangeHandler(evt: eui.UIEvent) {
		for (var i: number = 0; i < this.toggleBtns.length; i++) {
			var btn: eui.ToggleButton = this.toggleBtns[i];
			btn.selected = (btn == evt.target);
		}
	}

	setToggleSwitch(){
		this.mToggleSwitch.addEventListener(eui.UIEvent.CHANGE, this.changeToggleSwitch, this);
	}

	changeToggleSwitch(evt:eui.UIEvent){
		egret.log("====event.target:",evt.target)
		egret.log("====event.target.selected:",evt.target.selected)
	}


	//单选框的使用
	private initRadioButtonWithGroup():void {
		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		radioGroup.addEventListener(eui.UIEvent.CHANGE, this.radioChangeHandler, this);
		var rdb: eui.RadioButton = new eui.RadioButton();
		rdb.label = "Select_1";
		rdb.value = "Select 1";
		rdb.group = radioGroup;
		this.addChild(rdb);
		var rdb2: eui.RadioButton = new eui.RadioButton();
		rdb2.y = 30;
		rdb2.label = "Select_2";
		rdb2.value = "Select 2";
		rdb2.selected = true;//默认选项
		rdb2.group = radioGroup;
		this.addChild(rdb2);
	}

	private radioChangeHandler(evt:eui.UIEvent):void {
		var radioGroup: eui.RadioButtonGroup = evt.target;
		console.log(radioGroup.selectedValue);
	}

	//复选框的使用
	setCheckBox(){
		this.mCheckBox.addEventListener(
			eui.UIEvent.CHANGE,
			this.onClickCheckBox.bind(this),this
		);
	}

	onClickCheckBox(evt:eui.UIEvent){
		egret.log(evt.target.selected)
		if(evt.target.selected){
			this.mCheckBox.enabled = false;//禁用复选框
		}
	}
	
	public init(){

		let lab = new eui.Label()
		lab.text = "手动创建的label"
		lab.size = 40
		lab.textColor = 0xff0000
		this.mGroup.addChild(lab)
	}

	//容器的深度
	testSlibing(){
		var sprcon:egret.Sprite = new egret.Sprite();
		this.addChild( sprcon );
		sprcon.x = 10;

		var spr1:egret.Sprite = new egret.Sprite();
		spr1.graphics.beginFill( 0xff0000 );//红色
		spr1.graphics.drawRect( 0, 0, 100, 100 );
		spr1.graphics.endFill();
		spr1.x = 50;
		sprcon.addChild( spr1 );

		var spr2:egret.Sprite = new egret.Sprite();
		spr2.graphics.beginFill( 0x00ff00 );//绿色
		spr2.graphics.drawRect( 0, 0, 100, 100 );
		spr2.graphics.endFill();
		spr2.x = 100;
		spr2.y = 50;
		sprcon.addChild( spr2 );
		
		sprcon.setChildIndex( spr1, 100 );
	}

	testGetChild(){
		var sprcon:egret.Sprite = new egret.Sprite();
		this.addChild( sprcon );
		sprcon.x = 10;

		var spr1:egret.Sprite = new egret.Sprite();
		spr1.graphics.beginFill( 0xff0000 );
		spr1.graphics.drawRect( 0, 0, 100, 100 );
		spr1.graphics.endFill();
		spr1.x = 50;
		spr1.name = "sprite1";
		sprcon.addChild( spr1 );

		var spr2:egret.Sprite = new egret.Sprite();
		spr2.graphics.beginFill( 0x00ff00 );
		spr2.graphics.drawRect( 0, 0, 100, 100 );
		spr2.graphics.endFill();
		spr2.x = 100;
		spr2.y = 50;
		spr2.name = "sprite2";
		sprcon.addChild( spr2 );
		//通过名字获取子对象
		var _spr:egret.DisplayObject = sprcon.getChildByName( "sprite2" );
		_spr.alpha = 0.5;
	}

	testMask(){
		//画一个红色的正方形
		var square:egret.Shape = new egret.Shape();
		square.graphics.beginFill(0xff0000);
		square.graphics.drawRect(0,0,100,100);
		square.graphics.endFill();
		this.addChild(square);

		//画一个蓝色的圆形
		var circle:egret.Shape = new egret.Shape();
		circle.graphics.beginFill(0x0000ff);
		circle.graphics.drawCircle(50,50,25);
		circle.graphics.endFill();
		this.addChild(circle);
		//添加遮罩
		square.mask = circle;
	}

	testText(){
		// var textIput:egret.TextField = new egret.TextField();
		// textIput.type = egret.TextFieldType.INPUT;
		// this.addChild(textIput);

		// var button:egret.Shape =  new egret.Shape();
		// button.graphics.beginFill(0x00cc00);
		// button.graphics.drawRect(0,0,100,40);
		// button.graphics.endFill();
		// button.y = 50;
		// this.addChild(button);
		// button.touchEnabled = true;
		// button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(e) => {
		// 		textIput.setFocus();
		// 	}, this);



		// var text:egret.TextField = new egret.TextField();
		// text.type = egret.TextFieldType.INPUT;
		// //设置输入文本的样式为文本
		// text.inputType = egret.TextFieldInputType.TEXT;
		// text.text = "Input text:";
		// text.width = 300;
		// this.addChild(text);

		var pass:egret.TextField = new egret.TextField();
		pass.type = egret.TextFieldType.INPUT;
		//设置输入文本显示为密码
		pass.inputType = egret.TextFieldInputType.PASSWORD;
		//设置密码显示
		pass.displayAsPassword = true;
		pass.text = "Password";
		pass.y = 100;
		pass.width = 300;
		this.addChild(pass);

		var tel:egret.TextField = new egret.TextField();
		tel.type = egret.TextFieldType.INPUT;
		//设置输入电话号样式
		tel.inputType = egret.TextFieldInputType.TEL;
		tel.text = "Telephone number:"
		tel.y = 200;
		tel.width = 300;
		this.addChild(tel);

		///位图文本

	}

	private onAddToStage( evt:egret.Event ) {
        RES.getResByUrl( "resource/font/clock.fnt", this.onLoadComplete, this, RES.ResourceItem.TYPE_FONT );
    }

    private _bitmapText:egret.BitmapText;
    private onLoadComplete( font:egret.BitmapFont ):void {
        this._bitmapText = new egret.BitmapText();
        this._bitmapText.font = font;
        this._bitmapText.x = 50;
        this._bitmapText.y = 300;

        this.addChild( this._bitmapText );
		this._bitmapText.text = "123432"
    }

	//加载本地图片
	loadImage(){
		var imgLoader:egret.ImageLoader = new egret.ImageLoader;
		imgLoader.once( egret.Event.COMPLETE, this.imgLoadHandler, this ); 
		imgLoader.load( "resource/assets/egret_icon.png" );  
	}

	imgLoadHandler( evt:egret.Event ):void{
		let loader:egret.ImageLoader = evt.currentTarget;
		let bmd:egret.BitmapData = loader.data;
		//创建纹理对象
		let texture = new egret.Texture();
		texture.bitmapData = bmd;
		let bmp:egret.Bitmap = new egret.Bitmap(texture);
		this.addChild(bmp);
	}

	//加载远程文本
	loadRemoteText(){
		var url = "resource/config/description.json";
		var  request:egret.HttpRequest = new egret.HttpRequest();
				
		var respHandler = function( evt:egret.Event ):void{
		switch ( evt.type ){
			case egret.Event.COMPLETE:
				var request:egret.HttpRequest = evt.currentTarget;
				console.log( "respHandler:n", request.response );
				break;
			case egret.IOErrorEvent.IO_ERROR:
				console.log( "respHandler io error" );
				break;
		}
		}
				
		var progressHandler = function( evt:egret.ProgressEvent ):void{
		console.log( "progress:", evt.bytesLoaded, evt.bytesTotal );
		}

		request.once( egret.Event.COMPLETE, respHandler, null);
		request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
		request.once( egret.ProgressEvent.PROGRESS, progressHandler, null);
		request.open( url, egret.HttpMethod.GET ); 
		request.send( );
	}

	//加载远程图片
	loadRemoteImage(){
		var url = "resource/assets/egret_icon.png";
		var  request:egret.HttpRequest = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.ARRAY_BUFFER;

		var respHandler = function( evt:egret.Event ):void {
		switch ( evt.type ){
			case egret.Event.COMPLETE:
				var request:egret.HttpRequest = evt.currentTarget;
				var ab:ArrayBuffer = request.response;
				console.log( "respHandler:n", ab.byteLength );
				break;
			case egret.IOErrorEvent.IO_ERROR:
				console.log( "respHandler io error" );
				break;
		}
		}

		request.once( egret.Event.COMPLETE, respHandler, null);
		request.once( egret.IOErrorEvent.IO_ERROR, respHandler, null);
		request.open( url, egret.HttpMethod.GET );
		request.send( );
	}
	
	
}