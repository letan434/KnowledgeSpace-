using System;
using KnowledgeSpace.ViewModels;
using KnowledgeSpace.ViewModels.Contents;

namespace KnowledgeSpace.WebPortal.Models
{
    public class ListByCategoryIdViewModel
    {
        public Pagination<KnowledgeBaseQuickVm> Result {  set; get; }
        public CategoryVm Category { get; set; }
    }
}
