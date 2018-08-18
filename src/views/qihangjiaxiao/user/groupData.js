

export default function(){
    return {
        userInfo: {},
        queryOption: {
            pageSize: 10,
            pageNow: 1,
            query: '',
            total: 0
        },
        groupListColumns: [
            {
                title: '编号',
                key: 'id',
                render: (h, params) => {
                    return h('span', params.index + 1)
                }
            },
            {
                title: '群组名称',
                key: 'group_name'
            },
            {
                title: '群组描述',
                key: 'comment'
            },
            {
                title: '创建时间',
                key: 'create_time'
            },
            {
                title: '操作',
                key: 'action',
                render: (h, params) => {
                    return h('div',[
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {'margin-right': '8px'},
                            on: {
                                click: () => {
                                    this.groupModelInfo.data.groupName = params.row.group_name;
                                    this.groupModelInfo.data.comment = params.row.comment;
                                    this.groupModelInfo.state = 'modify';
                                    this.groupModelInfo.title = '修改群组名称';
                                    this.groupModelInfo.show = !this.groupModelInfo.show;
                                    this.activeItem = params.row;
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
                                    this.$Modal.confirm({
                                        title: '删除确认！',
                                        content: '确定要删除名称为【 ' + params.row.group_name+ ' 】的群组么？',
                                        onOk: () => {
                                            this.activeItem = params.row;
                                            this.deleteGroupByID(params.row.id);
                                        }
                                    });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
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
                                    this.userModelInfo.data.groupName = params.row.group_name;
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
        groupListInfo: {
            loading: false,
            data: []
        },
        groupModelInfo: {
            title: '',
            state: '',
            show: false,
            data: {
                groupName: '',
                comment: ''
            }
        },
        activeItem: {}
    }
}