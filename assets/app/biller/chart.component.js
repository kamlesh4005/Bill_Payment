import { Component, OnInit } from "@angular/core";
import { BillerService } from "./biller.service";
import { Router } from '@angular/router';
import { UserService } from "../user/user.service";
import { Chart } from 'chart.js';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import swal from 'sweetalert2';
var ChartComponent = /** @class */ (function () {
    function ChartComponent(billerService, userService, router) {
        this.billerService = billerService;
        this.userService = userService;
        this.router = router;
        this.chart = [];
    }
    ChartComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        this.chartForm = new FormGroup({
            noOfUsers: new FormControl(null, [Validators.required,
                Validators.pattern("[0-9]+")])
        });
    };
    ChartComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.userService.isAdmin()) {
            var no_1 = this.chartForm.value.noOfUsers;
            this.billerService.getAggregateDataWithBillerNames().subscribe(function (result) {
                var billerName = new Set();
                var map1 = new Map();
                console.log(result);
                result.forEach(function (element) {
                    billerName.add(element.billerName);
                    if (map1.has(element.userMailId)) {
                        var newData = { billerName: element.billerName, totalAmount: element.totalAmount };
                        var mapData1 = [];
                        //console.log(map1.get(userMailId));
                        map1.get(element.userMailId).forEach(function (arrayElement, j) {
                            var data1 = { billerName: arrayElement.billerName,
                                totalAmount: arrayElement.totalAmount };
                            mapData1[j] = data1;
                            //console.log(mapData);
                        });
                        mapData1[mapData1.length] = newData;
                        map1.set(element.userMailId, mapData1);
                        //console.log(mapData);
                    }
                    else {
                        var mapData = [];
                        var data = { billerName: element.billerName, totalAmount: element.totalAmount };
                        mapData[0] = data;
                        map1.set(element.userMailId, mapData);
                    }
                });
                _this.billerService.getAggregateData(no_1).subscribe(function (result) {
                    console.log("&&&&&");
                    console.log(result);
                    console.log(billerName);
                    console.log(map1);
                    var userName = new Set();
                    result.forEach(function (element, i) {
                        userName.add(element.userMailId);
                    });
                    console.log(userName);
                    var billerNameArray = Array.from(billerName);
                    console.log(billerNameArray);
                    var userNameArr = Array.from(userName);
                    console.log(userNameArr);
                    var r = 100;
                    var g = 200;
                    var b = 76;
                    var chartDataSets = new Array();
                    userNameArr.forEach(function (element, k) {
                        if (map1.get(element) != undefined) {
                            console.log(element);
                            var totalAmount_1 = [];
                            var j;
                            for (j = 0; j < billerNameArray.length; j++) {
                                totalAmount_1[j] = 0;
                            }
                            map1.get(element).forEach(function (arrayElement, j) {
                                var position = billerNameArray.indexOf(arrayElement.billerName);
                                if (position != -1) {
                                    totalAmount_1[position] = arrayElement.totalAmount;
                                }
                            });
                            /*var i;
                                                              for(i=0;i<element[1].length;i++){
                                                                  var position = billerNameArray.indexOf(element[1][i].billerName);
                                                                  if(position != -1){
                                                                      totalAmount[position] = element[1][i].totalAmount;
                                                                  }
                                                              }*/
                            console.log(totalAmount_1);
                            //totalAmountArr[k] = totalAmount;
                            var dataSet = {
                                data: totalAmount_1,
                                label: element,
                                borderColor: 'rgba(' + r + ',' + g + ',' + b + ', 1.0)',
                                fill: false
                            };
                            chartDataSets[k] = dataSet;
                            r = r + 10;
                            g = g + 25;
                            b = b + 40;
                        }
                    });
                    console.log('chartDataSets');
                    console.log(chartDataSets);
                    _this.chart = new Chart('canvas', {
                        type: 'line',
                        data: {
                            labels: billerNameArray,
                            datasets: chartDataSets
                        },
                        options: {
                            legend: {
                                display: true
                            }
                        }
                    });
                    console.log(_this.chart);
                }, function (error) {
                    console.log(error);
                    swal({ text: error.error.message,
                        type: "error"
                    });
                });
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        this.chartForm.reset();
    };
    ChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-chart',
                    templateUrl: './chart.component.html',
                    styles: ["\n        .billerDescription {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    ChartComponent.ctorParameters = function () { return [
        { type: BillerService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    return ChartComponent;
}());
export { ChartComponent };
