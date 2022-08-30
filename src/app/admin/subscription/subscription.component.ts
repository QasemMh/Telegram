import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  constructor(public Admin :AdminService) { }

  ngOnInit(): void {
    this.Admin.GetUserSubscription();
    this.Admin.GetProfitsAndLosses();


  }
  
  
  
  
 
  download() {
   // let doc = new jsPDF();
   let DATA: any = document.getElementById('htmlData');
   html2canvas(DATA).then((canvas) => {
     let fileWidth = 208;
     let fileHeight = (canvas.height * fileWidth) / canvas.width;
     const FILEURI = canvas.toDataURL('image/png');
     let PDF = new jsPDF('p', 'mm', 'a4');
     let position = 7;
     PDF.addImage(FILEURI, 'PNG', 7, position, fileWidth, fileHeight);
     PDF.save('Telegram-Financial_Report.pdf');
   });
   
  }
  }


