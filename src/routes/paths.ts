import { BookVisitComponent } from '../app/book-visit/book-visit.component'
import { ProductsComponent } from '../app/products/products.component'
import { ContactComponent } from '../app/contact/contact.component'
import { DeliveryDataComponent } from '../app/delivery-data/delivery-data.component'
import { VisitsComponent } from '../app/visits/visits.component'
import { ChangePasswordComponent } from '../app/change-password/change-password.component'
import { LoginComponent } from '../app/login/login.component'
import { RegisterComponent } from 'src/app/register/register.component'

import { AuthGuard } from '../app/auth.guard'


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
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
]