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
  mOnceAnimated = false;

  _mTriggerAnim?= 'false';
  _mTriggerImage?= 'false';
  _mThreshold = 0.2;

  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public setupAnimation() {
    if (!this.vAnimRefView) return;

    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler);
          return visibility;
        }
        return 0;
      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      distinctUntilChanged(),
      takeWhile(trigger => !trigger || !this.mOnceAnimated, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {
      if (this.mOnceAnimated) return;
      if (val) {
        this.mOnceAnimated = true;
        this._mTriggerAnim = 'true';
        this.cdr.detectChanges();
      }
    });
  }

  _mExperience = [
    {
      role: 'Software Engineer',
      company: 'Univsoftware, Inc.',
      location: 'Los Angeles, CA',
      period: 'Aug 2025 — Present',
      current: true,
      bullets: [
        'Rapidly prototyped and scaled distributed infrastructure with sharded relational schemas, query federation, and adaptive caching across MySQL, Redis, and Elasticsearch — improving end-to-end query latency for business users.',
        'Designed and shipped backend-heavy microservices and micro-frontends (Node.js, Next.js) on Kubernetes, automating internal processes and exposing clean APIs.',
        'Implemented event-driven async workflows using Kafka-style queues, API gateways, and distributed workers — integrating email/SMS providers and AI platform components.',
        'Used LLMs and modern AI tooling pragmatically to scaffold services, generate tests, and power product functionality while maintaining production-grade quality.'
      ],
      tags: ['Node.js', 'Next.js', 'Kubernetes', 'AWS', 'Kafka', 'MySQL', 'Redis', 'Elasticsearch', 'LLMs']
    },
    {
      role: 'Software Engineer Intern',
      company: 'Univsoftware, Inc.',
      location: 'Los Angeles, CA',
      period: 'May 2025 — Aug 2025',
      current: false,
      bullets: [
        'Developed backend-heavy ETL & automation pipelines processing 500K+ records/week in Python, cutting preprocessing latency by 70%.',
        'Automated cloud infra provisioning with AWS CloudFormation — improving deployment velocity 50% and cost efficiency 15%.',
        'Optimized backend APIs and integrations with QuickBooks, CARFAX, Twilio, and Keycloak — cutting request latency 25%.',
        'Improved scalability of internal services with AWS Lambda, EC2, and RDS, with metrics & alerts supporting on-call rotations.'
      ],
      tags: ['Python', 'AWS', 'Lambda', 'CloudFormation', 'EC2', 'RDS', 'Twilio']
    },
    {
      role: 'Associate Software Engineer',
      company: 'Azilen Technologies',
      location: 'Ahmedabad, India',
      period: 'Jan 2023 — Jun 2024',
      current: false,
      bullets: [
        'Engineered internal risk-analysis tools and a distributed risk-management system on MySQL & Elasticsearch — letting ops teams interactively explore 10+ TB of geospatial data.',
        'Built automated backup & recovery utilities that replaced manual maintenance and Azure Blob dependence, reducing backup time 40%.',
        'Designed and maintained CI/CD pipelines in GitHub Actions, cutting release times 50%.',
        'Modernized a high-traffic legal services platform with Spring Boot & TypeScript, reducing manual case processing by 20+ hours/week.'
      ],
      tags: ['Java', 'Spring Boot', 'Elasticsearch', 'MySQL', 'TypeScript', 'GitHub Actions']
    },
    {
      role: 'Full-Stack Developer',
      company: 'Tech Celerity Global Solutions',
      location: 'Ahmedabad, India',
      period: 'Sep 2022 — Dec 2022',
      current: false,
      bullets: [
        'Developed a high-performance concurrency engine in Rust using low-level memory management, parallel algorithms, and synchronization — accelerating compute-intensive workflows 40%.',
        'Deployed event-driven microservices on AWS integrating Kafka and S3 with monitoring & alerting, reducing average request latency 25%.'
      ],
      tags: ['Rust', 'AWS', 'Kafka', 'S3', 'Microservices']
    }
  ];

  _mProjects = [
    {
      icon: '⚡',
      iconBg: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      title: 'Distributed Feature Store & Model Serving Platform',
      description: 'Large-scale feature store backing ML training and low-latency inference — sharded storage, in-memory caching, and versioned feature pipelines deployed on AWS EKS with horizontal autoscaling.',
      metrics: [
        { value: '1M+', label: 'updates/day' },
        { value: '<50ms', label: 'p99 inference' },
        { value: 'EKS', label: 'auto-scaled' }
      ],
      tech: ['Python', 'Go', 'Redis', 'Kubernetes', 'AWS EKS']
    },
    {
      icon: '📡',
      iconBg: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      title: 'Multi-Region Distributed Logging & Observability',
      description: 'Fault-tolerant multi-region logging pipeline for distributed services — async queues + stream processing, with replication and aggregation for durability and consistency.',
      metrics: [
        { value: '500K+', label: 'events/min' },
        { value: 'Multi', label: 'region' },
        { value: 'Real-time', label: 'analysis' }
      ],
      tech: ['Kafka', 'Elasticsearch', 'Stream Processing', 'AWS']
    },
    {
      icon: '🔧',
      iconBg: 'linear-gradient(135deg, #10b981, #059669)',
      title: 'Internal Automation & ETL Suite',
      description: 'Backend-heavy ETL and automation pipelines processing 500K+ records weekly in Python, replacing manual reporting/reconciliation workflows. Provisioned via CloudFormation.',
      metrics: [
        { value: '500K+', label: 'rec/week' },
        { value: '−70%', label: 'latency' },
        { value: '+50%', label: 'velocity' }
      ],
      tech: ['Python', 'AWS Lambda', 'CloudFormation', 'RDS']
    },
    {
      icon: '🔐',
      iconBg: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      title: 'Geospatial Risk Management System',
      description: 'Distributed risk-management system enabling interactive exploration of 10+ TB of geospatial and natural-disaster data on MySQL & Elasticsearch for underwriting decisions.',
      metrics: [
        { value: '10+ TB', label: 'data' },
        { value: 'Real-time', label: 'queries' },
        { value: 'Spring', label: 'Boot' }
      ],
      tech: ['Java', 'Spring Boot', 'Elasticsearch', 'MySQL']
    }
  ];

  _mStack = [
    {
      title: 'Languages',
      icon: '< >',
      iconBg: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'Go', 'Rust', 'C++', 'SQL']
    },
    {
      title: 'Backend & APIs',
      icon: '⚙',
      iconBg: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      items: ['Node.js', 'Spring Boot', 'Django', 'Hibernate', '.NET Core', 'REST', 'gRPC', 'Microservices']
    },
    {
      title: 'Data & Streaming',
      icon: '⛁',
      iconBg: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Kafka', 'Solr', 'BigQuery']
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁',
      iconBg: 'linear-gradient(135deg, #06b6d4, #10b981)',
      items: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CloudFormation', 'Jenkins', 'GitHub Actions']
    },
    {
      title: 'Frontend',
      icon: '◧',
      iconBg: 'linear-gradient(135deg, #10b981, #f59e0b)',
      items: ['Next.js', 'React', 'Angular', 'Vue', 'Tailwind', 'SCSS', 'Material']
    },
    {
      title: 'AI / LLM Tooling',
      icon: '✦',
      iconBg: 'linear-gradient(135deg, #f59e0b, #ec4899)',
      items: ['OpenAI', 'Vertex AI', 'Cursor', 'GitHub Copilot', 'Prompt Engineering']
    }
  ];

  _mEducation = [
    {
      degree: 'M.S. Computer Science',
      school: 'California State University — Long Beach',
      major: 'Distributed systems, algorithms, machine learning',
      period: 'Aug 2024 — May 2026',
      gpa: '3.78 / 4.0'
    },
    {
      degree: 'B.E. Computer Engineering',
      school: 'Gujarat Technological University',
      major: 'Software engineering, data structures, systems',
      period: 'Aug 2019 — May 2023',
      gpa: '3.90 / 4.0'
    }
  ];
}
