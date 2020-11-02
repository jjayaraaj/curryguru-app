import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuruPage } from './guru.page';

describe('GuruPage', () => {
  let component: GuruPage;
  let fixture: ComponentFixture<GuruPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuruPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuruPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
