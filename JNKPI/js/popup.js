
//弹窗
	$('.summaryBtn').on('click',function(){
		$('.filterbg').show();
		$('.popup').show();
		$('.popup').width('3px');
		$('.popup').animate({height: '76%'},400,function(){
			$('.popup').animate({width: '82%'},400);
		});
		
		setTimeout(summaryShow(category,name),800);
	});
	$('.popupClose').on('click',function(){
		$('.popupClose').css('display','none');
		$('.summary').hide();
		summaryPie1.clear();
		summaryPie2.clear();
		summaryPie3.clear();
		$('.popup').animate({width: '3px'},400,function(){
			$('.popup').animate({height: 0},400);
		});
		setTimeout(summaryHide,800);
	});
	function summaryShow(category,name){
		$('.popupClose').css('display','block');
		$('.summary').show();
		setSummary(category,name);
		
	};
	function summaryHide(){
		$('.filterbg').hide();
		$('.popup').hide();
		$('.popup').width(0);
	};

	$(window).resize(function(){
		myChart1.resize();
		try{
			summaryPie1.resize();
			summaryPie2.resize();
			summaryPie3.resize();
		}catch(err){
			return false;
		}
	});
	
	setTimeout(function(){
		
		$('.progress').each(function(i,ele){
			var PG = $(ele).attr('progress');
			var PGNum = parseInt(PG);
			var zero = 0;
			var speed = 50;
			var timer;
			
			$(ele).find('h4').html(zero+'%');
			if(PGNum<10){
				$(ele).find('.progressBar span').addClass('bg-red');
				$(ele).find('h3 i').addClass('color-red');
			}else if(PGNum>=10 && PGNum<50){
				$(ele).find('.progressBar span').addClass('bg-yellow');
				$(ele).find('h3 i').addClass('color-yellow');
			}else if(PGNum>=50 && PGNum<100){
				$(ele).find('.progressBar span').addClass('bg-blue');
				$(ele).find('h3 i').addClass('color-blue');
			}else{
				$(ele).find('.progressBar span').addClass('bg-green');
				$(ele).find('h3 i').addClass('color-green');
			}
			$(ele).find('.progressBar span').animate({width: PG},PGNum*speed);
			timer = setInterval(function(){
				zero++;
				$(ele).find('h4').html(zero+'%');
				if(zero==PGNum){
					clearInterval(timer);
				}
			},speed);
		});

		

		//基本信息
		// totalNum($('#indicator1'),1);
		// totalNum($('#indicator2'),1);
		// totalNum($('#indicator3'),1);

		//总计运单数
// 		totalNum($('#totalNum'),1000);
// 
// 		myChart1.setOption(option1);
	
	},500);
	
