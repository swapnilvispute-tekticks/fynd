import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { MoviesService } from '../_services/getMovies.service';
import * as moment from 'moment'; 

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  constructor(private authenticationService: AuthenticationService,private moviesService: MoviesService,private router: Router) { }
  isLoggedIn = false
  errData: string[] = []
  movies: any = []
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true
      this.getMovies()
    } else {
      this.router.navigate(['login'])
    }
  }

  getMovies() {
    this.moviesService.getMovies()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.movies = response.data
            this.isLoggedIn = true
            this.router.navigate(['/movies', 'list'])
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  deletMovie(movieId) {
    this.moviesService.deleteMovie(movieId)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.getMovies()
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  formatDate(date, format) {
    return moment(date).format(format)
  }

  logout() {
    this.isLoggedIn = false
    this.authenticationService.logout()
  }

}
