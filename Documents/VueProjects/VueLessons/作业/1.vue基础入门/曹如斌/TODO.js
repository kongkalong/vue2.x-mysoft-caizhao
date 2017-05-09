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
            if (this.todoNew == "") {
                alert("请输入待办！");
                return;
            }
            this.todoList.push(this.todoNew);            
            //添加后清空输入框
            this.todoNew = { text: '', completed: false, editable: false };
        },
        todoRemove: function (index) {
            //删除待办数据
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            if (this.todoList[index].editable) {
                this.todoList[index].editable = false;
            } 
            else {
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
                var arr = [];
                this.todoList.forEach(function(element) {
                    if(!element.completed){
                        //获取勾中选项
                        arr.push(element);
                    }
                }, this);
                return arr.length;
            }
        }
    }
})