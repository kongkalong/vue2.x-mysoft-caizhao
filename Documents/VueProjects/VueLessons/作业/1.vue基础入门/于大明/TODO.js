
// 注册指令
Vue.directive("focus", {
    inserted: function (el) {
        el.focus();
    }
})
// 注册组件
Vue.component('my-todo', {
    template: "#todotemplate",
    props: {
        componentName: {
            type: String,
            required: true
        }
    },
    data: function () {
        return {
            todoNew: '',
            todoList: [],
            searchText: '',
            todoListAll: []
        }
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            var todo = { Checked: false, Text: this.todoNew, Editable: false };
            this.todoListAll.push(todo);
            this.todoList = this.todoListAll;
            this.$emit('add', this.todoNew)
        },
        todoRemove: function (todo) {
            //删除待办数据
            this.todoListAll.remove(todo);
            this.$emit('remove', todo.Text)
        },
        editTodo: function (todo) {
            //编辑待办数据
            todo.Editable = true;
        },
        saveTodo: function (todo) {
            todo.Editable = false;
        },
        search: function (text) {
            this.todoList = [];
            for (var i = 0; i < this.todoListAll.length; i++) {
                if (this.todoListAll[i].Text.toUpperCase().indexOf(text.toUpperCase()) != -1) {
                    this.todoList.push(this.todoListAll[i]);
                }
            }
        }
    },
    filters: {
        toUpper: function (value) {
            return value.toUpperCase();
        }
    },
    computed: {
        todoTotal: function () {
            var count = 0;
            //todo:获取剩余待办数量
            for (var i = this.todoList.length - 1; i >= 0; i--) {
                if (!this.todoList[i].Checked) {
                    count++;
                }
            }
            return count;
        }
    }
});
// 注册vue对象
var todos = new Vue({
    el: '#todo2',
    data: {
        todoComponents: [],
        componentName: "",
        optList: []
    },
    methods: {
        addComponent: function (text) {
            var component = { componentName: text };
            this.todoComponents.push(component);
        },
        addHistory: function (text) {
            this.optList.push(text);
        },
        removeHistory: function (item) {
            this.optList.remove(item);
        }
    }
});

Array.prototype.remove = function (b) {
    var a = this.indexOf(b);
    if (a >= 0) {
        this.splice(a, 1);
        return true;
    }
    return false;
};
