import { Component, OnInit, NgModule } from '@angular/core';
import { partition } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataComponent} from '../data/data.component';
import { Data } from '../data/data.model';
import {dataService} from '../data/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@NgModule({
  imports: [
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule                        // <========== Add this line!
  ],
  declarations: [
  ],
  bootstrap: []
})

@Component({
  selector: 'app-clue-page',
  templateUrl: './clue-page.component.html',
  styleUrls: ['./clue-page.component.css'],
  providers: [dataService]

})
export class CluePageComponent implements OnInit {

  searchTerm: string;
  

  constructor(public dataService: dataService, private router: Router) {} 
  
  dataQuestions: Data[] = new Array(18418);
  currentQuestion: Data;
  filteredCategories: Clues[];
  allCategories: Clues[];
  
  
    ngOnInit() {
      this.getData();
      
    }
    
    filterCategories() {
      this.filteredCategories = this.allCategories.filter(category => category.question)
    }
  
    process(categoryMat: Clues[][]) {
      console.log(categoryMat);
      const categories = ([] as Clues[]).concat(...categoryMat);
      console.log(categories);
      this.allCategories = categories;
  
      // this.filteredCategories = categories.filter(category => category.title && category.title.toLowerCase().includes(this.searchTerm));
      // console.log(this.filteredCategories);
  
    }
  
    
  
  
    getData(): void {
  
      const observableBatch = [];
      {
       // observableBatch.push(this.dataService.getClues(getID()));
      }
      forkJoin(observableBatch).subscribe(allData => this.process(allData));
  
    }
  }
