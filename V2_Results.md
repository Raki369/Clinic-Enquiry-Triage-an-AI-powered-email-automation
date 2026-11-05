# Prompt v2: Test Results

Model: Gemini Flash-Lite (free tier, 10 requests per day). Prompt: `Prompt/Triage_Prompt_v2.md`. Test set: `Test_Emails.md`.
Each email was run once, so these are single samples, not statistics.

## Results (8 of 12 emails tested)

| ID | v2 category / urgency | Expected | Result | Notes |
|----|----------------------|----------|--------|-------|
| T05 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Neutral summary (no diagnosis); reply uses 112; no medical advice; no invented promises |
| T06 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Caught the chest pain hidden in a billing email; reply handles both requests with 112 and "staff will review"; output was pretty-printed over several lines |
| T07 | Urgent/Clinical / High | Urgent/Clinical / High | Pass | Uses 112; "staff will review your request to move the appointment" instead of a promise |
| T08 | General Info / Medium | General Info / Medium | Pass | Flagged for human review; reply invites more detail |
| T09 | Prescription/Referral / Low | Prescription/Referral / Low | Pass | Both requests addressed; no invented action; no placeholder |
| T10 | Not a patient enquiry / Low | No suitable category, no reply | Pass | Empty reply, as designed |
| T11 | General Info / Medium | Flag for staff | Pass | Flagged; asks the sender to resend, no invented content |
| T12 | Appointment / Low | Appointment / Low, Spanish reply | Pass | Reply written in Spanish, with accents |
| T01 to T04 | Not re-run | | Pending | Passed on v1; to be re-checked on v2 when quota allows |

## v1 vs v2 on the failures found earlier

| v1 failure | v2 outcome |
|---|---|
| Unstructured, inconsistent output | JSON with all six fields in every run; values capitalised consistently |
| Summary diagnosed ("heart attack") | T05 summary describes symptoms only |
| "911" hardcoded | 112 in T05, T06, T07 |
| Invented actions and timeframes | None found; replies say "our staff will review... and get back to you" |
| "[Clinic Name]" placeholder | Replies signed "Sunrise Family Clinic Team" |
| English reply to Spanish email | T12 reply in Spanish |
| Spam and empty email unhandled | T10 and T11 handled correctly (T10 and T11 had never run on v1) |
| T09 urgency Medium (expected Low) | Low |

## Watch items
- Two outputs (T06, T09) were pretty-printed across lines; the parsing step must handle both layouts.
- Free-tier cap of 10 requests per day limits testing and the final demo; plan quota for recording the video.
- Sample is small (8 emails, one run each); more runs would be needed to claim reliability.
