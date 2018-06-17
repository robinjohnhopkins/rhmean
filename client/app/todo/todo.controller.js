import angular from 'angular';

export default class TodoController {
  awesomeTodos = [];
  newTodo = '';
  
  /*@ngInject, plus socket was a param of constructor*/
  constructor($http, $scope) {
    console.log('TodoController');
    this.$http = $http;
  
    // datepicker popup
    this.$scope=$scope;
    $scope.open = function(row, e) {
      $scope.rows[row.id]=true;
      console.log('open2' + $scope.rows[row.id]);
      console.log(JSON.stringify(e));
    };
    $scope.options = {
      minDate:new Date()
    };    
    $scope.rows = [];
  
    // ngRoute does not respect the new controller lifecycle hooks ($onInit, etc...)
    // $onInit() 
    this.getTodos();
  }

  getTodos() {
    console.log('TodoController onInit /api/todos');
    this.$http.get('/api/todos')
      .then(response => {
        console.log('TodoController /api/todos rcvd ');
        console.log(response.data);
        this.awesomeTodos = response.data;
        this.$scope.rows = [];
        for(var i = 0; i < this.awesomeTodos.length; i++) {
          this.awesomeTodos[i].dateRequiredBy = new Date(this.awesomeTodos[i].dateRequiredBy);
          this.awesomeTodos[i].id = i;
          this.$scope.rows[i]=false;
        }
        //this.socket.syncUpdates('todo', this.awesomeTodos);
      });
  }
                     
  addTodo() {
    if (this.newTodo) {
      this.$http.post('/api/todos', {
        name: 'Admin',
        info: this.newTodo,
        complete: false,
        dateRequiredBy: Date.now(),
        dateComplete: null
      }).then(() => {
        this.getTodos();
      });
      this.newTodo = '';
    }
  }

  update(todo) {
    console.log('save todo');
    if (todo) {
      console.debug(todo);
      if (todo.dateComplete ===null && todo.complete){
        // first time saved with complete true - set date
        todo.dateComplete = new Date();
      }

      var url = '/api/todos/' + todo._id;
      var returnedTodo = this.$http.put(url, {
        name: todo.name,
        info: todo.info,
        complete: todo.complete,
        dateRequiredBy: todo.dateRequiredBy,
        dateComplete: todo.dateComplete
      });
      console.debug(returnedTodo);
    }
  }
  
  deleteTodo(todo) {
    this.$http.delete(`/api/todos/${todo._id}`);
    this.getTodos();
  }
}
