import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './_guards/auth.guard';
import { MovieListComponent } from './movie-list/movie-list.component';
import { EditMoviesComponent } from './edit-movies/edit-movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { AddGenreComponent } from './add-genre/add-genre.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'movies/add', component: AddMovieComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'genre/add', component: AddGenreComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'movies/list', component: MovieListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'movies/edit/:slug', component: EditMoviesComponent, canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
