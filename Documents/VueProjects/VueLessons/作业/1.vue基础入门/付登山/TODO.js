var todo = new Vue({
    el: '#todo',
    data: {
        message: '0',
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            if (this.todoNew == "") {
                alert("请输入待办！");
                return;
            }
            this.todoList.push({ text: this.todoNew, completed: false, editable: false });
            this.todoNew = "";

            //添加后清空输入框
        },
        todoRemove: function (index) {
            if (confirm("确定删除选择项?")) {
                //删除待办数据
                this.todoList.splice(index, 1);
            }
        },
        editTodo: function (index) {
            //编辑待办数据
            if (this.todoList[index].editable) {
                //点击提交时
                this.todoList[index].editable = false;

            } else {
                //点击编辑时
                this.todoList[index].editable = true;
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
        todoTotal: {
            get: function () {
                //todo:获取剩余待办数量
                return this.todoList.length;
            }
        }
    }
})