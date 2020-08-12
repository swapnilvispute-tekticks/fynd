import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../_services/getMovies.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  popularity: string
  director: string
  genre: string[]
  genreSelected: string[]
  imdb_score: string
  name: string
  errData: string[] = []
  successMsg: string = ''
  constructor(private authenticationService: AuthenticationService, private router: Router, private moviesService: MoviesService) { }
  isLoggedIn = false
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true     
      this.getGenre()
    }
  }

  getGenre() {
    this.moviesService.getGenre()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.genre = response.data
            this.isLoggedIn = true
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  onSubmit($event) {
    let reqBody = {
      name: this.name,
      '99popularity': this.popularity,
      director: this.director,
      imdb_score: this.imdb_score,
      genre: this.genreSelected
    }
    
    this.moviesService.addMovie(reqBody)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.genre = response.data
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

  logout() {
    this.isLoggedIn = false
    this.authenticationService.logout()
  }
  
}
