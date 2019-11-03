import { Component, OnInit, NgModule } from '@angular/core';
import { Data } from './data.model';
import { dataService } from './data.service';
import { partition } from 'rxjs/operators';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  selector: 'app-data',
  templateUrl: './data.component.html',
  providers: [dataService],
  styleUrls: ['./data.component.css']
})

export class DataComponent implements OnInit {

  
  searchTerm: string;
  

constructor(public dataService: dataService) {} 

 
dataQuestions: Data[] = new Array(18418);
currentQuestion: Data;
filteredCategories: Category[];
allCategories: Category[];
ready: boolean = false;
rows: number = 0;

  ngOnInit() {
    this.getData();
    this.searchTerm = '';
  }
  
  filterCategories() {
    this.filteredCategories = this.allCategories.filter(
      category => category.title != null && category.id != null && category.title.toLowerCase().includes(this.searchTerm)).sort((n1,n2) => 
      { return n2.clues_count-n1.clues_count});
      this.rows = this.filteredCategories.length;
  }

  process(categoryMat: Category[][]) {
  //  console.log(categoryMat);
    const categories = ([] as Category[]).concat(...categoryMat);
   // console.log(categories);
    this.allCategories = categories;
    // this.filteredCategories = categories.filter(category => category.title && category.title.toLowerCase().includes(this.searchTerm));
    // console.log(this.filteredCategories);
    this.ready = true;
  }

  getRows(){
    this.rows = this.filteredCategories.length;
  }


  getData(): void {

    const observableBatch = [];
    for (let offsetMultiplier=0; offsetMultiplier<18418 / 100;offsetMultiplier++){
      observableBatch.push(this.dataService.getCategories(100, 100*offsetMultiplier));
    }
    forkJoin(observableBatch).subscribe(allData => this.process(allData));

  }

}