import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {KtdGridComponent, KtdGridLayout, ktdTrackById} from '@katoid/angular-grid-layout';
import {debounceTime, filter, fromEvent, merge, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-grid-canvas',
  templateUrl: './grid-canvas.component.html',
  styleUrl: './grid-canvas.component.css'
})
export class GridCanvasComponent implements OnInit, OnDestroy{
  // @ts-ignore
  @ViewChild(KtdGridComponent, {static: true}) grid: KtdGridComponent;
  cols: number = 2;
  rowHeight: number = 100;
  // layout: KtdGridLayout = [
  //   {id: '0', x: 0, y: 0, w: 1, h: 1},
  //   {id: '1', x: 1, y: 0, w: 1, h: 1},
  //   {id: '2', x: 2, y: 0, w: 1, h: 1},
  // ];
  layout: KtdGridLayout = [
    {id: '0', x: 0, y: 0, w: 1, h: 1},
    {id: '1', x: 1, y: 0, w: 1, h: 1},
    {id: '2', x: 0, y: 0, w: 1, h: 1},
  ];
  trackById = ktdTrackById
  autoResize: boolean = true;

  onLayoutUpdated(layout: KtdGridLayout) {
    console.log('on layout updated', layout);
    this.layout = layout;
  }

  // @ts-ignore
  resizeObservable$: Observable<Event>
  // @ts-ignore
  resizeSubscription$: Subscription

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = merge(
      fromEvent(window, 'resize'),
      fromEvent(window, 'orientationchange')
    ).pipe(
      debounceTime(50),
      filter(() => this.autoResize)
    ).subscribe(() => {
      this.grid.resize();
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe()
  }

}
