Vue.component('myLi', {
    props: ['m', 'index'],
    template: '<li>' +
    '<input type="checkbox" v-model="m.completed" >' +
    '<input type="text" v-if="m.editable" v-model="m.text">' +
    '<label v-else  v-bind:class="{completed:m.completed}">{{ m.text }}</label>' +
    '<button v-on:click="editTodo()">{{ m.editable | editShow}}</button>' +
    '<button v-on:click="todoRemove()" v-bind:disabled="m.editable">删除</button>' +
    '</li>',
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
    methods: {
        editTodo: function () {
            this.$emit('t-edit', this.index)
        },
        todoRemove: function () {
            this.$emit('t-remove', this.index)
        }
    }
})

var myVue = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: []
    },
    methods: {
        todoAdd: function () {
            if (this.todoNew != "") {
                //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
                //添加后清空输入框
                this.todoList.push({
                    completed: false,
                    editable: false,
                    text: this.todoNew
                });
            }
        },
        deleteData: function (index) {
            this.todoList[index].completed ? false : this.todoList.splice(index, 1);
        },
        editData: function (index) {
            this.todoList[index].editable = !this.todoList[index].editable;

        }
    },
    computed: {
        todoTotal: function () {
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
});


      
