# Milestone 1: Walking Skeleton — תוכנית

סטטוס: באוויר ב-Vercel. הלינק החי: https://joke-app-test.vercel.app. ממתין לאישור המשתמש.

## המטרה
הדף והפונקציה באוויר ב-Vercel, באותה כתובת, ומדברים זה עם זה. המפתח שמור ב-Vercel, עוד בלי AI.

## החלטות מהחידוד
- ארבעת מצבי הדמות (idle, think, joke, error) נבנים כבר עכשיו, ויזואלית, לפי DESIGN.md והמוקאפ. במיילסטון 2 רק מחברים את GPT-5 וההודעות.
- אין עדיין פרויקט ב-Vercel. אחרי ה-push המשתמש מייבא את הריפו, צעד אחר צעד.
- נבדק בתיעוד של Vercel (עודכן 11.08.2026): בלי framework, קובץ ב-`api/` נפרס כפונקציה, צריך `"type": "module"` ב-package.json, והתחביר `export default { fetch(request) {...} }` נתמך. לא צריך vercel.json.

## הקבצים
| קובץ | מה יש בו |
|---|---|
| `index.html` | המסך, עם ה-CSS וה-JS בתוכו. `lang="he"`, `dir="rtl"` |
| `api/joke.js` | הפונקציה הזמנית |
| `package.json` | `"type": "module"`, בלי dependencies |

לא נוגעים ב-assets. `.gitignore`, `.env.example` ו-`.claude/settings.json` כבר קיימים מההקמה (נבדק).

## index.html
- גופנים מ-Google Fonts: Fredoka (500/600/700) ו-Playpen Sans Hebrew (500), גיבוי ל-system-ui.
- צבעים כמשתני CSS לפי טבלת הצבעים ב-DESIGN.md.
- רקע: `bg-dots.svg` חוזר, `bg-doodles.svg` פעם אחת למעלה במרכז.
- מלמעלה למטה: לוגו (300), הסבר, תווית + תיבה (maxlength 100, placeholder "למשל: חתולים"), כפתור "תנו לי בדיחה!", בועה עם הדמות, תחתית "מיישם AI ואוטומציה · 53500".
- רכיבים: מידות, מסגרות, צללים קשים וסיבובים בדיוק לפי סעיף "כפתורים ורכיבים". רוחב מקסימלי 440, מרווח 14, צדדים 18.
- `data-state` על הבועה מחליף ציור דמות וטקסט:
  - idle: mascot-idle, קפיצה 5px / 2.4s, "לוחצים על הכפתור, והבדיחה מופיעה כאן".
  - think: mascot-think, מעיכה ל-86% כל 0.5s, "מחפש בדיחה על [הנושא]..." או "מחפש בדיחה...". הכפתור "חושב...", נעול ולחוץ.
  - joke: mascot-joke ברוחב 86 בפינה הימנית העליונה, חצי בחוץ, מסובבת 8°, מתגלגלת 4 פעמים. טקסט ב-Playpen 25 / 1.55. הכפתור "עוד בדיחה!".
  - error: רקע `#FFE8EC`, mascot-error מתנדנדת פעמיים, הודעה ב-`#C0261B`. הכפתור "לנסות שוב".
- `prefers-reduced-motion`: בלי תנועה.
- אזור הטקסט עם `aria-live="polite"`.
- JS: בשליחת הטופס → think → `fetch('/api/joke', POST, JSON {topic})` → joke עם `textContent`, או error עם הודעה קצרה בעברית (שגיאת רשת / `error` מהשרת).

## api/joke.js
- `export default { async fetch(request) {...} }`.
- לא POST → 405 עם `{ "error": "..." }`.
- גוף שבור או נושא ריק → נושא ריק. חיתוך ל-100 תווים.
- מחזיר `{ "joke": "בדיחה זמנית מהשרת: [הנושא]. המפתח: נמצא" }` או "המפתח: חסר", לפי `process.env.OPENAI_API_KEY`. אף פעם לא המפתח עצמו.
- `console.log` קצר לכל בקשה (הנושא + האם יש מפתח), כדי לראות שורה ב-Logs.
- בלי כותרות CORS ובלי טיפול ב-OPTIONS.

