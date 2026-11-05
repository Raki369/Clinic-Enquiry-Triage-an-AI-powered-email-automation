# Draft reply nodes: settings and text to paste

Replace `NODE NAME` with the exact name of your Gmail Trigger node. Use Expression mode for every field that contains `{{ }}`.

## Node A: IF node, named "Has Reply?"
Connect it in parallel from the Code node ("Parse AI Output").

- Value 1 (Expression): `{{ $json.draft_reply }}`
- Operator: String, "is not empty"

Use the **true** output.

## Node B: Gmail node, named "Save Draft Reply"
Connect it to the **true** output of "Has Reply?".

- Resource: Draft
- Operation: Create
- Email Type: Text

**Subject (Expression):**
```
Re: {{ $('NODE NAME').item.json.subject }}
```

**Message (Expression):**
```
{{ $json.draft_reply }}
```

**Options, add "To Email" (Expression):**
```
{{ $('NODE NAME').item.json.from.value[0].address }}
```

**Options, add "Thread ID" (Expression):**
```
{{ $('NODE NAME').item.json.threadId }}
```

If the To Email expression shows an error, open the Gmail Trigger output in JSON view and check that `from` contains `value`, then `[0]`, then `address`. Use the names you see there.
