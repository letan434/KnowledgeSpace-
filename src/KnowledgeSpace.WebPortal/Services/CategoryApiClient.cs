using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using KnowledgeSpace.ViewModels.Contents;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace KnowledgeSpace.WebPortal.Services
{
    public class CategoryApiClient : ICategoryApiClient
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        public CategoryApiClient(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        public async Task<List<CategoryVm>> GetCategories()
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_configuration["BackendApiUrl"]);
            var response = await client.GetAsync("/api/categories");
            var categories = JsonConvert.DeserializeObject<List<CategoryVm>>(await response.Content.ReadAsStringAsync());
            return categories;
        }
    }
}
