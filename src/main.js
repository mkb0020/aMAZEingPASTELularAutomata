import { Game } from "./game.js";
import { Renderer } from "./renderer.js";
import { AudioManager } from "./audio.js";
import { UI } from "./ui.js";

const canvas = document.getElementById("gameCanvas");
const renderer = new Renderer(canvas);
const audio = new AudioManager();
const ui = new UI();

const game = new Game(renderer, audio, ui);
game.start();