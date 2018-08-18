export default function(vm){
    return {
        schoolColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '驾校名称',
                key: 'school_name'
            },
            {
                title: '创建时间',
                key: 'create_time'
            },
            {
                title: '操作',
                key: 'action',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {'margin-right': '8px'},
                            on: {
                                click: () => {
                                    vm.schoolModelInfo.data.schoolName = params.row.school_name;
                                    vm.schoolModelInfo.state = 'modify';
                                    vm.schoolModelInfo.show = !vm.schoolModelInfo.show;
                                    vm.schoolModelInfo.title = '修改驾校名称';
                                    vm.activeItem = params.row;
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    vm.$Modal.confirm({
                                        title: '删除确认！',
                                        content: '确定要删除名称为【 ' + params.row.school_name+ ' 】的驾校么？',
                                        onOk: () => {
                                            vm.deleteSchool(params.row.id);
                                        }
                                    });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        queryOption: {
            pageNow: 1,
            pageSize: 10,
            query: '',
            total: 0
        },
        schoolListInfo: {
            loading: false,
            data: []
        },
        schoolModelInfo: {
            show: false,
            state: 'create',
            title: '',
            data: {
                schoolName: ''
            }
        },
        activeItem: {}
    }
} 


