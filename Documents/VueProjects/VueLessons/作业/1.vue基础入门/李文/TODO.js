var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            if (this.todoNew == "") {
                alert("待办项不应该为空！");
                return;
            }
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            this.todoList.push({ text: this.todoNew, completed: false, editable: false })
            //添加后清空输入框
            this.todoNew = '';
        },
        todoRemove: function (index) {
            //删除待办数据
            if (confirm("是否确认删除选择的项？")) {
                this.todoList.splice(index, 1);
            }
        },
        editTodo: function (index) {
            //编辑待办数据
            var data = this.todoList[index];
            data = data ? data.editable = !data.editable : data;
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            return value ? "确认" : "编辑";
        },
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            return this.todoList.length;
        }
    }
})