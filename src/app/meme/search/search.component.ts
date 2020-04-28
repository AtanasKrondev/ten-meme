import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme.service';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  search: string;
  memes$;

  constructor(private memeService: MemeService, private route: ActivatedRoute) {
    this.route.queryParams
      .pipe(
        filter(params => params.search)
      ).subscribe(params => {
        this.search = params.search;
        this.memes$ = this.memeService.getMemes(ref => ref.where('tags', 'array-contains', this.search));
      });
  }
}
