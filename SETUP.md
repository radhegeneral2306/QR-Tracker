# QR Tracker: Setup Guide

Yeh steps sirf **ek baar** karne hain. Kul time lagbhag 30-45 minute.

---

## Step 1: Naya Firebase project banao (Easy)

1. https://console.firebase.google.com kholo aur apne Google account se login karo.
2. **Add project** dabao. Naam do, jaise `qr-tracker-radhe`. Google Analytics ki zaroorat nahi hai, use off kar do.
3. Project ban jaaye toh left menu se **Build → Firestore Database → Create database** pe jao.
   - Location: **asia-south1 (Mumbai)** chuno.
   - **Production mode** chuno.
4. Phir left menu se **Build → Authentication → Get started** pe jao.
   - **Email/Password** pe click karke usko **Enable** karo, phir Save.

> Free (Spark) plan kaafi hai, card lagane ki zaroorat nahi. Photos compress hokar seedha database mein save hoti hain.

---

## Step 2: Logins banao (Easy)

**Authentication → Users → Add user** pe jao aur neeche wale 5 users banao. Email **bilkul yahi** hone chahiye, password tum khud rakho (kam se kam 6 characters):

| Login | Email |
|---|---|
| Owner (Admin) | `admin@qrtracker.app` |
| Raipur | `raipur@qrtracker.app` |
| Durg | `durg@qrtracker.app` |
| Jagdalpur | `jagdalpur@qrtracker.app` |
| Hardware Drg | `hardware@qrtracker.app` |

Yeh emails asli nahi hain, inpe koi mail nahi jaata. Yeh sirf login ID ka kaam karte hain.

**Branch ka naam badalna ya nayi branch jodni ho:** `index.html` mein `BRANCHES` wali list edit karo, aur Firebase mein usi email ka user bana do.

---

## Step 3: Security rules lagao (Easy, lekin zaroori hai)

1. **Firestore Database → Rules** tab kholo.
2. Wahan jo bhi likha hai, sab hata do.
3. Is repo ki `firestore.rules` file ka poora content copy karke wahan paste karo.
4. **Publish** dabao.

⚠️ Yeh step skip kiya toh app ya toh chalegi hi nahi, ya phir data sabke liye khula reh jaayega.

---

## Step 4: Firebase config app mein daalo (Easy)

1. Firebase mein **Project settings** (⚙️ icon) kholo. **Your apps** section mein **Web (`</>`)** icon dabao.
2. Naam do (jaise `qr-tracker-web`). Hosting wala checkbox **mat** lagao. Phir **Register app** dabao.
3. Ek `firebaseConfig = { ... }` block dikhega. Usme 6 values hongi.
4. `index.html` kholo aur `PASTE_...` wali jagahon pe yeh values daal do:

```js
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "qr-tracker-radhe.firebaseapp.com",
  projectId: "qr-tracker-radhe",
  storageBucket: "qr-tracker-radhe.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcd...",
};
```

> Yeh config public hota hai, isme koi secret nahi hai. Data ki asli suraksha Step 3 ke rules se hoti hai.

---

## Step 5: GitHub Pages pe live karo (Easy)

1. GitHub pe repo kholo, phir **Settings → Pages** pe jao.
2. **Source:** "Deploy from a branch". **Branch:** `main`, folder `/ (root)`. Save dabao.
3. 1-2 minute baad link milega: `https://radhegeneral2306.github.io/QR-Tracker/`

⚠️ **Free GitHub account pe Pages sirf public repo pe chalta hai.** Repo public karne mein koi khatra nahi, kyunki code mein koi password nahi hai. Logins Firebase mein hain aur data rules se protected hai.

Agar repo private hi rakhna hai, toh GitHub Pro lena padega ya phir Firebase Hosting use karna padega.

---

## Step 6: Phone pe install karo (Easy)

- **Android (Chrome):** link kholo, phir ⋮ menu → **Install app / Add to Home screen**.
- **iPhone (Safari):** link kholo, phir Share button → **Add to Home Screen**. (iPhone pe sirf Safari se install hota hai.)

---

## Step 7: Pehla kaam: asli payment test (SABSE ZAROORI)

Owner login se 1 QR add karo, phir branch login se **₹1** ka QR banao aur pay karke dekho. Yeh test kam se kam **PhonePe, GPay aur Paytm** teeno se karo:

- [ ] Amount apne aap bhara hua aaya?
- [ ] Remark (jaise "Raipur 0001") bank statement / app history mein dikha?
- [ ] Koi "risky payment" ya "limit" ki warning toh nahi aayi?

Agar kisi app mein amount prefill nahi hota, toh staff "Backup: original QR photo dikhao" wala button use kare. Customer amount khud daalega, aur staff "Payment received" pe actual amount check karke save kare.

---

## Roz ka use (short mein)

1. Amount daalo, phir **QR banao** dabao.
2. Customer ko QR dikhao.
3. Paisa account mein aa jaaye tab **✓ Payment received** dabao (photo zaroori ho toh photo lo), phir Save.
   Payment nahi hui toh **Cancel** dabao.
4. Koi payment beech mein reh gayi ho toh woh **Open payments** list mein dikhegi. Wahan se kholke Received ya Cancel karo.

## Owner ke liye important baatein

- **Pending payment 30 minute tak QR limit mein reserve rehti hai**, taaki do branch ek saath ek hi QR ko overfill na kar dein. 30 minute ke baad reserve hat jaata hai, lekin entry Open payments list mein bani rehti hai.
- **Mahine mein ek baar bank statement se milaan karo.** App ko asli UPI payment ka pata nahi chalta, woh sirf staff ke button dabane pe chalti hai. Koi farak mile toh Dashboard → **± Adjustment** se theek karo.
- **↻ Recalculate:** agar kabhi totals galat lagein, toh yeh button saari entries se totals dobara bana deta hai.
- **Entries bulk delete:** Dashboard → Entries → **☑ Select** dabao, entries chuno (ya "Sab select"), phir:
  - **🗑 Delete:** received entries delete ho jaati hain aur amount QR total se hat jaata hai. Pending entries cancel ho jaati hain.
  - **Permanently remove:** jo entries pehle se Deleted/Cancelled hain, unhe hamesha ke liye hata deta hai. Test data saaf karne ke liye. Is QR ki saari entries hat jaayein toh woh QR bhi delete ho sakta hai.
- **QR band karna:** thodi der ke liye band karna ho toh toggle off karo. Hamesha ke liye hatana ho toh **🗄️ Archive** karo. Archive karne se history bachi rehti hai aur QR wapas Restore bhi ho sakta hai.
- **QR delete:** sirf Archived tab mein milta hai, aur sirf us QR pe chalta hai jispe kabhi koi entry nahi hui (galti se ya testing mein add kiye QR). Jis QR pe payment ho chuki hai, woh delete nahi hota, taaki purana hisaab na toote.

## Known limits (honest list)

- Koi branch ka banda technical tareeke se (browser console se) QR totals ke numbers chhed sakta hai. Entries aur 24 ghante ka lock server pe protected hain, lekin running totals nahi. Agar aisa shak ho, toh **Recalculate** dabane se totals entries se sahi ho jaate hain.
- Photos ~200 KB tak compress hoti hain. Free plan mein 1 GB tak jagah milti hai, yaani lagbhag 4,000-5,000 photos. Usse zyada ho jaayein toh purani photos hatani padengi ya Blaze plan lena padega.
