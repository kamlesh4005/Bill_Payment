var User = /** @class */ (function () {
    function User(email, password, mobileNumber, firstName, lastName, role, id) {
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.id = id;
    }
    return User;
}());
export { User };
