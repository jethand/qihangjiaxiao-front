import moment from 'moment'
export default function(){
    return {
        queryOption: {
            schoolName: '',
            pageSize: 10,
            pageNow: 1,
            dateRange: [moment().format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59')],
            total: 0
        },
        loading: false,
        schoolsList: [],
        logsColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '驾校类型',
                key: 'permission_name'
            },
            {
                title: '驾校名称',
                key: 'school_name'
            },
            {
                title: '学员名称',
                key: 'student_name'
            },
            {
                title: '操作员',
                key: 'operater'
            },
            {
                title: '票号',
                key: 'ticket_number'
            },
            {
                title: '练车时间(小时)',
                key: 'hour_number'
            },
            {
                title: '创建时间',
                key: 'create_time'
            },{
                title: '操作',
                key: 'action',
                render: (h, params) => {
                    return h('div',[
                        h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    const {
                                        row: {
                                            id
                                        }
                                    } = params
                                    this.$Modal.confirm({
                                        title: '确定要删除么？',
                                        content: `删除确认编号为【${id}】的小票么？删除后不可恢复，请谨慎操作！`,
                                        onOk: () => {
                                            this.deleteLogsAction(id)
                                        }
                                    });
                                }
                            }
                        }, '删除')
                    ]

                    )
                        
                }
            }
        ],
        logsComputedData: [],
        logsCompotedColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '驾校名称',
                key: 'school_name'
            },
            {
                title: '科目二练车人数(人)',
                key: 'lsk2_number'
            },
            {
                title: '科目三练车人数(人)',
                key: 'lsk3_number'
            },
            {
                title: '科目二练车时间(小时)',
                key: 'lsk2_hours'
            },
            {
                title: '科目三练车时间(小时)',
                key: 'lsk3_hours'
            }
        ],
        logsData: [],
        logsOriginData: [],
        logsTotalColumns: [
            {
                title: '科目二练车人数总计',
                key: 'lsk2_number'
            },
            {
                title: '科目三练车人数总计',
                key: 'lsk3_number'
            },
            {
                title: '科目二练车时间总计',
                key: 'lsk2_hours'
            },
            {
                title: '科目三练车时间总计',
                key: 'lsk3_hours'
            },
            {
                title: '总人数总计',
                key: 'total_number'
            },
            {
                title: '总小时总计',
                key: 'total_hours'
            }
        ],
        logsTotaldData: []
    }
}