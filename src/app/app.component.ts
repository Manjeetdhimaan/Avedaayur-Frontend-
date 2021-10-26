import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , DoCheck{
  title = 'employeeManagement';
  tab1 = 'FilmsPage';
  tab2 = 'PeoplePage';
  tab3 = 'PlanetsPage';

  constructor(private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute){}
  ngOnInit(){
    // const user = localStorage.getItem('selected user')
    // if(user!==null){
    //    var parsedData = JSON.parse(user);
    //   console.log(parsedData)
    // }
    // const appTitle = this.titleService.getTitle();
    // this.router
    //   .events.pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(() => {
    //       const child = this.activatedRoute.firstChild;
    //       if (child?.snapshot.data['title']) {
    //         return child.snapshot.data['title'] = parsedData.fullname;
    //       }
    //       return appTitle;
    //     })
    //   ).subscribe((ttl: string) => {
    //     this.titleService.setTitle(ttl);
    //   });
  }

  ngDoCheck(){
    const user = localStorage.getItem('selected user')
    if(user!==null){
       var parsedData = JSON.parse(user);
      console.log(parsedData)
    }
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child?.snapshot.data['title']) {
             child.snapshot.data['title'] = parsedData.fullname;
            return child.snapshot.data['title']
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
  }

