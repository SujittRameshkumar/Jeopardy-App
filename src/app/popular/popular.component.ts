import { Component, OnInit,NgModule} from '@angular/core';
import { Data } from '../data/data.model';
import { dataService } from '../data/data.service';
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
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  providers: [dataService],
  styleUrls: ['./popular.component.css']
  
})

export class PopularComponent implements OnInit {

  
  searchTerm: string;
  
  

constructor(public dataService: dataService) {} 

 
dataQuestions: Data[] = new Array(18418);
currentQuestion: Data;
filteredCategories: Category[];
allCategories: Category[];
ready: boolean = false;
  ngOnInit() {
    this.getData();
    this.searchTerm = '';
    
  }
  
  filterCategories() {
    this.filteredCategories = this.allCategories.filter(category => category.title).sort((n1,n2) => {
      return n2.clues_count-n1.clues_count
    });
    this.filteredCategories = this.filteredCategories.splice(0,50);
    
  }

  process(categoryMat: Category[][]) {
    console.log(categoryMat);
    const categories = ([] as Category[]).concat(...categoryMat);
    console.log(categories);
    this.allCategories = categories;

  }

  get totalRows(): number {
    return this.filteredCategories.length;
  }
  


  getData(): void {

    const observableBatch = [];
    for (let offsetMultiplier=0; offsetMultiplier<18418 / 100;offsetMultiplier++){
      observableBatch.push(this.dataService.getCategories(100, 100*offsetMultiplier));
    }
    forkJoin(observableBatch).subscribe(allData => {
      this.process(allData);
      this.filterCategories();
      this.ready = true;
    });
    
  }

}