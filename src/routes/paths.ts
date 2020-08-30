import { BookVisitComponent } from '../app/components/book-visit/book-visit.component'
import { ProductsComponent } from '../app/components/products/products.component'
import { ContactComponent } from '../app/components/contact/contact.component'
import { DeliveryDataComponent } from '../app/components/delivery-data/delivery-data.component'
import { VisitsComponent } from '../app/components/visits/visits.component'
import { ChangePasswordComponent } from '../app/components/change-password/change-password.component'
import { LoginComponent } from '../app/components/login/login.component'
import { RegisterComponent } from 'src/app/components/register/register.component'

import { AuthGuard } from '../app/auth.guard'
import { LogoutComponent } from 'src/app/components/logout/logout.component'
import { ProductComponent } from 'src/app/components/product/product.component'
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component'
import { CartComponent } from 'src/app/components/cart/cart.component'
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component'
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component'


export default [
    {
        path: '',
        component: ProductsComponent
    },
    {
        path: 'book-visit',
        component: BookVisitComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'delivery-data',
        component: DeliveryDataComponent
    },
    {
        path: 'visits',
        component: VisitsComponent
    },
    {
        path: 'change-password',
        component: ChangePasswordComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'product/:name/:_id',
        component: ProductComponent,
    },
    {
      path: 'admin',
      component: AdminLoginComponent
    },
    {
      path: 'admin/dashboard',
      component: DashboardComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: '/404'
    }
]
