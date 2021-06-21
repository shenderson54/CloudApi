import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Interface } from '../interface';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['animals', 'anime', 'business','anti-malware','art & design','books' ];
  apis: Observable<any> | null = null;
  displayedColumns: string[] = ['id', 'name', 'description', 'url', 'category', 'auth', 'cors'];

  constructor(private api: ApiService) {}

  results: Interface[] | null = null;
  ngOnInit() {
    this.apis = this.api.searchAPIS('')
    
  }
  search() {
    console.log(this.myControl.value)
    this.apis = this.api.searchAPIS('').pipe(map(apis => {
      return apis.filter(api => {
        return api.category.toLowerCase() === this.myControl.value.toLowerCase();

      })
    }))
    
  }


}
