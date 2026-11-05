// n8n Code node: "Parse AI Output"
// Language: JavaScript | Mode: Run Once for Each Item

const item = $input.item.json;
const raw = String(item.text ?? item.output ?? '');
const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

let data;
try {
  data = JSON.parse(cleaned);
} catch (e) {
  // Safe fallback: unreadable AI output is treated as urgent and sent to a human
  data = {
    category: 'Parse error',
    urgency: 'High',
    summary: 'AI output could not be read. Please review the original email.',
    draft_reply: '',
    needs_human_review: true
  };
}

let status = 'New';
if (data.urgency === 'High') status = 'URGENT - review now';
else if (data.needs_human_review === true) status = 'Needs review';
else if (data.category === 'Not a patient enquiry') status = 'No action (not a patient enquiry)';

return {
  json: {
    category: data.category ?? '',
    urgency: data.urgency ?? '',
    summary: data.summary ?? '',
    draft_reply: data.draft_reply ?? '',
    status
  }
};
