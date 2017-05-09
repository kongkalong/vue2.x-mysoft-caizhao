var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            var len = this.todoList.length;
            var obj = new Object();
            obj.completed = false;
            obj.text = this.todoNew;
            obj.editable = false;
            this.todoList.push(obj);
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
        },
        todoRemove: function (index) {
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            this.todoList[index].editable = !this.todoList[index].editable;
        }
    },
    filters: {
        editShow: function (value) {
            if (!value) {
                return "编辑";
            }
            return "确认";
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var i = 0;
            for (var index = 0; index < this.todoList.length; index++) {
                var obj = this.todoList[index];
                if (!obj.completed) {
                    i++;
                }
            }
            return i;
        }
    }
})