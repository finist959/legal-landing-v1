FINAL SPECIFICATION V4.0
Legal Lead Generation Landing Page + AI Intake Assistant
Production-Ready Unified Master Spec
1. Project Overview
Project Name

Legal LeadGen Landing Page + AI Intake Assistant

Project Type

Conversion-focused landing page for legal services.

Primary Launch Market

Saint Petersburg, Russia

Core Mission

Generate qualified inbound legal leads at profitable acquisition cost through a fast, trust-driven, mobile-first acquisition funnel.

Core Principle

This is not a branding website.
This is a measurable revenue engine.

2. Business Goals
Primary KPIs
Qualified leads per day
Cost per qualified lead (CPL)
Lead-to-client conversion rate
Revenue per traffic channel
Secondary KPIs
Hero CTA CTR > 5%
AI Assistant open rate > 25%
Landing page conversion > 2%
Callback SLA < 10 minutes
Mobile bounce rate below benchmark
3. Monetization Model
V1

Single lawyer / legal team receives all leads.

V2

Multiple partner firms receive leads manually.

V3

Automated routing by:

city
category
urgency
lead score
business hours
4. Target Audience

Users searching urgent or important legal help:

Family disputes
ДТП / accidents
Debt recovery
Real estate issues
Consumer rights
Business legal support
General consultations
User Emotional State

Often:

stressed
uncertain
urgent
skeptical
wants clear next step fast

UX must reduce anxiety immediately.

5. Page Structure
5.1 Hero Section
Headline

Юрист в Санкт-Петербурге

Subheadline

Понятный следующий шаг уже сегодня. Быстро, конфиденциально, по делу.

Primary CTA

Разобрать ситуацию

(opens AI assistant)

Secondary CTA

Срочно нужен звонок

(scrolls to callback form)

Trust Strip
Ответ в течение 10 минут
Конфиденциально
Работаем по Санкт-Петербургу
Практический опыт
5.2 Services Grid (6 cards)
Семейные споры
ДТП
Долги
Недвижимость
Права потребителей
Бизнес сопровождение

Each card CTA:
Получить помощь

5.3 Benefits Section
Быстрый ответ
Честная оценка ситуации
Понятный план действий
Конфиденциальность
5.4 Trust / Social Proof Block

Include when assets available:

Real reviews
Number of cases handled
Years of experience
Team photo
Real specialist names
Work process steps
5.5 Final Callback Section
Title

Чем раньше начнём — тем больше возможностей защитить ваши интересы.

Form Fields
Name
Phone
Consent checkbox
Button

Перезвоните мне

5.6 Sticky Mobile CTA

Fixed bottom bar:

Получить помощь
Позвонить
5.7 Floating AI Assistant

Bottom-right floating widget.

Persistent across session.

6. AI Intake Assistant
Assistant Name

Помощник юриста

Greeting

Здравствуйте. Кратко опишите ситуацию — подскажем возможные действия и как лучше двигаться дальше.

Funnel Logic
Step 1 — Category
Семья
ДТП
Долги
Недвижимость
Бизнес
Другое
Step 2 — Urgency
Сегодня
На этой неделе
Можно позже
Step 3 — Location
Санкт-Петербург
Рядом
Другой город
Step 4 — Contact

Phone required.

Step 5 — Confirmation

Спасибо, специалист свяжется с вами.

Rules
Maximum 4 steps before contact capture
Human contact shortcut always visible
Close button always visible
State saved for 30 min
Resume flow after reopen
Fallback Behavior
User types free text

Parse intent and continue flow.

User closes widget

Restore previous state on reopen.

Inactive 30 sec

Prompt:
Остались вопросы? Оставьте номер — свяжемся.

Submission error

Buttons:

Повторить
Заказать звонок
7. Lead Qualification Engine
Score Model (0–100)
Category Weight
ДТП / Family = +30
Debt / Real Estate = +20
Business = +15
Other = +10
Urgency
Today = +40
This week = +20
Later = +0
Location
SPB = +20
Nearby = +10
Other = +0
Name provided

