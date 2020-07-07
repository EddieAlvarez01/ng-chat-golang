import { NgModule } from '@angular/core'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    imports: [
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule
    ],
    exports: [
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule
    ]
})
export class MaterialModule {

}