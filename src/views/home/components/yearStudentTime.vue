<template>
    <div style="width:100%;height:100%;" id="service_request_con"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'serviceRequests',
    props: {
        chartData: Array
    },
    methods: {
        drawChart(){
            let xAxisData = [],
                seriesData = [];
            this.chartData && this.chartData.forEach(row => {
                xAxisData.push(row[0]);
                seriesData.push(row[1]);
            });

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: '{b} 共练车 {c} 小时'
                },
                grid: {
                    top: '5%',
                    left: '3%',
                    right: '8%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisData
                    }
                ],
                yAxis: {
                    name: '小时',
                },
                series: {
                    name: '练车时间总和：',
                    type: 'line',
                    data: seriesData
                },
                visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                        gt: 0,
                        lte: 20,
                        color: '#096'
                    }, {
                        gt: 20,
                        lte: 40,
                        color: '#ffde33'
                    }, {
                        gt: 40,
                        lte: 60,
                        color: '#ff9933'
                    }, {
                        gt: 60,
                        lte: 200,
                        color: '#cc0033'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                dataZoom: [{
                    startValue: xAxisData[0] ? xAxisData[0][0] : 0
                }, {
                    type: 'inside'
                }],
            };
            const serviceRequestCharts = echarts.init(document.getElementById('service_request_con'));
            serviceRequestCharts.setOption(option);

            window.addEventListener('resize', function () {
                serviceRequestCharts.resize();
            });
        }
    },
    mounted () {
        
    },
    watch: {
        chartData(nV){
            if(nV){
                this.drawChart();
            }
        }
    }
};
</script>