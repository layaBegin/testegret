class TestBuju extends eui.Component implements  eui.UIComponent {
	
	

	public mGroup:eui.Group;

	public mScroll:eui.Scroller;

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
        RES.getResByUrl( "resource/font/common_chip_number_font.fnt", this.onLoadComplete, this, RES.ResourceItem.TYPE_FONT );
    }

    private _bitmapText:egret.BitmapText;
    private onLoadComplete( font:egret.BitmapFont ):void {
        this._bitmapText = new egret.BitmapText();
        this._bitmapText.font = font;
        this._bitmapText.x = 50;
        this._bitmapText.y = 300;

        this.addChild( this._bitmapText );
		this._bitmapText.text = "w123432"
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