var todo = new Vue({
    el: '#todo',
    data: {
            todoNew: '',
            todoList: [{
                                text: '吃饭',
                                completed:false,
                                editable:false
                            }, {
                                text: '睡觉',
                                completed:false,
                                editable:false
                            }, {
                                text: '学习',
                                completed:false,
                                editable:false                   
                            }]
                },
    methods: {
        todoAdd: function () {
            if(todo.todoNew=="")
            {
                 alert("录入不允许为空");
                 return;
            }
            todo.todoList.push({ text: todo.todoNew,completed:false,editable:false });
            todo.todoNew = "";
        },
        todoRemove: function (index) {
            //直接删除
           todo.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //alert(todo.todoList[index].editable);
            //编辑中时「删除」按钮的状态为disable
            if (todo.todoList[index].editable) {
                todo.todoList[index].editable = false;
            } else {
                todo.todoList[index].editable = true;
            }
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」
            if(value)
            {
                return "确认";                
            }
            else
            {
                return "编辑";
            }
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
              return this.todoList.length;
        }
    }
})

