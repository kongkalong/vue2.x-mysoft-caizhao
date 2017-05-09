var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: [],
        completeNum: 0
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            if (this.todoNew.trim().length == 0)
            {
                alert("请输入有效内容");
                return;
            }
            this.todoList.push({ text: this.todoNew, editable: false, completed: false });
            this.todoNew = "";
        },
        todoRemove: function (index) {
            //删除待办数据
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable = !this.todoList[index].editable;
        },
        checkbox_change: function (todo) {
            if (todo.completed) {
                this.completeNum += 1;
            } else {
                this.completeNum -= 1;
            }
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            return value ? '确认' : '编辑';
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            return this.todoList.length - this.completeNum;
        }
    }
})