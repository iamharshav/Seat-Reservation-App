import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent implements OnInit {

  primeRows: string[] = ['A', 'B', 'C'];
  primeCols: number[] = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12];


  silverRows: string[] = ['D', 'E', 'F', 'G','H', 'I', 'J'];
  silverCols: number[] = [1, 2, 3, 4, 5, 6, 7, 8];

  reserved: string[] = [];
  tempSelected: string[] = [];
  finalSeats: string[] = [];
  selectionMode = true;
  ticketQuantity: number;
  userList: any[] = [];
  user: string;
  constructor() { }

  ngOnInit() {
    var localItem = localStorage.getItem('reservedSeats');
    if (localItem != null) {
      this.reserved = JSON.parse(localStorage.getItem('reservedSeats'));
    }
    
    var localItem1 = localStorage.getItem('userList');
    if (localItem1 != null) {
      this.userList = JSON.parse(localStorage.getItem('userList'));
    }
  }

  fnSelectSeat(seatPos) {
    console.log(seatPos);


    var index = this.tempSelected.indexOf(seatPos);

    console.log(index);
    if (index !== -1) {
      this.tempSelected.splice(index, 1);
    }
    else if (this.tempSelected.length < this.ticketQuantity) {
      //push to selected array only if it is not reserved
      //  if(this.reserved.indexOf(seatPos) === -1)
      this.tempSelected.push(seatPos);
    }

    else {
      alert('You cant book anymore tickets');
    }
  };




  confirmSeat() {
    this.reserved=this.reserved.concat(this.tempSelected);
    if(this.tempSelected.length==0){
      alert('Please select your seats');
    }else{
        alert("Selected Seats: " + this.tempSelected);


     // send data to local storage

    localStorage.setItem('reservedSeats', JSON.stringify(this.reserved));


    var user = {
      name: this.user,
      seatQuantity: this.ticketQuantity,
      tickets: this.tempSelected

    };
    this.userList.push(user);
    localStorage.setItem('userList', JSON.stringify(this.userList));
    this.tempSelected = [];
    this.user='';
    this.ticketQuantity=null;
    }
   
    

  }

  tempSelect(seatnum) {

    return (this.tempSelected.includes(seatnum))
    console.log(this.tempSelected);

  }

  reserve(seatnum) {

    return (this.reserved.includes(seatnum))
    
  }

  enableSelectionMode() {
    this.selectionMode = false;
  }
  disableSelectionMode() {
    this.selectionMode = true;
  }

}
