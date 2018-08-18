<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="3">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size="large" />
                                    </Row>
                                </Col>
                                <Col span="6" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">{{this.$store.state.app.userInfo.user_name}}</b>
                                        </div>
                                    </Row>
                                </Col>
                                <Col span="15" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                        <Col span="16" class="padding-left-8">{{this.$store.state.app.userInfo.last_login_time}}</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                                    <to-do-list-item :content="item.title" :item="item"></to-do-list-item>
                                </div>
                                <p v-if="toDoList.length === 0">没有待办事项，创建一个吧</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="metricDataInfo.todayStuNumber"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日学员人数"
                            unit="人"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="metricDataInfo.todayHourTotal"
                            iconType="clock"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日时间总计"
                            unit="h"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="metricDataInfo.thisWeekStuNumber"
                            iconType="android-person-add"
                            color="#ffd572"
                            intro-text="本周学员人数"
                            unit="人"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="metricDataInfo.thisWeekHourTotal"
                            iconType="clock"
                            color="#f25e43"
                            intro-text="本周时间总计"
                            unit="h"
                        ></infor-card>
                    </Col>
                </Row>
                <Row :gutter="10">
                    <Col :xs="24" :sm="12" :md="12">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-map"></Icon>
                                本周学员练车时间统计
                            </p>
                            <div class="data-source-row">
                                <week-student-time :chartData="metricDataInfo.barChartData"></week-student-time>
                            </div>
                        </Card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="12">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="ios-pulse-strong"></Icon>
                                本周科目二/三学员练车时间统计
                            </p>
                            <div class="data-source-row">
                                <week-machine-time :chartData="metricDataInfo.pieChartData"></week-machine-time>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10">
            <Card :padding="0">
                <p slot="title" class="card-title">
                    <Icon type="map"></Icon>
                    全量数据分布统计
                </p>
                <div class="map-con">
                    <year-student-time :chartData="metricDataInfo.lineChartData"></year-student-time>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import homeMap from './components/map.vue';
import weekMachineTime from './components/weekMachineTime.vue';
import weekStudentTime from './components/weekStudentTime.vue';
import yearStudentTime from './components/yearStudentTime.vue';
import inforCard from './components/inforCard.vue';
import toDoListItem from './components/toDoListItem.vue';
import moment from 'moment'


import data from './homeData'
import Service from './homeService'
import Funs from './homeFns'
export default {
    name: 'home',
    components: {
        homeMap,
        weekMachineTime,
        weekStudentTime,
        yearStudentTime,
        inforCard,
        toDoListItem
    },
    data () {
        return data.bind(this)();
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.$http.post('/v1/user/todo/create', {title: this.newToDoItemValue}).then(res => {
                    if(res.data.errno === 0){
                        this.$Message.success("创建待办事项成功")
                    }
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
                this.initToDoList();
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        },
        async initTodayLogsData(){
            let todayData = await this.service.fetchTodayLogs.bind(this)();
            let {stuNumber, hoursTotal} = this.funs.calculateMetrics.bind(this)(todayData);
            this.$nextTick(() => {
                setTimeout(() => {
                    this.metricDataInfo.todayStuNumber = stuNumber;
                    this.metricDataInfo.todayHourTotal = hoursTotal;
                }, 500);
            });
            
        },
        async initThisWeekLogsData(){
            let thisWeekData = await this.service.fetchThisWeekLogs.bind(this)();
            let {stuNumber, hoursTotal, dateHoursData, machineHoursData} = this.funs.calculateMetrics.bind(this)(thisWeekData);
            this.metricDataInfo.barChartData = dateHoursData;
            this.metricDataInfo.pieChartData = machineHoursData;
            this.$nextTick(() => {
                setTimeout(() => {
                    this.metricDataInfo.thisWeekStuNumber = stuNumber;
                    this.metricDataInfo.thisWeekHourTotal = hoursTotal;
                }, 500);
            });
        },
        async initThisYearLogsData(){
            let thisYearData = await this.service.fetchThisYearLogs.bind(this)();
            let groupByTimeData = this.funs.groupBy(thisYearData, (item) => {
                return item.create_time
            });
            let chartData = this.funs.fetchTimeAndHours(groupByTimeData);
            this.metricDataInfo.lineChartData = chartData;
        },
        async initToDoList(){
            let todiList = await this.service.fetchTodoList.bind(this)();
            this.toDoList = todiList;
        }
    },
    beforeMount(){
        this.service = new Service();
        this.funs = new Funs();
        if(JSON.stringify(this.$store.state.app.userInfo) === '{}'){
            this.$store.commit('setUserInfo', JSON.parse(window.localStorage.getItem('userInfo')));
        }
        this.initTodayLogsData();
        this.initThisWeekLogsData();
        this.initThisYearLogsData();
        this.initToDoList();
        this.timer = setInterval(() => {
            this.initTodayLogsData();
            this.initThisWeekLogsData();
            this.initThisYearLogsData();
            this.initToDoList();
        }, 60 * 1000)
    },
    beforeDestroy(){
        clearInterval(this.timer);
    }
};
</script>
