var todo = new Vue({
    el: '#todo',
    data: {
        todoNew: '新的待办',
        todoList: []
    },
    methods: {
        todoAdd: function (event) {
            //添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
            //添加后清空输入框
			var appendText = event.target.previousSibling.value;
			var appendIndex = this.getCurrentIndex();
			this.todoList.push({text:appendText,completed:false,editable:false,index:appendIndex});
        },
        todoRemove: function (index) {
            //删除待办数据
			this.todoList.splice(index,1);
        },
        editTodo: function (index,event) {
            //编辑待办数据
			if(this.get(index).editable==false){
			   this.get(index).editable = true;	
			}else{
			   this.get(index).text = event.target.previousSibling.previousSibling.value;	
			   this.get(index).editable = false;		
			}
			
        },
		getCurrentIndex: function(){
			var currentIndex=0;
			for(var i=0;i<this.todoList.length;i++){
				if(this.todoList[i].index >= currentIndex){
					currentIndex = this.todoList[i].index;
				}
			}
			return currentIndex + 1;
		},
		get: function(key){
			for(var i=0;i<this.todoList.length;i++){
				if(this.todoList[i].index == key){
					return this.todoList[i];
				}
			}
		}
    },
    filters: {
        editShow: function (value) {
			//按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
			if (value){
			   return "确认";	
			}else{
			   return "编辑";
			}
        }
    },
    computed: {
        todoTotal: {
			get: function () {
                   return this.todoList.length;
                }
        }
    }
})