import moment from 'moment';
export default class HomeFun{
    calculateMetrics(dataList){
        let hoursTotal = 0;
        let dateHoursData = {},
            machineHoursData = {},
            monthHoursData = {};
        dataList && dataList.forEach(row => {
            hoursTotal += row.hour_number;
            let hourKey = row.create_time.split(' ')[0],
                machineKey = row.permission_name,
                monthkey = moment(row.create_time).month() +1;
            dateHoursData[hourKey] = dateHoursData[hourKey] ? dateHoursData[hourKey] += row.hour_number : row.hour_number;
            machineHoursData[machineKey] = machineHoursData[machineKey] ? machineHoursData[machineKey] += row.hour_number : row.hour_number;
            monthHoursData[monthkey] = monthHoursData[monthkey] ? monthHoursData[monthkey] += row.hour_number : row.hour_number;
        });
        return {
            stuNumber: dataList.length,
            hoursTotal,
            dateHoursData,
            machineHoursData,
            monthHoursData
        }
    }
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
    }
    fetchTimeAndHours(array){
        let backArray = [];
        return array.map(row => {
            let hour = 0;
            row.forEach(srow => {
                hour += srow.hour_number;
            });
            return [row[0].create_time, hour, row[0].permission_name];
        });
    }
}