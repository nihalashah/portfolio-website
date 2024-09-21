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

    
    description1 = [
      'During my time at Azilen Technologies, I specialized in developing and improving full-stack Spring Boot web applications, adhering to industry standards and best coding practices for high-quality software.',
      'Key Contributions:',
      '• Actively contributed to significant client projects, including Catastrophic Risk Modelling Enterprise and Platform for Legal Services and Judicial Support.',
      '• Engineered and maintained a client portal housing over 10TB of natural disaster data, improving user accessibility by 30% and streamlining information management.',
      '• Optimized the portal’s design, reducing user support tickets by 25% and enhancing the efficiency of the support process.',
      '• Revamped a legal services platform with an innovative pricing model, enhancing user experience and reducing client workload by 20 work-hours per week.',
      '• Developed seamless server deployment processes using containerization, achieving a 50% faster deployment time while maintaining system stability, now utilized by 15+ developers.',
      '• Optimized APIs to process over 1 million requests per second, supporting a user base of 700,000+ concurrent users and improving the user experience by 30%.',
      '• This comprehensive experience sharpened my skills in Java, Spring Boot, Liferay, AngularJS, and MySQL.'
    ];

    description2 = [
      'During my internship at Azilen Technologies, I focused on implementing robust software solutions and optimizing operational processes.',
      'Key Contributions:',
      '• Access Control Implementation: Designed and implemented a comprehensive access control solution for BitBucket repositories, effectively eliminating unauthorized access. This initiative ensured ISO compliance, leading to a 40% reduction in security incidents and the establishment of a new protocol for tracking permissions.',
      '• Process Optimization: Streamlined IT workflows, achieving a 70% reduction in manual tasks and enhancing overall operational efficiency by 45%.',
      '• Module Migration: Led the migration of the Timesheet module from Node.js to Spring Boot, resulting in a 30% improvement in performance and operational efficiency.'
];

    description3 = [
      'During my internship at Tech Celerity Global Solutions Pvt Limited, I focused on developing a robust E-commerce platform using Java and AngularJS, complemented by efficient MySQL database management.',
      'Key Contributions:',
      '• Developed user-friendly, responsive interfaces to enhance the overall shopping experience, leading to improved customer satisfaction and engagement.',
      '• Played a pivotal role in API development, ensuring seamless data processing and maintaining data accuracy across the platform.',
      '• Collaborated effectively with cross-functional teams, fostering an environment of innovation and efficiency.',
      '• Actively participated in code reviews, contributing to the maintenance of high coding standards and best practices.',
      '• This experience honed my technical skills in Java, AngularJS, and MySQL, while also enhancing my ability to work collaboratively in a fast-paced development environment.'
  ];
  
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
      "tab": "back-end",
      "color": "#bfbd1b"
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
