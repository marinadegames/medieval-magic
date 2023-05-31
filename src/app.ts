import * as PIXI from 'pixi.js';
import { Application, Assets } from 'pixi.js';
import { assetsMap } from './assetsMap';
import './global.scss';
import { MatrixContainer } from './objects/MatrixContainer';

class App {
  private readonly game: Application;

  constructor() {
    this.game = new PIXI.Application({
      width: innerWidth,
      height: innerHeight,
      backgroundColor: 0x000000,
    });
    document.body.appendChild(this.game.view as HTMLCanvasElement);

    this.loadAssets();
  }

  private loadAssets() {
    assetsMap.sequences?.forEach((seq) => {
      Assets.load(seq.url).then((resources) => {
        this.startGame(resources);
      });
    });
  }

  private startGame(resources: any) {
    console.log('START GAME');
    console.log(resources);

    this.game.stage.addChild(new MatrixContainer(this.game, resources));
  }
}

new App();
