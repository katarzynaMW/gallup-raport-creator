import { Injectable } from '@angular/core';
import { Talent } from './talent';
import { TALENTS } from './talents.data';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TalentService {

  constructor() { }

  getDomains(): string[] {
    return TALENTS.map(talent => talent.domain).reduce((array, domain) => array.includes(domain) ? array : [...array, domain], []);
  }

  getTalents(): Talent[] {
    return TALENTS;
  }

  getTalent(name): Talent {
    return this.getTalents().find( talent => talent.name === name);
  }

  private talentsUpdatedSource = new Subject <any> ();

  talentsUpdated$ = this.talentsUpdatedSource.asObservable();


  onUpdateSelectedTalents(talents: Talent[]) {
    this.talentsUpdatedSource.next(talents);
  }


}
