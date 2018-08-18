export default function(){
    return {
        userInfo: {},
        queryOption: {
            pageSize: 10,
            pageNow: 1,
            query: '',
            total: 0
        },
        userListColumns: [
            {
                title: '编号',
                key: 'id'
            },
            {
                title: '用户名称',
                key: 'user_name'
            },
            {
                title: '群组名称',
                key: 'group_name'
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
                                    this.userModelInfo.show = !this.userModelInfo.show;
                                    this.userModelInfo.title = '编辑用户';
                                    this.userModelInfo.state = 'modify';
                                    this.userModelInfo.data.groupID = params.row.group_id;
                                    this.userModelInfo.data.userName = params.row.user_name;
                                    this.activeItem = params.row;
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {'margin-right': '8px'},
                            on: {
                                click: () => {
                                    this.userModelInfo.show = !this.userModelInfo.show;
                                    this.userModelInfo.title = '重置密码';
                                    this.userModelInfo.state = 'passwd';
                                    this.activeItem = params.row;
                                }
                            }
                        }, '密码重置'),
                        h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.$Modal.confirm({
                                        title: '删除确认！',
                                        content: '确定要删除名称为【 ' + params.row.user_name+ ' 】的用户？',
                                        onOk: () => {
                                            this.activeItem = params.row;
                                            this.deleteUser();
                                        }
                                    });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        userListInfo: {
            loading: false,
            data: []
        },
        groupListData: [],
        currentGroupID: '',
        userModelInfo: {
            title: '',
            state: 'create',
            show: false,
            data: {
                groupID: '',
                userName: '',
                password: ''
            }
        },
        activeItem: {}
    }
}