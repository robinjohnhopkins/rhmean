import angular from 'angular';

export default class TodoController {
  awesomeTodos = [];
  newTodo = '';
  
  /*@ngInject, plus socket was a param of constructor*/
  constructor($http, $scope, Auth) {
    console.log('TodoController');
    this.$http = $http;
    this.getCurrentUser = Auth.getCurrentUserSync;

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
    // second param of get is config of which params maps tp req.query
    this.$http.get('/api/todos', {params:{name: this.getCurrentUser().name}})
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
      // second param of post maps to req.body on node server
      this.$http.post('/api/todos', {
        name: this.getCurrentUser().name,
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
