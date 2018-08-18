import cityData from './map-data/get-city-value.js';
export default function(){
    return {
        toDoList: [],
        count: {
            createUser: 496,
            visit: 3264,
            collection: 24389305,
            transfer: 39503498
        },
        cityData: cityData,
        showAddNewTodo: false,
        newToDoItemValue: '',
        queryOption: {
            timeRange: [],
            pageNow: 1,
            pageSize: 9999,
            query: ''
        },
        metricDataInfo: {
            todayStuNumber: 0,
            todayHourTotal: 0,
            thisWeekStuNumber: 0,
            thisWeekHourTotal: 0,
            barChartData: {},
            pieChartData: {},
            lineChartData: []
        }
    }
}