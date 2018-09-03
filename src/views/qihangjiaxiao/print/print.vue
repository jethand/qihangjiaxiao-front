<style lang="less">
    @import "./print.less";
    @import "../../../styles/common.less";
</style>

<template>
    <div class="print-main-page">
        <p class="print-main-page-title">鲁山县启航机动车驾驶员培训有限公司</p>
        <Alert>基础信息区</Alert>
        <Form class="print-main-page-form" :model="printFormInfo" :label-width="80" inline>
            <FormItem class="print-main-page-form-item" label="机号：">
                <Select v-model="printFormInfo.machineName">
                    <Option v-for="item in permissionList" :value="item.permission_name" :key="item.permission_name">{{ item.permission_name }}</Option>
                </Select>
            </FormItem>
            <FormItem class="print-main-page-form-item" label="驾校名称：">
                <Select v-model="printFormInfo.schoolName">
                    <Option :value="item.school_name" v-for="item in schoolsList" :key="item.school_name">{{item.school_name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="票号：">
                {{printFormInfo.ticketNumber}}
            </FormItem>
        </Form>
        <Alert>学员信息区</Alert>
        <table class="table-container margin-left-10">
            <thead>
                <tr>
                    <th>学员姓名</th>
                    <th>练车时间</th>
                    <th>学员性别</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in userInfoData" :key="index">
                    <td>
                        <Input v-model="item.studentName" placeholder="请输入学员姓名" style="width: 300px"></Input>
                    </td>
                    <td>
                        <Select v-model="item.hourNum" style="width:200px" @on-change="timesChange">
                            <Option v-for="item in PracticeTimes" :value="item.value" :key="item.value">{{ item.timeName }}</Option>
                        </Select>
                    </td>
                    <td>
                        <RadioGroup v-model="item.sex" style="width:200px">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </td>
                    <td>
                        <Button type="text" shape="circle" icon="plus-round" @click="operateUserRow('add', index)">添加</Button>
                        <Button type="text" shape="circle" icon="trash-a" v-if="index > 0" @click="operateUserRow('delete', index)">删除</Button>
                    </td>
                </tr>
                <tr>
                    <td colspan="4">学员练车总时间是：{{hoursTotal}} 小时</td>
                </tr>
            </tbody>
        </table>
        <Alert class="margin-top-20" >信息操作区</Alert>
        <Button class="margin-left-10" type="info" size="large" style="width:150px;" @click="previewPage">预览</Button>
        <!-- <Button type="success" size="large" style="width:150px;" @click="printFinally">打印</Button> -->

        <Modal
            title="打印信息预览"
            v-model="priviewModelShow"
            :styles="{top: '20px'}">
            <div id="preview-model" style="width: 200px;margin: 0 auto;border: 1px solid #ccc;padding: 10px;">
                <p style="text-align:center;">鲁山县启航机动车驾驶员培训有限公司</p>
                <p style="text-align:center;">--------------------------</p>
                <p style="font-size:12px;">机号：{{previewModelInfo.machineType}}</p>
                <p style="font-size:12px;">驾校名称：{{previewModelInfo.schoolName}}</p>
                <p style="font-size:12px;">票号：{{previewModelInfo.ticketNumber}}</p>
                <p style="font-size:12px;">操作人：{{previewModelInfo.operater}}</p>
                <p style="font-size:12px;">学员：{{previewModelInfo.students}}</p>
                <p style="font-size:12px;">练车时间：{{hoursTotal}} 小时</p>
                <p style="font-size:12px;">日期：{{previewModelInfo.date}}</p>
                <p style="text-align:center;">--------------------------</p>
                <p style="font-size:12px;text-align:center;">如需发票请凭此小票在3日内到启航驾校换取发票</p>
                <p style="font-size:12px;text-align:center;">最终解释权归启航驾校所有</p>
                <p style="text-align:center;">--------------------------</p>
            </div>
            <div slot="footer">
                <Button type="primary" @click="printFinally">打印</Button>
                <Button type="default" @click="cancelPrint">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import {MachineTypes,  DriverSchoolNames, PracticeTimes} from '@/config/config';
import {preparePreviewData, realTimeCalculateCenter} from './printFn';
import Data from './printData';
export default {
    data(){
        return Data.call(this)
    },
    methods: {
        operateUserRow(type, index){
            if(type === 'add'){
                this.userInfoData.splice(index+1, 0, JSON.parse(JSON.stringify(this.userInfoDataTempalte)));
            }else{
                this.userInfoData.splice(index, 1);
            }
            this.hoursTotal = realTimeCalculateCenter(this).hoursTotal;
        },
        timesChange(){
            this.hoursTotal = realTimeCalculateCenter(this).hoursTotal;
        },
        checkForm(){
            let resultInfo = {
                success: true,
                errMsg: 'success'
            };
            if(!this.printFormInfo.schoolName || !this.printFormInfo.machineName){
                return {
                    success: false,
                    errMsg: '学校名称或者机号不能为空！！！'
                }
            }
            this.userInfoData.forEach((row, index) => {
                if(row.hourNum === 0 || !row.studentName){
                    resultInfo = {
                        success: false,
                        errMsg: `第${index+1}列的学员姓名和练车时间不能为空！`
                    }
                }
            });
            return resultInfo
        },
        previewPage(){
            let result = this.checkForm();
            if(!result.success){
                this.$Message.error({
                    content: result.errMsg,
                    duration: 5
                });
                return
            }
            this.previewModelInfo.students = realTimeCalculateCenter(this).studentNamesStr;
            this.previewModelInfo = preparePreviewData(this);
            this.priviewModelShow = !this.priviewModelShow; 
        },
        printFinally(){
            let result = this.checkForm();
            if(!result.success){
                this.$Message.error({
                    content: result.errMsg,
                    duration: 5
                });
                return
            }
            let finalPrintData = this.fetchDataArray();
            this.iframePrint();
            this.printHttpRequest(finalPrintData);
            this.printFormInfo.schoolName = '';
            this.userInfoData = [JSON.parse(JSON.stringify(this.userInfoDataTempalte))];
            this.priviewModelShow = false;
        },  
        iframePrint(){
            try{
                let el = document.getElementById("preview-model");
                let iframe = document.createElement('IFRAME');
                let doc = null;
                iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-10px;top:-10px;');
                document.body.appendChild(iframe);
                doc = iframe.contentWindow.document;
                doc.write('<div>' + el.innerHTML + '</div>');
                doc.close();
                iframe.contentWindow.focus();
                iframe.contentWindow.print();
                setTimeout(() => {
                    document.body.removeChild(iframe);
                },300);
            }
            catch(err){
                this.$Message.error("打印发生错误！！");
            }
        },
        fetchDataArray(){
            return this.userInfoData && this.userInfoData.map(stuInfo => {
                let machineInfo = this.permissionList.filter(row => {
                    return row.permission_name === this.printFormInfo.machineName
                });
                return Object.assign({}, {
                    machineType: machineInfo[0].permission_id,
                    operater: this.previewModelInfo.operater,
                    schoolName: this.previewModelInfo.schoolName,
                    ticketNumber: this.previewModelInfo.ticketNumber
                }, stuInfo);
            });
        },
        printHttpRequest(params){
            this.$http.post('/v1/print/print', {params}).then(res => {
                if(res.data.errno === 0){
                    this.fetchTickerNumbers();
                    this.hoursTotal = 0;
                    this.$Message.success("打印成功！");
                }else{
                    this.$Notice.error({
                        title: '警告消息提示',
                        desc: '打印的信息有误，请查询日志核对数据',
                        duration: 0
                    });
                }
            });
        },
        cancelPrint(){
            this.priviewModelShow = false;
        },
        fetchSchoolsList(){
            this.$http.get('/v1/home/school/list?pageSize=9999&pageNow=1').then(res => {
                if(res.data.errno === 0){
                    this.schoolsList = res.data.data.data;
                }
            });
        },
        fetchUserPermissionList(){
            this.$http.get('/v1/privilege/user/list').then(res => {
                if(res.data.errno === 0){
                    if(res.data.data.length === 0){
                        this.$Notice.error({
                            title: '对不起！您没有操作权限',
                            duration: 0,
                            name: 'none-print-notice',
                            render: h => {
                                return h('span', [
                                    '若需要打印权限，请到 ',
                                    h('a', {
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: 'permission-self'
                                                });
                                                this.$Notice.close('none-print-notice');
                                            }
                                        }
                                    },'我的权限'),
                                    ' 进行权限申请'
                                ])
                            }
                        });
                    }
                    this.permissionList = res.data.data;
                }
            });
        },
        fetchTickerNumbers(){
            this.$http.get('/v1/print/print/ticketnumber').then(res => {
                if(res.data.errno === 0){
                    this.printFormInfo.ticketNumber = res.data.data +1;
                }
            });
        }
    },
    beforeMount(){
        if(JSON.stringify(this.$store.state.app.userInfo) === '{}'){
            this.$store.commit('setUserInfo', JSON.parse(window.localStorage.getItem("userInfo")));
        }
        this.PracticeTimes = PracticeTimes;
        this.userInfoData = [...this.userInfoData, JSON.parse(JSON.stringify(this.userInfoDataTempalte))];
        this.fetchTickerNumbers();
        this.fetchSchoolsList();
        this.fetchUserPermissionList();
    }
}
</script>

