var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '',
        todoList: [
            {
                text:"吃饭",
                completed:false,
                editable:false

            },{
                text:"睡觉",
                completed:false ,
                editable:false
            },{
                text:"哥屋恩",
                completed:false ,
                editable:false
            }
        ]
    },
    methods: {
        todoAdd: function () {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
            if(this.todoNew==""){
                alert("数据不能为空！");
                return;
            }
           this.todoList.push({text:this.todoNew,completed:false ,editable:false});
           this.todoNew="";
        },
        todoRemove: function (index) {
            //删除待办数据
             if(this.todoList[index].completed){
                if(confirm("是否确认删除？")){
                    this.todoList.splice(index,1);
                }
            }else{
                alert("请选择一条数据！");
            }
            
        },
        editTodo: function (index) {
            //编辑待办数据
            if(this.todoList[index].completed){
                if(this.todoList[index].editable){
                this.todoList[index].editable=false;
                
                }else{
                    this.todoList[index].editable=true;
                }
            }else{
                alert("请选择一条数据！");
            }
            
           
        },
    },
    filters: {
        editShow: function (value) {
            //按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
            if(value) {
                return "确认";
            }else{
                return '编辑';
            }
            
             
        }
    },
    computed: {
        todoTotal: function () {
            //todo:获取剩余待办数量
            var scount=0;
           
            this.todoList.forEach(function(element) {
                if(!element.completed){
                    scount=scount+1;
                }
            }, this);
            return scount;
        }
    }
})