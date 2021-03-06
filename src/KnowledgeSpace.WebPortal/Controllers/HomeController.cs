﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using KnowledgeSpace.WebPortal.Models;
using KnowledgeSpace.WebPortal.Services;

namespace KnowledgeSpace.WebPortal.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IKnowledgeBaseApiClient _knowledgeBaseApiClient;

        public HomeController(ILogger<HomeController> logger, IKnowledgeBaseApiClient knowledgeBaseApiClient)
        {
            _logger = logger;
            _knowledgeBaseApiClient = knowledgeBaseApiClient;
        }

        public async Task<IActionResult> Index()
        {
            var latestKb = await _knowledgeBaseApiClient.GetLatestKnowledgeBases(6);
            var popularKb = await _knowledgeBaseApiClient.GetPopularKnowledgeBases(6);
            var labels = await _knowledgeBaseApiClient.GetPopularLabels(20);
            var viewmodel = new HomeViewModel()
            {
                LatestKnowledgeBases = latestKb,
                PopularKnowledgeBases = popularKb,
                PopularLabels = labels
            };
            return View(viewmodel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
