import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  CreateContact: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    subject: new FormControl(),
    message: new FormControl(),
  });
  constructor(
    public home: HomeService,
    private http: HttpClient,
    public router: Router
  ) {}

  AddScript(url: string) {
    let script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.setAttribute('defer', '');
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  ngOnInit(): void {
    // this.AddScript('assets/vendor/aos/aos.js');
    // this.AddScript('assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    // this.AddScript('assets/vendor/glightbox/js/glightbox.min.js');
    // this.AddScript('assets/vendor/swiper/swiper-bundle.min.js');
    // this.AddScript('assets/vendor/php-email-form/validate.js');
    // this.AddScript('assets/js/home-main.js');

    /*
    <script src="assets/vendor/aos/aos.js"></script>
    <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
    <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
    <script src="assets/vendor/php-email-form/validate.js"></script>

    <!-- Template Main JS File -->
    <script src="assets/js/home-main.js"></script>
    */
    this.home.getHomeInfo();
    this.home.getAboutUsInfo();
    console.log(this.home.HomePage.address);
  }
  uploadImage(file: any) {
    if (file.length == 0) return;
    let fileToUpload = <File>file[0]; //
    const formDate = new FormData(); //object
    formDate.append('file', fileToUpload, fileToUpload.name);
    this.home.uploadAttachment(formDate);
  }

  CreateContactUs() {
    this.home.createContact(this.CreateContact.value);
  }
}

// {
//   "id": 1,
//   "name": "Telegram",
//   "logo": "Logo",
//   "img": "Img",
//   "email": "telegram@gmail.com",
//   "phone": "07716482",
//   "address": "Jordan-Irbid"
// }
