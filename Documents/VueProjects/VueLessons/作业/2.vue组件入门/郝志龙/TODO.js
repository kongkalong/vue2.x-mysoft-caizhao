//注册checkbox控件
Vue.component('component-input', {
	props: ['idvalue', 'completed'],
	template: ' <input type="checkbox"  key="{{idvalue}}" v-bind:checked="completed" v-on:click="doFunction" />',
	methods: {
		doFunction: function() {
			this.$emit('component-input', this._props.idvalue);
		}
	}
})

//注册列表
Vue.component('component-li', {
	props: ['textcontent', 'editable', 'index', 'icompleted'],
	template: '<div><slot name="checkboxComponent"></slot><input type="text" v-if="editable" v-on:change="doFunction($event)" v-bind:value="textcontent"><label >{{textcontent}}</label><slot name="buttonadd"></slot><slot name="buttondelete"></slot></div>',
	methods: {
		//把编辑的数据 同步到列表数据源
		doFunction: function(e) {
			this.$emit('component-li', e.target.value, this._props.index);
		}
	}
})

//定义 按钮组件
Vue.component('component-button', {
	props: ['contenttext', 'vindex', 'dofunction'],
	template: '<button v-on:click="doFunction"  >{{contenttext}}</button>',
	methods: {

		doFunction: function() {
			this.$emit('component-button', this._props.vindex);
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
		todoAdd: function() {
			//添加待办数据对象，包括text内容,completed完成状态,editable编辑状态三个属性
			//添加后清空输入框
			if(this.todoNew == "") {
				return false;
			}
			var todoEntity = { 'text': this.todoNew, 'editable': false, 'completed': true };
			this.todoList.push(todoEntity);
			this.todoNew = "";
		},
		editTodo: function(index) {
			//编辑待办数据
			this.todoList[index].editable = !this.todoList[index].editable;
		},
		checkClick: function(index) {
			this.todoList[index].completed = !this.todoList[index].completed;
		},
		setContent: function(text, index) {
			this.todoList[index].text = text;
		},
		todoRemove: function(index) {
			this.todoList.splice(index, 1);
		}
	},
	filters: {
		editShow: function(value) {
			//按键文字切换，分别是「确认」和「编辑」，编辑中时「删除」按钮的状态为disable
			if(!value) {
				return "编辑";
			}
			return "确认";
		}
	},
	computed: {
		todoTotal: function() {
			//todo:获取剩余待办数量
			return this.todoList.length;
		}

	}
})