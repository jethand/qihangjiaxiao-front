export default class Service{
    fetchSchoolsList(){
        return new Promise(resolve => {
            this.$http.get('/v1/home/school/list', {
                params: {
                    pageSize: 9999,
                    pageNow: 1
                }
            }).then(res => {
                if(res.data.errno === 0){
                    resolve(res.data.data);
                }
            });
        });
    }
    fetchLogsList(){
        return new Promise(resolve => {
            this.$http.get('/v1/logs/list', {
                params: {
                    pageSize: -1,
                    pageNow: 1,
                    query: '',
                    startTime: this.queryOption.dateRange[0],
                    endTime: this.queryOption.dateRange[1]
                }
            }).then(res => {
                if(res.data.errno === 0){
                    resolve(res.data.data);
                }
            });
        });
    }
}