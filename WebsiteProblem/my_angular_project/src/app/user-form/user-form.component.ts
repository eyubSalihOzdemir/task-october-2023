import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  errors: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit() {
  }

  addUser(name: string, surname: string, status: string, gender: string, dateOfBirth: string) {
    this.isLoading = true;
    this.userService
        .addUser({
            id: 1,
            name: name,
            surname: surname,
            status: status,
            gender: gender,
            dateOfBirth: dateOfBirth,
            isUpdating: false
        })
        .subscribe(
            user => {
                this.isLoading = false;
                user.isUpdating = false;
                this.router.navigate(['/users']);
            },
            error => {
                this.errors = error.json().errors;
                this.isLoading = false;
            }
        );
  }
}
