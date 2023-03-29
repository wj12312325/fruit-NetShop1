<template>
    <div class="charts" ref="echarts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'ProgressChart',
    mounted() {
        let LineCharts = echarts.init(this.$refs.echarts)
        LineCharts.setOption({
            xAxis: {
                show: false,
                min:0,
                max:100
            },
            yAxis: {
                show: false,
                type: 'category',
            },
            series: [
                {
                    type: 'bar',
                    data: [78],
                    barWidth:10,
                    color:'yellowgreen',
                    showBackground:true,
                    backgroundStyle:{
                        color:'#eee'
                    },
                    label:{
                        show:true,
                        formatter:'|',
                        position:'right'
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
            },
            tooltip:{}
        })
    }

}
</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>