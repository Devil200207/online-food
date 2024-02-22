import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  cartQuantity = 0;
  user!:User;

  constructor(cartService: CartService, private userService: UserService)
  {
    cartService.getCartObserable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalQuantity;
    })

    userService.userObserable.subscribe((user) => {
      this.user = user;
    })


  }

  logOut()
  {
    this.userService.logout();
  }

  get isAuth()
  {
    return this.user.token;
  }

}
