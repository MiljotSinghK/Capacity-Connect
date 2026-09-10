# Capacity Connect 🎓🥇

> A Competency-Centric Digital Capacity Building \& Learning Management Portal
> **Submitted for Smart India Hackathon (SIH) 2026**
> **Problem Statement ID:** SIH26075 | **Theme:** Smart Education | **Category:** Software  
> **Team Name:** InnovateX

\---

## Team Members

* ***Miljot***
* ***Prince*** 
* ***Sakshi***
* ***Sejal***
* ***Bhrigav***
* ***Raghav***

\---

## 📃 Executive Summary

**Capacity Connect** is an intelligent, competency-centric learning and capacity-building ecosystem engineered to revolutionize enterprise and institutional training. While conventional Learning Management Systems (LMS) remain rigidly course-centric—tracking mere module completions—Capacity Connect transforms verified training evidence into real-time **Organizational Capacity Intelligence**.

By integrating automated gap detection, smart trainer-trainee matchmaking, and verifiable digital credentials, Capacity Connect empowers organizations to systematically bridge workforce skill gaps, maximize ROI on corporate/government training budgets, and ensure operational readiness.

\---

## 🔦 Key Highlights \& Comparison

|Parameter|Conventional LMS / Training|Capacity Connect Solution|
|-|-|-|
|**Core Paradigm**|Course-centric (Passive completion)|**Competency-centric** (Active capability)|
|**Skill Visibility**|Fragmented spreadsheets \& manual audits|**Real-time Live Skill Gap Dashboard**|
|**Trainer Allocation**|Manual scheduling delays \& heuristic bias|**Automated Tag-based Competency Mapping**|
|**Assessment \& Grading**|Manual grading taking days or weeks|**Instant automated reporting \& feedback loops**|
|**Tracking \& Intelligence**|Disconnected silo records|**Centralized Evidence Graph (Reduces effort by 80%)**|
|**Integrity \& Security**|Vulnerable to cheating \& token sharing|**Session-to-device fingerprinting \& Page Visibility API**|

\---

## 🔄 The End-to-End Capacity Value Loop

The core innovation is driven by the **Skill-Competency Intelligence Engine**:

```text
\[ 1. Role Needs ]  ──► \[ 2. Skill Profiling ] ──► \[ 3. Gap Detection ]
       ▲                                                    │
       │                                                    ▼
\[ 6. Certify \& Update ] ◄── \[ 5. Learning \& Assess ] ◄── \[ 4. Smart Matching ]
```

1. **Role Needs**: Define organizational roles, mandatory competencies, and compliance criteria.
2. **Skill Profiling**: Dynamic onboarding mapping employees' current proficiencies and learning aspirations.
3. **Gap Detection**: Real-time evidence analysis detecting acute competency and compliance deficiencies.
4. **Smart Matching**: Algorithmic recommendation pairing trainees with high-impact courses and certified trainers.
5. **Learning \& Assessment**: Modular interactive learning, topic-level MCQs, and hands-on validation.
6. **Certify \& Update**: Automated digital certification issuance and immediate update to the live Organizational Capacity Graph.

\---

## 👥 Role-Based Capabilities

### 👨‍🎓 Trainee ("Learn. Practice. Prove.")

* **Dynamic Skill Profile**: Build and maintain individual capability portfolios.
* **Curated Learning Journeys**: Enroll in personalized tracks addressing identified skill gaps.
* **Topic-Wise MCQs**: Attempt adaptive modular assessments with instant scoring.
* **Progress Tracking**: Visualize growth milestones, readiness percentiles, and pre- vs. post-training gains.
* **Verified Credentials**: Earn tamper-proof digital certificates validating domain mastery.

### 👨‍🏫 Trainer ("Teach. Assess. Mentor.")

* **Curriculum Studio**: Effortlessly author courses, organize syllabi, and upload structured resources (PDFs, docs, rich media).
* **Assessment Engine**: Generate automated topic quizzes and benchmark tests.
* **Learner Insights**: Monitor batch progress curves and identify trainees who require mentorship.
* **Automated Evaluation**: Dramatically reduce manual grading overhead through automated rubric processing.

### 🛡️ Admin / HR / Leadership ("Manage. Govern. Ensure.")

* **Workforce Capacity Intelligence**: Monitor department-wide skill gap heatmaps and capability readiness over time.
* **Smart Trainer Allocation**: Match in-house or external subject matter experts to organizational priorities.
* **Governance \& Compliance**: Enforce GIGW 3.0 / OWASP compliance, manage role permissions, and track expiring certifications.
* **Executive Dashboards**: Export data-backed reporting for corporate training budgets and government skilling audits.

\---

## 🏗️ Technical Architecture \& Stack

Capacity Connect employs a modern, decoupled microservices-ready architecture:

```text
┌─────────────────────────────────────────────────────────────┐
│                 EXPERIENCE / FRONTEND LAYER                 │
│         React.js  •  Bootstrap 5  •  Offline-First PWA      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTPS / RESTful APIs / JWT
┌──────────────────────────────▼──────────────────────────────┐
│                             APPLICATION / BACKEND LAYER              │
│       Node.js       •       Express.js       •       RBAC Engine     │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      DATABASE \& STORAGE                     │
│         MySQL / Cloud SQL (Relational)  •  Indexed Tables    │
└─────────────────────────────────────────────────────────────┘
```

### 💻 Technology Stack

* **Frontend**: React.js, HTML5, Bootstrap 5 (Responsive, cross-device optimized, accessible UI).
* **PWA Engine**: Service Workers for offline-first caching of course text and shells.
* **Backend**: Node.js, Express.js (High-throughput RESTful API architecture).
* **Database**: MySQL / SQLite with heavily indexed schema for low-latency assessment logging.
* **Caching \& Queueing**: Redis / RabbitMQ for decoupled asynchronous submission processing.
* **Media Delivery**: FFmpeg (HLS) adaptive bitrate transcoding delivered via CDN.
* **Security \& Auth**: JWT (JSON Web Tokens) with device fingerprinting, Bcrypt salted password hashing, RBAC.
* **Deployment \& Cloud**: Vercel (Frontend), Render / Containerized Node Services (Backend), Managed Cloud MySQL.

\---

## ⚡ Engineering Challenges \& Battle-Tested Solutions

|Challenge|Impact|Engineering Mitigation Strategy|
|-|-|-|
|**High DB Concurrency**|Deadlocks during company-wide simultaneous MCQ submissions.|Implemented **Redis / RabbitMQ** queues to buffer incoming payloads and perform bulk database writes asynchronously.|
|**Bandwidth Choking**|Video streaming lag in low-bandwidth or remote training zones.|Transcoding media using **FFmpeg into HLS streams (360p / 720p)** for dynamic adaptive bitrate streaming.|
|**Cold Start in Matching**|Inaccurate recommendations on Day 1 before historical metrics accrue.|Implemented **heuristic tag-based competency mapping** initially, gracefully transitioning into ML recommendation models.|
|**Assessment Integrity**|Session hijacking, tab switching, and illicit token reuse.|Bound JWTs to client **device fingerprints** and utilized the HTML5 **Page Visibility API** to flag/pause exams on tab switching.|

\---

## 🚀 Getting Started (Local Development)

### Prerequisites

* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher
* **MySQL Server**: `v8.0` or higher



### Clone the Repository

```bash
git clone https://github.com/InnovateX/capacity-connect.git
cd capacity-connect
```



\---

## 👥 InnovateX Team \& Acknowledgments



Developed with passion by **Team InnovateX** for the **Smart India Hackathon 2026**.



