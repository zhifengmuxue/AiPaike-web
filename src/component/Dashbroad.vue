<template>
    <div class="dashboard">
        <a-row gutter="16">
            <a-col span="6">
                <a-card>
                    <div class="statistic">
                        <div class="statistic-title">总课程数</div>
                        <div class="statistic-value">120</div>
                    </div>
                </a-card>
            </a-col>
            <a-col span="6">
                <a-card>
                    <div class="statistic">
                        <div class="statistic-title">总学生数</div>
                        <div class="statistic-value">1500</div>
                    </div>
                </a-card>
            </a-col>
            <a-col span="6">
                <a-card>
                    <div class="statistic">
                        <div class="statistic-title">总教师数</div>
                        <div class="statistic-value">100</div>
                    </div>
                </a-card>
            </a-col>
            <a-col span="6">
                <a-card>
                    <div class="statistic">
                        <div class="statistic-title">总教室数</div>
                        <div class="statistic-value">50</div>
                    </div>
                </a-card>
            </a-col>
        </a-row>
        <a-row gutter="16" style="margin-top: 16px;">
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
                name: '软件工程专业',
                type: 'line',
                stack: '总量',
                data: [6, 3, 5, 8, 2, 0, 0]
            },
            {
                name: '人工智能专业',
                type: 'line',
                stack: '总量',
                data: [7, 8, 10, 2, 4, 2, 0]
            },
            {
                name: '计算机科学与技术专业',
                type: 'line',
                stack: '总量',
                data: [5, 2, 2, 4, 9, 3, 0]
            },
            {
                name: '网络安全专业',
                type: 'line',
                stack: '总量',
                data: [3, 2, 0, 4, 9, 3, 2]
            },
            {
                name: '应用技术专业',
                type: 'line',
                stack: '总量',
                data: [2, 2, 1, 4, 2, 0, 0]
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

.statistic {
    text-align: center;
}

.statistic-title {
    font-size: 16px;
    color: #888;
}

.statistic-value {
    font-size: 24px;
    font-weight: bold;
    margin-top: 8px;
}
</style>