
import moment from 'moment'
const preparePreviewData = (vm) => {
    return Object.assign({}, vm.previewModelInfo,{
        machineType: vm.printFormInfo.machineName,
        schoolName: vm.printFormInfo.schoolName,
        ticketNumber: vm.printFormInfo.ticketNumber,
        operater: vm.$store.state.app.userInfo.user_name,
        hoursTotal: vm.hoursTotal,
        date: moment().format("YYYY-MM-DD hh:mm:ss"),
    });
};

const realTimeCalculateCenter = vm => {
    let studentNamesStr = vm.userInfoData.reduce((current, nextRow) => {
        current.studentName = current.studentName + nextRow.studentName + '；'
        return current
    }, {studentName: ''});
    let hoursTotal = vm.userInfoData.reduce((current, nextRow) => {
        current.hourNum = current.hourNum + nextRow.hourNum
        return current
    }, {hourNum: 0});
    return {studentNamesStr: studentNamesStr.studentName, hoursTotal: hoursTotal.hourNum}
};

export {    
    preparePreviewData, 
    realTimeCalculateCenter
}