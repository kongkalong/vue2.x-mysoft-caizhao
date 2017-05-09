var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
           if(this.todoNew==""){
               alert("请录入代办信息！")
               return ;
           }
            this.todoList.push({"text":this.todoNew,"editable":false,"completed":false});
            this.todoNew="";
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
        },
        todoRemove: function (index) {
            this.todoList.splice(index)
            //删除待办数据
        },
        editTodo: function (index) {
            this.todoList[index].editable=!this.todoList[index].editable
        }
    },
    filters: {
        editShow: function (value) {
            if(value==true){
                return "确认";
                           }else {
                return "编辑";
                           }
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            return this.todoList.length;
        }
    }
})