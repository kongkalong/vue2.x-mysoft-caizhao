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
            var todo = {};
            todo.text = this.todoNew;
            todo.completed = false;
            todo.editable = false;
            this.todoList.push(todo);
        },
        todoRemove: function (index) {
            //删除待办数据
            this.todoList.splice(index);
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable = !this.todoList[index].editable;
            
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            return value ? "确认":"编辑";
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var c = 0;
            for(var i=0,l=this.todoList.length;i<l;i++)
            {
                if(!this.todoList[i].completed)
                {
                    c++;
                }
            }
            return c;
        }
    }
})