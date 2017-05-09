var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '请填写待办事项名称',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            todo.todoList.push({ text: this.todoNew, completed: false, editable: false });
            todo.todoNew="";
        },
        todoRemove: function (index) {
            //删除待办数据
            if(!confirm("确定删除吗？"))return;
             todo.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            if (todo.todoList[index].editable) {
                //点击提交时
                todo.todoList[index].editable = false;

            } else {
                //点击编辑时
                todo.todoList[index].editable = true;
            }
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            if (value) {
                return "确认";
            } else {
                return "编辑";
            }

        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var completedList = [];
            for(var i=0;i<this.todoList.length;i++){
                if(this.todoList[i].completed == true){
                    completedList.push(this.todoList[i]);
                }
            }
            return this.todoList.length - completedList.length;
        }
    }
})