Vue.component('todoItem',{
    props:['todo','index'],
    template:`<li>\
                <input type="checkbox" :id="\'todo\'+index" :key="index" v-model="todo.completed">
                <input type="text" v-if="todo.editable" v-model="todo.text">
                <label v-else :for="\'todo\'+index" :class="{completed:todo.completed}">{{ todo.text }}</label>
                <button @click="edit(index)">{{ show }}</button>
                <button @click="remove(index)" :disabled="todo.editable">删除</button>
             </li>`,
    methods:{
        remove:function(index){
            this.$emit('remove',index);
        },
        edit:function(index){
            this.$emit('edit',index);
            console.log(this.todo.editable);
            this.show=this.todo.editable?'确认':'编辑';
        }
    },
    data:function(){
        return {
            show:'编辑'
        }
    }
})

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
            if(this.todoNew==='') return;
            var todo={
                text:this.todoNew,
                completed:false,
                editable:false,
            };
            this.todoList.push(todo);
            this.todoNew='';
        },
        todoRemove: function (index) {
            //删除待办数据
            this.todoList.splice(index,1);
        },
        editTodo: function (index) {
            //编辑待办数据
            this.todoList[index].editable=!this.todoList[index].editable;
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            return this.todoList.filter(x=>!x.completed).length;
        }
    }
})