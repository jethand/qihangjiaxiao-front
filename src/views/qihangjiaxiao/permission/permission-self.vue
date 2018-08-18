<style lang="less">

</style>

<template>
    <div class="permission-self-main-page">
        <Alert>
            <Row>
                <Col span="24">
                    <Button class="margin-left-10" type="primary" icon="plus-round" @click="wakeUpPermissionModel">申请权限</Button>
                    <Button type="primary" icon="refresh" @click="fetchUserPermissionList">刷新列表</Button>
                </Col>
            </Row>
        </Alert>
        <Card>
            <p slot="title">我的权限列表</p>
            <Table class="margin-top-10" :columns="permissionListColumns" :data="permissionListInfo.data" :loading="permissionListInfo.loading"></Table>
        </Card>
        <!-- Models -->
        <Modal
            v-model="permissionModelInfo.show"
            :title="permissionModelInfo.title"
            @on-ok="applyPermissionConfirm('confirm')"
            @on-cancel="applyPermissionConfirm('cancel')">
            <Form :model="permissionModelInfo.data" :label-width="120">
                <FormItem label="请选择权限：">
                    <Select v-model="permissionModelInfo.data.permissionID">
                        <Option v-for="item in permissionList" :value="item.id" :key="item.id">{{item.permission_name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="申请理由：" >
                    <Input v-model="permissionModelInfo.data.reason" placeholder="请输入申请理由"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import permissionSelfData from './permission-self-data'
export default {
    data(){
        return permissionSelfData
    },
    methods: {
        wakeUpPermissionModel(){
            this.permissionModelInfo.show = !this.permissionModelInfo.show;
            this.fetchAllPermissionList();
        },
        fetchUserPermissionList(){
            this.permissionListInfo.loading = true;
            this.$http.get('/v1/privilege/user/list').then(res => {
                if(res.data.errno === 0){
                    this.permissionListInfo.loading = false;
                    this.permissionListInfo.data = res.data.data;
                }
            });
        },
        fetchAllPermissionList(){
            this.$http.get('/v1/privilege/all/list').then(res => {
                if(res.data.errno === 0){
                    this.permissionList = res.data.data;
                }
            });
        },
        applyPermissionConfirm(type){
            if(type === 'confirm'){
                this.$http.post('/v1/privilege/user/apply', {
                    resourceID: this.permissionModelInfo.data.permissionID,
                    reason: this.permissionModelInfo.data.reason
                }).then(res => {
                    if(res.data.errno === 0){
                        this.$Notice.success({
                            title: '申请权限成功',
                            duration: 0,
                            name: 'privilege-apply-notice',
                            render: h => {
                                return h('span', [
                                    '请跳转到 ',
                                    h('a', {
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'permission-manager'
                                                });
                                                this.$Notice.close('privilege-apply-notice');
                                            }
                                        }
                                    },'权限管理'),
                                    ' 查看当前申请进度和审批管理员'
                                ])
                            }
                        });
                    }
                });
            }else if(type === 'cancel'){

            }
        }
    },
    beforeMount(){
        this.userInfo = JSON.parse(window.localStorage.userInfo);
        this.fetchUserPermissionList();
    }
}
</script>
