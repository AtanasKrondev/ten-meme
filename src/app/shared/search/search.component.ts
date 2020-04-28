import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { regex } from '../validators/regex.validator'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(1), Validators.pattern(regex.tag)]],
    })
  }

  searchHandler({ search }: { search: string, }) {
    this.router.navigate(['meme', 'search'], { queryParams: { search: search.trim().toLowerCase() } });
    this.searchForm.reset();
  }
}
