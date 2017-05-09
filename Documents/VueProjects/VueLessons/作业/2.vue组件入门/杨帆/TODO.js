
Vue.component('my-info',{
    props: ['todototal'],
    template: '<h2>剩余待办：{{ todototal }}条</h2>'
});

Vue.component('my-add',{
    props: ['todonew'],
    template: '\
        <div class=\"todo-input\">\
            <input type=\"text\" v-model.trim=\"todotxt\">\
            <button v-on:click=\"todoinit\">添加</button>\
        </div>\
    ',
    data: function(){
        return {todotxt : this.todonew}
    },
     methods: {
        todoinit: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            var todo = {};
            todo.text = this.todotxt;
            todo.completed = false;
            todo.editable = false;
            this.todotxt = "";
            this.$emit('todoinit',todo);
        }
     }
});

Vue.component('my-grid',{
    props: ['todolist'],
    template: '\
        <ul>\
            <li v-for=\"(todo,index) in todolist\">\
                <input type=\"checkbox\" id=\"\'todo\'+index\" :key=\"index\" v-model=\"todo.completed\">\
                <input type=\"text\" v-if=\"todo.editable\" v-model=\"todo.text\">\
                <label v-else for=\"\'todo\'+index\" :class=\"{completed:todo.completed}\">{{ todo.text }}</label>\
                <button @click=\"edittodo(index)\">{{ todo.editable | editShow}}</button>\
                <button @click=\"todoremove(index)\" :disabled="todo.editable">删除</button>\
            </li>\
        </ul>\
    ',
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            return value ? "确认":"编辑";
        }
    },
    methods: {
        todoremove: function (index) {
            //删除待办数据
            this.$emit('todoremove',index);
        },
        edittodo: function (index) {
            //编辑待办数据
            this.$emit('edittodo',index);
            
        }
     }
});

new Vue({
  el: '#todo',
  data:{
      todoNew : '',
      todoList: []
  },
  methods: {
        todoAdd: function (todo) {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
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






/*



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


*/