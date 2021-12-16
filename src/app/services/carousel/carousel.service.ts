import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carousel, CarouselSmall } from 'src/app/models/carousel/carousel';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  // getProductsSmall() {
  //   return this.http.get<any>('assets/carousel1.json').toPromise().then(res => <CarouselSmall[]>res.data).then(data => { return data; });
  // }

  getProducts() {
    return this.http.get<any>('assets/carousel.json').toPromise().then(res => <Carousel[]>res.data)
  }
}