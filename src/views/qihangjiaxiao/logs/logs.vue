<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="logs-main-page">
        <Card>
            <p slot="title">日志管理</p>
            <Alert>
                日志查询：
                <DatePicker type="datetimerange" placeholder="请选择起止日期" style="width: 300px"confirm v-model="queryOption.dateRange"></DatePicker>
                <Button type="primary" @click="datePickerChange">查询</Button>
            </Alert>
            <Table :columns="logsColumns" :data="logsData" :loading="loading"></Table>
            <Page class="margin-top-10" :total="queryOption.total" show-total align="right" :page-sze="queryOption.pageSize" @on-change="pageChange" show-sizer @on-page-size-change="pageSizeChange"></Page>
            <Alert class="margin-top-20">
                日志统计：
            </Alert>
            <Table :columns="logsCompotedColumns" :data="logsComputedData" :loading="loading"></Table>
            <Alert class="margin-top-20">
                数据统计：
            </Alert>
            <Table :columns="logsTotalColumns" :data="logsTotaldData" :loading="loading"></Table>
        </Card>
    </div>
</template>

<script>
import moment from 'moment'
import data from './logsData'
import service from './service'
export default {
    data(){
        return data.bind(this)()
    },
    methods: {
        async fetchSchoolsList(){
            let schoolsList = await this.service.fetchSchoolsList.bind(this)();
            this.schoolsList = schoolsList.data;
        },
        async fetchLogsList(){
            this.loading = true;
            this.logsOriginData = await this.service.fetchLogsList.bind(this)();
            this.loading = false;
            this.queryOption.total = this.logsOriginData.length;
            this.pageChange(1);
            this.realTimeCalculateCenter(this.logsOriginData);
        },
        pageChange(pageNow){
            this.loading = true;
            setTimeout(() => {
                let sliceStartIndex = (pageNow-1) * this.queryOption.pageSize,
                    sliceEndIndex = sliceStartIndex + this.queryOption.pageSize;
                this.logsData = this.logsOriginData.slice(sliceStartIndex, sliceEndIndex);
                this.loading = false;
            }, 500);
        },
        pageSizeChange(pageSize){
            this.queryOption.pageSize = pageSize;
            this.pageChange(1);
        },
        datePickerChange(){
            this.fetchLogsList();
        },
        groupBy(array, f){
            let groups = {};
            array && array.forEach(o => {
                let group = JSON.stringify( f(o) );
                groups[group] = groups[group] || [];
                groups[group].push( o );
            });
            return Object.keys(groups).map( group => {
                return groups[group];
            });
        },
        realTimeCalculateCenter(dataArr){
            let groupByDatas = this.groupBy(dataArr, item => {
                return item.school_name
            });
            let polumerData = [];
            let logsTotaldData = [];
            groupByDatas && groupByDatas.forEach((oneGroup, index) => {
                let lsk2_stu_number = 0,
                    lsk3_stu_number = 0,
                    Lsk2_hours = 0,
                    Lsk3_hours = 0;
                oneGroup.forEach(row => {
                    if(row.permission_name === 'LSK3'){
                        lsk3_stu_number += 1;
                        Lsk3_hours += row.hour_number;
                    }else if(row.permission_name === 'LSK2'){
                        lsk2_stu_number += 1;
                        Lsk2_hours += row.hour_number;
                    }
                });
                polumerData.push({
                    id: index+1,
                    school_name: oneGroup[0].school_name,
                    lsk2_number: lsk2_stu_number,
                    lsk3_number: lsk3_stu_number,
                    lsk2_hours: Lsk2_hours,
                    lsk3_hours: Lsk3_hours
                });
            });
            let [lsk2_number, lsk3_number, lsk2_hours, lsk3_hours, total_number, total_hours] = [0,0,0,0,0,0];
            polumerData.forEach(item => {
                lsk2_number += item.lsk2_number;
                lsk3_number += item.lsk3_number;
                total_number += item.lsk2_number;
                total_number += item.lsk3_number;
                lsk2_hours += item.lsk2_hours;
                lsk3_hours += item.lsk3_hours;
                total_hours += item.lsk2_hours;
                total_hours += item.lsk3_hours;
            });
            logsTotaldData.push({
                lsk2_number, lsk3_number, lsk2_hours, lsk3_hours, total_number, total_hours
            });
            this.logsTotaldData = logsTotaldData;
            this.logsComputedData = polumerData;
        }
    },
    beforeMount(){
        this.service = new service();
        this.fetchLogsList();
        this.fetchSchoolsList();
    }
}
</script>
