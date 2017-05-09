//注册 全局组件list
Vue.component('todo-list', {
    props: ['todolist'],
    template: '\
        <ul>\
            <li v-for=\"(todo,index) in todolist\">\
                <input type=\"checkbox\" id=\"\'todo\'+index\" :key=\"index\" v-model=\"todo.completed\">\
                <input type=\"text\" v-if=\"todo.editable\" v-model=\"todo.text\">\
                <label v-else for=\"\'todo\'+index\" :class=\"{completed:todo.completed}\">{{ todo.text }}</label>\
                <button @click=\"doedit(index)\">{{ todo.editable | editShow}}</button>\
                <button @click=\"doremove(index)\" :disabled="todo.editable">删除</button>\
            </li>\
        </ul>\
    ',
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            return value ? "确认" : "编辑";
        }
    },
    methods: {
        doremove: function (index) {
            //删除待办数据
            this.$emit('doremove', index);
        },
        doedit: function (index) {
            //编辑待办数据
            this.$emit('doedit', index);
        }
    }
});

//注册全局组件 desc
Vue.component('div-desc', {
    template: '<div>\
                <ul>\
                <li>说明： </li>\
                <li>1，点击“添加”会向下方列表追加一条待办事项，默认状态为“待办”、名称为输入的名称、未编辑;</li>\
                <li>2，点击行内“编辑”按钮，可置为编辑状态，文本框可输入新的事项名称，checkbox不可操作，操除按钮不可操作，点击“确定”按钮完成退出编辑状态；</li>\
                <li>3，点击行内“删除”按钮，可从列表中移除一行，但是如果钩选为”已办“则不可以删除。删除成功后剩余待办条数会更新；</li>\
                <li>4，点击行首checkbox 也会更新剩余待办条数；</li>\
                </ul>\
               </div>'
})

new Vue({
    el: '#form',
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
            //删除待办数据         
            if (this.todoList[index].completed) {
                alert("不能删除已办事项！");
                return;
            }
            var flag = confirm("确定要删除第" + (index + 1) + "条待办吗？");
            if (flag) {
                this.todoList.splice(index, 1);
            }
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable = !this.todoList[index].editable;
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


