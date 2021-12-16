import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel/carousel.service';
import { Carousel, CarouselSmall } from 'src/app/models/carousel/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  // carousel1! : CarouselSmall[];

  carousel!: Carousel[];

  responsiveOptions;
	
	constructor(private carouselService:CarouselService) { 
    this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
  }

  ngOnInit() {
    // this.carouselService.getProductsSmall().then(carousel1 => {
		// 	this.carousel1 = carousel1;
		// });

    this.carouselService.getProducts().then(carousel => {
			this.carousel = carousel;
		});
  }
}