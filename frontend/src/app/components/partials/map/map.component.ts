import { Component, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { Marker,Map, map, LatLngTuple, tileLayer, icon, LatLng, marker, LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  order!:Order;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://cdn4.iconfinder.com/data/icons/basic-12/614/17_-_Location-512.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATING:LatLngTuple = [51.505, -0.09];
  @ViewChild('map', {static:true})
  mapRef!: ElementRef;

  map!:Map;
  currentMarker!:Marker;

  constructor(private locationService:LocationService) {}

  ngOnInit(): void {
    this.initializedMap();
  }

  initializedMap()
  {
    if(this.map)
    {
      return;
    }

    this.map = map(this.mapRef.nativeElement,{
      attributionControl:false,
    }).setView(this.DEFAULT_LATING, 1);

    tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation()
  {
    this.locationService.getCurrentLocation().subscribe({
      next:(latlng) =>{
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    })
  }

  setMarker(latlng:LatLngExpression)
  {
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker)
    {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON,
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
      console.log(this.currentMarker.getLatLng())
    })
  }

  set addressLatLng(latlng: LatLng){
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
  }

}
