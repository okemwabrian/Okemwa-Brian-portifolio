import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';

interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
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
      alt: 'OmniFreight public landing page and consignment tracking hero',
      caption: 'Public landing page and live consignment tracking',
      width: 1920,
      height: 954,
    },
    {
      src: '/operation_hub_erp.png',
      alt: 'Fleet operations hub with shipment triage and allocation queue',
      caption: 'Fleet operations hub, tariff assignment, and vehicle allocation',
      width: 1920,
      height: 997,
    },
    {
      src: '/userDirectory.png',
      alt: 'OmniFreight user directory and role modification screen',
      caption: 'User directory and role management',
      width: 1920,
      height: 997,
    },
    {
      src: '/erpAudit.png',
      alt: 'OmniFreight enterprise audit feed and activity filters',
      caption: 'Enterprise audit feed and activity filters',
      width: 1920,
      height: 997,
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
