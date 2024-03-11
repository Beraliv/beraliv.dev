import { useLayoutEffect, useRef } from "react";
import styles from "./index.module.css";

interface FractalTreePropsType {
  width: number;
  height: number;
  config: TreeConfig;
}

export type TreeConfig =
  | { type: "withoutLeaves"; trunkColour: string }
  | { type: "withLeaves"; trunkColour: string; leavesColour: string };

class FractalTreeFactory {
  private canvas: HTMLCanvasElement;
  private curve: number = 20;
  private curve2: number = 4.601357248846048;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public drawTree = (config: TreeConfig) => {
    const ctx = this.ctx;

    if (ctx === null) {
      return;
    }

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const centerPointX = this.canvas.width / 2;
    const len = 25;
    let angle = 0;
    let branchWidth = 4.6;

    const dfs = (
      startX: number,
      startY: number,
      len: number,
      angle: number,
      branchWidth: number,
      leaves: boolean,
      colour1?: string,
      colour2?: string
    ) => {
      ctx.beginPath();
      ctx.save();
      if (colour1) ctx.strokeStyle = colour1;
      if (colour2) ctx.fillStyle = colour2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = "black";
      ctx.lineWidth = branchWidth;
      ctx.translate(startX, startY);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.moveTo(0, 0);
      if (angle > 0) {
        ctx.bezierCurveTo(
          this.curve2,
          -len / 2,
          this.curve2,
          -len / 2,
          0,
          -len
        );
      } else {
        ctx.bezierCurveTo(
          this.curve2,
          -len / 2,
          -this.curve2,
          -len / 2,
          0,
          -len
        );
      }

      ctx.stroke();

      if (len < 5) {
        if (leaves) {
          ctx.beginPath();
          ctx.arc(0, -len, Math.random() * 10 + 5, 0, Math.PI / 2);
          ctx.fill();
        }
        ctx.restore();
        return;
      }

      dfs(0, -len, len * 0.7, angle + this.curve, branchWidth * 0.6, leaves);
      dfs(0, -len, len * 0.7, angle - this.curve, branchWidth * 0.6, leaves);

      ctx.restore();
    };

    if (config.type === "withLeaves") {
      dfs(
        centerPointX,
        this.canvas.height - 10,
        len,
        angle,
        branchWidth,
        true,
        config.trunkColour,
        config.leavesColour
      );
    } else if (config.type === "withoutLeaves") {
      dfs(
        centerPointX,
        this.canvas.height - 10,
        len,
        angle,
        branchWidth,
        false,
        config.trunkColour
      );
    } else {
      // exhaustive check
    }
  };

  private get ctx() {
    return this.canvas.getContext("2d");
  }
}

export const FractalTree = ({
  width,
  height,
  config,
}: FractalTreePropsType) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    if (canvasRef.current === null) {
      return;
    }

    const canvas = canvasRef.current;

    const treeFactory = new FractalTreeFactory(canvas);

    treeFactory.drawTree(config);
  }, [config]);

  return (
    <div className={styles.Tree}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};
