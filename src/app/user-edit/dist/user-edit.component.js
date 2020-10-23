"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEditComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserEditComponent = /** @class */ (function () {
    function UserEditComponent(formBuilder, userService, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.router = router;
        this.createForm = this.formBuilder.group({
            firstName: ['Nesto', [forms_1.Validators.required, forms_1.Validators.minLength(4)]],
            lastName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(4)]]
        });
    }
    UserEditComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(UserEditComponent.prototype, "firstName", {
        get: function () {
            return this.createForm.get("firstName");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserEditComponent.prototype, "lastName", {
        get: function () {
            return this.createForm.get("lastName");
        },
        enumerable: false,
        configurable: true
    });
    UserEditComponent.prototype.submitForm = function (credentials) {
        console.log(credentials);
        var user = {
            id: 0,
            firstName: credentials["firstName"],
            lastName: credentials["lastName"]
        };
        this.userService.editUser(user).subscribe(function (user) {
            console.log(user);
        });
        this.router.navigate(['']);
    };
    UserEditComponent = __decorate([
        core_1.Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.component.html',
            styleUrls: ['./user-edit.component.css']
        })
    ], UserEditComponent);
    return UserEditComponent;
}());
exports.UserEditComponent = UserEditComponent;
