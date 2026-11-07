# 播放器代码示例

### 1.爱影播放器变量对象：Iyplayer

``````
{
	id: 1089335, // 剧集ID
	videoID: 15262, //视频id
	name: '第1集',  // 剧集名称
	sort: 1, 	// 序号
	file: '', 	//  播放地址
	chargingMode: 1, // 收费模式 1免费 2vip免费 3金币点播
	currency: 0, //金币数量
	status: 1, // 状态 1:开启 2关闭
	subTitle: '史诗任务完成', // 剧集副标题
	tag: 'tpysm3u8' //标识
}
``````



### 2.导入JSON文件

``````
{
  "code": "", 	// ﻿你的播放器代码
  "introduce": "",  // 播放器说明，示例：支持一切设备
  "name": "XXX播放器", // ﻿你的播放器名称
  "sort": 1, 		// 序号
  "status": 1, 		// 状态：1启用 2不启用
  "tag": "", // 你的播放器标识
}
``````

2.1 导入示例1

``````
{
  "code": "﻿<iframe height=498 width=510 src='https://player.youku.com/embed/XNTk4MjAyMDM5Ng=={{IyPlayer.url}}' title='{{Iyplayer.title}}' frameborder=0 'allowfullscreen'></iframe>",
  "introduce": "支持一切设备",
  "name": "XXX播放器",
  "sort": 1,
  "status": 1,
  "tag": "tpiframe"
}

注：动态输出地址，无需Javascript赋值到播放器
1.IyPlayer 对象包含播放数据
2.动态输出用法（识别符为两大括号）：{{IyPlayer.url}
``````

2.2 导入示例2

``````
{
  "code": `<link href="//vjs.zencdn.net/7.10.2/video-js.min.css" rel="stylesheet">
<script src="//vjs.zencdn.net/7.10.2/video.min.js"></script>
<script>window.HELP_IMPROVE_VIDEOJS = false;</script>
<video id="my-player" class="video-js" controls preload="auto" poster="//vjs.zencdn.net/v/oceans.png" data-setup='{}'>
  <p class="vjs-no-js">
    To view this video please enable JavaScript, and consider upgrading to a
    web browser that
    <a href="https://videojs.com/html5-video-support/" target="_blank">
      supports HTML5 video
    </a>
  </p>
</video>
<script>
    var options = {
		"source":Iyplayer.url
	};
  var player = videojs('my-player', options, function onPlayerReady() {
    videojs.log('Your player is ready!');

    // In this context, `this` is the player that was created by Video.js.
    this.play();

    // How about an event listener?
    this.on('ended', function() {
      videojs.log('Awww...over so soon?!');
    });
  });
</script>`,
  "introduce": "支持一切设备",
  "name": "XXX播放器",
  "sort": 1,
  "status": 1,
  "tag": "tsm3u8"
}
注：爱影播放器动态播放数据Javascript变量为：Iyplayer

``````

