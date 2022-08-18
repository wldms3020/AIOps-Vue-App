<template>
    <card header-classes="bg-transparent">
        <b-row align-v="center" slot="header">
            <b-col>
            <h6 class="text-uppercase text-muted ls-1 mb-1">Chart</h6>
            <h5 class="h3 mb-0">{{ name }}</h5>
            </b-col>
            <b-col v-if="type === 'pie'" class="text-right">
                <b-form-group style="margin-bottom: 0px;" size="sm">
                    <b-form-radio-group
                        v-model="selectedResourceType"
                        :options="options"
                        button-variant="light"
                        buttons
                        @change="changeResourceType"
                    ></b-form-radio-group>
                </b-form-group>
            </b-col>
        </b-row>
        <highcharts :options="chartOptions"></highcharts>
    </card>
</template>

<script>
import { barOptions, pieOptions } from '@/components/Charts/chart-options';
import { getMetricChartWidgetData, getLogChartWidgetData } from '@/api/index'

export default {
    name: 'ChartWidget',
    props: {
        type: {
            type: String,
            default: 'bar',
        },
    },
    computed: {
        name() {
            return this.type === 'pie' ? '최근 1개월 자원 별 메트릭' : '최근 1년 간 호스트네임 별 로그 카운트';
        },
        chartOptions() {
            return this.type === 'pie' ? this.pieOptions : this.barOptions;
        },
    },
    created() {
        this.getChartData();
    },
    data() {
      return {
        pieOptions: pieOptions,
        barOptions: barOptions,
        selectedResourceType: 'cpu',
        options: [
          { text: 'CPU', value: 'cpu' },
          { text: 'DISK', value: 'disk' },
          { text: 'MEMORY', value: 'memory' },
        ]
      };
    },
    methods: {
        getChartData() {
            if (this.type === 'pie') {
                this.getMetricChartWidgetData();
            } else {
                this.getLogChartWidgetData();
            }
        },
        getMetricChartWidgetData() {
            const self = this;
            const param = {
                resourceType: this.selectedResourceType
            };
            getMetricChartWidgetData(param).then((res) => {
                if (res.data.data) {
                    self.pieOptions.series = res.data.data.data;
                }
            })
            .catch((err) => {
                alert('에러가 발생했습니다.');
            });
        },
        getLogChartWidgetData() {
            const self = this;
            getLogChartWidgetData().then((res) => {
                if (res.data.data) {
                    self.barOptions.xAxis.categories = res.data.data.categories;
                    self.barOptions.series = res.data.data.data;
                }
            })
            .catch((err) => {
                alert('에러가 발생했습니다.');
            });
        },
        changeResourceType(val) {
            this.selectedResourceType = val;
            this.getMetricChartWidgetData();
        },
    },
};
</script>