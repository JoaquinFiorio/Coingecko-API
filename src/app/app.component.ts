import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';

interface Coin {
  id: string;
  name: string;
  symbol:string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  filteredCoins: Coin[] = [];
  coins: Coin[] = [];
  toles: string [] = [
    "#",
    "Coin",
    "Price",
    "Price Change",
    "24h Volume",
  ]

  searchText = "";

  constructor(private http: HttpClient){

  }
  //para que vaya viendo lo que se va escribiendo con NGMODEL
  searchCoin(){
    console.log(this.searchText);
    this.filteredCoins = this.coins.filter((coin) => coin.name.toLowerCase().includes(this.searchText.toLowerCase())
    || coin.symbol.toLowerCase().includes(this.searchText.toLowerCase()) );
  }

  ngOnInit(){
    this.http.get<Coin[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .subscribe((res) => {
      console.log(res);
      //El arreglo no sabe que tipo de datos esta almacenando res por eso la interface
      this.coins = res;
      this.filteredCoins = res;
    })
  }



}
