import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,private router: Router) { }
  email;
  password;
  name;
  role;
  errData: string[] = [];
  isLoggedIn = false
  success: Boolean = false
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true
      this.router.navigate(['/movies', 'list'])      
    }
  }

  onSubmit($event) {
    this.errData = [];
    $event.preventDefault();
    let data = { name: this.name, email: this.email, password: this.password, role: this.role }
    this.authenticationService.signup(data)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.success = true
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      );
  }

}
