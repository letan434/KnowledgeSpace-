﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KnowledgeSpace.ViewModels.Contents
{
    public class KnowledgeBaseQuickVm
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }
        public string CategoryAlias { get; set; }

        public string CategoryName { get; set; }

        public string Title { get; set; }

        public string SeoAlias { get; set; }

        public string Description { get; set; }

        public int? ViewCount { get; set; }

        public DateTime CreateDate { get; set; }
        public int? NumberOfVotes { get; set; }

    }
}