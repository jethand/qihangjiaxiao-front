import moment from 'moment'
export default class Home{

    fetchLogsList(){
        return new Promise(resolve => {
            this.$http.get('/v1/logs/list', {
                params: {
                    pageNow: this.queryOption.pageNow,
                    pageSize: this.queryOption.pageSize,
                    query: this.queryOption.query,
                    startTime: this.queryOption.timeRange[0],
                    endTime: this.queryOption.timeRange[1]
                }
            }).then(res => {
                if(res.data.errno === 0){
                    resolve(res.data.data);
                }
            });
        });
    }
    fetchTodoList(){
        return new Promise(resolve => {
            this.$http.get('/v1/user/todo/list').then(res => {
                if(res.data.errno === 0){
                    resolve(res.data.data);
                }
            });
        });
    }
    async fetchTodayLogs(){
        this.queryOption.timeRange = [moment().format("YYYY-MM-DD 00:00:00"), moment().format("YYYY-MM-DD 23:59:59")];
        return await this.service.fetchLogsList.bind(this)();
    }
    async fetchThisWeekLogs(){
        let thisMonday = moment().startOf('isoWeek').format("YYYY-MM-DD 00:00:00");//周一日期
        this.queryOption.timeRange = [thisMonday, moment().format("YYYY-MM-DD 23:59:59")];
        return await this.service.fetchLogsList.bind(this)();
    }
    async fetchThisYearLogs(){
        let thisYearFirstDay = moment().startOf('year').format("YYYY-MM-DD 00:00:00"),
            thisYearLastDay = moment().endOf('year').format("YYYY-MM-DD 23:59:59");
        this.queryOption.timeRange = [thisYearFirstDay, thisYearLastDay];
        return await this.service.fetchLogsList.bind(this)();
    }
}