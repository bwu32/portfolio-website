---
date: "12/15/2025"
title: "scRNA-seq Hierarchical Classification Pipeline"
type: "professional"
madeAt: "UMD ENEE436"
category: ["AI / Machine Learning", "Academic"]
builtWith: ["Python", "Scikit-Learn", "AdaBoost", "Ensemble Learning", "Pandas", "Matplotlib"]
link: "/ml_paper.pdf"
---

Developed a hierarchical machine learning architecture to analyze single-cell RNA sequencing (scRNA-seq) data from tumor microenvironments. The project focused on the high-precision identification of cell types (Cancer, T-Cells, Fibroblasts) and the subsequent prediction of disease status (Tumor vs. Healthy Control) within those populations.

## Hierarchical Pipeline Architecture

Instead of a "flat" classifier, we formulated a two-layer system that mimics biological decision-making:

- **Layer 1: Cell Type Identification**
  - Utilized an ensemble majority voting system across five diverse base learners.
  - **Result:** Achieved **100% Accuracy** in distinguishing between Cancer, T-Cell, and Fibroblast populations.
- **Layer 2: Disease Status Prediction**
  - Applied an **AdaBoost** framework specifically to the non-cancer cells to predict if they originated from a tumor or a healthy control tissue.
  - **Result:** Achieved **87.5% Overall Accuracy**, with a specific focus on navigating the "noise" of healthy vs. tumor-associated stromal and immune cells.



## Technical Innovation: Strategic Weak Learners

A key discovery in this project was the performance gap between complex and simple models when dealing with the high dimensionality of genetic data.

- **AdaBoost Optimization:** Strategically chose **Decision Stumps (max_depth=1)** as weak learners. This approach outperformed complex models like Linear SVMs (**87.4% vs 71.6% accuracy**).
- **Class Imbalance:** Handled a severe data imbalance (76% tumor-associated cells) through strategic train-test splitting and the iterative re-weighting nature of the Boosting algorithm.
- **Dimensionality:** Managed high-dimensional scRNA-seq feature sets while maintaining model interpretability and preventing the overfitting typical of deep learning models on smaller biological datasets.

`Core Insight:` Hierarchical modeling allows for "perfect" separation of broad biological categories before tackling the more nuanced, high-variance task of disease status prediction.