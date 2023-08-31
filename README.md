# Readme for JobApplicationTracker

This readme file provides an overview of the components and functionality implemented in your Angular application. The application appears to be a Job Application Management System with user registration, authentication, and job application tracking features. Below, I'll explain the main components, their functionality, and how they work together.

## Components

### Signup Component (`signup.component`)

The signup component provides a user registration form. Users can enter their name, email, mobile number, username, and password. The form includes validation for each field, and a custom mobile number validator is implemented. Upon successful registration, users are added to the system, and appropriate feedback is displayed.

### Login Component (`login.component`)

The login component allows users to log into the system. Users enter their username and password, and if the credentials are valid, they are granted access to the dashboard. Invalid credentials trigger appropriate error messages.

### Dashboard Component (`dashboard.component`)

The dashboard component serves as the main interface for managing job applications. It displays a table listing job applications with details like application ID, company, position, and status. Users can view application details, edit applications, and delete applications from this dashboard. Additionally, users can add new job applications through a separate form.

### Add Component (`add.component`)

The add component provides a form to add new job applications. Users can input details such as date applied, company, position, application method, contact info, status, and notes. Validation is implemented for mandatory fields. Upon successful submission, the application is added to the dashboard.

### Edit Component (`edit.component`)

The edit component allows users to modify existing job applications. Users can change details such as date applied, company, position, application method, contact info, status, and notes. The component pre-fills the form with the application's current details. Upon submission, the application is updated, and the changes are reflected in the dashboard.

### Home Component (`home.component`)

The home component serves as the landing page. It provides options to either register or log in. Users can switch between these options, and the respective forms are displayed. This component also determines what content to show based on user interactions.

### AuthGuard (`auth.guard`)

The AuthGuard is a route guard used to protect certain routes (e.g., the dashboard and its subcomponents) from unauthorized access. It checks whether a user is authenticated before allowing access to the specified routes. If a user is not authenticated, they are redirected to the home page.

### AuthService (`auth.service`)

The AuthService handles user authentication-related operations. It communicates with the backend API for user registration and login. It also manages the user's logged-in state and stores the state in local storage.

### JobApplicationService (`job-application.service`)

The JobApplicationService communicates with the backend API to manage job applications. It provides methods to fetch all job applications, fetch a single job application by ID, update job applications, add new applications, and delete applications.

## Routing

The application uses the Angular Router to navigate between different components based on URL paths. The `RouterModule` is configured with various routes, including routes for the home page, signup, login, dashboard, adding applications, viewing application details, editing applications, and more.

## Authentication

The application uses local storage to store the user's authentication state. When a user logs in, the `isLoggedIn` flag is set to `true`, and it's stored in local storage. This flag is used by the AuthGuard to determine whether a user is authorized to access protected routes.

## Conclusion

Your Angular application provides a comprehensive system for managing job applications, including user registration, authentication, and CRUD operations on job applications. It uses reactive forms for input validation, Angular Router for navigation, and Angular services to interact with the backend API. The application architecture follows best practices for building scalable and maintainable Angular applications.

                                               ##########
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.