import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemeService } from '../meme.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  search: string = this.route.snapshot.params.search;
  memes$;

  constructor(private memeService: MemeService, private route: ActivatedRoute) {
    this.memes$ = this.memeService.getMemes(ref => ref.where('tags', 'array-contains', this.search));
  }
}
