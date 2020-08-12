import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../_services/getMovies.service';
import { Router } from '@angular/router';
import * as moment from 'moment'; 
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.css']
})
export class AddGenreComponent implements OnInit {
  genre: any = []
  isLoggedIn = false
  errData: string[] = []
  genreName: string
  constructor(private authenticationService: AuthenticationService,private moviesService: MoviesService, private router: Router) { }

  ngOnInit() {
    this.getGenre()
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

  formatDate(date, format) {
    return moment(date).format(format)
  }

  onSubmit($event) {
    this.errData = []
    this.moviesService.addGenre(this.genreName)
      .subscribe(
        response => {
          console.log(response)
          if (response.status === 200) {
            this.getGenre()
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
