import { Component, OnInit } from "@angular/core";
import { BillerService } from "./biller.service";
import { Router} from '@angular/router';
import { UserService } from "../user/user.service";
import { Chart } from 'chart.js';
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import swal from 'sweetalert2';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styles: [`
        .billerDescription {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class ChartComponent implements OnInit{
    chartForm: FormGroup;
    chart = [];
    noOfUsers: number;
    

    

    constructor(private billerService:BillerService,private userService: UserService, private router: Router){}

    ngOnInit(){
        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }

        this.chartForm = new FormGroup({
            noOfUsers: new FormControl(null,[ Validators.required,
                Validators.pattern("[0-9]+")])
            })
     
    }

    onSubmit(){
        if(this.userService.isAdmin()){
            let no = this.chartForm.value.noOfUsers;
            
            this.billerService.getAggregateDataWithBillerNames().subscribe(
                result => {
                    let billerName=new Set<string>();
                    let map1 = new Map<string, any[]>();
                    console.log(result);
                           
                    result.forEach(function(element) {
                        billerName.add(element.billerName);
                        if(map1.has(element.userMailId)){
                            let newData = {billerName: element.billerName, totalAmount: element.totalAmount};
                            var mapData1 = [];
                            //console.log(map1.get(userMailId));
                            map1.get(element.userMailId).forEach(function(arrayElement, j){
                                let data1 = {billerName: arrayElement.billerName, 
                                    totalAmount: arrayElement.totalAmount};
                                mapData1[j] = data1;
                                //console.log(mapData);
                            })
                            mapData1[mapData1.length] = newData;
                            map1.set(element.userMailId, 
                                mapData1);
                            //console.log(mapData);
                        } else {
                            var mapData = [];
                            let data = {billerName: element.billerName, totalAmount: element.totalAmount};
                            mapData[0] = data;
                            map1.set(element.userMailId, 
                                mapData);
                        }
                        
                      });          
                      this.billerService.getAggregateData(no).subscribe(
                          result => {
                              console.log("&&&&&");
                              console.log(result);
                              console.log(billerName);
                             console.log(map1);
                             let userName =new Set<string>();
                             result.forEach(function(element, i){
                                userName.add(element.userMailId);
                             }              
                             );
                             console.log(userName);
                             let billerNameArray = Array.from(billerName);
                              console.log(billerNameArray);
                              let userNameArr = Array.from(userName);
                              console.log(userNameArr);
                              
                              let r= 100;
                              let g =  200;
                              let b = 76;
                              let chartDataSets=new Array();
                              userNameArr.forEach(function(element,k){
                                  if(map1.get(element) != undefined){
                                  console.log(element);
                                  let totalAmount=[];
                                  var j;
                                  for(j=0;j<billerNameArray.length;j++){
                                      totalAmount[j] = 0;
                                  }

                                  map1.get(element).forEach(function(arrayElement, j){
                                      var position = billerNameArray.indexOf(arrayElement.billerName);
                                      if(position != -1){
                                        totalAmount[position] = arrayElement.totalAmount;
                                      }
                                  });


                                  /*var i;
                                  for(i=0;i<element[1].length;i++){
                                      var position = billerNameArray.indexOf(element[1][i].billerName);
                                      if(position != -1){
                                          totalAmount[position] = element[1][i].totalAmount;
                                      } 
                                  }*/
                                  console.log(totalAmount);
                                  //totalAmountArr[k] = totalAmount;
                                  var dataSet =  {
                                      data: totalAmount,
                                      label: element,
                                      borderColor: 'rgba('+ r +','+ g +','+ b+', 1.0)',
                                      fill: false
                                      }
                                  chartDataSets[k]= dataSet;

                                  r = r + 10;
                                  g = g + 25;
                                  b = b + 40;
                                  }          
                              });
                              console.log('chartDataSets');
                              console.log(chartDataSets);  
                              this.chart = new Chart('canvas', {
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
                                console.log(this.chart);      
                                   
                          },
                          error =>  {
                            console.log(error);
                            swal({text:error.error.message,
                                type:"error"
                            });
                        }
                      );
                    
                }, 
                error =>  {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
            
        }
        this.chartForm.reset();
        
    }
    
}