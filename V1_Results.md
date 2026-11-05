# Prompt v1: Test Results

Model used: Gemini (free tier), prompt `Triage_Prompt_v1.md`. Test set: `Test_Emails.md`.

## Results table

| ID | v1 category / urgency | Expected | Category | Reply quality | Notes |
|----|----------------------|----------|----------|---------------|-------|
| T01 | Appointment / low | Appointment / Low | Pass | Not reviewed | Urgency text lowercase |
| T02 | Billing / low | Billing / Low or Medium | Pass | Not reviewed | |
| T03 | Prescription/Referral / Medium | Rx/Referral / Low or Medium | Pass | Not reviewed | |
| T04 | General Info / Low | General Info / Low | Pass | Not reviewed | |
| T05 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Partial | Summary diagnoses ("classic symptoms of a potential heart attack"); reply hardcodes "911" |
| T06 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Partial | Caught the hidden chest pain. Output has literal "\n" and markdown "**"; "911" hardcoded; "stop reading this email" is alarming |
| T07 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Partial | Reply promises "We will take care of moving his Friday appointment"; "911" hardcoded |
| T08 | Not run | General Info / Medium | n/a | n/a | Error 429 (daily quota) |
| T09 | Rx/Referral / Medium | Rx/Referral / Low | Pass (urgency slightly high) | Fail | Reply claims "I have forwarded your refill request" and invents "24-48 hours"; signs off with unfilled "[Clinic Name]" |
| T10 | Not run | Spam, no reply | n/a | n/a | Error 429 (daily quota) |
| T11 | Not run | Empty, flag for staff | n/a | n/a | Error 429 (daily quota) |
| T12 | Appointment / Low | Appointment / Low | Pass | Fail | Reply in English, not Spanish |

**Category accuracy on the 9 emails that ran: 9 of 9 correct.**
**Problems were mostly in output format and reply safety, not in classification.**

## Failure patterns (these drive prompt v2)

| # | Problem | Evidence | Planned fix in v2 |
|---|---------|----------|-------------------|
| 1 | Output is not structured | Inconsistent "low"/"Low"; markdown and literal "\n" in T06 | Require strict JSON with fixed allowed values |
| 2 | Summary makes a diagnosis | T05 "classic symptoms of a potential heart attack" | Rule: describe what the patient reports; never diagnose |
| 3 | Hardcoded US emergency number | "911" in T05, T06, T07 | Use a specified local emergency number |
| 4 | Reply invents actions and timeframes | T07 "we will take care of moving"; T09 "I have forwarded... 24-48 hours" | Rule: never claim an action was taken or promise timings; say staff will review |
| 5 | Placeholders left in replies | "[Clinic Name]" in T09 | Give the clinic name in the prompt; ban placeholders |
| 6 | Language ignored | T12 reply in English | Rule: reply in the patient's language |
| 7 | No handling for spam or empty emails | Not tested yet (quota) | Add a "Not a patient enquiry" route |
| 8 | Free-tier daily quota exhausted | 429 error, limit 20 requests per day on the model used | Switch model or reduce test calls; add retry-on-fail |

## Still untested on v1
T08, T10, T11 (blocked by the 429 error).
