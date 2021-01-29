import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CommentsComponent } from './comments/comments.component';
import { KnowledgeBasesComponent } from './knowledge-bases/knowledge-bases.component';
import { ReportsComponent } from './reports/reports.component';
import { AuthGuard } from '@app/shared';
import { KnowledgeBasesDetailComponent } from '@app/protected-zone/contents/knowledge-bases/knowledge-bases-detail/knowledge-bases-detail.component';

const routes: Routes = [
    {
        path: '',
        component: KnowledgeBasesComponent,
        data: {
            functionCode: 'CONTENT_KNOWLEDGEBASE'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases',
        component: KnowledgeBasesComponent,
        data: {
            functionCode: 'CONTENT_KNOWLEDGEBASE'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases-detail/:id',
        component: KnowledgeBasesDetailComponent,
        data: {
            functionCode: 'CONTENT_KNOWLEDGEBASE'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'categories',
        component: CategoriesComponent,
        data: {
            functionCode: 'CONTENT_CATEGORY'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/:knowledgeBaseId/comments',
        component: CommentsComponent,
        data: {
            functionCode: 'CONTENT_COMMENT'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/comments',
        component: CommentsComponent,
        data: {
            functionCode: 'CONTENT_COMMENT'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/:knowledgeBaseId/reports',
        component: ReportsComponent,
        data: {
            functionCode: 'CONTENT_REPORT'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/reports',
        component: ReportsComponent,
        data: {
            functionCode: 'CONTENT_REPORT'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/:knowledgeBaseId/comments',
        component: CommentsComponent,
        data: {
            functionCode: 'CONTENT_COMMENT'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'knowledge-bases/comments',
        component: CommentsComponent,
        data: {
            functionCode: 'CONTENT_COMMENT'
        },
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentsRoutingModule {}
