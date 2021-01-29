using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KnowledgeSpace.ViewModels.Contents;

namespace KnowledgeSpace.WebPortal.Services
{
    public interface ICategoryApiClient
    {
        Task<List<CategoryVm>> GetCategories();
        Task<CategoryVm> GetCategoryById(int id);
    }
}
