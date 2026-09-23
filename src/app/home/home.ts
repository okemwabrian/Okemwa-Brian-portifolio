import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') private heroCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private mesh?: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>;
  private animationFrameId = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.heroCanvas) {
      return;
    }

    const canvas = this.heroCanvas.nativeElement;
    const container = canvas.parentElement;

    if (!container) {
      return;
    }

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    this.camera.position.z = 4.5;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const geometry = new THREE.IcosahedronGeometry(1.45, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xd9b044,
      transparent: true,
      opacity: 0.92,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.resizeScene(container);
    window.addEventListener('resize', this.handleResize);
    this.animate();
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationFrameId);
      window.removeEventListener('resize', this.handleResize);
    }
    this.mesh?.geometry.dispose();
    this.mesh?.material.dispose();
    this.renderer?.dispose();
  }

  private readonly handleResize = (): void => {
    const container = this.heroCanvas?.nativeElement.parentElement;
    if (container) {
      this.resizeScene(container);
    }
  };

  private resizeScene(container: HTMLElement): void {
    if (!this.camera || !this.renderer) {
      return;
    }

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  private readonly animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera || !this.mesh) {
      return;
    }

    this.mesh.rotation.x += 0.0025;
    this.mesh.rotation.y += 0.004;
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}
