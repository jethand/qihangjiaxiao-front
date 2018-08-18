<style lang="less">

</style>

<template>
    <div class="permission-manager-main-page">
        <Card>
            <p slot="title">权限管理</p>
            <Tabs @on-click="tabChange">
                <TabPane label="我的申请" name="myapply">
                    <Table :columns="myApplyColumns" :data="myApplyDatas" :loading="loading"></Table>
                </TabPane>
                <TabPane label="我的审批" name="myexam">
                    <Table :columns="myExamColumns" :data="myExamDatas" :loading="loading"></Table>
                </TabPane>
                <TabPane label="审批完成" name="examdone">
                    <Table :columns="examDoneColumns" :data="examDoneDatas" :loading="loading"></Table>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>
<script>
import data from './permission-manage-data.js'
export default {
    data(){
        return data.bind(this)()
    },
    methods: {
        tabChange(tabName){
            if(tabName === 'myapply'){
                this.fetchMyApplyList();
            }else if(tabName === 'myexam'){
                this.fetchMyExamList();
            }else if(tabName === 'examdone'){
                this.fetchMyDoneList();
            }
        },
        fetchMyApplyList(){
            this.loading = true;
            this.$http.get('/v1/privilege/apply/list').then(res => {
                if(res.data.errno === 0){
                    this.loading = false;
                    this.myApplyDatas = res.data.data;
                }
            });
        },
        fetchMyExamList(){
            this.loading = true;
            this.$http.get('/v1/privilege/exam/list').then(res => {
                if(res.data.errno === 0){
                    this.loading = false;
                    this.myExamDatas = res.data.data;
                }
            });
        },
        fetchMyDoneList(){
            this.loading = true;
            this.$http.get('/v1/privilege/done/list').then(res => {
                if(res.data.errno === 0){
                    this.loading = false;
                    this.examDoneDatas = res.data.data;
                }
            });
        },
        agreeApply(){
            this.$http.put('/v1/privilege/apply/agree?applyID=' + this.activeItem.id).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('审批完成');
                    this.myExamDatas = res.data.data;
                    this.fetchMyExamList();
                }
            });
        },
        disAgreeApply(){
            this.$http.put('/v1/privilege/apply/disagree?applyID=' + this.activeItem.id).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('审批完成');
                    this.myExamDatas = res.data.data;
                    this.fetchMyExamList();
                }
            });
        }
    },
    beforeMount(){
        this.fetchMyApplyList();
    }
}
</script>

