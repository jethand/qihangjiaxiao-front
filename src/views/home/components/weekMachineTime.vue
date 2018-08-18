<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    props: {
        chartData: Object
    },
    methods: {
        drawChart(){
            let legendData = [],
                seriesData = [];
            let colors = ['rgb(45, 140, 240)', 'rgb(100, 213, 114)']
            Object.keys(this.chartData).forEach((key, index) => {
                legendData.push(key);
                seriesData.push({
                    value: this.chartData[key], 
                    name: key, 
                    itemStyle: {
                        normal: {
                            color: colors[index]
                        }
                    }
                })
            });
            this.$nextTick(() => {
                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}：<br> 时间：学员练车 {c} 小时，占比：{d}%'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: legendData
                    },
                    series: [
                        {
                            name: '科目分布情况',
                            type: 'pie',
                            radius: ['50%', '66%'],
                            /* center: ['50%', '60%'], */
                            data: seriesData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option, true);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
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
