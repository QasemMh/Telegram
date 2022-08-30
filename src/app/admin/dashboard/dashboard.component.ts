import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions,Chart,registerables } from 'chart.js';
import { AdminService } from 'src/app/services/admin.service';
// import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;

  channelName:any ;
  channelCount:any ;
  result:any ;
  chart:any=[];
  constructor(private Admin :AdminService) {
    Chart.register(...registerables);
    
   }


  ngOnInit() {
 
  this.Admin.GetCountMemberEachChannel().then((res: any)=>
  {
    this.result=res;
    console.log(this.result);

    this.channelName=this.result.map((data:any)=>data.username)
    this.channelCount=this.result.map((data:any)=>data.countMember)

    console.log(this.channelName);
    console.log(this.channelCount);

    this.chart= new Chart('canvas',
    {
      type: 'bar',
      data: {
          labels: this.channelName,
          datasets: [{
              label: '# CountMemberEachChannel',
              data: this.channelCount,

              
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
      },
     
       
    })

  })
  
  
  //console.log(this.Admin.GetCountMemberEachChannel())
  

  }
  //console.log(this.chart);

  

  
   

}
  
