import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { FormBuilder } from '@angular/forms';
import { distinctUntilChanged, map, Observable, ReplaySubject, scan, startWith, switchMap, takeUntil, takeWhile } from 'rxjs';
import { TRANSITION_TEXT, TRANSITION_IMAGE_SCALE } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-client-apps',
  templateUrl: './client-apps.component.html',
  styleUrls: ['./client-apps.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class ClientAppsComponent implements OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'



  _mThreshold = 0.4


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler,
    private formBuilder: FormBuilder) {



  }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }




  /* ***************************************************************************
   *                                  other parts
   */


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mClientApps = [

    {
     "id": "5131",
     "name": "Navigator+",
     "image": "assets/img/clients/navigator.png",
     "link": "https://nihalashah.github.io/Navigator/Navigator+/Navigator+/index.html",
     "tab": "Frontend",
     "color": "#FFFFFF"
   },

   {
    "id": "5132",
    "name": "Course API App",
    "image": "assets/img/clients/course-api.png",
    "link": "https://github.com/nihalashah/SpringBoot-CourseApi-App",
    "tab": "Backend"
  },

   {
     "id": "5133",
     "name": "Employee Management System",
     "image": "assets/img/clients/ems.png",
     "link": "https://github.com/nihalashah/Django-EMS",
     "tab": "Backend"
   },

   {
    "id": "5134",
    "name": "Performance Management System",
    "image": "assets/img/clients/pms.png",
    "link": "https://github.com/nihalashah/Performance-Management-System",
    "tab": "Backend"
  },
  {
    "id": "5135",
    "name": "Product Recommendations System",
    "image": "assets/img/clients/recommendations.png",
    "link": "https://github.com/nihalashah/Recommendations-System",
    "tab": "Backend"
  },

  {
    "id": "5136",
    "name": "IT Audit App",
    "image": "assets/img/clients/it-audit.png",
    "link": "",
    "tab": "Backend"
  },

  
  //  {
  //    "id": "5133",
  //    "name": "Aabboo - Anonymous Chat Rooms",
  //    "image": "assets/img/clients/aabboo.png",
  //    "link": "https://play.google.com/store/apps/details?id=com.aabboo.social",
  //    "tab": "Android"
  //  }
  ];
}
