<style lang="less">
    @import './user.less';
    @import '../../../styles/common.less';
</style>

<template>
    <div class="user-main-page">
        <Alert>
            <Row>
                <Col span="12">
                    请选择用户组：
                    <Select v-model="currentGroupID" @on-change="groupNameChange" style="width:200px">
                        <Option v-for="item in groupListData" :value="item.id" :key="item.group_name">{{ item.group_name }}</Option>
                    </Select>
                    <Button class="margin-left-10" type="primary" icon="plus-round" @click="wakeUpUserModel">添加用户</Button>
                    <Button type="primary" icon="refresh" @click="fetchUserList">刷新列表</Button>
                </Col>
                <Col span="12" align="right">
                    <Input v-model="queryOption.query" placeholder="请输入群组名称" @on-change="queryChange" @on-enter="searchUser" style="width: 300px"></Input>
                    <Button type="primary" icon="refresh" @click="searchUser">搜索</Button>
                </Col>
            </Row>
        </Alert>
        <Table class="margin-top-10" :columns="userListColumns" :data="userListInfo.data" :loading="userListInfo.loading"></Table>
        <!-- Models -->
        <Modal
            v-model="userModelInfo.show"
            :title="userModelInfo.title"
            @on-ok="createUserConfirm('confirm')"
            @on-cancel="createUserConfirm('cancel')">
            <Form :model="userModelInfo.data" :label-width="120">
                <FormItem label="请选择群组名称：" v-if="userModelInfo.state === 'create' || userModelInfo.state === 'modify'">
                    <Select v-model="userModelInfo.data.groupID">
                        <Option v-for="item in groupListData" :value="item.id" :key="item.group_name">{{item.group_name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用户名称：" v-if="userModelInfo.state === 'create' || userModelInfo.state === 'modify'">
                    <Input v-model="userModelInfo.data.userName" placeholder="请输入用户名称"></Input>
                </FormItem>
                <FormItem label="用户密码：" v-if="userModelInfo.state === 'create' || userModelInfo.state === 'passwd'">
                    <Input v-model="userModelInfo.data.password" placeholder="请输入用户密码" type="password"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import data from './userData'
export default {
    data(){
        return data.bind(this)()
    },
    methods: {
        groupNameChange(groupID){
            this.currentGroupID = groupID;
            this.fetchUserList();
        },
        wakeUpUserModel(){
            this.resetUserModelData();
            this.userModelInfo.state = 'create';
            this.userModelInfo.title = '添加用户';
            this.userModelInfo.show = !this.userModelInfo.show;
        },
        fetchUserList(){
            if(!this.currentGroupID) return
            this.userListInfo.loading = true;
            this.$http.get('/v1/user/user/list/' + this.currentGroupID, {
                params: {
                    pageSize: this.queryOption.pageSize,
                    pageNow: this.queryOption.pageNow,
                    query: this.queryOption.query
                }
            }).then(res => {
                if(res.data.errno === 0){
                    this.userListInfo.loading = false;
                    this.userListInfo.data = res.data.data.data;
                    this.userListInfo.total = res.data.data.count;
                }
            });
        },
        fetchGroupList(){
            this.$http.get('/v1/user/group/list', {
                params: {
                    pageSize: 9999
                }
            }).then(res => {
                if(res.data.errno === 0){
                    this.groupListData = res.data.data.data;
                }
            });
        },
        searchUser(){
            this.fetchUserList();
        },
        queryChange(){
            if(!this.queryOption.query){
                this.fetchUserList();
            }
        },
        createUserConfirm(type){
            if(type === 'confirm'){
                let groupName = '';
                this.groupListData.forEach(row => {
                    if(row.id === this.currentGroupID){
                        groupName = row.group_name;
                    }
                });
                if(this.userModelInfo.state === 'create'){
                    this.$http.post('/v1/user/user/create', Object.assign({}, this.userModelInfo.data, {groupName})).then(res => {
                        if(res.data.errno === 0){
                            this.$Message.success('添加用户成功');
                            this.fetchUserList();
                        }
                    });
                }else if(this.userModelInfo.state === 'modify'){
                    this.$http.put('/v1/user/user/' + this.activeItem.id, Object.assign({}, this.userModelInfo.data, {groupName})).then(res => {
                        if(res.data.errno === 0){
                            this.$Message.success('更新用户成功');
                            this.fetchUserList();
                        }
                    });
                }else if(this.userModelInfo.state === 'passwd'){
                    this.$http.put('/v1/user/user/updatepasswd/' + this.activeItem.id, {
                        password: this.userModelInfo.data.password
                    }).then(res => {
                        if(res.data.errno === 0){
                            this.$Message.success('更新用户成功');
                            this.fetchUserList();
                        }
                    });
                }
            }else{
                this.resetUserModelData();
            }
        },
        resetUserModelData(){
            this.userModelInfo.data.groupID = '';
            this.userModelInfo.data.userName = '';
            this.userModelInfo.data.password = '';
        },
        deleteUser(){
            this.$http.delete('/v1/user/user/' + this.activeItem.id).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('删除用户成功');
                    this.fetchUserList();
                }
            });
        }
    },
    beforeMount(){
        this.userInfo = JSON.parse(window.localStorage.userInfo);
        if(this.userInfo.user_name !== 'admin'){
            this.userListColumns.pop();
        }
        this.fetchGroupList();
    }
}
</script>

