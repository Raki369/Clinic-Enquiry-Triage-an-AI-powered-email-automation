# Alert Staff node: text to paste

Replace `NODE NAME` with the exact name of your Gmail Trigger node on the canvas, and put your Google Sheet link where indicated.

## Subject (paste into the Subject field, Expression mode)

```
URGENT patient enquiry: {{ $('NODE NAME').item.json.subject }}
```

## Message (paste into the Message field, Expression mode)

```
An urgent patient enquiry needs review now.

Category: {{ $json.category }}
Summary: {{ $json.summary }}
Subject: {{ $('NODE NAME').item.json.subject }}
Status: {{ $json.status }}

Open the triage log: PASTE YOUR GOOGLE SHEET LINK HERE
```
