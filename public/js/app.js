const app = angular.module("RolodexApp", []);

app.controller("RolodexController", [
  "$http",
  "$location",
  "$anchorScroll",
  function ($http, $location, $anchorScroll) {
    this.createUser = {};
    this.users = [];
    this.user = {};

    this.showLoginForm = false;
    this.showSignupForm = false;

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
          this.loggedInUser = response.data;
          this.showSignupForm = false;
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
          this.showLoginForm = false;
        } else {
          this.loginUsername = null;
          this.loginPassword = null;
        }
      });
    };

    //UPDATE
    //=========
    this.editUser = (id) => {
      console.log(this.updateForm);
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

    //scroll test
    this.goToUsers = () => {
      console.log("helloe");
      // set the location.hash to the id of
      // the element you wish to scroll to.
      $location.hash("users");

      // call $anchorScroll()
      $anchorScroll();
    };
  },
]); ////
