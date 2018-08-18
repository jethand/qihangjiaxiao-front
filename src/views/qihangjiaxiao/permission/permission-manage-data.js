export default function(){
    return {
        loading: false,
        myApplyColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '申请权限名称',
                key: 'permission_name'
            },
            {
                title: '申请状态',
                key: 'status',
                render: (h, params) => {
                    return h('Tooltip', {
                        props: {
                            content: params.row.status === 0 ? '等待审批' : (params.row.status === 1 ? '审批通过' : '审批拒绝'),
                            transfer: true,
                            placement: 'top'
                        },
                    }, [
                        h('Avatar', {
                            props: {
                                size: 'small'
                            },
                            style: {
                                background: params.row.status === 0 ? '#00a2ae' : (params.row.status === 1 ? '#87d068' : '#f56a00')
                            }
                        })
                    ])
                }
            },
            {
                title: '申请原因',
                key: 'apply_reason'
            },
            {
                title: '审批人',
                key: 'exam_user'
            },
            {
                title: '申请时间',
                key: 'create_time'
            }
        ],
        myApplyDatas: [],        
        myExamColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '申请权限名称',
                key: 'permission_name'
            },
            {
                title: '申请人',
                key: 'apply_user'
            },
            {
                title: '申请原因',
                key: 'apply_reason'
            },
            {
                title: '申请时间',
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
                                    this.activeItem = params.row;
                                    this.agreeApply();
                                }
                            }
                        }, '同意'),
                        h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.activeItem = params.row;
                                    this.disAgreeApply();
                                }
                            }
                        }, '拒绝')
                    ]);
                }
            }
        ],
        myExamDatas: [],
        examDoneColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '申请权限名称',
                key: 'permission_name'
            },
            {
                title: '申请人',
                key: 'apply_user'
            },
            {
                title: '审批状态',
                key: 'status',
                render: (h, params) => {
                    return h('Tooltip', {
                        props: {
                            content: params.row.status === 1 ? '审批通过' : '审批拒绝',
                            transfer: true,
                            placement: 'top'
                        },
                    }, [
                        h('Avatar', {
                            props: {
                                size: 'small'
                            },
                            style: {
                                background: params.row.status === 1 ? '#87d068' : '#f56a00'
                            }
                        })
                    ])
                }
            },
            {
                title: '申请原因',
                key: 'apply_reason'
            },
            {
                title: '审批时间',
                key: 'create_time'
            }
        ],
        examDoneDatas: [],
        activeItem: {}
    }
}