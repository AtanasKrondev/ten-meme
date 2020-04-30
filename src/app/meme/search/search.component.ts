import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme.service';
import { filter, flatMap, tap, map } from 'rxjs/operators'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  search: string;
  searchQuery = this.route.queryParams
    .pipe(
      map(params => params.search),
    )
  memes$;

  constructor(private memeService: MemeService, private route: ActivatedRoute) {
    this.memes$ = this.searchQuery.pipe(flatMap(search => this.memeService.getMemes(ref => ref.where('tags', 'array-contains', search))))
    this.searchQuery.subscribe(search => this.search = search)
  }
}
