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
  apis: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'url', 'category', 'auth', 'cors'];

  constructor(private api: ApiService) {}

  results: Interface[] | null = null;
  ngOnInit() {
    this.api.searchAPIS('').subscribe(results => {
      this.apis = results;
      console.log(results);
    })
    
  }
  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
