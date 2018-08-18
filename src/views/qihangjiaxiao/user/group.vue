<style lang="less">
    @import '../../../styles/common.less';
    @import './group.less';
</style>

<template>
    <div class="user-group-page">
        <Card>
            <p slot="title">群组管理</p>
            <Alert>
                <Row>
                    <Col span="12">
                        <Button type="primary" icon="plus-round" @click="wakeUpGroupModel" v-if="userInfo.user_name === 'admin'">添加群组</Button>
                        <Button type="primary" icon="refresh" @click="fetchGroupList">刷新列表</Button>
                    </Col>
                    <Col span="12" align="right">
                        <Input v-model="queryOption.query" placeholder="请输入群组名称" @on-change="queryChange" @on-enter="searchGroup" style="width: 300px"></Input>
                        <Button type="primary" icon="refresh" @click="searchGroup">搜索</Button>
                    </Col>
                </Row>
            </Alert>
            <Table class="margin-top-10" :columns="groupListColumns" :data="groupListInfo.data" :loading="groupListInfo.loading"></Table>
            <Page class="margin-top-10"  :total="queryOption.total" :page-size="queryOption.pageSize" show-total align="right"></Page>
        </Card>
        <!-- Models -->
        <Modal
            v-model="groupModelInfo.show"
            :title="groupModelInfo.title"
            @on-ok="createUserClick('confirm')"
            @on-cancel="createUserClick('cancel')">
            <Form :model="groupModelInfo.data" :label-width="120">
                <FormItem label="群组名称：">
                    <Input v-model="groupModelInfo.data.groupName" placeholder="请输入群组名称"></Input>
                </FormItem>
                <FormItem label="群组描述：">
                    <Input v-model="groupModelInfo.data.comment" placeholder="请输入群组描述"  ></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import data from './groupData'
export default {
    data(){
        return data.bind(this)()
    },
    methods: {
        wakeUpGroupModel(){
            this.groupModelInfo.data = {
                groupName: '',
                comment: ''
            };
            this.groupModelInfo.state = 'create';
            this.groupModelInfo.title = '添加群组';
            this.groupModelInfo.show = !this.groupModelInfo.show;
        },
        fetchGroupList(){
            this.groupListInfo.loading = !this.groupListInfo.loading;
            this.$http.get('/v1/user/group/list', {
                params: {
                    pageSize: this.queryOption.pageSize,
                    pageNow: this.queryOption.pageNow,
                    query: this.queryOption.query
                }
            }).then(res => {
                if(res.data.errno === 0){
                    this.groupListInfo.loading = !this.groupListInfo.loading;
                    this.groupListInfo.data = res.data.data.data;
                    this.groupListInfo.total = res.data.data.count;
                }
            });
        },
        searchGroup(){
            this.fetchGroupList();
        },
        queryChange(value){
            if(!this.queryOption.query){
                this.fetchGroupList();
            }
        },
        createUserClick(type){
            if(type === 'confirm'){
                if(this.groupModelInfo.state === 'create'){
                    this.$http.post('/v1/user/group/create', Object.assign({}, this.groupModelInfo.data)).then(res => {
                        if(res.data.errno === 0){
                            this.$Message.success('添加群组成功');
                            this.fetchGroupList();
                        }
                    });
                }else if(this.groupModelInfo.state === 'modify'){
                    this.$http.put('/v1/user/group/' + this.activeItem.id, this.groupModelInfo.data).then(res => {
                        if(res.data.errno === 0){
                            this.$Message.success('更新用户成功');
                            this.fetchGroupList();
                        }
                    });
                }
            }else{
                this.groupModelInfo.data.groupName = '';
                this.groupModelInfo.data.userName = '';
                this.groupModelInfo.data.password = '';
            }
        },
        deleteGroupByID(){
            this.$http.delete('/v1/user/group/' + this.activeItem.id).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('删除群组成功');
                    this.fetchGroupList();
                }
            });
        }
    },
    beforeMount(){
        this.userInfo = JSON.parse(window.localStorage.userInfo);
        if(this.userInfo.user_name !== 'admin'){
            this.groupListColumns.pop();
        }
        this.fetchGroupList();
    }
}
</script>

