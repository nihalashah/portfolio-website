import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


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

  _mTools = [

    {
      "id": "001",
      "name": "Java",
      "logo": "assets/img/tools/java-logo.png",
      "link": "https://www.java.com/en/",
      "tab": "back-end"
    },

    {
      "id": "89798",
      "name": "Spring Boot",
      "logo": "assets/img/tools/spring-boot.png",
      "link": "https://spring.io/projects/spring-boot",
      "tab": "back-end"
    },

    {
      "id": "8787",
      "name": "Liferay",
      "logo": "assets/img/tools/liferay.png",
      "link": "https://spring.io/projects/spring-boot",
      "tab": "design"
    },

    {
      "id": "1133",
      "name": "HTML",
      "logo": "assets/img/tools/html.png",
      "link": "https://html.com/",
      "tab": "back-end"
    },

    {
      "id": "2233",
      "name": "CSS",
      "logo": "assets/img/tools/css.png",
      "link": "https://developer.mozilla.org/en-US/docs/Web/CSS",
      "tab": "back-end"
    },

    {
      "id": "555",
      "name": "Git",
      "logo": "assets/img/tools/git.png",
      "link": "https://git-scm.com/",
      "tab": "back-end"
    },

    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },

    {
      "id": "111",
      "name": "Python",
      "logo": "assets/img/tools/python.png",
      "link": "https://www.python.org/",
      "tab": "back-end"
    },

    {
      "id": "112",
      "name": "JavaScript",
      "logo": "assets/img/tools/javascript.png",
      "link": "https://www.javascript.com/",
      "tab": "back-end"
    },

    {
      "id": "0003",
      "name": "TypeScript",
      "logo": "assets/img/tools/typescript.png",
      "link": "https://www.typescriptlang.org/",
      "tab": "web",
      "color": "#859bed"
    },

    {
      "id": "5567465",
      "name": "C",
      "logo": "assets/img/tools/c.png",
      "link": "https://visualstudio.microsoft.com/vs/features/cplusplus/",
      "tab": "web",
    },

    {
      "id": "6757676",
      "name": "C++",
      "logo": "assets/img/tools/c++.png",
      "link": "https://visualstudio.microsoft.com/vs/features/cplusplus/",
      "tab": "web",
    },

    {
      "id": "7126",
      "name": "NodeJs",
      "logo": "assets/img/tools/nodejs.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end"
    },


    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud"
    },

    {
      "id": "6124",
      "name": "Google Cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },

    {
      "id": "2222",
      "name": "MySQL",
      "logo": "assets/img/tools/Mysql.png",
      "link": "https://www.mysql.com/",
      "tab": "database"
    },

    {
      "id": "2223",
      "name": "MongoDB",
      "logo": "assets/img/tools/mongodb.png",
      "link": "https://www.mongodb.com/",
      "tab": "database",
    },


  ]

}
