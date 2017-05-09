var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: {
                    text: '',
                    completed: false,
                    editable: false
                },
        todoList: [{
                    text: '吃饭',
                    completed: false,
                    editable: false
                }, {
                    text: '洗碗',
                    completed: false,
                    editable: false
                }, {
                    text: '睡觉',
                    completed: true,
                    editable: false
                }, {
                    text: '做作业',
                    completed: false,
                    editable: false
                }]
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
             if(todo.todoNew.text=="")
            {
                 alert("请录入待办数据！");
                 return;
            }
            todo.todoList.push({ text: todo.todoNew.text,completed:false,editable:false });
            todo.todoNew.text = "";
        },
        todoRemove: function (index) {
            //删除待办数据
            todo.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            if (todo.todoList[index].editable) {
                todo.todoList[index].editable = false;
            } else {
                todo.todoList[index].editable = true;
            }
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
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
        todoTotal: {
            get: function () {
                //todo:获取剩余待办数量
                var slength = 0;
                this.todoList.forEach(function(element) {
                    if(!element.completed){
                        //获取勾中选项
                        slength ++;
                    }
                }, this);

            return slength;
            }
        },
        todoTotal1: {
            get: function () {
                //todo:获取剩余待办数量
                var slength = 0;
                this.todoList.forEach(function(element) {
                        slength ++;
                }, this);

            return slength;
            }
        }
    }
})