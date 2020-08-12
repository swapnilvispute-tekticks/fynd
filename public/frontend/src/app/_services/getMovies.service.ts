import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MoviesService {
    constructor(private http: HttpClient) { }

    getMovies() {
        return this.http.get<any>(`${environment.reqUrl}/movies/list`)
            .pipe(map(list => {
                return list
            }))
    }

    getMovieDetails(slug) {
        return this.http.get<any>(`${environment.reqUrl}/movies/details/${slug}`)
            .pipe(map(list => {
                return list
            }))
    }

    addMovie(req) {
        return this.http.post<any>(`${environment.reqUrl}/movies/add`, req)
            .pipe(map(data => {
                return data
            }))
    }

    updateMovie(id,req) {
        return this.http.patch<any>(`${environment.reqUrl}/movie/${id}`, req)
            .pipe(map(data => {
                return data
            }))
    }

    getGenre() {
        return this.http.get<any>(`${environment.reqUrl}/genre/list`)
            .pipe(map(list => {
                return list
            }))
    }

    deleteMovie(movieId) {
        return this.http.delete<any>(`${environment.reqUrl}/movie/${movieId}`)
            .pipe(map(list => {
                return list
            }))
    }

    addGenre(genre) {
        return this.http.post<any>(`${environment.reqUrl}/genre/add`,{ name: genre})
            .pipe(map(list => {
                return list
            }))
    }

    filterMovies(data) {
        return this.http.post<any>(`${environment.reqUrl}/movies/filter`, data)
            .pipe(map(list => {
                return list
            }))
    }

    filterGenre(data) {
        return this.http.post<any>(`${environment.reqUrl}/movies/filter`, data)
            .pipe(map(list => {
                return list
            }))
    }
}