+10

Qualified Lead Threshold

50+

Auto Reject Rules
Invalid phone
Spam repeat submissions
Low intent + outside geography
Bot traffic
8. Lead Delivery Pipeline
Priority Routing
Telegram instant alert
Email backup
Google Sheets log
CRM later
SLA Escalation
5 min no response → reminder
10 min → escalation
15 min → on-call alert
Lead Payload
Timestamp
Source
Category
Urgency
Location
Score
Name
Phone
UTM data
Device
Session ID
9. Analytics System
Mandatory Events
hero_primary_cta
hero_secondary_cta
service_click
sticky_cta_click
assistant_open
assistant_step
assistant_submit
callback_submit
phone_click
telegram_click
whatsapp_click
scroll_50
scroll_75
Tools
GA4
Yandex Metrika
Reports

Weekly dashboard:

CPL
Conversion by source
Mobile vs desktop
Qualified lead %
Best service category
Best ad campaign
10. SEO Specification
Metadata
title
description
canonical
robots
OpenGraph
Primary Keywords
юрист спб
юрист санкт-петербург
консультация юриста спб
адвокат срочно спб
юридическая помощь спб
Structured Data (Mandatory)
LegalService
LocalBusiness

Include:

phone
address
area served
hours
sameAs
services
11. Technical Stack
Frontend
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui optional
Backend
API routes
Validation layer
Lead dispatch service
Hosting
Vercel
12. Suggested Folder Structure

app/
layout.tsx
page.tsx
privacy/page.tsx
api/leads/route.ts

components/
HeroSection.tsx
ServicesGrid.tsx
TrustStrip.tsx
Benefits.tsx
CallbackForm.tsx
StickyCTA.tsx
FloatingAssistant.tsx
CookieBanner.tsx

lib/
analytics.ts
leadRouter.ts
validation.ts
rateLimit.ts
schema.ts
config.ts

tests/
assistant.spec.ts
lead.spec.ts

13. Security & Compliance
Mandatory
Consent checkbox
Privacy page
Secure env variables
Server-side validation
Anti-spam filtering
Anti-Spam

Frontend:

honeypot
captcha

Backend:

5 submissions/IP /10 min
3 submissions/phone /hour
14. Performance Requirements
Mobile load < 3 sec
Lighthouse > 70 mobile
Lazy load assistant
Compressed assets
Minimal JS hydration
15. UX Rules
Large tap targets
One primary CTA per screen
Human help visible everywhere
No overwhelming forms
Fast trust signals above fold
Short readable sections
Clear next action at all times
16. Open Business Decisions
Single lawyer or partner network?
Telegram only or WhatsApp too?
Working hours exact SLA?
Need call tracking?
CRM now or later?
Which service niche highest margin?
Real review assets available?
17. Pre-Launch Checklist
Business
Intake team ready
Response process ready
Phone lines active
Telegram alerts configured
Technical
Leads submitting
Tracking works
Consent works
Assistant works
Mobile sticky CTA works
SEO metadata live
QA
Test phones validated
Events verified
Spam limits verified
Page speed checked
18. Launch Strategy
Phase 1

Launch broad Saint Petersburg page.

Phase 2

Clone high-performing niche pages:

ДТП lawyer SPB
Family lawyer SPB
Debt lawyer SPB
Phase 3

Expand to new cities.

19. Core Success Principle

A landing page does not make money.

A tracked, trusted, fast-response lead system does.

20. Final Founder Recommendation

Build immediately.

But launch only when these 5 systems are ready:

Lead routing
Human response SLA
Analytics tracking
Trust proof assets
Spam protection
FINAL STATUS
Readiness Score

9.3 / 10

Ready For:
UI design
Frontend development
Backend implementation
Paid traffic launch
SEO rollout
Scaling framework