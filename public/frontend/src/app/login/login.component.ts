import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute,private router: Router) { }
  email;
  password;
  errData: string[] = [];
  isLoggedIn = false
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true
      this.router.navigate(['/movies', 'list'])      
    }
  }

  onLogin($event) {
    this.errData = [];
    $event.preventDefault();
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.isLoggedIn = true
            this.router.navigate(['/movies', 'list'])
          } else {
            this.isLoggedIn = false
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      );
  }
}
