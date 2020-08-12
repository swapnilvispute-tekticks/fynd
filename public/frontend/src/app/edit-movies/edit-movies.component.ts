import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../_services/getMovies.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-edit-movies',
  templateUrl: './edit-movies.component.html',
  styleUrls: ['./edit-movies.component.css']
})
export class EditMoviesComponent implements OnInit {
  popularity: string
  director: string
  genre: any[]
  genreSelected: string[]
  imdb_score: string
  name: string
  details: any = {}
  errData: string[] = []
  constructor(private authenticationService: AuthenticationService,private router: Router,private moviesService: MoviesService, private route: ActivatedRoute) { }
  isLoggedIn = false
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true
      this.route.paramMap.subscribe(param => {
        if(param['params'] && param['params'].slug) {
          this.getMovieDetails(param['params'].slug)     
        }
      })
    }
  }

  getMovieDetails(slug) {
    this.moviesService.getMovieDetails(slug)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.details = response.data.details
            this.name = this.details.name
            this.popularity = this.details['99popularity']
            this.director = this.details.director
            this.imdb_score = this.details.imdb_score
            this.genreSelected = this.details.genre
            this.genre = response.data.genre
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
    let updateData = {
      "99popularity": this.popularity,
      "director": this.director,
      "genre": this.genreSelected,
      "imdb_score": this.imdb_score
    }
    this.moviesService.updateMovie(this.details._id, updateData)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
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
