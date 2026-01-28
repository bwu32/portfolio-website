---
date: "12/04/2025"
title: "Fortnite LinkedIn Auto-Poster"
type: "professional"
madeAt: "Personal"
category: ["AI / Machine Learning", "Software"]
builtWith: ["Python", "OpenCV", "Tesseract OCR", "Selenium", "OpenAI API", "AI Prompting", "Software Architecture", "Real-Time Detection", "Web Automation"]
link: "https://github.com/bwu32/fortnitelinkedinautoposter"
---

**Note: `This project is still WIP!!!`**

I built a tool that bridges the gap between gaming achievements and "professional" networking. Using a hybrid of Computer Vision and OCR, this Python-based bot monitors a live Fortnite stream, detects a "Victory Royale" in real-time, and automatically crafts and posts a humble-brag to LinkedIn using GPT-4.

## How it Works (The Pipeline)

The goal was a to create a super awesome app that will handle everything for you unless you set extra settings that require attention.

- **Real-Time Detection:** Implemented a detection engine using `OpenCV` and `Tesseract OCR`. The system constantly scrapes screen frames, looking for specific color histograms and text patterns associated with the "Victory Royale" banner.
- **The "Brain":** Once a win is confirmed, the app triggers the `OpenAI API`. I engineered several "personality profiles"—ranging from "Corporate Sycophant" to "Grindset Guru"—to generate hilarious, AI-generated captions that spin a Fortnite win into a lesson about leadership and synergy.
- **Automation Engine:** I architected a dual-mode posting engine.
    - **Full-Auto:** Selenium and the LinkedIn API handle the session persistence and image uploading without any user input.
    - **Semi-Auto:** A notification system that lets me approve the post before it goes live to my professional network.

## Technical Highlights

This project was less about the game and more about handling background processes and persistent web sessions.

- **Background Operation:** Optimized the script to run seamlessly in the background with minimal CPU overhead, ensuring it doesn't impact game performance (FPS) while active.
- **Session Persistence:** Used `Selenium` to maintain LinkedIn authentication, bypassing the need for frequent manual logins and handling the complex image-uploading flow on the LinkedIn web interface.
- **Prompt Engineering:** Spent significant time refining `AI Prompting` to ensure the generated posts hit that perfect level of "LinkedIn Cringe" that makes the joke land.

`Future Goal:` Porting the detection logic to a lightweight `Node.js` environment for even lower latency.