## שלבים
1. **בנייה:** שלושת הקבצים. בדיקה מקומית של המסך בדפדפן (בלי הפונקציה).
2. **הרצה:** המשתמש בוחר: Vercel או `vercel dev`.
3. **דחיפה:** commit ו-push ל-main.
4. **ביד, ב-Vercel:** New Project → Import ל-`Eyalg1980/Joke-app-test` → Framework Preset: Other → Deploy.
5. **ביד, המפתח:** ב-OpenAI יוצרים מפתח `joke-in-a-click`. ב-Vercel → Settings → Environment Variables: `OPENAI_API_KEY`, Secret, Production + Preview. ואז Redeploy.
6. בדיקת תנאי ההשלמה, ונותנים את הלינק החי.

## תנאי השלמה (מ-MILESTONES)
1. הכתובת נפתחת בטלפון, בעברית, RTL, בעיצוב של DESIGN.md.
2. לחיצה מציגה "בדיחה זמנית מהשרת" עם הנושא, ו"המפתח: נמצא".
3. Network: בקשת POST אחת ל-/api/joke באותה כתובת.
4. Logs של Vercel: שורה לכל לחיצה.
5. אין CORS ואין OPTIONS בקוד.
6. בריפו אין .env ואין .env.local. יש .env.example ו-.claude/settings.json.
7. מקומית (רשות): אותה תוצאה ב-http://localhost:3000.

## מה נבנה בפועל
- `package.json`: רק `name`, `private` ו-`"type": "module"`.
- `api/joke.js`: כמו בתוכנית. לא POST מחזיר 405. בלי נושא, הטקסט הוא "בדיחה זמנית מהשרת: בלי נושא. המפתח: ...". שורת log לכל בקשה: `joke request: topic="..." key=found|missing`.
- `index.html`: כמו בתוכנית. ארבעת ציורי הדמות נטענים מראש כארבעה `<img>`, ו-CSS מציג רק את זה שמתאים ל-`data-state`, כדי שלא יהיה הבהוב, והאנימציה מתחילה מחדש בכל מצב. `aria-live` נמצא על שורת הטקסט בלבד. נוסף favicon (`assets/icon.svg`).
- הודעות שגיאה בדף: `error` מהשרת, או "משהו השתבש. נסו שוב.", או "אין חיבור לשרת כרגע. נסו שוב." כשהרשת נופלת.
- בדיקה מקומית: שרת בדיקה זמני (מחוץ לריפו) שמריץ את הפונקציה. ברוחב 390 נבדקו ארבעת המצבים מול המוקאפ, ולחיצה עם "חתולים" מחזירה "בדיחה זמנית מהשרת: חתולים. המפתח: חסר" (במחשב אין מפתח, וזה צפוי). גוף שבור מטופל כמו "בלי נושא", ו-GET מחזיר 405. אין שגיאות ב-console, ואין בקוד CORS או OPTIONS.

## הבדיקה ב-Vercel
- הפרויקט יובא ל-Vercel (Framework Preset: Other), ו-`OPENAI_API_KEY` נשמר כ-Sensitive ב-Production וב-Preview, ואחריו Redeploy.
- הכתובת הציבורית היא `joke-app-test.vercel.app`. כתובת הפריסה עם ה-hash (`joke-app-test-<hash>-eyal-g1980.vercel.app`) מוגנת ב-Vercel Authentication ומחזירה 302 למי שלא מחובר. זה תקין, ואת הכתובת הזו לא משתפים.
- תנאי השלמה:
  1. ✅ העברית, ה-RTL והעיצוב נבדקו ברוחב של טלפון.
  2. ✅ "חתולים" מחזיר "בדיחה זמנית מהשרת: חתולים. המפתח: נמצא".
  3. ✅ ב-Network יש בקשת POST אחת ל-`https://joke-app-test.vercel.app/api/joke`.
  4. ⏳ שורה ב-Logs לכל לחיצה: המשתמש בודק ב-Vercel, בלשונית Logs.
  5. ✅ אין CORS ואין OPTIONS. בקשת OPTIONS מקבלת 405 בלי כותרות Access-Control.
  6. ✅ בריפו יש רק `.env.example`, ו-`.claude/settings.json` קיים.
  7. לא רלוונטי: נבחרה בדיקה ב-Vercel.
