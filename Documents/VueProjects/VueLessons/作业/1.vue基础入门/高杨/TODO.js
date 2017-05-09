var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: [
            {
                text: '学习 JavaScript',
                completed: true,
                editable: false
            },
            {
                text: '学习 Vue',
                completed: false,
                editable: false
            }
        ]
    },
    methods: {
        todoAdd: function () {
            if (this.todoNew == '') {
                alert('请输入名称!');
                return false;
            }
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            this.todoList.push({
                text: this.todoNew,
                completed: false,
                editable: false
            });
            //添加后清空输入框
            this.todoNew = '';
        },
        todoRemove: function (index) {
            //删除待办数据
            if (this.todoList[index].completed) {               
                this.todoList.splice(index,1);
            }
            else {
               if( confirm('待办未完成，确定要删除？')){
                    this.todoList.splice(index,1);
                }                
            }
        },
        editTodo: function (index) {
            //编辑待办数据
            if (this.todoList[index].completed) {               
                alert('待办已完成，不能编辑!');
                return false;
            }
            else {
                if (this.todoList[index].editable) {
                    this.todoList[index].editable = false;
                }
                else {
                    this.todoList[index].editable = true;
                }
            }           
        }
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            if (value) {
                return '确认';
            }
            else {
                return '编辑';
            }
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var icount = 0;
            for (var index = 0; index < this.todoList.length; index++) {
                var element = this.todoList[index];
                if (!element.completed) {
                    icount++;
                }
            }
            return icount;
        }
    }
})