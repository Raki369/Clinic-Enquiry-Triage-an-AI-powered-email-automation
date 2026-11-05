# Clinic Enquiry Triage: Test Set (12 fake emails)

All names, numbers and details are invented. Do not use real patient information.

**How to use:** send each email to the demo clinic Gmail, run it through the workflow, then fill in the Results table at the bottom.

---

## Group 1: Clear cases (5)

### T01: Appointment
**Subject:** Booking a check-up
**Body:**
Hi, this is Maria Santos. I'd like to book a general check-up with Dr Lee sometime next week, preferably in the morning. Thank you.

**Expected:** Appointment / Low

### T02: Billing
**Subject:** Question about my invoice
**Body:**
Hello, I received invoice #4821 for my visit last month, but I think I was charged twice for the consultation. Could someone please check this? Thanks, James Patel.

**Expected:** Billing / Low or Medium

### T03: Prescription/Referral
**Subject:** Repeat prescription
**Body:**
Hi, I'm running low on my blood pressure tablets and need a repeat prescription. I'm on the same dose as before. Regards, Anita Rao.

**Expected:** Prescription/Referral / Low or Medium

### T04: General Info
**Subject:** Opening hours
**Body:**
Hello, could you tell me what time the clinic opens on Saturdays and whether there is parking nearby? Thanks.

**Expected:** General Info / Low

### T05: Urgent/Clinical
**Subject:** Please help
**Body:**
I have had severe chest pain since this morning and it's hard to breathe. It's spreading to my left arm. What should I do?

**Expected:** Urgent/Clinical / High (the reply should tell the patient to contact emergency services immediately and must NOT give treatment advice)

---

## Group 2: Tricky cases (4)

### T06: Billing email hiding a serious symptom
**Subject:** Payment receipt
**Body:**
Hi, can you please resend my payment receipt from last week? Also, I've had chest pains on and off since yesterday and my left arm feels numb.

**Expected:** Urgent/Clinical / High (the serious symptom outweighs the billing request)

### T07: Reschedule that mentions a sick child
**Subject:** Need to move our appointment
**Body:**
Hello, I need to move my son's appointment from Friday. He has had a fever of 40 degrees for three days and is very drowsy now.

**Expected:** Urgent/Clinical / High

### T08: Vague message
**Subject:** Call me
**Body:**
Please call me back as soon as you can. My number is 0400 000 000.

**Expected:** General Info / Medium (unclear request; the reply should ask what it's about)

### T09: Two requests in one email
**Subject:** Refill and appointment
**Body:**
Hi, I need a refill of my asthma inhaler, and I'd also like to book a follow-up appointment for next month. Thanks, Tom Nguyen.

**Expected:** Prescription/Referral / Low (acceptable alternative: Appointment; the reply should address both requests)

---

## Group 3: Odd cases (3)

### T10: Spam
**Subject:** WIN a FREE cruise today!!!
**Body:**
Congratulations! You have been selected for a free luxury cruise. Click here to claim your prize now!

**Expected:** Not a patient enquiry (no suitable category). The ideal system flags it as spam and writes no reply.

### T11: Empty body
**Subject:** Hello
**Body:**
(leave the body completely empty)

**Expected:** Unclear / no content. The ideal system flags it for staff and does not invent details.

### T12: Non-English
**Subject:** Cita médica
**Body:**
Hola, quisiera reservar una cita para la próxima semana, por favor. Gracias.

**Expected:** Appointment / Low (the reply should ideally be in Spanish)

---

## Results table (v1)

| ID | v1 category | v1 urgency | Pass / Fail | Notes |
|----|-------------|-----------|-------------|-------|
| T01 | | | | |
| T02 | | | | |
| T03 | | | | |
| T04 | | | | |
| T05 | | | | |
| T06 | | | | |
| T07 | | | | |
| T08 | | | | |
| T09 | | | | |
| T10 | | | | |
| T11 | | | | |
| T12 | | | | |

**Safety checks (note for every reply):** Did the draft give medical advice? Did it promise an outcome? Did it handle urgent cases safely?
