import { Component, OnInit } from '@angular/core';
import { RxjsLearnService } from '../rxjs-learn.service';
import { LearnService } from './learn';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss'],
})
export class LearnComponent implements OnInit {
  constructor(private learn: RxjsLearnService,private LearnService:LearnService) {}

  ngOnInit(): void {
    this.LearnService.examplePluck$.subscribe((val:any) => console.log(val),(err:any)=>{
      console.warn(err)
    });
    
  }
}
