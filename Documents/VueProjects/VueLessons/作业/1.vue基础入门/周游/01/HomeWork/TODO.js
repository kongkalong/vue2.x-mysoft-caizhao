
var todo = new Vue({
    el: "#todo",
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框'
			if(this.todoNew){
            this.todoList.push({
                text: this.todoNew,
                completed: false,
                editable: false
            });
			this.todoNew='';
			}else{alert('不可为空！');}
        },
        todoRemove: function (index) {
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable = this.todoList[index].editable ? false : true;

            console.log(this.todoList[index].editable);
        }
    },
    filters: {
        editShow: function (value) {
			return value?'确认':'编辑';
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var toTal = 0;
            this.todoList.forEach(function (element) {
                if (!element.completed) {
                    toTal += 1;
                }
            }, this);
            return toTal;
        }
    }
})