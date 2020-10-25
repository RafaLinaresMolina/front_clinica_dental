# FRONTEND for appointment app for a Dental Clinic

This is a project to introduce the use of REACT.

### Where to see the demo
-> https://front-clinica-dental.herokuapp.com/

### Is working with the backend from
-> https://appointment-dentist.herokuapp.com/
-> https://github.com/RafaLinaresMolina/FSD-BookingDentistApp

### A bit of background
This is an example of a frontend for an appointment app for a dental clinic.

Client can create appointments with state pending, can cancel appointments, watch all the history visualize their data on the profile page.
Admin can see all the appointments from all the users, watch all the logged users and watch his profile.

### Get the repo
- git clone https://github.com/RafaLinaresMolina/front_clinica_dental.git

### Install dependencies
- ```npm i```

### Add the configuration 

- Add the .env file with the next variables:
  - REACT_APP_BASE_URL: Base Url for the backend

### How to run it.
- ```npm start```

## The views
### Home page, if the user is not logged in allways be returned to it.
  ![Home Page](./readme_img/home.png)
### Register page, user must fill all the required fields or the web will show the next errors.
  ![Register Page](./readme_img/Registro.png)
  ![Register Page](./readme_img/Registro_error.png)
### Login page, user must fill all the required fields or the web will show the next errors.
  ![Login Page](./readme_img/Login.png)
  ![Login Page with errors](./readme_img/Login_error.png)
### Dashboard page, if the user is a client, will watch all of his appointments.
  ![Dashboard Page of client](./readme_img/dashboard_client.png)
### Dashboard page, if the user is an admin, will watch all of the appointments of all users.
  ![Dashboard Page of client](./readme_img/admin_dashboard.png) 
### A client can cancel an appointment if this isn't finished, a modal window will emerge for confirmation.
  ![Modal of cancel appointment](./readme_img/cancel_appointment.png) 
### when accepted the modal, the appointment should be cancelled. 
  ![Appointment cancelled](./readme_img/appointment_cancelled.png)
### The profile can be visualized too, for every user type of the application. 
  ![Admin profile](./readme_img/admin_profile.png)
  ![Regular user profile](./readme_img/profile.png)
### Regular users can create appointments, and must fill all the required fields. 
  ![Appointment Select](./readme_img/select_appointment_about.png)
  ![Appointment DatePicker](./readme_img/date_picker.png)
  ![Appointment DatePicker](./readme_img/new_appointment_errors.png)
### Admins can visualize all the users logged
  ![Admin users logged](./readme_img/logged_users.png)

### Things definetly need rework

- When 401 errors happend, redirect to home and delete posible data in localstorage.
- When logged with an acount already logged, either revoke the old token or manage an array of them.

### Things i will love to add
- Unit-Testing
- Refactor, a lot o reractor.