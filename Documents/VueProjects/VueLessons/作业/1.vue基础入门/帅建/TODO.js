var app = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList:[{
                text: '吃饭',
                completed: true,
                editable:false
            },
            {
                text: '睡觉',
                completed: false,
                editable:false
            }
        ]
    },
    computed: {
        todoTotal: {
            get: function () {    
                return this.todoList.filter(function (todo) {
                    return todo.completed==false
                }).length;
            },
            set: function (newValue) {
                //this.message = newValue;
            }
        }
    },
    filters: {
        editShow: function (value) {
            if (!value) return '编辑';
            else return '确定';
        }
    },
    methods: {
        todoAdd: function (event) {
            if(this.todoNew.trim()=='')
            {
                alert('请输入待办内容');
            }
            else
            {
                this.todoList.push({ 
                    text: this.todoNew,
                    completed: false,
                    editable:false
                });
                this.todoNew ='';
            }
        },
        todoRemove:function(index){
            this.todoList.splice(index,1);
        },
        editTodo:function(index){
            if(this.todoList[index].editable==false)
            {
                this.todoList[index].editable = true;
            }
            else if(this.todoList[index].editable==true)
            {
                this.todoList[index].editable = false;
            }                    
        }
    }
})