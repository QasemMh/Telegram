import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  countOfUsers: any = [{}];
  story: any = [{}];
  display_Image: any;
  Channels: any = [{}];
  Users: any = [{}];
  Groups: any = [{}];
  Testimonials: any = [{}];
  GetUserByIdDto: any = {};
  UpdateProfileUserDTO: any = {};

  constructor(private http: HttpClient) {}
  Services: any = [{}];
  GetAllSubscription: any = [{}];
  ProfitsAndLosses: any = [{}];
  CountMemberEachChannel: any = [{}];
  Service_Image: any;
  AllPost:any=[{}];


  GetAllPost() {
   return this.http.get('https://localhost:44301/api/Post/GetAllpost').subscribe((res) => {
        this.AllPost = res;
      });
  }



  // GetAllPos5t(){
  //   this.spinner.show();
  //   this.http.get('https://localhost:44301/api/Post/GetAllpost').subscribe((res)=>{
  //     this.AllPost=res;
  //      this.spinner.hide();
  //      this.toster.success('Data Retriveed !' );
  //   },err=>{
  //      this.spinner.hide();
  //       this.toster.error(err.message,err.status );
  //   }
  //   )
  // }


  UpdateService(body: any) {
    body.Image = this.Service_Image;
    this.http
      .put(
        'https://localhost:44301/api/Services/UpdateService/UpdateService',
        body
      )
      .subscribe(
        (resp) => {},
        (err) => {}
      );
    window.location.reload();
  }

  DeleteService(id: number) {
    this.http
      .delete(
        'https://localhost:44301/api/Services/DeleteService/DeleteService/' + id
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {}
      );
    window.location.reload();
  }

  EmailSenduserblockDTO: any = {};
   u_image_path: any;
  uploadAttachment(file: FormData) {
    this.http
      .post(
        'https://localhost:44301/api/Users/UploadImageUser/UploadImageUser',
        file
      )
      .subscribe(
        (resp: any) => {
          if (resp) {
            this.display_Image = resp.u_image_path; //
            console.log(resp);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  GetUserById(id: number) {
    this.http
      .get('https://localhost:44301/api/Users/GetUserById/GetUserById/' + id)
      .subscribe((res) => {
        this.GetUserByIdDto = res;
      });
  }

  GetFullUserById(id: number) {
    return this.http.get(
      'https://localhost:44301/api/Users/GetUserById/GetUserById/' + id
    );
  }


  UpdateProfileUser(body: any) {
    body.u_image_path = this.Service_Image;

    this.http
      .put(
        'https://localhost:44301/api/Users/UpdateProfileUser/UpdateProfile',
        body
      )
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }
 
  UploadImageService(file: FormData) {
    this.http
      .post(
        'https://localhost:44301/api/Services/UploadImageServices/UploadImageServices',
        file
      )
      .subscribe(
        (resp: any) => {
          if (resp) {
            this.Service_Image = resp.image;
            console.log(resp);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  CreateService(body: any) {
    //form group --> create form

    body.image = this.Service_Image;
    this.http
      .post(
        'https://localhost:44301/api/Services/CreateService/CreateService',
        body
      )
      .subscribe(
        (resp) => {
          console.log(resp);
        },
        (err) => {}
      );
    window.location.reload();
  }

  GetAllServices() {
    this.http
      .get('https://localhost:44301/api/Services/GetAllSERVICES')
      .subscribe((res) => {
        this.Services = res;
      });
  }

  GetCountMemberEachChannel() {
    return this.http
      .get('https://localhost:44301/api/Admin/CountMemberEachChannel')
      .toPromise()
      .then((res) => {
        //console.log(this.CountMemberEachChannel)
        return res;
      });
  }

  GetProfitsAndLosses() {
    this.http
      .get('https://localhost:44301/api/Subscription/ProfitsAndLosses')
      .subscribe((res) => {
        this.ProfitsAndLosses = res;
      });
  }

  GetUserSubscription() {
    this.http
      .get('https://localhost:44301/api/Subscription/GetAllSubscription')
      .subscribe((res) => {
        this.GetAllSubscription = res;
      });
  }

  GetAllTestimonial() {
    this.http
      .get('https://localhost:44301/api/Testimonial/GetAllTestimonial')
      .subscribe((res) => {
        this.Testimonials = res;
        //console.log(this.HomePage)
      });
  }

  UpdateTestimonial(body: any) {
    //body.img=this.display_Image;
    this.http
      .put('https://localhost:44301/api/HomePage/UpdateAboutUs', body)
      .subscribe(
        (resp) => {},
        (err) => {}
      );
    window.location.reload();
  }

  GetAllGroups() {
    this.http.get('https://localhost:44301/api/Groups').subscribe((res) => {
      this.Groups = res;
    });
  }

  BlockUser(id: number) {
    return this.http.post(
      'https://localhost:44301/api/Users/AdminBlock/AdminBlock/' + id,
      ''
    );
  }

  GetAllUser() {
    return this.http.get('https://localhost:44301/api/Users/GetAllUsers');
  }

  getAllBlocked() {
    return this.http.get(
      'https://localhost:44301/api/Users/GetAllUsersBlocked/AdminBlockList'
    );
  }

  GetNumberOfUsers() {
    this.http
      .get('https://localhost:44301/api/Users/NumberOfUser/NumberOfUser')
      .subscribe((res) => {
        this.countOfUsers = res;
      });
  }

  GetAllChannel() {
    this.http
      .get('https://localhost:44301/api/Channel/GetAllChannel')
      .subscribe((res) => {
        this.Channels = res;
      });
  }

  GetAllStory() {
    this.http
      .get('https://localhost:44301/api/Story/GetAllStory')
      .subscribe((res) => {
        this.story = res;
      });
  }
  UploadImageStory(file: FormData) {
    this.http
      .post('https://localhost:44301/api/Story/UploadImageStory', file)
      .subscribe(
        (resp: any) => {
          if (resp) {
            this.display_Image = resp.file_path; //
            console.log(resp);
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
  UserInfo(body: any) {
    this.http
      .post('https://localhost:44301/api/Story/UserInfo', body)
      .subscribe((res) => {
        this.story = res;
      });
  }

  EmailSenduserblock(id: number) {
    this.http
      .get(
        'https://localhost:44301/api/Users/EmailSenduserblock/blockuser/' + id
      )
      .subscribe((resp) => {
        this.EmailSenduserblockDTO = resp;
       });
  }
}

