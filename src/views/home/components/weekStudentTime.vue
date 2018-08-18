<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from 'echarts';
import moment from 'moment';
export default {
    name: 'visiteVolume',
    data () {
        return {
            chartConfig: {
                "周一": { code: 1, value: 0 },
                "周二": { code: 2, value: 0 },
                "周三": { code: 3, value: 0 },
                "周四": { code: 4, value: 0 },
                "周五": { code: 5, value: 0 },
                "周六": { code: 6, value: 0 },
                "周日": { code: 7, value: 0 },
            }
        };
    },
    props: {
        chartData: Object
    },
    methods: {
        drawBarChart(){
            let yAxisData = [],
                seriesData = [];
            Object.keys(this.chartConfig).forEach(date => {
                yAxisData.push(date);
                seriesData.push({
                    value: this.chartConfig[date].value,
                    name: date,
                    itemStyle: {
                        normal: {
                            color: '#2d8cf0'
                        }
                    }
                })
            });
            this.$nextTick(() => {
                let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: '{b}：<br>学员练车 {c} 小时'
                    },
                    grid: {
                        top: 0,
                        left: '2%',
                        right: '8%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        name: 'h(s)',
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: yAxisData,
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    tootip: {

                    },
                    series: [
                        {
                            name: '学员人数',
                            type: 'bar',
                            data: seriesData
                        }
                    ]
                };
                visiteVolume.setOption(option, true);
                window.addEventListener('resize', function () {
                    visiteVolume.resize();
                });
            });
        }
    },
    mounted () {
        this.drawBarChart();
    },
    watch: {
        chartData(nV){
            if(nV){
                const translateKey = {
                    '1': '周一',
                    '2': '周二',
                    '3': '周三',
                    '4': '周四',
                    '5': '周五',
                    '6': '周六',
                    '7': '周日',
                };
                Object.keys(this.chartData).forEach(date => {
                    let key = translateKey[moment(date).format('E')];
                    this.chartConfig[key].value = this.chartData[date];
                });
                this.drawBarChart();
            }
        }
    }
};
</script>
