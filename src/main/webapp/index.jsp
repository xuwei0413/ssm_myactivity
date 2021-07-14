<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="gbk">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Home</title>

<!-- load stylesheets -->
<link rel="stylesheet" href="http://fonts.useso.com/css?family=Open+Sans:300,400">  <!-- Google web font "Open Sans" -->
<link rel="stylesheet" href="font-awesome-4.5.0/css/font-awesome.min.css">                <!-- Font Awesome -->
<link rel="stylesheet" href="css/bootstrap.min.css">                                      <!-- Bootstrap style -->
<link rel="stylesheet" href="css/hero-slider-style.css">                                  <!-- Hero slider style -->
<link rel="stylesheet" href="css/templatemo-style.css">                                   <!-- Templatemo style -->

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	  <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	  <![endif]-->
</head>

<body>
	<section class="cd-hero">
		<ul class="cd-hero-slider autoplay">  
		<!-- 
			<ul class="cd-hero-slider autoplay"> for slider auto play 
			<ul class="cd-hero-slider"> for disabled auto play
		-->
			<li class="selected">
				<div class="cd-full-width">
					<div class="tm-slide-content-div">
						<form action="jump.jsp" id="search-form">
							<i class="fa fa-cogs tm-slide-icon"></i>
							<h2 class="text-uppercase">welcom</h2>
							<p class="m-b-mid">尊敬的游客，欢迎登录！</p>
							<div class="form-group">
								<input name="search" type="text" class="form-control center-block tm-max-w-400" id="input1" placeholder="Type a keyword...">
						  </div>                                
							<button type="submit" class="cd-btn">开始旅游</button>
							
						</form>                            
					</div>                        
				</div> <!-- .cd-full-width -->
			</li>

			<li>
				<div class="cd-full-width">
					<div class="tm-slide-content-div">
						<form action="jump.jsp" id="search01">
							<i class="fa fa-compass tm-slide-icon"></i>
							<h2 class="text-uppercase">Strategy</h2>
							<p>Using Hero Slider from Cody House. Donec mattis ipsum in erat viverra commodo.
							Proin sapien lacus, euismod eget nisl.</p>
							<a href="index.jsp#1" class="cd-btn">Explore</a>

						</form>
					</div>
				</div> <!-- .cd-full-width -->
			</li>

			<li>
				<div class="cd-full-width">
					<div class="tm-slide-content-div">
						<form action="jump.jsp" id="newsletter">
							<i class="fa fa-cloud tm-slide-icon"></i>
							<h2 class="text-uppercase">Strategy</h2>
							<p class="tm-site-description">Photos from Unsplash</p>
							<div class="form-group">
								<input type="text" class="form-control center-block tm-max-w-400" id="input3" placeholder="Enter your email...">
							</div>


						</form>
					</div>
				</div> <!-- .cd-full-width -->
			</li>
		</ul> <!-- .cd-hero-slider -->

		<div class="cd-slider-nav">
			<nav>
				<span class="cd-marker item-1"></span>
				
				<ul>
					<li class="selected"><a href="#0"></a></li>
					<li><a href="#0"></a></li>
					<li><a href="#0"></a></li>                        
				</ul>
			</nav> 
		</div> <!-- .cd-slider-nav -->
	</section> <!-- .cd-hero -->

	<div class="container-fluid tm-section tm-section-2">
		<div class="row tm-media-row">
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
				<img src="pictures/HOT活动1.jpg" alt="Image" class="img-fluid img-circle img-thumbnail tm-media-img">
			</div>
			<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
				<div class="tm-media-text-container">
					<h3 class="tm-media-title tm-gray-text">最美九寨沟</h3>
					<p class="tm-media-description tm-gray-text-2">九寨沟：世界自然遗产、国家重点风景名胜区、国家AAAAA级旅游景区、国家级自然保护区、国家地质公园、世界生物圈保护区网络，是中国第一个以保护自然风景为主要目的的自然保护区。</p>
				</div>                    
			</div>
		</div>
		
		<div class="row tm-media-row tm-flex-container-reverse">
			
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tm-flex-child-2">
				<img src="pictures/HOT活动3.jpg" alt="Image" class="img-fluid img-circle img-thumbnail tm-media-img">
			</div>

			<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 tm-flex-child-1">
				<div class="tm-media-text-container-left">
					<h3 class="tm-media-title tm-gray-text">醉梦千岛湖</h3>
					<p class="tm-media-description tm-gray-text-2">千岛湖风景区，又称新安江水库，位于浙江省杭州市淳安县境内。东距杭州129公里、西距黄山140公里，占地面积982平方公里，地处长江三角洲的腹地。千岛湖距杭州市129公里，距黄山市140公里，北接临安市、南接常山县、西南与开化县、衢州市为邻，东南与桐庐和建德二县市接壤，西北与安徽省交界。</p>
				</div>                    
			</div>

		</div>

		<div class="row tm-media-row">
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
				<img src="pictures/HOT活动-4.jpg" alt="Image" class="img-fluid img-circle img-thumbnail tm-media-img">
			</div>
			<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
				<div class="tm-media-text-container">
					<h3 class="tm-media-title tm-gray-text">千垛菜花美</h3>
					<p class="tm-media-description tm-gray-text-2">每年清明时节，千垛景区四面环水的“垛田”上长满了金黄色的油菜花。一幅“油菜花开金满地”的壮阔美景，吸引了众多前来观光的游客。“河有万湾多碧水，田无一垛不黄花”正是兴化垛田菜花的真实写照。如今，千垛景区荷塘绿意更胜，更有另一番浪漫光景。春去秋来，在这千垛田间，见万寿菊花，黄叶纷飞，妍丽雍容，在重阳雨后，正值菊黄蟹肥时，看万花黄透，品水乡河蟹，真可谓美不胜收。</p>
				</div>                    
			</div>
		</div>
		<div class="row tm-media-row tm-flex-container-reverse">



			<div class="row tm-media-row tm-flex-container-reverse">

				<div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 tm-flex-child-2">
					<img src="pictures/HOT活动2.jpg" alt="Image" class="img-fluid img-circle img-thumbnail tm-media-img">
				</div>
			<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 tm-flex-child-1">
				<div class="tm-media-text-container-left">
					<h3 class="tm-media-title tm-gray-text">登峰造极境</h3>
					<p class="tm-media-description tm-gray-text-2">泰山，又名岱山、岱宗、岱岳、东岳、泰岳，为五岳之一，位于山东省中部，绵亘于泰安、济南、淄博三市之间，总面积2.42万公顷。主峰玉皇顶海拔1532.7米。 [1]
						泰山被古人视为“直通帝座”的天堂，成为百姓崇拜，帝王告祭的神山，有“泰山安，四海皆安”的说法。自秦始皇开始到清代，先后有13代帝王依次亲登泰山封禅或祭祀，另外有24代帝王遣官祭祀72次 [2-3]  。山体上留下了20余处古建筑群，2200余处碑碣石刻。
						1982年11月8日，泰山被列入第一批国家级风景名胜区。1987年12月12日，泰山被列为世界文化与自然双重遗产。2007年3月7日，被评为国家AAAAA级旅游景区。</p>
				</div>
			</div>

		</div>
	</div>
	
	<section class="tm-section tm-section-3 tm-bg-purple">
		<div class="container-fluid tm-section-3-inner">
			<div class="row center-block text-xs-center tm-section-3-header">
				<div class="col-xs-12">
					<h2 class="tm-text-white tm-section-3-title">Choose your plan</h2>
					<p class="tm-text-white tm-section-3-description">尊敬的游客，我想你一定很心动，在下面填写你的信息吧</p>
				</div>
			</div>
			<div class="row">                    
				
				<div class="tm-plan-boxes-container">
					
					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-table-col">
							
						<table class="tm-plan">
							<thead>
								<tr>
									<th class="text-xs-center tm-plan-table-header">欢迎登录</th>
								</tr>
							</thead>
							<tbody class="tm-bg-light-purple">
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">登录个人信息</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">注册成为vip，享受服务优惠</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">早用早享受</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">好的服务等待您的参与</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">welcom our trip</td></tr>
							</tbody>
							<tfoot>
								<tr>
									<td class="text-xs-center">
										<a href="jump.jsp" class="tm-plan-link tm-plan-link-purple">Start our travel</a>
									</td>
								</tr>
							</tfoot>
						</table>  

					</div>

					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-table-col">
						
						<table class="tm-plan">
							<thead>
								<tr>
									<th class="text-xs-center tm-plan-table-header">我要入团</th>
								</tr>
							</thead>
							<tbody class="tm-bg-light-green">
								<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">登录个人信息</td></tr>
								<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">注册成为vip，享受服务优惠</td></tr>
								<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">早用早享受</td></tr>
								<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">好的服务等待您的参与</td></tr>
								<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">welcom our trip</td></tr>
							</tbody>
							<tfoot>
								<tr>
									<td class="text-xs-center">
										<a href="jump.jsp" class="tm-plan-link tm-plan-link-green">Start our travel</a>
									</td>
								</tr>
							</tfoot>
						</table> 

					</div>

					<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 tm-table-col">

						<table class="tm-plan">
							<thead>
								<tr>
									<th class="text-xs-center tm-plan-table-header">我要成为团长</th>
								</tr>
							</thead>
							<tbody class="tm-bg-light-orange">
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">登录个人信息</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">注册成为vip，享受服务优惠</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">早用早享受</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">好的服务等待您的参与</td></tr>
							<tr class="tm-plan-table-row"><td class="tm-plan-table-cell">welcom our trip</td></tr>
							</tbody>
							<tfoot>
								<tr>
									<td class="text-xs-center">
										<a href="jump.jsp" class="tm-plan-link tm-plan-link-orange">Start our travel</a>
									</td>
								</tr>
							</tfoot>
						</table> 

					</div>

				</div> <!-- tm-plan-boxes-container -->
		
			</div>
		</div>            
	</section>
	<!-- load JS files -->
	<script src="js/jquery-1.11.3.min.js"></script>             <!-- jQuery (https://jquery.com/download/) -->
	<script src="js/tether.min.js"></script> <!-- Tether for Bootstrap (http://stackoverflow.com/questions/34567939/how-to-fix-the-error-error-bootstrap-tooltips-require-tether-http-github-h) --> 
	<script src="js/bootstrap.min.js"></script>                 <!-- Bootstrap js (v4-alpha.getbootstrap.com/) -->
	<script src="js/hero-slider-script.js"></script>            <!-- Hero slider (https://codyhouse.co/gem/hero-slider/) -->
	<script src="js/jquery.touchSwipe.min.js"></script>         <!-- http://labs.rampinteractive.co.uk/touchSwipe/demos/ -->
	<script>     
   
		$(document).ready(function(){

			/* Auto play bootstrap carousel 
			* http://stackoverflow.com/questions/13525258/twitter-bootstrap-carousel-autoplay-on-load
			-----------------------------------------------------------------------------------------*/                
			$('.carousel').carousel({
			  interval: 3000
			})

			/* Enable swiping carousel for tablets and mobile
			 * http://lazcreative.com/blog/adding-swipe-support-to-bootstrap-carousel-3-0/
			 ---------------------------------------------------------------------------------*/
			if($(window).width() <= 991) {
				$(".carousel-inner").swipe( {
					//Generic swipe handler for all directions
					swipeLeft:function(event, direction, distance, duration, fingerCount) {
						$(this).parent().carousel('next'); 
					},
					swipeRight: function() {
						$(this).parent().carousel('prev'); 
					},
					//Default is 75px, set to 0 for demo so any distance triggers swipe
					threshold:0
				});
			}  

			/* Handle window resize */
			$(window).resize(function(){
				if($(window).width() <= 991) {
					$(".carousel-inner").swipe( {
						//Generic swipe handler for all directions
						swipeLeft:function(event, direction, distance, duration, fingerCount) {
							$(this).parent().carousel('next'); 
						},
						swipeRight: function() {
							$(this).parent().carousel('prev'); 
						},
						//Default is 75px, set to 0 for demo so any distance triggers swipe
						threshold:0
					});
				 }
			});                             
		});

	</script>             
	</div>
</body>
</html>