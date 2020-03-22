import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      search: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  searchHandler({ search }: { search: string, }) {
    this.router.navigate(['meme', 'search', search]);
    this.searchForm.reset();
  }
}
