import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from '../user.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    errorMessage: string = "";
    isLoading: boolean = true;

    constructor(private userService: UserService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.getUsers();
    }

    isPopupOpen = false;
    editingUser: User | null = null;
    tempEditingUser: User | null = null;

    openPopup(user: User) {
      this.editingUser = user;
      this.tempEditingUser = { ...user }; // Create a copy for temporary changes
      this.isPopupOpen = true;
    }
    closePopup(update: boolean = false) {
      if (this.tempEditingUser && update) {
        this.userService.editUser(this.tempEditingUser).subscribe(
          updatedUser => {
            const index = this.users.findIndex(user => user.id === this.tempEditingUser?.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
  
            this.isPopupOpen = false;
          },
          error => {
            console.error('Error updating user:', error);
          }
        );
      }

      this.isPopupOpen = false;
    }

    currentPage = 1;
    itemsPerPage = 10;
    getUsers() {
      this.isLoading = true;

      this.userService
          .getUsers()
          .subscribe(
            users => {
                this.users = users;
                this.isLoading = false;
            },
              error => this.errorMessage = <any>error
          );
    }
    getCurrentUsers(): User[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.users.slice(startIndex, endIndex);
    }
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
    nextPage() {
      const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
      }
    }
    


    findUser(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    isUpdating(id: number): boolean {
        const user = this.findUser(id);
        return !!user && user.isUpdating;
    }

    deleteUser(id: number) {
      const user = this.findUser(id);

      if (user) {
        user.isUpdating = true;

        this.userService.deleteUser(id).subscribe(
          () => {
            user.isUpdating = false;
            this.users = this.users.filter(user => user.id !== id);
            this.cdr.detectChanges();
          },
          (error) => {
            this.errorMessage = error;
            user.isUpdating = false;
            console.error('Error deleting user:', error);
          }
        );
      }
    }

    appendUser(user: User) {
      this.users.push(user);
    }

    currentSort: { key: keyof User, order: 'asc' | 'desc' } = { key: 'id', order: 'asc' };
    sort(key: keyof User) {
      // Toggle the sorting order if the same column is clicked
      if (this.currentSort.key === key) {
          this.currentSort.order = this.currentSort.order === 'asc' ? 'desc' : 'asc';
      } else {
          // Set the sorting column and order if a different column is clicked
          this.currentSort = { key, order: 'asc' };
      }
  
      this.users.sort((a, b) => {
          const valueA = a[key];
          const valueB = b[key];
  
          // Adjust the sorting order based on the currentSort.order
          const orderMultiplier = this.currentSort.order === 'asc' ? 1 : -1;
  
          if (valueA < valueB) return -1 * orderMultiplier;
          if (valueA > valueB) return 1 * orderMultiplier;
          return 0;
      });
    }
}
