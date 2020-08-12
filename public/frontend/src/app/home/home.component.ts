import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_services/getMovies.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private moviesService: MoviesService) { }
  isLoggedIn = false
  movies: any = []
  genre: any = []
  selectedGenre: any = []
  errData: string[] = []
  searchText: string = ''
  ngOnInit() {
    this.getMovies()
    let data = JSON.parse(localStorage.getItem('currentUser'))
    if(data && data.hasOwnProperty('token')) {
      this.isLoggedIn = true  
    } else {
      this.isLoggedIn = false
    }
    this.getGenre()
  }

  logout() {
    this.isLoggedIn = false
    this.authenticationService.logout()
  }

  getMovies() {
    this.moviesService.getMovies()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.movies = response.data
            console.log('this.movies',this.movies)
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  getGenre() {
    this.moviesService.getGenre()
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            console.log('response.data',response.data)
            this.genre = response.data
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  filterBy(type) {
    let filterReq = {
      "type": "sort",
      "filterBy": type
    }
    this.searchText = ''
    this.moviesService.filterMovies(filterReq)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.movies = response.data
            console.log('this.movies',this.movies)
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  selectGenre(name) {
    if(this.selectedGenre.indexOf(name) === -1) {
      this.selectedGenre.push(name)
    } else {
      this.selectedGenre.splice(name, 1);
    }
    this.moviesService.filterGenre({ type: "genre", genre: this.selectedGenre})
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.movies = response.data
            console.log('this.movies',this.movies)
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

  searchBy() {
    let searchReq = {
      "type": "search",
      "searchBy": this.searchText
    }
    this.moviesService.filterMovies(searchReq)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.movies = response.data
            console.log('this.movies',this.movies)
          } else {
            this.errData.push(''+response.message);
          }
        },
        error => {
          this.errData.push('Something went wrong');
        }
      )
  }

}
