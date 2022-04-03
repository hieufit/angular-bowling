import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IBowlingFrame} from "../ibowling-frame.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-bowling-form',
  templateUrl: './bowling-form.component.html',
  styleUrls: ['./bowling-form.component.scss']
})
export class BowlingFormComponent implements OnInit {
  @Input() frame: IBowlingFrame = { firstRoll: null, secondRoll: null };
  @Input('currentFrame') frameIndex: number = 0;
  @Output() onSave: EventEmitter<IBowlingFrame> = new EventEmitter<IBowlingFrame>();
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.frameIndex);
    this.frame = {
      firstRoll:  null,
      secondRoll: null,
      thirdRoll:  null
    }
  }

  onSubmit($event: Event) {
    $event.preventDefault();
    const score = this.frame.firstRoll + this.frame.secondRoll;
    if((this.frameIndex < 9 && (score > 10)) || (this.frameIndex === 9 && (score > 10 && score < 20))) {
      this.toastr.error('Bowling Frame Form:', 'Provided values are invalid. You cannot bowl more than 10 pins in two rolls.');
    } else {
      this.onSave.emit(this.frame);
    }

  }

}
