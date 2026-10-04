import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Projects } from './projects';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
    }).compileComponents();

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the OmniFreight gallery and project actions', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.screenshot-item')).toHaveLength(8);
    expect(fixture.nativeElement.textContent).toContain('Fleet operations hub');
    expect(fixture.nativeElement.querySelector('.action-primary')?.getAttribute('href'))
      .toBe('https://github.com/okemwabrian/OminiFreiegt_erp.git');
    expect(fixture.nativeElement.querySelector('.action-secondary')?.getAttribute('href'))
      .toBe('#omnifreight-architecture');
  });

  it('renders the CorePoint POS screens and case study', () => {
    fixture.detectChanges();
    const posCard = fixture.nativeElement.querySelector('.pos-card') as HTMLElement;

    expect(posCard.textContent).toContain('Inventory control');
    expect(posCard.textContent).toContain('Fast checkout');
    expect(posCard.querySelectorAll('.screenshot-item')).toHaveLength(4);
    expect(Array.from(posCard.querySelectorAll('img')).map((image: HTMLImageElement) => image.getAttribute('src')))
      .toEqual([
        '/pos_dashbord.png',
        '/pos_Terminal.png',
        '/pos_Inventory management.png',
        '/pos_report.png',
      ]);
    expect(posCard.querySelector('.action-primary')?.getAttribute('href'))
      .toBe('https://github.com/okemwabrian/pos-backend-api.git');
  });

  it('does not render the removed project cards', () => {
    fixture.detectChanges();
    const projectText = fixture.nativeElement.textContent as string;

    expect(projectText).not.toContain('Shopwave');
    expect(projectText).not.toContain('Pamoja Kenya MN');
    expect(projectText).not.toContain('SmartSeason Field Monitoring System');
  });
});
