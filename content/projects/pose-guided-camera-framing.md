---
title: "Pose-Guided Camera Framing — Computer Vision Guidance for Solo Photography"
label: "Computer vision research"
summary: "A multi-task vision prototype that combines image features and human pose to assess framing and generate camera-adjustment instructions."
role: "Project lead and primary researcher/developer"
contribution: "Annotation, modeling, evaluation, browser inference, and research communication."
stack: "Python · PyTorch · MediaPipe · ONNX"
outcome: "84.1% primary-split accuracy; 87.5% agreement on 96 evaluated instructions."
featured: true
order: 6
---

*From image and pose measurements to actionable framing guidance.*

## Project header

**Category:** Computer vision research prototype. **Role:** Project lead and primary researcher/developer. **Timeline:** Documented implementation and research artifacts from April–August 2026. **Status:** Completed prototype and EFAST presentation; no accepted/publication claim. **Context:** Metropolitan University, Bangladesh.

## Overview and problem

Solo photographers must judge their position in the frame while also operating a camera. The research asks whether a model can predict interpretable framing measurements and convert deviations into useful adjustment instructions, rather than returning an unexplained quality score.

## Solution and my contribution

I implemented the annotation, training, inference, and evaluation pipeline and prepared the analysis, manuscript, figures, and presentation. MediaPipe provides pretrained pose extraction; ConvNeXt supplies an ImageNet-pretrained visual backbone; COCO supplies source images. Course-level submission and presentation guidance is documented separately from model development.

## Technical architecture

MediaPipe extracts 33 landmarks with x, y, and visibility values. ConvNeXt-Base processes 224×224 images; a 99→256→128 MLP encodes pose. A fusion layer feeds composition-score regression, binary framing classification, and four framing-metric outputs: headroom, horizontal position, vertical position, and body-to-frame ratio. A deterministic rule engine maps those metrics to camera instructions. The browser demonstration extracts pose, runs the exported ONNX graph, draws overlays, and displays results through ONNX Runtime Web.

## Key engineering work

The collection contains 1,500 COCO images and 1,088 completed usable annotations. Stratified train/validation/test sets contain 761/163/164 images. Training combines the three tasks, with saved evaluation outputs and paired five-seed comparisons. The browser path uses WASM execution with SIMD and bounded threads because WebGL could not resolve operators in the dynamically quantized graph.

## Challenges and solutions

Browser operator incompatibility was addressed through WASM. Small-data overfitting was monitored with validation checkpoint selection, augmentation, and dropout. Reviewer-response revisions clarified that labels and scores are geometry-derived heuristics, including the circularity of pose-related targets. Five-seed evaluation led to removal of a general pose-fusion accuracy claim rather than hiding the negative finding.

## Technology stack

**Research:** Python 3.12, PyTorch 2.6, timm, ConvNeXt-Base, CUDA. **Pose/data:** MediaPipe Pose, COCO 2017, annotation JSON. **Demo:** ONNX, ONNX Runtime Web, JavaScript, WASM. **Outputs:** Manuscript, figures, slides, evaluation reports.

## Results and limitations

The primary seed-42 test recorded 84.1% accuracy, perfect-class F1 0.827, ROC-AUC 0.888, and composition-score MAE 1.27 on the geometry-derived 1–10 scale. Instruction agreement was 84/96, or 87.5%, on the needs-fixing subset. Across five seeds, pose fusion averaged 79.0% ± 2.9% accuracy versus 79.5% ± 1.7% for visual-only ConvNeXt. This does not establish a general pose-fusion classification advantage. Single-person framing, missing/occluded landmarks, heuristic labels, and lack of physical closed-loop camera tests bound the results.

## Architecture figure

![ConvNeXt visual and MediaPipe pose branches feeding multi-task heads and an instruction engine](/images/projects/pose-architecture.png)

The figure’s aesthetic head predicts a geometry-derived composition score. Camera adjustment denotes instruction output; physical actuation was not evaluated.
