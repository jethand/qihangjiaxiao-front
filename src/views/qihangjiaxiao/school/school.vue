<style lang="less">
    @import './school.less';
    @import "../../../styles/common.less";
</style>

<template>
    <div>
        <Card class="school-main-page">
            <p slot="title">驾校管理</p>
            <Alert>
                <Row>
                    <Col span="12">
                        <Button type="primary" icon="plus-round" @click="wakeCreateModelUp">添加驾校</Button>
                        <Button type="primary" icon="refresh" @click="fetchSchoolList">刷新列表</Button>
                    </Col>
                    <Col span="12" align="right">
                        <Input v-model="queryOption.query" placeholder="请输入驾校名称" @on-change="queryChange" @on-enter="fetchSchoolList" style="width: 300px"></Input>
                        <Button type="primary" icon="refresh" @click="searchSchool">搜索</Button>
                    </Col>
                </Row>
            </Alert>
            <Table class="margin-top-10" :columns="schoolColumns" :data="schoolListInfo.data" :loading="schoolListInfo.loading"></Table>
            <Page class="margin-top-10" :total="queryOption.total" :page-size="queryOption.pageSize" :current="queryOption.pageNow" @on-change="pageChange" align="right" show-total></Page>
        </Card>
        <!-- Models -->
        <Modal
            v-model="schoolModelInfo.show"
            :title="schoolModelInfo.title"
            @on-ok="createSchoolClick('confirm')"
            @on-cancel="createSchoolClick('cancel')">
            <Input v-model="schoolModelInfo.data.schoolName" placeholder="请输入驾校名称"></Input>
        </Modal>
    </div>  
</template>
<script>
import schoolData from './data';
export default {
    data(){
        return schoolData(this)
    },
    methods: {
        fetchSchoolList(){
            this.schoolListInfo.loading = true;
            this.$http.get('/v1/home/school/list?pageNow='+ this.queryOption.pageNow + '&pageSize=' + this.queryOption.pageSize + '&query=' + encodeURI(encodeURI(this.queryOption.query))).then(res => {
                if(res.data.errno === 0){
                    this.schoolListInfo.loading = false;
                    this.schoolListInfo.data = res.data.data.data;
                    this.queryOption.total = res.data.data.count;
                }
            });
        },
        searchSchool(){
            this.queryOption.pageNow = 1;
            this.fetchSchoolList();
        },
        deleteSchool(schoolID){
            this.$http.delete('/v1/home/school/' + schoolID).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('删除驾校名称成功');
                    this.fetchSchoolList();
                }
            });
        },
        queryChange(){
            if(!this.queryOption.query){
                this.queryOption.pageNow = 1;
                this.fetchSchoolList();
            }
        },
        pageChange(pageNow){
            this.queryOption.pageNow = pageNow;
            this.fetchSchoolList();
        },
        wakeCreateModelUp(){
            this.schoolModelInfo.state = 'create';
            this.schoolModelInfo.title = '新增驾校';
            this.schoolModelInfo.show = !this.schoolModelInfo.show;
        },
        createSchoolClick(type){
            let params = {
                schoolName: this.schoolModelInfo.data.schoolName
            };
            let typeMap = new Map();
            typeMap.set('confirm', () => { this.schoolModelInfo.state === 'create' ? this.createSchool(params) : this.updateSchool(params.schoolName, this.activeItem.id)});
            typeMap.set('cancel', () => {});
            typeMap.get(type)();
            this.schoolModelInfo.data.schoolName = '';
        },
        createSchool(params){
            this.$http.post('/v1/home/school/create', params).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('新增驾校名称成功');
                    this.fetchSchoolList();
                }
            });
        },
        updateSchool(schoolName, schoolID){
            this.$http.put('/v1/home/school/' + schoolID, {
                schoolName
            }).then(res => {
                if(res.data.errno === 0){
                    this.$Message.success('更新驾校名称成功');
                    this.fetchSchoolList();
                }
            });
        }
    },
    beforeMount(){
        this.fetchSchoolList();
    }
}
</script>

