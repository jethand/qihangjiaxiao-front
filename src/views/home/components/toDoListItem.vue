<style lang="less">
    @import './styles/to-do-list-item.less';
</style>

<template>
    <Row class="to-do-list-item">
        <Col span="2" class="height-100">
            <Row type="flex" justify="center" align="middle" class="height-100">
                <Checkbox :disabled="item.status === 1" @on-change="handleHasDid" v-model="item.status === 1"></Checkbox>
            </Row>
        </Col>
        <Col span="22" class="height-100">
            <Row type="flex" justify="start" align="middle" class="height-100">
                <p class="to-do-list-item-text" @click="handleHasDid" :class="{hasDid: item.status === 1 ? true : false}">{{ content }}</p>
            </Row>
        </Col>
    </Row>
</template>

<script>
export default {
    name: 'toDoListItem',
    data () {
        return {
            todoitem: false
        };
    },
    props: {
        content: String,
        item: Object
    },
    methods: {
        handleHasDid () {
            if(this.item.status === 1){
                this.$Message.error("已经完成的事项不可以重置哦！");
                return 
            }
            this.$http.put('/v1/user/todo/' + this.item.id).then(res => {
                if(res.data.errno === 0){
                    this.item.status = 1;
                    this.$Message.success('状态更新成功');
                }
            });
        }
    }
};
</script>