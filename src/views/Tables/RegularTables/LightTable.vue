<template>
    <div>
    <el-table class="table-responsive table"
        header-row-class-name="thead-light"
        :data="tableData">
        <el-table-column v-for="column in columns" 
            :key="column.label"
            :prop="column.prop"
            :label="column.label"
            :formatter="column.formatter"
            :min-width="column.minWidth"
            :show-overflow-tooltip="true">
        </el-table-column>
    </el-table>

    <template v-if="!isDashboard">
        <b-card-footer class="py-4 d-flex justify-content-end">
            <base-pagination v-model="pageNum" :per-page="pageSize" :total="total" @change="clickPageNum"></base-pagination>
        </b-card-footer>
    </template>
    </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui'
import { getMetricTableData, getLogTableData } from '@/api/index'

export default {
    name: 'LightTable',
    components: {
        [Table.name]: Table,
        [TableColumn.name]: TableColumn
    },
    props: {
        type: {
            type: String,
            default: 'log',
        },
        defaultPaging: {
            type: Object,
        },
    },
    created() {
        this.getTableWidgetData();
    },
    computed: {
        columns() {
            return this.type === 'log' ? this.logColumns : this.metricColumns;
        },
        isDashboard() {
            return this.defaultPaging !== undefined ? true : false;
        },
    },
    data() {
        return {
            // 페이징
            pageNum: 1,
            pageSize: 20,
            total: 0,
            // 테이블 데이터
            tableData: [],
            // 컬럼 정의
            logColumns: [
                {
                    prop: 'id',
                    label: 'ID',
                    minWidth: '10',
                },
                {
                    prop: 'message',
                    label: 'Message',
                    minWidth: '40',
                },
                {
                    prop: 'hostname',
                    label: 'Hostname',
                    minWidth: '10',
                },
                {
                    prop: 'instanceName',
                    label: 'Instance Name',
                    minWidth: '10',
                },
                {
                    prop: 'filePath',
                    label: 'File Path',
                    minWidth: '10',
                },
                {
                    prop: 'logDate',
                    label: 'Date',
                    formatter: this.dateFormat,
                    minWidth: '10',
                },
                {
                    prop: 'program',
                    label: 'Program',
                    minWidth: '10',
                },
            ],
            metricColumns: [
                {
                    prop: 'hostname',
                    label: 'Hostname',
                    minWidth: '20',
                },
                {
                    prop: 'resourceType',
                    label: 'Resource Type',
                    minWidth: '15',
                },
                {
                    prop: 'metricType',
                    label: 'Metric Type',
                    minWidth: '15',
                },
                {
                    prop: 'datetime',
                    label: 'Date',
                    formatter: this.dateFormat,
                    minWidth: '20',
                },
                {
                    prop: 'value',
                    label: 'Value',
                    formatter: this.valueFormat,
                    minWidth: '15',
                },
                {
                    prop: 'unit',
                    label: 'unit',
                    formatter: (row, col, value) => value || '-',
                    minWidth: '15',
                },
            ],
        };
    },
    methods: {
        getTableWidgetData() {
            const params = {
                pageNum: this.isDashboard ? this.defaultPaging.pageNum : this.pageNum,
                pageSize: this.isDashboard ? this.defaultPaging.pageSize : this.pageSize,
                isExistTotal: this.isDashboard ? false : true,
            };

            if (this.type === 'metric') {
                getMetricTableData(params).then((res) => {
                    if (res.data.data) {
                        this.tableData = res.data.data.metric.content;
                        if (this.isDashboard === false) {
                            this.total = res.data.data.total;
                        }
                    } else {
                    // 
                    }
                })
                .catch((err) => {
                    alert('에러가 발생했습니다.');
                });
            } else {
                getLogTableData(params).then((res) => {
                    if (res.data.data) {
                        this.tableData = res.data.data.log.content;
                        if (this.isDashboard === false) {
                            this.total = res.data.data.total;
                        }
                    } else {
                    // 
                    }
                })
                .catch((err) => {
                    alert('에러가 발생했습니다.');
                });
            }

        },
        clickPageNum(currentPageNum) {
            this.pageNum = currentPageNum;
            this.getTableWidgetData();
        },
        dateFormat(row, column) {
            const date = row[column.property];
            return date === undefined ? '' : this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
        },
        valueFormat(row, column) {
            const value = row[column.property];
            return value === undefined ? '' : `${value} ${row.unit}`;
        },
    },
}
</script>