import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {IBowlingFrame} from "../ibowling-frame.model";
import {BowlingService} from "../bowling.service";

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.scss']
})
export class BowlingComponent implements OnInit {

  activeFrame: any;
  frameForm: IBowlingFrame = {};
  frames: IBowlingFrame[] = [];
  loading: boolean = false;
  scoreboard = <any>{
    frames: []
  };

  constructor(private toastr: ToastrService, private bowlService: BowlingService) {
  }

  ngOnInit(): void {
    this.frames = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    this.activeFrame = 0;
    this.__resetForm();
    this.__resetFrames();
  }

  private __resetForm() {
    this.frameForm = {firstRoll: null, secondRoll: null, thirdRoll: null};
  }

  private __resetFrames() {
    this.frames.fill({firstRoll: 0, secondRoll: 0, thirdRoll: 0});
  }

  saveFrame(frame: IBowlingFrame): void {
    console.log(this.activeFrame);
    if (this.activeFrame <= 9) {
      this.frames[this.activeFrame] = Object.assign({}, frame);
      this.frames[this.activeFrame].thirdRoll = this.frames[this.activeFrame].thirdRoll || 0;
      this.scoreboard.frames = this.frames;
      this.bowlService.computeScore(this.scoreboard).subscribe((score: number) => {
        this.frames[this.activeFrame].score = score;
        this.activeFrame = Math.min(10, this.activeFrame + 1);
        console.log(this.frames);
      });
    } else {
      this.toastr.warning('Bowling Update:', 'There are no more frames left. Please start a new game!');
    }
  }

  restartFrames() {
    this.__resetForm();
    this.__resetFrames();
    this.activeFrame = 0;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    this.toastr.success('Bowling Update:', 'Reloaded Scorecard successfully!');
  }

  displayScore(frame: IBowlingFrame, idx: number): string | number {
    return (this.activeFrame - 1 == idx && (frame.firstRoll === 10 || frame.firstRoll + frame.secondRoll === 10) && this.activeFrame < 9) ? '' : frame.score;
  }

  displayValue(frame: IBowlingFrame, idx: number): string | number {
    if ((idx === 1 && frame.firstRoll === 0) ||
      (idx === 2 && frame.secondRoll === 0) ||
      (idx === 3 && frame.thirdRoll === 0)) return '';

    if ((idx === 2 && frame.secondRoll === 10 && this.activeFrame === 9)) return 'X';
    if (idx < 3) {
      if ((frame.firstRoll === 10 && idx === 1) || (frame.secondRoll === 10 && this.activeFrame >= 9 && idx === 2)) return 'X';
      else if ((frame.firstRoll === 10 && this.activeFrame < 9 && idx === 2)) return '';
      else if ((frame.firstRoll + frame.secondRoll) == 10) return (idx === 1) ? frame.firstRoll : '/';
        else return idx === 1 ? frame.firstRoll : frame.secondRoll;
    } else {
      return (frame.thirdRoll === 10) ? 'X' : frame.thirdRoll;
    }
  }

}
