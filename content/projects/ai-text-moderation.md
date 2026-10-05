---
title: "AI Text Moderation — Five-Class Chat Classification with BERT-Tiny"
label: "Applied NLP course project"
summary: "A five-class moderation experiment with weighted BERT-Tiny training, baseline comparison, and local Flask/browser demonstrations."
role: "Team pipeline, training, and demo contributor"
contribution: "Preprocessing, weighted training, comparison, Flask demo, and reporting."
stack: "Python · PyTorch · scikit-learn · Flask · ONNX"
outcome: "Recorded transformer test accuracy 93.42%; macro F1 83.86%."
featured: true
order: 7
demo: "https://razibit.github.io/AI-Text-Moderation-Model/"
---

*Comparing a transparent baseline with a small transformer.*

## Project header

**Category:** Applied NLP course project. **Role:** Team contributor to pipeline, training, comparison, and demo work. **Timeline:** December 2025 course work; later repository/demo engineering in 2026. **Status:** Completed experiment with Flask and static browser demonstrations. **Team:** Rajib Dab, Md. Monsur Alam, Tanmoy Das.

## Overview and problem

Chat moderation includes rare harmful classes and repetitive or linked spam alongside many ordinary messages. Overall accuracy alone can hide weak performance on minority categories. The project evaluates a lightweight baseline against a small transformer and exposes both predictions for comparison.

## Solution and my contribution

My documented contributions include splitting and labeling support, masking utilities, BERT-Tiny/GPU configuration, model comparison, resilient loading, the Flask demonstration, and report/presentation assets. This was a three-person course project; I do not attribute every team task to myself. The current repository’s later browser demonstration is described as a project capability without claiming a personal task split not established by the reviewed history.

## Technical architecture

Preprocessing normalizes text, removes non-printable characters, masks URLs, emails and phone numbers, and excludes empty messages. The baseline uses 50,000 TF-IDF unigram/bigram features and class-balanced logistic regression. The transformer fine-tunes `prajjwal1/bert-tiny` with five outputs, 128-token inputs, inverse-frequency class weights, and CUDA-aware mixed precision. Evaluation generates reports, confusion matrices, per-class comparisons, timing, and error analyses.

The Flask application loads fitted baseline objects and a transformer checkpoint. A separate Vite browser app performs both predictions locally using exported Float64 baseline assets and an FP32 ONNX transformer with Hugging Face browser tooling; it does not call a prediction API.

## Key engineering work

The experiment maintains an explicit baseline and reports macro/per-class performance. Weighted loss addresses class imbalance. BERT-Tiny and mixed precision fit the documented RTX 3050 Laptop GPU with 4 GB VRAM. The demos show both models’ probabilities and timing rather than presenting a single unexplained label.

## Challenges and solutions

Limited GPU memory shaped the model/training choices. Minority classes required class-sensitive training and evaluation. Preprocessing masks common contact-data patterns, while the public browser build has a dedicated audit intended to keep raw chat files and sensitive examples outside its demo surface. This is not a guarantee that every privacy risk is eliminated.

## Technology stack

**Training/data:** Python, pandas, scikit-learn, PyTorch, Hugging Face Transformers. **Evaluation:** matplotlib, seaborn, comparison CSV. **Python demo:** Flask, joblib. **Browser demo:** JavaScript, Vite, Hugging Face browser Transformers, ONNX assets.

## Results and limitations

December 2025 documentation reports 646,151 messages and a 70/15/15 split. Saved evaluation records 93.42% transformer accuracy and 83.86% macro F1. Spam-text F1 rises from 30.12% to 65.29%, a 35.17 percentage-point gain. Dataset composition and labeling limit generalization; self-harm classification remains a research task requiring careful evaluation. Baseline macro-F1 differs between reports (71.27% versus 65.29%), so no aggregate macro-F1 gain is claimed. The supplied figures and metrics are recorded results, not newly rerun training.

## Recorded per-class comparison

![Saved baseline and BERT-Tiny F1 scores for five message classes](/images/projects/moderation-f1.png)

December 2025 recorded per-class results. The conflicting aggregate baseline macro-F1 is not used.
