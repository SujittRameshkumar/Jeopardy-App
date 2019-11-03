import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataComponent} from '../data/data.component';
import { Data } from '../data/data.model';
import {dataService} from '../data/data.service';



@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  providers: [dataService],
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor(private dataService: dataService,
    private http: HttpClient,
    ) {}
  
  ngOnInit (){
    this.getRandomData()
     }
  
  RandomData: Data[];

  getRandomData(): void {
     this.dataService.getRandom().subscribe(RandomData => this.RandomData = RandomData); 
  }
}
