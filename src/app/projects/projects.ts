import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';

interface ProjectScreenshot {
  src: string;
  thumbnailSrc: string;
  alt: string;
  caption: string;
  brand: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-projects',
  imports: [NgOptimizedImage],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  readonly screenshots: ProjectScreenshot[] = [
    {
      src: '/erp_landingpage.png',
      thumbnailSrc: '/projects/erp_landingpage.webp',
      alt: 'OmniFreight public landing page and consignment tracking hero',
      caption: 'Public landing page and live consignment tracking',
      brand: 'OF',
      width: 1920,
      height: 954,
    },
    {
      src: '/operation_hub_erp.png',
      thumbnailSrc: '/projects/operation_hub_erp.webp',
      alt: 'Fleet operations hub with shipment triage and allocation queue',
      caption: 'Fleet operations hub, tariff assignment, and vehicle allocation',
      brand: 'OF',
      width: 1920,
      height: 997,
    },
    {
      src: '/userDirectory.png',
      thumbnailSrc: '/projects/userDirectory.webp',
      alt: 'OmniFreight user directory and role modification screen',
      caption: 'User directory and role management',
      brand: 'OF',
      width: 1920,
      height: 997,
    },
    {
      src: '/erpAudit.png',
      thumbnailSrc: '/projects/erpAudit.webp',
      alt: 'OmniFreight enterprise audit feed and activity filters',
      caption: 'Enterprise audit feed and activity filters',
      brand: 'OF',
      width: 1920,
      height: 997,
    },
  ];

  readonly posScreenshots: ProjectScreenshot[] = [
    {
      src: '/pos_dashbord.png',
      thumbnailSrc: '/pos_dashbord.png',
      alt: 'CorePoint POS dashboard with revenue, expenses, profit, and activity calendar',
      caption: 'Operations dashboard, daily totals, and activity calendar',
      brand: 'CP',
      width: 1920,
      height: 997,
    },
    {
      src: '/pos_Terminal.png',
      thumbnailSrc: '/pos_Terminal.png',
      alt: 'CorePoint POS terminal with product categories and current cart',
      caption: 'Point-of-sale terminal, cart, and checkout controls',
      brand: 'CP',
      width: 1920,
      height: 1012,
    },
    {
      src: '/pos_Inventory management.png',
      thumbnailSrc: '/pos_Inventory management.png',
      alt: 'CorePoint POS inventory catalog with stock levels and restocking actions',
      caption: 'Product catalog, stock levels, and restocking',
      brand: 'CP',
      width: 1920,
      height: 1012,
    },
    {
      src: '/pos_report.png',
      thumbnailSrc: '/pos_report.png',
      alt: 'CorePoint POS reports with revenue, expenses, profit, and sales records',
      caption: 'Sales reports, financial summaries, and export controls',
      brand: 'CP',
      width: 1920,
      height: 1012,
    },
  ];

  readonly activeScreenshot = signal<ProjectScreenshot | null>(null);
  readonly unavailableScreenshots = signal<ReadonlySet<string>>(new Set());
  private readonly screenshotDialog = viewChild<ElementRef<HTMLDialogElement>>('screenshotDialog');

  openScreenshot(screenshot: ProjectScreenshot): void {
    this.activeScreenshot.set(screenshot);
    this.screenshotDialog()?.nativeElement.showModal();
  }

  closeScreenshot(): void {
    const dialog = this.screenshotDialog()?.nativeElement;
    if (dialog?.open) {
      dialog.close();
    }
    this.activeScreenshot.set(null);
  }

  closeScreenshotOnBackdrop(event: MouseEvent): void {
    if (event.target === this.screenshotDialog()?.nativeElement) {
      this.closeScreenshot();
    }
  }

  onScreenshotDialogClose(): void {
    this.activeScreenshot.set(null);
  }

  markScreenshotUnavailable(src: string): void {
    this.unavailableScreenshots.update((unavailable) => new Set(unavailable).add(src));
  }
}
