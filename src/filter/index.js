import Vue from 'vue'
Vue.filter('applyStatus', function (value) {
    switch(status){
        case 0:
            text = '待审批';
            break;
        case 1:
            text = '审批通过';
            break;
        case 2:
            text = '审批拒绝';
            break;
        default: 
            text = '未知状态';
            break;
    }
    return text
});