const app = angular.module('RolodexApp', []);

app.controller("RolodexController", ['$http', function($http){
  this.createUser = {}
  this.users = []
  this.user = {}
  const controller = this;

  this.createUser = () => {
    $http({
      method: 'POST',
      url: '/users',
      data: this.createForm
    }).then((response) => {
      this.createForm = {}
      this.users.unshift(response.data)
    }, (error) => {
      console.log(error);
    })
  }
  this.getUsers = () => {
    $http({
      method: 'GET',
      url: '/users'
    }).then(response => {
      this.users = response.data
    }, error => {
      console.log(error);
    })
  }
  this.getUsers()
}])
