var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            if (this.todoNew === "") {
                alert("请输入事项名称！");
                return;
            }
            var item = { text: this.todoNew, completed: false, editable: false };
            this.todoList.push(item);
            this.todoNew = '';
        },
        todoRemove: function (index) {
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据    
            var isEditable = this.todoList[index].editable;
            this.todoList[index].editable = !isEditable;
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable (追加，编辑中checkbox也不可选)
            if (value == true) {
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
                var count = 0;
                for (var i = 0; i < this.todoList.length; i++) {
                    if (!this.todoList[i].completed) {
                        count++;
                    }
                }
                return count;
            }
        }
    }
})