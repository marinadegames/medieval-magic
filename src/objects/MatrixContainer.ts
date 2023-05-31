import { Application, Container, DisplayObject, Sprite, Texture, Ticker } from 'pixi.js';
import * as PIXI from 'pixi.js';

export class MatrixContainer extends Container {
  private matrix: Array<Array<number>> = [[], [], [], [], []];
  private spriteMatrix: Array<Array<Sprite>> = [[], [], [], [], []];
  private readonly spriteMatrixContainer: Container;

  constructor(public game: Application, public resources: any) {
    super();
    this.spriteMatrixContainer = new Container<DisplayObject>();

    this.addChild(this.spriteMatrixContainer);
    this.initMatrix();

    let value = 0;
    let stepValue = 0.01;

    game.ticker.add(() => {
      value += stepValue;
      console.log(Math.cos(value));
    });
  }

  private initMatrix() {
    // init matrix random
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < 5; j++) {
        this.matrix[i].push(Math.floor(Math.random() * 48 + 1));
      }
    }

    // set icons
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix[i].length; j++) {
        const targetIcon = new Sprite(Texture.from(`Icon${this.matrix[i][j]}.png`));
        targetIcon.position.set(i * 105, j * 105);
        targetIcon.scale.set(3, 3);
        targetIcon.interactive = true;
        targetIcon.cursor = 'pointer';
        targetIcon.on('pointerenter', () => {});
        targetIcon.on('pointerleave', () => {
          targetIcon.scale.set(3, 3);
        });
        targetIcon.anchor.set(0.5, 0.5);
        this.spriteMatrix[i].push(targetIcon);
        this.spriteMatrixContainer.addChild(targetIcon);
      }
    }

    this.spriteMatrixContainer.position.set(
      window.innerWidth / 2 - this.spriteMatrixContainer.width / 2,
      window.innerHeight / 2 - this.spriteMatrixContainer.height / 2,
    );

    console.group();
    console.log(this.matrix);
    console.log(this.spriteMatrix);
    console.log(this.spriteMatrixContainer.position);
    console.log(this.spriteMatrixContainer.width);
    console.log(this.spriteMatrixContainer.height);
    console.groupEnd();
  }
}
