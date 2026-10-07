# Guide: Så här sätter du upp Stripe för kortbetalningar

För att vi ska kunna ta emot säkra kortbetalningar (och Apple Pay/Google Pay) direkt på hemsidan för förbeställningar och catering, använder vi betalväxeln **Stripe**. 

Eftersom Stripe hanterar företagets pengar och utbetalningar, måste du som ägare skapa kontot och fylla i företagsuppgifterna. Följ dessa tre enkla steg, så kan vi sedan koppla ihop det med hemsidan!

---

## Steg 1: Skapa ett Stripe-konto
1. Gå till [https://stripe.com/se](https://stripe.com/se) och klicka på **Starta nu** (eller "Sign up").
2. Fyll i din e-postadress, ditt fullständiga namn, land (Sverige) och välj ett säkert lösenord.
3. Du kommer att få ett mejl från Stripe. Klicka på länken i mejlet för att bekräfta din e-postadress.

## Steg 2: Aktivera ditt konto (Företagsuppgifter)
För att Stripe ska kunna betala ut pengarna från beställningarna till ditt bankkonto måste du verifiera ditt företag.

1. Logga in på din nya Stripe-Dashboard.
2. Högst upp på sidan ser du en knapp som heter **Aktivera betalningar** (Activate payments). Klicka på den.
3. Fyll i formuläret. Du kommer bland annat behöva ange:
   - **Företagstyp:** (t.ex. Aktiebolag eller Enskild firma).
   - **Organisationsnummer** och företagsadress.
   - **Företagsrepresentant:** Dina personuppgifter (för att följa lagar om penningtvätt).
   - **Bankuppgifter:** Det bankgiro eller IBAN-nummer dit du vill att pengarna ska betalas ut.
   - **Beskrivning av verksamheten:** Skriv "Foodtruck som säljer mat via hemsida och på plats."

## Steg 3: Hämta API-nycklarna till webbutvecklaren
När kontot är skapat och aktiverat behöver hemsidan två tekniska "nycklar" för att kunna skicka betalningarna till ditt Stripe-konto.

1. Högst upp till höger på din Stripe-Dashboard, klicka på knappen **Utvecklare** (Developers).
2. I menyn till vänster (eller högst upp), klicka på **API-nycklar** (API keys).
3. Du letar efter **Standardnycklar** (Standard keys). Du behöver kopiera två koder:
   - **Publicerbar nyckel** (Publishable key) – *Börjar oftast på "pk_live_"*
   - **Hemlig nyckel** (Secret key) – *Börjar oftast på "sk_live_"*. Klicka på "Visa testnyckel/hemlig nyckel" för att se den.
4. Kopiera båda dessa koder och **skicka dem på ett säkert sätt till din webbutvecklare** (t.ex. via en krypterad meddelandetjänst eller säker e-post).

---

**Klart!** 
Så fort din utvecklare har fått nycklarna kan betalningssystemet kodas in på hemsidan, och pengarna för varje förbeställning kommer att landa direkt på ditt Stripe-konto och sedan betalas ut till företagskontot!
