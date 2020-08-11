import { BookVisitComponent } from '../app/book-visit/book-visit.component'
import { ProductsComponent } from '../app/products/products.component'
import { ContactComponent } from '../app/contact/contact.component'
import { DeliveryDataComponent } from '../app/delivery-data/delivery-data.component'
import { VisitsComponent } from '../app/visits/visits.component'
import { ChangePasswordComponent } from '../app/change-password/change-password.component'
import { LoginComponent } from '../app/login/login.component'
import { RegisterComponent } from 'src/app/register/register.component'

import { AuthGuard } from '../app/auth.guard'
import { LogoutComponent } from 'src/app/logout/logout.component'
import { ProductComponent } from 'src/app/product/product.component'
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component'


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
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
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
        path: 'product/:productName',
        component: ProductComponent,
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