<template>
<div class="dashboard">
    <a-row gutter="16">
    <a-col span="12">
        <a-card>
        <div ref="pieChart" style="width: 100%; height: 400px;"></div>
        </a-card>
    </a-col>
    <a-col span="12">
        <a-card>
        <div ref="lineChart" style="width: 100%; height: 400px;"></div>
        </a-card>
    </a-col>
    </a-row>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const pieChart = ref(null);
const lineChart = ref(null);

onMounted(() => {
const pieChartInstance = echarts.init(pieChart.value);
const lineChartInstance = echarts.init(lineChart.value);

const pieOption = {
    title: {
    text: '教室使用情况',
    left: 'center'
    },
    tooltip: {
    trigger: 'item'
    },
    legend: {
    orient: 'vertical',
    left: 'left'
    },
    series: [
    {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: [
        { value: 1048, name: '已使用教室' },
        { value: 735, name: '未安排课程教室' },
        { value: 580, name: '废弃教室' },
        { value: 484, name: '装修教室' },
        { value: 300, name: '实验室' }
        ],
        emphasis: {
        itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
        }
    }
    ]
};

const lineOption = {
    title: {
    text: '课程量',
    left: 'center'
    },
    tooltip: {
    trigger: 'axis'
    },
    xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六']
    },
    yAxis: {
    type: 'value'
    },
    series: [
    {
        name: '邮件营销',
        type: 'line',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
        name: '联盟广告',
        type: 'line',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
        name: '视频广告',
        type: 'line',
        stack: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
        name: '直接访问',
        type: 'line',
        stack: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
        name: '搜索引擎',
        type: 'line',
        stack: '总量',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
    ]
};

pieChartInstance.setOption(pieOption);
lineChartInstance.setOption(lineOption);
});
</script>

<style scoped>
.dashboard {
padding: 24px;
background: #fff;
}
</style>