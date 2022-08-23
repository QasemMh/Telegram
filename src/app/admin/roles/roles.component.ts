import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  updateForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  roles: any[] = [];

  AddRole() {
    this.InsertRole(this.updateForm.value);
  }
  InsertRole(role: any) {
    console.log(role);
    this.spinner.show();
    this.http
      .post('https://localhost:44301/api/Role/InsertRole', role)
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.toastr.success('Success', 'Insert Role');
          this.GetAllRoles();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error('Error', 'Error');
        }
      );
  }

  @ViewChild('callInsertDiloag') callInsertDiloag!: TemplateRef<any>;
  openInsertDialog() {
    this.dialog.open(this.callInsertDiloag);
  }

  //
  GetAllRoles() {
    this.spinner.show();
    this.http.get('https://localhost:44301/api/Role/GetAllRole').subscribe(
      (result) => {
        this.spinner.hide();
        this.toastr.success('Success', 'Get All Roles');
        this.roles = result as any[];
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Error', 'Error');
      }
    );
  }
  deleteRole(roleId: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44301/api/Role/DeleteRole', { id: roleId })
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.toastr.success('Success', 'Delete Role');
          this.GetAllRoles();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error('Error', 'Error');
        }
      );
  }
  editRole(role: any) {
    this.spinner.show();
    this.http
      .post('https://localhost:44301/api/Role/UpdateRole', role)
      .subscribe(
        (result) => {
          this.spinner.hide();
          this.toastr.success('Success', 'Edit Role');
          this.GetAllRoles();
        },
        (err) => {
          this.spinner.hide();
          this.toastr.error('Error', 'Error');
        }
      );
  }

  UpdateRole() {
    this.editRole(this.prevData);
  }

  prevData: any = {};
  @ViewChild('callUpdateDiloag') callUpdateDiloag!: TemplateRef<any>;
  openUpdateDialog(id: any, name: any) {
    this.prevData = { id: id, name: name };
    this.updateForm.controls['name'].setValue(this.prevData.name);
    this.dialog.open(this.callUpdateDiloag);
  }

  @ViewChild('callDeleteDiloag') callDeleteDiloag!: TemplateRef<any>;
  openDeleteDialog(id: any) {
    const dialogRef = this.dialog.open(this.callDeleteDiloag);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) if (result == 'yes') this.deleteRole(id);
    });
  }

  searchTerm: string = '';
  searchInput(evt: any) {
    this.searchTerm = evt.target.value;
  }
  async SearchRole() {
    this.spinner.show();
    this.http.get('https://localhost:44301/api/Role/GetAllRole').subscribe(
      (result) => {
        this.spinner.hide();
        this.toastr.success('Success', 'Get All Roles');
        let data = result as any[];
        data = data.filter((role) => role.name.includes(this.searchTerm));
        this.roles = data;
      },
      (err) => {
        this.spinner.hide();
        this.toastr.error('Error', 'Error');
      }
    );
  }
  ngOnInit(): void {
    this.GetAllRoles();
  }
}