var summaryPie1,summaryPie2,summaryPie3,summaryBar,summaryLine;
	var pieData;
	
	function setSummary(category,name){	
		//alert('====='+category);
		var url="http://172.16.9.130:4180/JNKPI/GetZone2?category="+category+"&name="+name;
		$.get(url,"",function(data){
		var obj =  eval('(' + data + ')');
		if(data["code"]=="404"){
			console.log(data);
			return;
		}
		//三个维度数据
		var t1value=obj["t1value"];
		var t1name=obj["t1name"];
		var t1num=obj["t1num"];
		
		var t2value=obj["t2value"];
		var t2name=obj["t2name"];
		var t2num=obj["t2num"];
		
		var t3value=obj["t3value"];
		var t3name=obj["t3name"];
		var t3num=obj["t3num"];
		
		var t4name=obj["t4name"];
		var t4num=obj["t4num"];
		
		
		summaryPie1 = echarts.init(document.getElementById('summaryPie1'));
		summaryPie2 = echarts.init(document.getElementById('summaryPie2'));
		summaryPie3 = echarts.init(document.getElementById('summaryPie3'));
		summaryPie4 = echarts.init(document.getElementById('summaryPie4'));
		
		var ww = $(window).width();
		var pieData;
		if(ww>1600){
			pieData = {
				pieTop: '40%',
				pieTop2: '36%',
				titleSize: 20,
				pieRadius: [80, 85],
				itemSize: 32
			}
		}else{
			pieData = {
				pieTop: '30%',
				pieTop2: '26%',
				titleSize: 16,
				pieRadius: [60, 64],
				itemSize: 28
			}
		};
		//弹出框调用ECharts饼图
		var option1 = {
		            title : {
		                text: t1value,
		                textStyle:{
		                    color:"#e9ebee"
		
		                },
		
		                x:'center'
		            },
		            tooltip : {
		                trigger: 'item',
		                formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		                orient : 'vertical',
		                x : 'left',
		                //data:['历下区','市中区','槐荫区','天桥区','历城区','西客站区','东区','长清区','其他'],
						data:t1name,
		                textStyle:{
		                    color:"#e9ebee"
		
		                }
		            },
		
		            calculable : false,
		            series : [
		                {
		                    name:'工单数',
		                    type:'pie',
		                    radius : '50%',
		                    center: ['55%', '55%'],
							data: function () {
							                        var serie = [];
							                        for (var i = 0; i < t1name.length; i++) {
							                            var item = {
							                                name: t1name[i],
							                                value: t1num[i]
							                            };
							                            serie.push(item);
							                        }
							                        return serie;
							}()
		                }
		            ]
		        };
		var option2 = {
		            title : {
		                text: t2value,
		                textStyle:{
		                    color:"#e9ebee"
		
		                },
		
		                x:'center'
		            },
		            tooltip : {
		                trigger: 'item',
		                formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		                orient : 'vertical',
		                x : 'left',
		                //data:['历下区','市中区','槐荫区','天桥区','历城区','西客站区','东区','长清区','其他'],
						data:t2name,
		                textStyle:{
		                    color:"#e9ebee"
		
		                }
		            },
		
		            calculable : false,
		            series : [
		                {
		                    name:'工单数',
		                    type:'pie',
		                    radius : '50%',
		                    center: ['55%', '55%'],
							data: function () {
							                        var serie = [];
							                        for (var i = 0; i < t2name.length; i++) {
							                            var item = {
							                                name: t2name[i],
							                                value: t2num[i]
							                            };
							                            serie.push(item);
							                        }
							                        return serie;
							}()
		                }
		            ]
		        };
		var option3 = {
		            title : {
		                text: t3value,
		                textStyle:{
		                    color:"#e9ebee"
		
		                },
		
		                x:'center'
		            },
		            tooltip : {
		                trigger: 'item',
		                formatter: "{a} <br/>{b} : {c} ({d}%)"
		            },
		            legend: {
		                orient : 'vertical',
		                x : 'left',
		                //data:['历下区','市中区','槐荫区','天桥区','历城区','西客站区','东区','长清区','其他'],
						data:t3name,
		                textStyle:{
		                    color:"#e9ebee"
		
		                }
		            },
		
		            calculable : false,
		            series : [
		                {
		                    name:'工单数',
		                    type:'pie',
		                    radius : '60%',
		                    center: ['55%', '55%'],
							data: function () {
							                        var serie = [];
							                        for (var i = 0; i < t3name.length; i++) {
							                            var item = {
							                                name: t3name[i],
							                                value: t3num[i]
							                            };
							                            serie.push(item);
							                        }
							                        return serie;
							}()
		                }
		            ]
		        };		
		var option4 = {
			title : {
			    text: name+'——服务类别分析',
			    textStyle:{
			        color:"#e9ebee"
					
			    },
					
			    x:'center'
			},
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        },
		        formatter: function (params) {
		            var tar = params[0];
		            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
		        }
		    },
		    grid:{
		      borderWidth:0
			  // left:'10%',
			  // bottom:'15%'
		    },
		    xAxis : [
		        {
		            type : 'category',
		
		            //data : ['管网部','工程管理部','营业部','二次供水管理部','普润水务'],
					data:t4name,
		            axisLabel : {
		                interval: 0,  
					   // formatter:function(value)  
					   // {  
						  //  return value.split("").join("\n");  
					   // } ,
					   formatter: '{value} ',
		                textStyle: {
		                    color: '#a4a7ab',
		                    align: 'right'
		                }
		            },
		            splitLine:{show: false}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel : {
		                formatter: '{value} ',
		                textStyle: {
		                    color: '#a4a7ab',
		                    align: 'right'
		                }
		            },
		            splitLine:{show: false}
		        }
		    ],
		    series : [
		        {
		            name:'数量',
		            type:'bar',
					radius : '40%',
					center: ['40%', '40%'],
		            stack: '总量',
					itemStyle: {
					    normal: {
					        color: function(params) {
					                                        //var colorList = ["#3398db", "#434348", "#90ed7d", "#f7a35c", "#61a0a8", "#61a0a8", "#91c7ae", "#2f4554"];
					                                        var colorList = [
					                                        
					                                                                      '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
					                                        
					                                                                       '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
					                                        
					                                                                       '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
					                                        
					                                                                    ];
															return colorList[params.dataIndex]
					                                    }
					    }
					},
		            //data:[800, 300, 200, 900, 300],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < t4name.length; i++) {
					                            var item = {
					                                name: t4name[i],
					                                value: t4num[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}()
		            
		        }
		    ]
		};
		
		summaryPie1.setOption(option1);
		summaryPie2.setOption(option2);
		summaryPie3.setOption(option3);
		summaryPie4.setOption(option4);
		});
	}
