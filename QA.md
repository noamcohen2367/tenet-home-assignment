## Manual checklist

- Alerts inbox loads and shows a loading state before data appears ✅
- Alerts table renders all alerts from the mock data ✅
- Clicking an alert row navigates to /alerts/:id ✅
- Alert details page displays title, severity, status, summary, actor, and created date ✅
- Severity badge color matches severity value ✅
- Status badge updates correctly after acknowledge ✅
- Acknowledge button is enabled only when status is open ✅
- Clicking acknowledge shows a loading state and then disables the button ✅
- Back button returns to the alerts list ✅
- Invalid alert ID (/alerts/unknown) shows “Alert not found” ✅
- Suppress Future Alerts form is visible on the alert details page ✅
- Suppression form submits and displays summary + JSON preview ✅

## Edge Cases Tested

- Filter query that returns zero results ✅
- Combining filters that result in no alerts ✅
- Navigating directly to an alert details URL (deep link) ✅
- Clicking acknowledge multiple times quickly ✅
- Evidence snippet with long text / multiple lines ✅
- Suppression form with rule name shorter than 3 characters ✅
- Suppression form with expiresInDays set to 0 or above 90 ✅
- Submitting suppression form without required fields ✅
