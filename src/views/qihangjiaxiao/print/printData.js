
export default function() {
    return {
        printFormInfo: {
            machineName: '',
            schoolName: '',
            ticketNumber: 'loading...',
            operator: ''
        },
        userInfoDataTempalte: { 
            studentName: '', 
            hourNum: 0,
            sex: '男'
        },

        
        userInfoData: [],
        hoursTotal: 0,
        priviewModelShow: false,
        previewModelInfo: {},
        
        schoolsList: [],
        permissionList: []
    }
};