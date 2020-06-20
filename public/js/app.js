const app = angular.module("RolodexApp", []);

app.controller("RolodexController", [
  "$http",
  function ($http) {
    this.createUser = {};
    this.users = [];
    this.user = {};

    this.loggedInUser = false;

    // ==================
    // ==================

    //NEW USER
    //=========
    this.createUser = () => {
      $http({
        method: "POST",
        url: "/users",
        data: this.createForm,
      }).then(
        (response) => {
          this.createForm = {};
          this.users.unshift(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    //NEW LOGIN
    //=========
    this.login = () => {
      console.log("it hit me");
      $http({
        url: "/session",
        method: "POST",
        data: {
          username: this.loginUsername,
          password: this.loginPassword,
        },
      }).then((response) => {
        if (response.data.username) {
          this.loggedInUser = response.data;
        } else {
          this.loginUsername = null;
          this.loginPassword = null;
        }
      });
    };

    //INDEX
    //=========
    this.getUsers = () => {
      $http({
        method: "GET",
        url: "/users",
      }).then(
        (response) => {
          this.users = response.data;
        },
        (error) => {
          console.log(error);
        }
      );
    };

    //=========
    this.getUsers();

    //TO KEEP THE SESSION ALIVE
    //=========
    $http({
      method: "GET",
      url: "/session",
    }).then((response) => {
      if (response.data.username) {
        this.loggedInUser = response.data;
      }
    });

    //LOG OUT
    //=========
    this.logout = () => {
      $http({
        url: "/session",
        method: "DELETE",
      }).then((response) => {
        this.loggedInUser = false;
      });
    };
  },
]); ////
