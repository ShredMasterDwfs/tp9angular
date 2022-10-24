import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  listEmployees: any[] = [];
  action = 'add';
  form: FormGroup;
  id: number | undefined;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private _employeeService: EmployeeService) { 
    this.form = this.fb.group({
      id  : [''],
      firstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(1)]]
    })
  }

  ngOnInit(): void {
    this.getListOfEmployees();
  }

  getListOfEmployees(){
    this._employeeService.getEmployeesList().subscribe(data => {
      this.listEmployees = data;
    }, error => {
      this.toastr.error('Ops! An error has ocurred :(' ,'Employees Data');
    })
  }

  addOrUpdateEmployee(){
    const employee: any = {
      EmployeeId: this.id,
      FirstName: this.form.get('firstName')?.value,
      LastName: this.form.get('lastName')?.value
    }

    if (this.id == undefined){
        this._employeeService.addAnEmployee(employee).subscribe(data => {
        this.toastr.success('Employee added successfully!', 'Add Employee');
        this.getListOfEmployees();
        this.form.reset();      
      }, error => {
        this.toastr.error('Ops! An error has ocurred :(' ,'Add Employee');
      })
    } else {
        employee.EmployeeId = this.id;
        this._employeeService.updateAnEmployee(this.id, employee).subscribe(data => {
        this.form.reset();
        this.action = 'add';
        this.id = undefined;
        this.toastr.info('Employee updated successfully!', 'Update Employee');
        this.getListOfEmployees();
      }, error => {
        this.toastr.error('Ops! An error has ocurred :(' ,'Update Employee')
      })
    }
  }

  deleteEmployee(id: number){

    var result = confirm("Are you sure you want to delete this employee?");
      if (result == true) {
        this._employeeService.deleteAnEmployee(id).subscribe(data => {
          this.toastr.error('Employee deleted successfully!' ,'Delete Employee');
          this.getListOfEmployees();
        }, error => {
          this.toastr.error('Ops! An error has ocurred :(' ,'Delete Employee');
        })
      } else {
          this.getListOfEmployees();
      }    
  }

  updateEmployee(employee: any){
    this.action = 'update';
    this.id = employee.EmployeeId;

    this.form.patchValue({
      firstName: employee.FirstName,
      lastName: employee.LastName
    })
  }

}
