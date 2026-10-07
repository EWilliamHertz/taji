# Guide: Köp och Koppla Domän via Loopia

Den här guiden visar dig hur du köper domänen \`tajifoodtruck.se\` på Loopia, kopplar den till din Vercel-hemsida och ställer in e-post via Resend.

## 1. Köp domänen \`tajifoodtruck.se\` på Loopia
1. Gå till [Loopia.se](https://www.loopia.se/).
2. I sökfältet på startsidan, skriv in **tajifoodtruck.se** och klicka på "Sök".
3. Om domänen är ledig, klicka på **Lägg i kundvagn**.
4. Gå till kassan. Du kommer att få frågan om du vill lägga till webbhotell eller e-postpaket. Om du bara behöver domänen (eftersom Vercel hostar din kod) kan du välja **"Endast Domännamn"** (eller det billigaste e-postpaketet om du vill använda Loopias mailklient istället för Resend, men vi går igenom Resend nedan).
5. Skapa ett konto genom att fylla i dina företagsuppgifter (eller privatperson).
6. Genomför betalningen. Det kan ta någon timme innan domänen är helt registrerad och aktiv.

## 2. Koppla domänen till Vercel (Hemsidan)
När du har loggat in på Loopias kundzon och domänen är aktiv, måste vi peka trafiken till Vercel.

1. Logga in på **Loopia Kundzon**.
2. Klicka på ditt domännamn: **tajifoodtruck.se**.
3. Välj fliken **DNS-editor** (eller DNS-inställningar).
4. Vi ska nu lägga till två rader (en A-record och en CNAME-record):

**För huvuddomänen (tajifoodtruck.se utan www):**
- Typ: \`A\`
- Namn/Subdomän: \`@\` (eller lämna tomt beroende på Loopias gränssnitt)
- Data/Värde: \`216.150.1.1\`
- TTL: 3600 (standard är okej)
- *Spara*

**För www-domänen (www.tajifoodtruck.se):**
- Typ: \`CNAME\`
- Namn/Subdomän: \`www\`
- Data/Värde: \`27409dafbb68db51.vercel-dns-016.com.\` *(glöm inte punkten på slutet om Loopia kräver det)*
- TTL: 3600
- *Spara*

I **Vercel**: Gå till ditt projekt -> Settings -> Domains. Lägg till \`tajifoodtruck.se\` och \`www.tajifoodtruck.se\`. Vercel kommer nu att verifiera dina DNS-inställningar från Loopia.

## 3. Koppla domänen till Resend (För e-post)
Om du vill skicka e-post från \`hello@tajifoodtruck.se\` via din app (exempelvis bekräftelser vid beställningar) genom Resend:

1. Gå till [Resend.com](https://resend.com), logga in och gå till **Domains**.
2. Klicka på **Add Domain** och skriv in \`tajifoodtruck.se\`.
3. Resend kommer nu att ge dig 3 eller 4 DNS-records som måste läggas till i Loopia (liknande det vi gjorde för Vercel). De brukar vara:
   - 1 st **TXT**-record för SPF.
   - 1 st **TXT**-record för DKIM.
   - 1 st **TXT**-record för DMARC.
   - 1 st **MX**-record (om du också ska ta emot mail via Resend) eller en retur-path CNAME.
4. Gå tillbaka till **Loopia Kundzon -> DNS-editor** för din domän.
5. Lägg till varje record exakt så som Resend ber om. 
   *(Exempel: Om Resend säger Namn: \`bounces\`, Typ: \`CNAME\`, Värde: \`feedback.resend.com\`, lägger du in det).*
6. Gå tillbaka till Resend och klicka på **Verify**. Det kan ta upp till 24 timmar för DNS att sprida sig, men oftast går det på 15 minuter.

När domänen är verifierad i Resend kan du använda den i din \`.env.local\` för att skicka bekräftelsemail via koden!
