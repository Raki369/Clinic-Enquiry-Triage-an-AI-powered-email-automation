# Clinic-Enquiry-Triage-an-AI-powered-email-automation
Automating clinic's incoming patients mail with n8n.
# The problem. 
A clinic's front desk gets patient emails all day: booking requests, billing questions, prescription refills, and now and then a message that describes a medical emergency. Staff have to read every one, sort it, and write a reply. Urgent messages can be buried among routine ones.

# What this project does. 
-> It watches the clinic's inbox and, for every new email:
-> Reads and classifies it with AI (Appointment, Billing, Prescription/Referral, General Info, Urgent/Clinical, or "Not a patient enquiry" for spam).
-> Logs it in a Google Sheet, so staff see every enquiry, its urgency and a one-line summary at a glance.
-> Alerts staff immediately by email if the message sounds urgent (for example chest pain), even when the urgent symptom is hidden inside an ordinary request.
-> Writes a draft reply and saves it in Gmail for a person to review. The AI never sends anything by itself.

# Why it is safe by design. 
-> The AI does not diagnose, does not give medical advice, does not promise actions or timings, and tells urgent senders to call the emergency number (112) or go to the nearest emergency department. If the AI's answer ever cannot be read, the system treats the email as urgent and flags it for a human instead of failing silently.

# Where AI is used. 
-> Google Gemini does the reading, classifying, summarising and drafting. The whole automation is built in n8n. The prompt that instructs the AI was written and improved in two tested versions; the evidence is in this repository.
# How it Works 
**Gmail Trigger -> AI node (Gemini, prompt v2) -> Parse AI Output (Code) -+-> Google Sheets log
                                                                        +-> Is Urgent? -> Alert Staff (email)
                                                                        +-> Has Reply?  -> Save Draft Reply (Gmail)**

# Run it yourself

# You will need: 
An n8n account (Cloud or self-hosted), a Gmail account for the clinic inbox, a Google Sheet, and a Google Gemini API key (free tier works).

->  Create the sheet. In a new Google Sheet, put these headers in row 1: Received At, Sender, Subject, Category, Urgency, Summary, Draft Reply, Status.
->  Import the workflow. In n8n choose Import from File and select workflow/clinic-triage-workflow.json.
->  Reconnect credentials. Connect your own Gmail, Google Sheets and Google Gemini credentials in the nodes that show a warning. No keys are stored in this repository.
->   Fill the placeholders. In the Google Sheets node pick your sheet. In the Alert Staff node, replace staff@example.com with the staff address (it must differ from the monitored inbox, or the workflow will loop). In the Alert Staff message, replace YOUR_GOOGLE_SHEET_LINK.
->  Test without spending AI quota. Paste a sample from test-data/Pinned_Test_Samples.json as pinned output of the Basic LLM Chain node and execute the later nodes.
->  Go live. Send a test email to the clinic inbox and activate the workflow.

workflow/ contains the importable workflow. code/ contains the Code-node script and the alert and draft node text. An unused "When chat message received" node came with the n8n AI node and can be deleted.
