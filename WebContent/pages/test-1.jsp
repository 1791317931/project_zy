<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>test-1</title>
<link rel="stylesheet" href="../css/test-1.css?<%=new Date().getTime()%>">
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript" src="../js/test-1.js?<%=new Date().getTime()%>"></script>
</head>
<body>
	<hr class="head-bar-b">
	<hr class="head-bar-r">
	<div class="head">
		<img src="../imgs/test-1/logo.jpg" class="logo"/>
	</div>
	<div class="nav-container">
		<div class="nav">
			<div class="on"><strong>首        页</strong></div>
			<div><strong>日海服务</strong></div>
			<div><strong>日海成绩</strong></div>
			<div><strong>新闻动态</strong></div>
			<div><strong>关于日海</strong></div>
			<div><strong>联系我们</strong></div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="index-container">
		<div class="sub-container">
			<i class="index"></i>
		</div>
	</div>
	<div class="animation-container">
		<div class="ltr-container mr5">
			<div class="ltr preserve-3d">
				<div class="rect-f rect">
					<div class="sub-container">
						<span class="top">top-f</span>
						<span class="bottom">bottom-f</span>
					</div>
				</div>
				<div class="rect-b rect">
					<div class="sub-container">
						<span class="top">top-b</span>
						<span class="bottom">bottom-b</span>
					</div>
				</div>
			</div>
		</div>
		<div class="ttb-container mr5">
			<div class="ttb preserve-3d">
				<div class="rect-f rect">
					<div class="sub-container">
						<span class="top">top-f</span>
						<span class="bottom">bottom-f</span>
					</div>
				</div>
				<div class="rect-b rect">
					<div class="sub-container">
						<span class="top">top-b</span>
						<span class="bottom">bottom-b</span>
					</div>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="multi-container">
		<div class="multi-stage">
			<div class="multi preserve-3d">
				<div class="face-rect multi-rect">face</div>
				<div class="back-rect multi-rect">back</div>
				<div class="top-rect multi-rect">top</div>
				<div class="bottom-rect multi-rect">bottom</div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="donino-container">
		<div class="donino-stage">
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
			<div class="cuboid preserve-3d">
				<div class="face-rect donino-rect"></div>
				<div class="back-rect donino-rect"></div>
				<div class="left-rect donino-rect"></div>
				<div class="right-rect donino-rect"></div>
			</div>
		</div>
		<div class="clearfix"></div>
	</div>
	<div class="gallery-container">
		<div class="gallery-stage">
			<div class="gallery preserve-3d">
				<div class="face-door door">
					<div class="face-wall"></div>
					<div class="back-wall"></div>
					<div class="rect-door">
						<div class="pole"></div>
					</div>
				</div>
				<div class="back-door door">
					<div class="desc-wall">
						<span class="desc">画廊演示</span>
					</div>
				</div>
				<div class="left-door door"></div>
				<div class="right-door door"></div>
				<div class="gallery-top">
					<div class="top-door door"></div>
				</div>
				<div class="gallery-bottom">
					<div class="bottom-door door"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="gallery-option">
		<button class="in">前进</button>
		<button class="out">后退</button>
		<button class="to-left">往左走</button>
		<button class="to-right">往右走</button>
		<button class="open">开门</button>
		<button class="close">关门</button>
	</div>
	<div class="delete-img-container">
		<div class="img-container">
			<img src="../imgs/test-1/1.jpg">
			<img src="../imgs/test-1/2.jpg">
			<img src="../imgs/test-1/3.jpg">
			<img src="../imgs/test-1/4.jpg">
			<img src="../imgs/test-1/5.jpg">
		</div>
	</div>
	<div>
		画圆百分比效果
	</div>
	<div class="hourglass-container">
		<div class="hourglass-horizontal">
			<div class="top-glass"></div>
			<div class="bottom-glass"></div>
			<div class="top-circle"></div>
			<div class="bottom-circle"></div>
		</div>
	</div>
</body>
</html>