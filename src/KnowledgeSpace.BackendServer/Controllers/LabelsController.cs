﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KnowledgeSpace.BackendServer.Data;
using KnowledgeSpace.ViewModels.Contents;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KnowledgeSpace.BackendServer.Controllers
{
    public class LabelsController : BaseController
    {
        private readonly ApplicationDbContext _context;
        public LabelsController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("popular/{take:int}")]
        [AllowAnonymous]
        public async Task<List<LabelVm>> GetPopularLabels(int take)
        {
            var query = from l in _context.Labels
                        join lib in _context.LabelInKnowledgeBases on l.Id equals lib.LabelId
                        group new {l.Id, l.Name} by new {l.Id, l.Name} into g
                        select new {
                            g.Key.Id,
                            g.Key.Name,
                            Count = g.Count()
                        };
            var labels = await query.OrderByDescending(x => x.Count)
                .Take(take)
                .Select(l => new LabelVm()
                {
                    Id = l.Id,
                    Name = l.Name
                }).ToListAsync();
            return labels;
        }

    }
}
