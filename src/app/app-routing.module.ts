import { NgModule } from '@angular/core';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { AddComponent } from './dashboard/add/add.component';
import { DetailsComponent } from './dashboard/details/details.component';
import { EditComponent } from './dashboard/edit/edit.component';
import { ListComponent } from './dashboard/list/list.component';
import { ErrorComponent } from './error/error/error.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './authentication/AuthGuard';
import { RouterModule, Routes } from '@angular/router';

// Define the routes for the application
const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route and route for /home
  { path: 'home', component: HomeComponent }, // Route for /home
  { path: 'home/signup', component: SignupComponent }, // Route for signing up
  { path: 'home/login', component: LoginComponent }, // Route for logging in
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Dashboard route (requires authentication)
  { path: 'dashboard/addApplications', component: AddComponent, canActivate: [AuthGuard] }, // Route for adding applications (requires authentication)
  { path: 'dashboard/details/:id', component: DetailsComponent, canActivate: [AuthGuard] }, // Route for viewing details of a specific item (requires authentication)
  { path: 'dashboard/edit/:id', component: EditComponent, canActivate: [AuthGuard] }, // Route for editing a specific item (requires authentication)
  { path: 'dashboard/list', component: ListComponent, canActivate: [AuthGuard] }, // Route for listing items (requires authentication)
  { path: 'not-found', component: ErrorComponent }, // Route for displaying an error page
  { path: '**', redirectTo: '/not-found' } // Redirect all other unknown routes to the error page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
