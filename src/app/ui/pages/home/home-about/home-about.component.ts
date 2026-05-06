import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ENTER_SCALE, TRANSITION_AREA_SLIDE, TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_AREA_SLIDE,
    TRANSITION_IMAGE_SCALE,
    ENTER_SCALE
  ]
})
export class HomeAboutComponent implements OnInit {
  private _revealObserver: IntersectionObserver | null = null;
  mOnceAnimated = false;

  _mTriggerAnim?= 'false';
  _mTriggerImage?= 'false';

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this._revealObserver?.disconnect();
  }

  public setupAnimation() {
    if (!this.vAnimRefView) return;

    this._revealObserver = UiUtilsView.observeReveal(this.vAnimRefView, () => {
      if (this.mOnceAnimated) return;
      this._ngZone.run(() => {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
      });
    });
  }
}
