const app = angular.module("RolodexApp", []);

app.controller("RolodexController", [
  "$http",
  function ($http) {
    this.createUser = {};
    this.users = [];
    this.user = {};

    ////

    this.contact :{} 

    /////

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

    //UPDATE
    //=========
    this.editUser = (id) => {
      $http({
        method: "PUT",
        url: "/users/" + id,
        data: this.updateForm,
      }).then(
        (response) => {
          console.log(response.data);
          this.indexOfEditFormToShow = null;
          this.updateForm = {};
          // this.loggedInUser = response.data;
          this.getUsers();
        },
        (error) => {
          console.log(error);
        }
      );
    };

    //DELETE
    //=========
    this.deleteUser = (id) => {
      $http({
        method: "DELETE",
        url: "/users/" + id,
      }).then((response) => {
        this.loggedInUser = false;
        this.getUsers();
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
