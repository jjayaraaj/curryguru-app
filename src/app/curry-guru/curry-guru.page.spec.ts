import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurryGuruPage } from './curry-guru.page';

describe('CurryGuruPage', () => {
  let component: CurryGuruPage;
  let fixture: ComponentFixture<CurryGuruPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurryGuruPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurryGuruPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
