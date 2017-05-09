//注册全局组件 todo-list
Vue.component('todo-list', {
    props: ['subTodoList', 'triggerEdit'],
    template: '\
        <ul>\
            <li v-for=\"(todo,index) in subTodoList\">\
                <input type=\"checkbox\" :id=\"\'todo\'+index\" :key=\"index\" v-model=\"todo.completed\">\
                <input type=\"text\" v-if=\"todo.editable\" v-model=\"todo.text\">\
                <label v-else :for=\"\'todo\'+index\" :class=\"{completed:todo.completed}\">{{ todo.text }}</label>\
                <button @click=\"triggerEdit(index)\">{{ todo.editable | editShow}}</button>\
                <button @click=\"subTodoRemove(index)\" :disabled="todo.editable">删除</button>\
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
        subTodoRemove: function (index) {
            //删除待办数据
            this.$emit('trigger-remove', index);
        }
    }
});

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
            if (this.todoNew.trim() === "")
            {
                alert("请输入待办内容");
                return;
            }

            this.todoList.push({ text: this.todoNew.trim(), completed: false, editable: false });
            this.todoNew = "";
        },
        todoRemove: function (index) {
            //删除待办数据
            this.todoList.splice(index, 1);
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable = !this.todoList[index].editable;
        }
    },
    computed: {
        todoTotal: function () {
            //获取剩余待办数量
			return this.todoList.filter(function(data){
				return !data.completed;
			}).length;
        }
    }
})