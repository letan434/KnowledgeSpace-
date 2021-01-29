﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KnowledgeSpace.ViewModels.Contents;

namespace KnowledgeSpace.WebPortal.Services
{
    public interface IKnowledgeBaseApiClient
    {
        Task<List<KnowledgeBaseQuickVm>> GetPopularKnowledgeBases(int take);
        Task<List<KnowledgeBaseQuickVm>> GetLatestKnowledgeBases(int take);
        Task<List<LabelVm>> GetPopularLabels(int take);
    }
}
