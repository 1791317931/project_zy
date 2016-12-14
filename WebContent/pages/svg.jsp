<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Date" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>svg</title>
<style type="text/css">
	#rect-001{
		transition: opacity 2s cubic-bezier(0.5, 0.5, 1, 1);
	}
	#rect-002{
		transition: opacity 2s cubic-bezier(0.5, 0.5, 1, 1);
	}
	#dash-test {
		width: 1000px;
		height: 400px;
		border: 1px solid red;
	}
	.p10 {
		padding: 10px;
	}
	.mt10 {
		margin-top: 10px;
	}
	.mr10 {
		margin-right: 10px;
	}
	.w200 {
		width: 200px;
	}
	.h200 {
		height: 200px;
	}
	.br {
		border: 1px solid red;
	}
	.pull-left {
		float: left;
	}
	.hide {display: none;}
</style>
</head>
<body>
	<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000" height="800" style="border: 1px solid red;">
		<rect x="0" y="0" rx="100" ry="100" width="200" height="200" fill="red" stroke="blue" stroke-width="2" fill-opacity="0.5"/>
		<polygon points="100,10 40,180 190,60 10,60 160,180" style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
		<ellipse cx="300" cy="100" rx="100" ry="50" fill="red" />
		<line x1="600" y1="0" x2="400" y2="200" stroke="red" stroke-width="10" fill="blue" fill-opacity="0.2" />
		<polygon points="600,136.6 686.6,186.6 736.6,273.2 786.6,186.6 873.2,136.6 786.6,86.6 736.6,0 686.6,86.6"
			fill="red" fill-opacity="0.5" stroke="#ff7d00" stroke-width="5" stroke-opacity="0.2" fill-rule="evenodd"/>
		<polyline points="800,10 820,80 840,150 860,270" stroke="red" stroke-width="1" stroke-opacity="0.5" fill="none"/>
		<path d="M50 200 L0 286.6 L100 286.6 Z" fill="red" fill-opacity="0.3" stroke="#ff7d00" stroke-width="2" stroke-opacity="0.5" />
		<path d="M150 200 l-50 86.6 l100 0 Z" fill="red" fill-opacity="0.3" stroke="#ff7d00" stroke-width="2" stroke-opacity="0.5" />
		<path id="lineABC" d="M 50 350 l 100 173.2 l 100 -173.2" fill="none" stroke="rgba(255, 0, 0, 0.5)" stroke-width="3" />
		<line x1="100" y1="436.6" x2="200" y2="436.6" fill="none" stroke="green" stroke-width="3" />
		<!-- Q制定  绝对定位 前两个参数：150 520.2  控制点（最高或最低）位置,即y轴+2*高    后两个参数：250 350  终点 -->
		<path d="M 50 350 Q 150 520.2 250 350 T 150 436.6" stroke="#ff7d00" stroke-width="3" fill="none" />
		<g stroke="black" stroke-width="3" fill="black">
			<circle id="pointA" cx="50" cy="350" r="3" />
			<circle id="pointB" cx="250" cy="350" r="3" />
			<circle id="pointC" cx="150" cy="523.2" r="3" />
		</g>
		<g stroke="none" fill="black" font="sans-serif" font-size="30" text-anchor="middle">
			<text id="textA" x="50" y="350" dx="-20" dy="10">A</text>
			<text id="textB" x="250" y="350" dx="20" dy="10">B</text>
			<text id="textC" x="150" y="523.2" dy="30">C</text>
		</g>
		<defs>
			<filter id="blend" x="0" y="0" width="200%" height="200%">
				<feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
				<feGaussianBlur in="blurOut" result="blurOut" stdDeviation="20" />
				<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
			</filter>
		</defs>
		<rect width="80" height="80" stroke="yellow" stroke-width="3" fill="red" filter="url(#blend)" x="420" y="370" />
		<filter id="colorMatrix" x="0%" y="0%" width="100%" height="100%">  
			<feColorMatrix result="original" type="matrix"   
			     values="1 1 1 1 0    
			             0 1 0 0 0   
			             0 0 1 0 0   
			             0 0 0 1 0" />
		</filter>
	    <circle cx="550" cy="430" r="20" fill="red" fill-opacity="0.5" />
	    <g filter="url(#colorMatrix)">
		    <circle cx="595" cy="430" r="20" fill="white" fill-opacity="1" />
		    <image xlink:href="../imgs/test-1/1.jpg" x="50" y="550" width="200" height="200" />
	    </g>
	    <filter id="gaussianBlur" x="0" y="0">
	    	<feGaussianBlur id="SourceGraphic" stdDeviation="20" />
	    </filter>
	    <rect x="300" y="550" width="200" height="200" fill="red" stroke="#ff7d00" stroke-width="2" filter="url(#gaussianBlur)" />
	    <defs>
	    	<linearGradient id="linearGradient" x1="0" y1="0" x2="1" y2="1">
	    		<stop offset="0" stop-color="red" />
	    		<stop offset="1" stop-color="blue" />
	    	</linearGradient>
	    </defs>
	    <rect x="520" y="550" width="200" height="100" fill="url(#linearGradient)" />
	    <defs>
	    	<!-- marker需要添加 fill="black" stroke="black"，不然表现形式不一样 -->
	    	<marker id="triangle" viewBox="0 0 20 20" refX="1" refY="5" markerWidth="10" markerHeight="10" orient="auto" fill="black" stroke="black">
	    		<path d="M 0 0 l 0 10 l 8.66 -5 z" />
	    	</marker>
	    </defs>
	    <polyline points="730,550 760,575 800,575" fill="none" stroke="red" stroke-width="2" marker-end="url(#triangle)" />
	    <rect x="820" y="575" width="0" height="50" fill="red" stroke="blue" stroke-width=".5">
		    <animate attributeName="width" attributeType="XML" dur="3s" begin="0" from="0" to="100" fill="freeze" />
	    </rect>
	</svg>
	<div style="width: 1000px; height: 200px; border: 1px solid red;">
		<div style="width: 200px; height: 200px; float: left; background-color: #ff7d00;">left</div>
		<div style="width: calc(100% - 400px); height: 200px; background-color: blue; float: right;">right</div>
	</div>
	<style>
		#mypath {
		    stroke: #05D380;
		    stroke-width: 2;
		    stroke-dasharray: 888;
		    stroke-dashoffset: 888;
		    fill: none;
		    animation: go 5s linear 1 forwards;
		    -webkit-animation: go 5s linear 1 forwards;
		}
		@keyframes go {
			to {
				stroke-dashoffset: 0;
			}
		}
		@-webkit-keyframes go {
			to {
				stroke-dashoffset: 0;
			}
		}
	</style>
	<svg width="1000" height="400" style="border: 1px solid red;">
		<path d="M100 100, A120 120, 0 0 1, 300 300 A120 120, 0 0 1, 100 100" id="mypath" />
		<rect id="rect-001" x="400" y="50" width="200" height="200" stroke="#111" stroke-width="1" fill="none" />
		<path id="rect-002" d="M 625,50 L 815,50 A 5,5,0,0,1,820,55 L 820,245 A 5,5,0,0,1,815,250 L 625,250 A 5,5,0,0,1,620,245 L 620,55 A 5,5,0,0,1,625,50" fill="none" stroke="red" stroke-width="1" />
	</svg>
	<svg width="1000" height="500" style="border: 1px solid #ff7d00;">
		<path d="M 10,10 Q 100,310 210,10" stroke="red" stroke-width="1" fill="none" />
		<path d="M 220,150 Q 320,360 420,150 Q 520,0 620,150" stroke="red" stroke-width="1" fill="none" />
		<path d="M 200,300 C 300,500 500,100 600,300" stroke="red" stroke-width="1" fill="none" />
	</svg>
	<svg width="1200" height="800" style="border: 1px solid skyblue;">
		<defs>
			<filter id="filter-001" x="0" y="0">
				<feOffset result="filter-001-offset-001" in="SourceAlpha" dx="30" dy="30" />
				<feGaussianBlur result="filter-001-gb-001" in="filter-001-offset-001" stdDeviation="5" />
				<feBlend in="SourceGraphic" in2="filter-001-gb-001" mode="normal" />
			</filter>
			<rect id="rect-003" width="200" height="200" />
			<filter id="filter-002" x="-0.3" y="-0.3" width="1.6" height="1.6">
				<feGaussianBlur result="filter-002-gb-001" in="SourceGraphic" stdDeviation="2" />
				<!-- <feColorMatrix result="filter-002-matrix-001" in="filter-002-gb-001" mode="matrix"
					values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9" />
				<feComposite in="SourceGraphic" in2="filter-002-matrix-001" operator="atop" /> -->
			</filter>
			<clipPath id="clipPath-001">
				<rect x="50" y="500" width="100" height="100"/>
			</clipPath>
			<linearGradient id="linearGradient-001" >
				<stop offset="0" stop-color="white" stop-opacity="1" />
				<stop offset="1" stop-color="red" stop-opacity="1" />
			</linearGradient>
			<mask id="mask-001">
				<rect x="270" y="500" width="200" height="200" fill="url(#linearGradient-001)" />
			</mask>
			<radialGradient id="radialGradient-001" cx="0.5" cy="0.5" fx="0.5" fy="0.5" gradientUnits="objectBoundingBox">
				<stop offset="0" stop-color="red" />
				<stop offset="1" stop-color="blue" />
			</radialGradient>
			<pattern id="pattern-001" x="0" y="0" width="0.25" height="0.25" patternUnits="objectBoundingBox" patternContentUnits="userSpaceOnUse">
				<rect x="0" y="0" width="50" height="50" fill="deepskyblue" fill-opacity="0.2" />
				<circle cx="25" cy="25" r="25" fill="red" />
			</pattern>
		</defs>
		<use xlink:href="#rect-003" x="10" y="10" fill="blue" stroke="green" stroke-width="10" />
		<rect x="220" y="10" width="200" height="200" stroke="#ff7d00" stroke-width="2" fill="blue" fill-opacity="0.5" filter="url(#filter-001)" />
		<!-- <rect x="480" y="10" width="200" height="200" fill="#ff7d00" filter="url(#filter-002)"/> -->
		<image x="480" y="10" width="200" height="200" xlink:href="../imgs/test-1/1.jpg" filter="url(#filter-002)" />
		<rect x="700" y="10" width="200" height="200" fill="url(#radialGradient-001)" />
		<rect x="920" y="10" width="200" height="200" fill="url(#pattern-001)" />
		<path id="path-001" stroke="#111" stroke-width="1" fill="none" />
		<circle cx="150" cy="600" r="100" clip-path="url(#clipPath-001)" fill="red" />
		<rect x="270" y="500" width="200" height="200" fill="red" mask="url(#mask-001)" />
		<path d="M10-5-10,15M15,0,0,15M0-5-20,15" stroke="red" stroke-width="1" fill="none" />
	</svg>
	<div id="dash-test" class="p10">
		<svg style="position: absolute;" width="1000" height="400" id="svg-animation-container">
			<defs>
				<rect width="200" height="200" stroke="#ccc" stroke-width="1" id="rect-animation" fill="none" />
			</defs>
			<use xlink:href="#rect-animation" x="1" y="11" class="svg-animation-use" />
			<use xlink:href="#rect-animation" x="213" y="11" class="svg-animation-use" />
			<use xlink:href="#rect-animation" x="425" y="11" class="svg-animation-use" />
		</svg>
		<div class="w200 h200 br mr10 mt10 pull-left svg-animation hide"></div>
		<div class="w200 h200 br mr10 mt10 pull-left svg-animation hide"></div>
		<div class="w200 h200 br mr10 mt10 pull-left svg-animation hide"></div>
	</div>
	<script type="text/javascript" src="../js/svg.js?<%=new Date().getTime()%>"></script>
</body>
</html>