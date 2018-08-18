export default {
    permissionListColumns: [
        {
            title: '编号',
            key: 'id'
        },
        {
            title: '权限名称',
            key: 'permission_name'
        },
        {
            title: '审批人',
            key: 'exam_user'
        },
        {
            title: '审批时间',
            key: 'create_time'
        }
    ],
    permissionListInfo: {
        loading: false,
        data: []
    },
    permissionList: [],
    permissionModelInfo: {
        show: false,
        state: 'apply',
        title: '申请权限',
        data: {
            permissionID: '',
            reason: ''
        }
    }
}