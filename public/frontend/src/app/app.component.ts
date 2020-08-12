import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: any = false
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    console.log('data',data)
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true
    }
  }
  
  logout() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
