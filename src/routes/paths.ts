import { BookVisitComponent } from '../app/components/book-visit/book-visit.component'
import { ProductsComponent } from '../app/components/products/products.component'
import { ContactComponent } from '../app/components/contact/contact.component'
import { DeliveryDataComponent } from '../app/components/delivery-data/delivery-data.component'
import { VisitsComponent } from '../app/components/visits/visits.component'
import { ChangePasswordComponent } from '../app/components/change-password/change-password.component'
import { LoginComponent } from '../app/components/login/login.component'
import { RegisterComponent } from 'src/app/components/register/register.component'

import { AuthGuard } from '../app/auth.guard'
import { AdminGuard } from '../app/admin.guard'

import { LogoutComponent } from 'src/app/components/logout/logout.component'
import { ProductComponent } from 'src/app/components/product/product.component'
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component'
import { CartComponent } from 'src/app/components/cart/cart.component'
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component'
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component'
import { ProductsAdminComponent } from 'src/app/components/products-admin/products-admin.component'
import { ReservationsAdminComponent } from 'src/app/components/reservations-admin/reservations-admin.component'
import { OrdersAdminComponent } from 'src/app/components/orders-admin/orders-admin.component'
import { AdminLoginGuard } from 'src/app/admin-login.guard'
import { AdminUsersComponent } from 'src/app/components/admin-users/admin-users.component'
import { OrderComponent } from 'src/app/components/order/order.component'
import { AdminNewProductComponent } from 'src/app/components/admin-new-product/admin-new-product.component'
import { AdminTagsComponent } from 'src/app/components/admin-tags/admin-tags.component'
import { OwnerOfOrderGuard } from 'src/app/owner-of-order.guard'


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
      component: AdminLoginComponent,
      canActivate: [AdminLoginGuard]
    },
    {
      path: 'admin/dashboard',
      component: DashboardComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/products',
      component: ProductsAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/reservations',
      component: ReservationsAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/orders',
      component: OrdersAdminComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/users',
      component: AdminUsersComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'products/search/:phrase',
      component: ProductsComponent
    },
    {
      path: 'admin/products/new',
      component: AdminNewProductComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'admin/tags',
      component: AdminTagsComponent,
      canActivate: [AdminGuard]
    },
    {
      path: 'order/:id',
      component: OrderComponent,
      canActivate: [OwnerOfOrderGuard]
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
