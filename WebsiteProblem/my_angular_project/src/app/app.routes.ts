import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    { path: 'addUser', component: UserFormComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];