/**
 * Created by Administrator on 2017/5/17.
 */

$(function(){
	var options,options2,year,mouth;
	var date = new Date();
    shouRu(date.getFullYear(),date.getMonth()+1);
	set_select_checked("year",date.getFullYear());
	set_select_checked("month",date.getMonth()+1);
	$("#choseYM").click(function(){
		options=$("#year option:selected"); //获取选中的项
		year=options.val();
		options2=$("#month option:selected"); //获取选中的项
		month=options2.val();
		shouRu(year,month);
	});
    $(".index_nav ul li").each(function(index){
        $(this).click(function(){
            $(this).addClass("nav_active").siblings().removeClass("nav_active");
            $(".index_tabs .inner").eq(index).fadeIn().siblings("div").stop().hide();
            if(index==1){
                //yingXiao();
            }else if(index==2){
                shouRu(year,6);
            }else if(index==3){
                //AnQuan();
            }else if(index==4){
                //user();
            }else if(index==5){
                //manage();
            }
        })
    });
    $(".tabs ul li").each(function(index){
       $(this).click(function(){
           $(".tabs ul li div .div").removeClass("tabs_active");
           $(this).find("div .div").addClass("tabs_active");
           $(".tabs_map>div").eq(index).fadeIn().siblings("div").stop().hide();
       })
   });
    $(".middle_top_bot ul li").each(function(){
        $(this).click(function(){
            $(".middle_top_bot ul li").removeClass("middle_top_bot_active");
            $(this).addClass("middle_top_bot_active");
        })
    });

});
//选择当前年月
function set_select_checked(selectId, checkValue){
	var select = document.getElementById(selectId);
	//var select=$(selectId);
	for (var i = 0; i < select.options.length; i++){
		if (select.options[i].text == checkValue){
		select.options[i].selected = true;
		break;
		}
	}
}
//数组求和
function sum(arr) {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}
//汇总分析
function shouRu(year,month){
	var url="http://172.16.9.130:4180/JNKPI/GetZone?year="+year+"&month="+month;
	$.get(url,"",function(data){
	var obj =  eval('(' + data + ')');
	if(data["code"]=="404"){
		console.log(data);
		return;
	}
	//热线工单分析
	var kfnum=obj["kfnum"];
	var gdnum=obj["gdnum"];
	
	//行政区域分析
	var regionnum=obj["regionnum"];
	var regionname=obj["regionname"];
	
	//责任部门分析
	var deptnum=obj["deptnum"];
	var deptname=obj["deptname"];
	
	//信息来源分析
	var reflectnum=obj["reflectnum"];
	var reflectname=obj["reflectname"];
	
	//服务类别分析
	var servicenum=obj["servicenum"];
	var servicename=obj["servicename"];
	
	//同比环比数据
	var tbnum=obj["tbnum"];
	var hbnum=obj["hbnum"];
	
	var kfsum=sum(kfnum);
	var gdsum=sum(gdnum);
	var tbsum=sum(tbnum);
	var hdsum=sum(hbnum);
	document.getElementById("td1").innerHTML = kfsum;
	document.getElementById("td2").innerHTML = gdsum;
	document.getElementById("td3").innerHTML = tbsum;
	document.getElementById("td4").innerHTML = hdsum;
	
	
// 服务类别 zhanbi02  101
    $(function(){
        var myChart = echarts.init($("#zhanbi02")[0]);
        var option = {

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
					data:servicename,
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
                    name:'服务类别',
                    type:'bar',
					radius : '45%',
					center: ['60%', '70%'],
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
					                        for (var i = 0; i < servicename.length; i++) {
					                            var item = {
					                                name: servicename[i],
					                                value: servicenum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}()
                    
                }
            ]
        };

        myChart.setOption(option);
		myChart.on('click', function (params) {//点击事件
						$('.filterbg').show();
						$('.popup').show();
						$('.popup').width('3px');
						$('.popup').animate({height: '80%'},400,function(){
							$('.popup').animate({width: '90%'},400);
						});
						var category=101,name=params.name;
						setTimeout(summaryShow(category,name),800);
		});
    });
// 信息来源统计 zhanbi03 102
    $(function(){
        var myChart = echarts.init($("#zhanbi03")[0]);
        option = {

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

            xAxis : [
                {
                    type : 'category',
                    splitLine: {show:false},
                    //data : ['12345','用户来电','新闻媒体','在线客服','重办工单'],
					data:reflectname,
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
            grid:{
                borderWidth:0,
				left:'5%',
				bottom:'5%'
            },
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
                    name:'工单量',
                    type:'bar',
					radius : '40%',
					center: ['75%', '80%'],
                    stack: '总量',
                    itemStyle:{
                        normal:{
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
                    //data:[1200, 300, 200, 900, 300]
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < reflectname.length; i++) {
												
					                            var item = {
					                                name: reflectname[i],
					                                value: reflectnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}()
                }
            ]
        };

        myChart.setOption(option);
		myChart.on('click', function (params) {//点击事件
						$('.filterbg').show();
						$('.popup').show();
						$('.popup').width('3px');
						$('.popup').animate({height: '80%'},400,function(){
							$('.popup').animate({width: '90%'},400);
						});
						var category=102,name=params.name;
						setTimeout(summaryShow(category,name),800);
		});
    });
// 责任部门  allAly01  103
    $(function(){
        var myChart = echarts.init($("#allAly01")[0]);
        option = {
			noDataLoadingOption: {
			                        text: '暂无数据',
			                        effect: 'bubble',
			                        effectOption: {
			                            effect: {
			                                n: 0
			                            }
			                        }
			 },
            title : {
                //text: '责任部门',
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
                //data:['咨询类','报修类','投诉建议','其他类型','特殊工单'],
				data :deptname,
                textStyle:{
                    color:"#e9ebee"

                }
            },

            calculable : false,
            series : [
                {
                    name:'',
                    type:'pie',
                    radius : '55%',
                    center: ['50%', '50%'],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < deptname.length; i++) {
					                            var item = {
					                                name: deptname[i],
					                                value: deptnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}()
//                     data:[
//                         {value:335, name:'咨询类',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#1afffd'
// 
//                                 }
//                             }
//                         },
//                         {value:310, name:'报修类',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#2e7cff'
// 
//                                 }
//                             }},
//                         {value:234, name:'投诉建议',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#ffcb89'
// 
//                                 }
//                             }},
//                         {value:135, name:'其他类型',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#005ea1'
// 
//                                 }
//                             }},
//                         {value:48, name:'特殊工单',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#0ad5ff'
// 
//                                 }
//                             }}
//                     ]
                }
            ]
        };
		myChart.setOption(option);
		myChart.on('click', function (params) {//点击事件
						//alert(params.name);
						$('.filterbg').show();
						$('.popup').show();
						$('.popup').width('3px');
						$('.popup').animate({height: '80%'},400,function(){
							$('.popup').animate({width: '90%'},400);
						});
						var category=103,name=params.name;
						setTimeout(summaryShow(category,name),800);
		});
    });
	//行政区域  allAly99  104
    $(function(){
        var myChart = echarts.init($("#allAly99")[0]);
        option = {
            title : {
                text: '',
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
				data:regionname,
                textStyle:{
                    color:"#e9ebee"

                }
            },

            calculable : false,
            series : [
                {
                    name:'工单数',
                    type:'pie',
                    radius : '55%',
                    center: ['60%', '60%'],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < regionname.length; i++) {
					                            var item = {
					                                name: regionname[i],
					                                value: regionnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}()
//                     data:[
//                         {value:335, name:'历下区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#06b8f8'
// 
//                                 }
//                             }},
//                         {value:310, name:'市中区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#ff5c58'
// 
//                                 }
//                             }},
//                         {value:234, name:'槐荫区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#ffffb3'
// 
//                                 }
//                             }},
//                         {value:135, name:'天桥区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#fee581'
// 
//                                 }
//                             }},
//                         {value:1548, name:'历城区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#1afffd'
// 
//                                 }
//                             }},
//                         {value:135, name:'西客站区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#1ec7f1'
// 
//                                 }
//                             }},
//                         {value:135, name:'东区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#e15828'
// 
//                                 }
//                             }},
//                         {value:135, name:'长清区',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#28a3e1'
// 
//                                 }
//                             }},
//                         {value:135, name:'其他',
//                             itemStyle:{
//                                 normal:{
//                                     color:'#72e7d5'
// 
//                                 }
//                             }}
//                     ]
                }
            ]
        };

        myChart.setOption(option);
		myChart.on('click', function (params) {//点击事件
						$('.filterbg').show();
						$('.popup').show();
						$('.popup').width('3px');
						$('.popup').animate({height: '80%'},400,function(){
							$('.popup').animate({width: '90%'},400);
						});
						var category=104,name=params.name;
						setTimeout(summaryShow(category,name),800);
		});
    });
	
	//折线图 月度分析 allAly04
	$(function(){
	    var myChart = echarts.init($("#allAly04")[0]);
	    option = {
	        title : {
	            text: '客服单分析',
	            textStyle:{
	                color:"#e9ebee"
	
	            },
	            x:'center'
	
	        },
	        tooltip : {
	            trigger: 'axis'
	        },
	        legend: {
	            orient : 'vertical',
	            x : 'left',
	            data:['客服单量','工单量'],
	            textStyle:{
	                color:"#e9ebee"
	
	            },
	        },
	
	        calculable : false,
	        xAxis : [
	            {
	                type : 'category',
	                splitLine:{show: false},
	                axisLabel : {
	                    formatter: '{value} ',
	                    textStyle: {
	                        color: '#a4a7ab',
	                        align: 'right'
	                    }
	                },
	                data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                splitLine:{show: false},
	                axisLabel : {
	                    formatter: '{value} ',
	                    textStyle: {
	                        color: '#a4a7ab',
	                        align: 'right'
	                    }
	                }
	            }
	        ],
	        grid:{
	            borderWidth:0
	        },
	        series : [
	            {
	                name:'客服单量',
	                type:'line',
	    //             data:[112.0, 114.9, 117.0, 123.2, 125.6, 146.7, 135.6, 162.2, 132.6, 120.0, 136.4, 133.3,112.0, 
					// 114.9, 117.0, 123.2, 125.6, 146.7, 135.6, 162.2, 132.6, 120.0, 136.4, 133.3,
					// 114.9, 117.0, 123.2, 125.6, 146.7, 135.6, 162.2],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < kfnum.length; i++) {
					                            var item = {
					                                //name: reflectname[i],
					                                value: kfnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}(),
	                itemStyle: {
	                    normal: {
	                        //color: '#2481ff',
							color: '#FFFF00'
	                    }
	                },
	                // markPoint : {
	                //     data : [
	                //         {type : 'max', name: '最大值'},
	                //         {type : 'min', name: '最小值'}
	                //     ]
	                // },
	                // markLine : {
	                //     data : [
	                //         {type : 'average', name: '平均值'}
	                //     ]
	                // }
	            },
	            {
	                name:'工单量',
	                type:'line',
	    //             data:[72.0, 74.9, 77.0, 83.2, 85.6, 76.7, 85.6, 82.2, 72.6, 60.0, 76.4, 73.3,62.0, 
					// 64.9, 57.0, 63.2, 65.6, 86.7, 75.6, 72.2, 82.6, 70.0, 76.4, 63.3,
					// 84.9, 67.0, 73.2, 75.6, 96.7, 85.6, 72.2],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < gdnum.length; i++) {
					                            var item = {
					                                //name: reflectname[i],
					                                value: gdnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}(),
	                itemStyle: {
	                    normal: {
	                        color: '#1afffd'
	                    }
	                },
	      //           markPoint : {
	      //               data : [
	      //                   // {name : '最高', value : 96.7, xAxis: 7, yAxis: 83, symbolSize:18},
	      //                   // {name : '最低', value : 60, xAxis: 8, yAxis: 60},
							// {type : 'max', name: '最大值'},
							// {type : 'min', name: '最小值'}
	      //               ]
	      //           },
	                // markLine : {
	                //     data : [
	                //         {type : 'average', name : '平均值'}
	                //     ]
	                // }
	            }
	        ]
	    };
	
	
	    myChart.setOption(option);
	});
	
	
	//折线图 allAly03
	$(function(){
	    var myChart = echarts.init($("#allAly03")[0]);
	    option = {
	        title : {
	            text: '工单分析',
	            textStyle:{
	                color:"#e9ebee"
	
	            },
	            x:'center'
	
	        },
	        tooltip : {
	            trigger: 'axis'
	        },
	        legend: {
	            orient : 'vertical',
	            x : 'left',
	            data:['工单量','同比','环比'],
	            textStyle:{
	                color:"#e9ebee"
	
	            },
	        },
	
	        calculable : false,
	        xAxis : [
	            {
	                type : 'category',
	                splitLine:{show: false},
	                axisLabel : {
	                    formatter: '{value} ',
	                    textStyle: {
	                        color: '#a4a7ab',
	                        align: 'right'
	                    }
	                },
	                //data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					data : ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','20','31']
	            }
	        ],
	        yAxis : [
	            {
	                type : 'value',
	                splitLine:{show: false},
	                axisLabel : {
	                    formatter: '{value} ',
	                    textStyle: {
	                        color: '#a4a7ab',
	                        align: 'right'
	                    }
	                }
	            }
				// {
				// 	name: '百分比%',
				//     type : 'value',
				//     splitLine:{show: false},
				//     axisLabel : {
				//         formatter: '{value} ',
				//         textStyle: {
				//             color: '#a4a7ab',
				//             align: 'right'
				//         }
				//     }
				// }
	        ],
	        grid:{
	            borderWidth:0
	        },
	        series : [
				{
				    name:'工单量',
				    type:'bar',
					//data:[782.6, 785.9, 799.0, 726.4, 828.7, 870.7, 775.6, 782.2, 748.7, 818.8, 876.0, 762.3],
					data: function () {
					                        var serie = [];
					                        for (var i = 0; i < gdnum.length; i++) {
					                            var item = {
					                                //name: reflectname[i],
					                                value: gdnum[i]
					                            };
					                            serie.push(item);
					                        }
					                        return serie;
					}(),
				    itemStyle: {
				        normal: {
				            color: '#00FFFF'
				        }
				    }
				},
	            {
	                name:'同比',
	                type:'line',
					yAxisIndex:0,
	                //data:[23.0, 24.9, 17.0, 25.2, 23.6, 16.7, 25.6, 22.2, 22.6, 20.0, 26.4, 23.3],
	                data: function () {
	                                        var serie = [];
	                                        for (var i = 0; i < tbnum.length; i++) {
	                                            var item = {
	                                                //name: reflectname[i],
	                                                value: tbnum[i]
	                                            };
	                                            serie.push(item);
	                                        }
	                                        return serie;
	                }(),
					itemStyle: {
	                    normal: {
	                        color: '#FF0000'
	                    }
	                },
	                // markPoint : {
	                //     data : [
	                //         {type : 'max', name: '最大值'},
	                //         {type : 'min', name: '最小值'}
	                //     ]
	                // },
	                // markLine : {
	                //     data : [
	                //         {type : 'average', name: '平均值'}
	                //     ]
	                // }
	            },
	            {
	                name:'环比',
	                type:'line',
					yAxisIndex:0,
	                //data:[23.4, 34.9, 27.0, 21.2, 33.6, 19.7, 15.6, 22.2, 24.6, 21.0, 16.4, 23.3],
	                data: function () {
	                                        var serie = [];
	                                        for (var i = 0; i < hbnum.length; i++) {
	                                            var item = {
	                                                //name: reflectname[i],
	                                                value: hbnum[i]
	                                            };
	                                            serie.push(item);
	                                        }
	                                        return serie;
	                }(),
					itemStyle: {
	                    normal: {
	                        color: '#FFA8FF'
	                    }
	                },
	      //           markPoint : {
	      //               data : [
	      //                   // {name : '最高', value : 2182.2, xAxis: 7, yAxis: 183, symbolSize:18},
	      //                   // {name : '最低', value : 782.3, xAxis: 11, yAxis: 3},
							// {type : 'max', name: '最大值'},
							// {type : 'min', name: '最小值'}
	      //               ]
	      //           },
	                // markLine : {
	                //     data : [
	                //         {type : 'average', name : '平均值'}
	                //     ]
	                // }
	            }
	        ]
	    };
	
	
	    myChart.setOption(option);
	});
	
	});
}



