using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeSpace.WebPortal.Models;
using KnowledgeSpace.WebPortal.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KnowledgeSpace.WebPortal.Controllers
{
    public class KnowledgeBaseController : Controller
    {
        private readonly IKnowledgeBaseApiClient _knowledgeBaseApiClient;
        private readonly ICategoryApiClient _categoryApiClient;
        private readonly IConfiguration _configuration;
        public KnowledgeBaseController(IKnowledgeBaseApiClient knowledgeBaseApiClient, IConfiguration configuration,
            ICategoryApiClient categoryApiClient)
            {
                _knowledgeBaseApiClient = knowledgeBaseApiClient;
                _configuration = configuration;
                _categoryApiClient = categoryApiClient;
            }
        public async Task<IActionResult> ListByCategoryId(int id, int page = 1)
        {
            var pageSize = int.Parse(_configuration["PageSize"]);
            var category = await _categoryApiClient.GetCategoryById(id);
            var data = await _knowledgeBaseApiClient.GetKnowledgeBaseByCategoryId(id, page, pageSize);
            var viewModel = new ListByCategoryIdViewModel()
            {
                Result = data,
                Category = category
            };
            return View(viewModel);
        }

    }
}
