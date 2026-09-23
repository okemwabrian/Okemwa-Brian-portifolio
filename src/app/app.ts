import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, PLATFORM_ID, ViewChild, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit, OnDestroy {
  @ViewChild('backgroundCanvas') private backgroundCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  protected readonly title = signal('my-portfolio');
  private renderer?: THREE.WebGLRenderer;
  private scene?: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;
  private mesh?: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshBasicMaterial>;
  private animationFrameId = 0;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.backgroundCanvas) {
      return;
    }

    const canvas = this.backgroundCanvas.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.z = 5.5;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const geometry = new THREE.IcosahedronGeometry(2.5, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0xd9b044,
      transparent: true,
      opacity: 0.1,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(1.8, -0.4, -1);
    this.scene.add(this.mesh);

    this.resizeScene();
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

  private readonly handleResize = (): void => this.resizeScene();

  private resizeScene(): void {
    if (!this.camera || !this.renderer) {
      return;
    }
    this.camera.aspect = window.innerWidth / Math.max(window.innerHeight, 1);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  private readonly animate = (): void => {
    if (!this.renderer || !this.scene || !this.camera || !this.mesh) {
      return;
    }
    this.mesh.rotation.x += 0.0007;
    this.mesh.rotation.y += 0.0012;
    this.mesh.rotation.z += 0.0003;
    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}




