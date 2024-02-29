import { LatLng } from "leaflet";
import { CartItem } from "./Cartitem";

export class Order{
  id!: number;
  items!: CartItem[];
  totalPrice!:number;
  name!:string;
  address!:string;
  addressLatLng?:LatLng;
  paymenId!:string;
  createdAt!:string
  status!:string;
}
