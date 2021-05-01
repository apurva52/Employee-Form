import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { MessageService } from 'primeng-lts/api';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ConfirmationService } from 'primeng-lts/api'


interface Error {
  main: string;
  userid: string;
  password: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService]

})

export class AppComponent implements OnInit {
  employeForm: FormGroup;
  totalRecords: number;
  updateemployeForm: FormGroup;
  designationoption: any[] = [];
  emplyedetails: any[] = [];
  finaldata: any[] = [];
  uniqid: number = 0;

  usersDB = [
    { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
    { userid: 'def@media.com', password: 'def123', username: 'dick' }
  ];
  submitted: boolean;

  constructor(private route: Router, private confirmationService: ConfirmationService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.designationoption = [
      { label: 'Junior Software Engineer', value: 'Junior Software Engineer' },
      { label: 'Software Engineer', value: 'Software Engineer' },
      { label: 'Senior Software Engineer', value: 'Senior Software Engineer' },
    ];
    this.getData();
    this.setForm();
  }
  setForm() {
    this.submitted = false;

    // this.feedbackForm.get('lastTime').patchValue('1 hour');
    this.employeForm = this.fb.group({
      firstname: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      lastname: [{ value: null, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      email: [null],
      paddress: [{ value: null, disabled: false }],
      emailcontrol: [{ value: null, disabled: false }, [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactnumber: [{ value: null, disabled: false }, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      alternametcontact: [{ value: null, disabled: false }, [Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      aldcontrol: false,
      uniqueid: Number,
      aladdress: [{ value: null, disabled: false }, [Validators.required]],
      designation: [{ value: null, disabled: false }, [Validators.required]],
    });



  }
  changeCheckBox(e, flag) {
    if (flag == 'update') {
      if (e.checked == true)
        this.updateemployeForm.controls['updatealaddress'].disable();
      else this.updateemployeForm.controls['updatealaddress'].enable();
    }
    if (flag == 'add') {
      if (e.checked == true)
        this.employeForm.controls['aladdress'].disable();
      else this.employeForm.controls['aladdress'].enable();
    }
  }
  onSubmit(f) {
    if (this.finaldata.length > 0)
      this.uniqid = this.finaldata[0].uniqueid + 1;
    f.uniqueid = this.uniqid;
    this.emplyedetails = this.finaldata;

    this.emplyedetails.splice(0, 0, f);
    this.emplyedetails['un']

    this.totalRecords = this.finaldata.length;
    this.storeData(JSON.stringify(this.emplyedetails));
    this.getData();

  }

  storeData(finaldata: string) {
    localStorage.clear();
    localStorage.setItem('EmployeeDetails', finaldata);
  }

  getData() {
    let data = localStorage.getItem('EmployeeDetails');
    if (data == null)
      this.finaldata = []
    else
      this.finaldata = JSON.parse(data);
  }
  deleteSelectedEmployee(id) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete this Employee?',
      accept: () => {
        this.finaldata.forEach((data, index) => {
          if (id == data.uniqueid) {
            this.finaldata.splice(index, 1);
            this.storeData(JSON.stringify(this.finaldata));
            this.getData();
          }
        });
      }
    });
  }
  showupdatevalue(rowvalue) {
    this.updateForm(rowvalue)
    if (rowvalue.aldcontrol == false)
      this.updateemployeForm.controls['updatealaddress'].enable();
  }

  updateForm(row) {

    this.updateemployeForm = this.fb.group({
      updatefirstname: [{ value: row.firstname, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      updatelastname: [{ value: row.lastname, disabled: false }, [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      updateemail: [null],
      updatepaddress: [{ value: row.paddress, disabled: false }],
      updateemailcontrol: [{ value: row.emailcontrol, disabled: false }, [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      updatecontactnumber: [{ value: row.contactnumber, disabled: false }, [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      updatealternametcontact: [{ value: row.alternametcontact, disabled: false }, [Validators.maxLength(20), Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+')]],
      updatealdcontrol: row.aldcontrol,
      uniqueid: row.uniqueid,
      updatealaddress: [{ value: row?.aladdress, disabled: row.aldcontrol }, [Validators.required]],
      updatedesignation: [{ value: row.designation, disabled: false }, [Validators.required]],
    });
  }
  updatechangeCheckBox(e) {
    if (this.updateemployeForm.invalid) {
      this.messageService.clear();
      this.messageService.add({ severity: 'warn', summary: 'Please Fill Valid Value Before Updating', detail: '' });
    }
  }

  onUpdate(f) {
    let updatedata = this.updateemployeForm.controls["finalupdatedata"] as FormArray;
    this.finaldata.forEach((data, index) => {
      if (f.uniqueid == data.uniqueid) {
        data.firstname = f.updatefirstname;
        data.lastname = f.updatelastname;
        data.contactnumber = f.updatecontactnumber;
        data.designation = f.updatedesignation;
        data.emailcontrol = f.updateemailcontrol
        data.paddress = f.updatepaddress;
        data.aldcontrol = f.updatealdcontrol
        data.aladdress = f.updatealaddress
        this.storeData(JSON.stringify(this.finaldata))
        this.getData();
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: 'Updated Successfully', detail: '' });
      }
    })

  }

}
