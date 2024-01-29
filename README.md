egret学习

*打开.exml才会出现组件，资源面板（左下角）
 组件和资源可以直接拖拽到视图使用
 *右键--新建EUI组件
 
*public myButton:eui.Button;(复制自定义，粘贴)
 button上的皮肤快捷模板，直接从resource资源面板中拖入图片（不是拖工程里的资源）

*绑定exml的2种方式(一般使用第一种)：
    1，赋值skinName：
    public constructor() {
        super();
        this.skinName = 'resource/eui_skins/TestSkin.exml'
        (注意：请使用正斜杠，反斜杠识别不了)
    }
    2，default.thm.json 里skins 对象赋值：
        "BeginGame": "resource/eui_skins/BeginGame.exml"

*group(4种布局方式):
    BasicLayout，HorizontalLayout，VerticalLayout，TileLayout（网格布局）

*容器的深度
    sprcon.addChildAt( sprNew, 1 );
    sprcon.removeChildAt( 2 );
    //删除所有子对象
    sprcon.removeChildren() 
    交换深度的两种方式
    sprcon.swapChildren( spr1, spr2 ); 第二种方法进行两个方块深度互换。
    sprcon.swapChildrenAt( 0, 1 );
*遮罩
    mySprite.mask = maskSprite;

*Event事件的用法
    egret.Event， addEventListener，removeEventListener
    priority 事件的优先级 public addEventListener(type:string, listener:Function, thisObject:any, useCapture:boolean = false, priority:number = 0)
    触摸事件egret.TouchEvent

*位图加载 new egret.ImageLoader
    跨域处理imgLoader.crossOrigin = 'anonymous'
*音频，视频的加载与播放
    this.video = new egret.Video();
