import { useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";

interface GrassPropsType {
  height: number;
}

let MID_HEIGHT = 18;
let HEIGHT = 20;
let WIDTH = 6;
let distance = 2;
let ANGLE = 54 * (Math.PI / 180);
let RANDOMNESS = 20;
let time = 0;
let leafColor = "#013e04";

let SPEED = 1;
let LAMBDA = 0.5;

type GrassLeaf = {
  [Type in `rand${0 | 1 | 2}`]: string;
} & {
  [Type in `${"X" | "Y"}${0 | 1 | 2 | 3 | 4}`]: number;
} & {
  [Type in `path${1 | 2}`]: Path2D;
};

class GrassFactory {
  private grass: GrassLeaf[] = [];
  private canvas: HTMLCanvasElement;
  private digits: string = "";
  private randCounter: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public drawGrass() {
    // Populate random digits string
    for (let i = 0; i < 137; i++) {
      this.digits += Math.floor(Math.random() * 10 ** 9);
    }

    this.createLeafs();

    const cb = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawLeafs(time);
      time = time <= 360 ? ++time : 0;
      requestAnimationFrame(cb);
    };

    requestAnimationFrame(cb);
  }

  private get ctx() {
    return this.canvas.getContext("2d");
  }

  private nextRand(): string {
    let size = this.digits.length;
    this.randCounter = this.randCounter == size ? 0 : ++this.randCounter;
    return this.digits[this.randCounter];
  }

  private createLeafs(): void {
    this.randCounter = 0;

    for (let dist = 0; dist < this.canvas.width + 50; dist += distance) {
      let parallelAngle = ANGLE - Math.PI / 2;

      let leaf: Partial<GrassLeaf> = {};
      leaf.rand0 = this.nextRand();
      leaf.rand1 = this.nextRand();
      leaf.rand2 = this.nextRand();

      leaf.Y0 = this.canvas.height + 5;
      leaf.X0 = dist;
      leaf.X1 = Math.floor(HEIGHT * Math.cos(ANGLE));
      leaf.Y1 = Math.floor(HEIGHT * Math.sin(ANGLE));
      leaf.X2 = Math.floor(MID_HEIGHT * Math.cos(ANGLE));
      leaf.Y2 = Math.floor(MID_HEIGHT * Math.sin(ANGLE));
      leaf.X3 = leaf.X2 + Math.floor(WIDTH * Math.cos(parallelAngle));
      leaf.Y3 = leaf.Y2 + Math.floor(WIDTH * Math.sin(parallelAngle));
      leaf.X4 = leaf.X2 + Math.floor(WIDTH * Math.cos(parallelAngle + Math.PI));
      leaf.Y4 = leaf.Y2 + Math.floor(WIDTH * Math.sin(parallelAngle + Math.PI));

      leaf.path1 = new Path2D(
        "M " +
          leaf.X0 +
          " " +
          leaf.Y0 +
          " q " +
          leaf.X3 +
          " -" +
          leaf.Y3 +
          " " +
          leaf.X1 +
          " -" +
          leaf.Y1
      );
      leaf.path2 = new Path2D(
        "M " +
          leaf.X0 +
          " " +
          leaf.Y0 +
          " q " +
          leaf.X4 +
          " -" +
          leaf.Y4 +
          " " +
          leaf.X1 +
          " -" +
          leaf.Y1
      );

      this.grass.push(leaf as GrassLeaf);
    }
  }

  private drawLeafs(time: number) {
    const ctx = this.ctx;

    if (ctx === null) {
      return;
    }

    this.randCounter = 0;
    this.grass = [];
    for (let dist = -100; dist < this.canvas.width + 50; dist += distance) {
      let time_ang =
        (Math.PI / 6) *
        Math.cos(((dist * LAMBDA + time * SPEED) * Math.PI) / 180);
      let leaf: Partial<GrassLeaf> = {},
        tHeight = 0,
        tMheight = 0,
        tWidth = 0;
      let paralAng = ANGLE - Math.PI / 2 + time_ang;
      let aux: number;
      leaf.rand0 = this.nextRand();
      leaf.rand1 = this.nextRand();
      leaf.rand2 = this.nextRand();
      aux = ((Number(leaf.rand0) - 5) * HEIGHT * RANDOMNESS) / 500;
      tHeight = aux + HEIGHT;
      tMheight =
        (((Number(leaf.rand1) - 5) / 5) * MID_HEIGHT * RANDOMNESS) / 100 +
        MID_HEIGHT;
      tWidth =
        (((Number(leaf.rand2) - 5) / 5) * WIDTH * RANDOMNESS) / 100 + WIDTH;

      leaf.Y0 = this.canvas.height + 5;
      leaf.X0 = dist;
      leaf.X1 = Math.floor(tHeight * Math.cos(ANGLE + time_ang));
      leaf.Y1 = Math.floor(tHeight * Math.sin(ANGLE + time_ang));
      leaf.X2 = Math.floor(tMheight * Math.cos(ANGLE + time_ang)); //0
      leaf.Y2 = Math.floor(tMheight * Math.sin(ANGLE + time_ang)); //75
      leaf.X3 = leaf.X2 + Math.floor(tWidth * Math.cos(paralAng));
      leaf.Y3 = leaf.Y2 + Math.floor(tWidth * Math.sin(paralAng));
      leaf.X4 = leaf.X2 + Math.floor(tWidth * Math.cos(paralAng + Math.PI));
      leaf.Y4 = leaf.Y2 + Math.floor(tWidth * Math.sin(paralAng + Math.PI));

      leaf.path1 = new Path2D(
        "M " +
          leaf.X0 +
          " " +
          leaf.Y0 +
          " q " +
          leaf.X3 +
          " " +
          -leaf.Y3 +
          " " +
          leaf.X1 +
          " " +
          -leaf.Y1
      );
      leaf.path2 = new Path2D(
        "M " +
          leaf.X0 +
          " " +
          leaf.Y0 +
          " q " +
          leaf.X4 +
          " " +
          -leaf.Y4 +
          " " +
          leaf.X1 +
          " " +
          -leaf.Y1
      );
      this.grass.push(leaf as GrassLeaf);
    }
    ctx.lineWidth = 2;

    for (let i = 0; i < this.grass.length; i++) {
      ctx.fillStyle = leafColor;
      let leaf = this.grass[i];
      ctx.fill(leaf.path1);
      ctx.fill(leaf.path2);

      let grad = ctx.createLinearGradient(
        leaf.X0 + leaf.X1,
        leaf.Y0 - leaf.Y1,
        leaf.X0,
        leaf.Y0
      );
      let opacity = 0;
      grad.addColorStop(0, "rgba(1,62,4," + opacity + ")");

      grad.addColorStop(0.2, leafColor);
      grad.addColorStop(1, leafColor);
      ctx.strokeStyle = grad;

      ctx.beginPath();
      ctx.moveTo(leaf.X0, leaf.Y0);
      ctx.lineTo(leaf.X0 + leaf.X1, leaf.Y0 - leaf.Y1);
      ctx.stroke();
    }
  }
}

export const Grass = ({ height }: GrassPropsType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current === null || containerRef.current === null) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;

    canvas.width = container.clientWidth;
    const grassFactory = new GrassFactory(canvas);

    grassFactory.drawGrass();
  }, []);

  return (
    <div ref={containerRef} className={styles.Grass}>
      <canvas ref={canvasRef} height={height} />
    </div>
  );
};
