# Guide: Så här kopplar vi ditt Instagram-flöde till hemsidan

För att vi ska kunna visa dina 6 senaste Instagram-inlägg automatiskt på hemsidan måste vi hämta en säkerhetsnyckel (en så kallad "Access Token") från Facebook/Meta. 

Eftersom Metas utvecklarportal är väldigt komplicerad är det absolut enklaste att du följer dessa tre steg nedan. Du behöver inte skriva någon kod!

---

## Steg 1: Se till att ditt Instagram-konto är ett Företagskonto
*(Om du redan har ett företagskonto kan du hoppa till Steg 2).*

1. Öppna **Instagram-appen** på din telefon.
2. Gå till din profil och klicka på de **tre strecken** (menyn) uppe till höger.
3. Klicka på **Inställningar och sekretess**.
4. Scrolla ner och leta efter **Konto** (eller "Kontotyp och verktyg").
5. Välj **Byt till proffskonto** (Professional Account) och följ stegen. Välj att det är ett "Företag" (Business).

## Steg 2: Koppla din Instagram till en Facebook-sida
För att hemsidan ska få tillgång till bilderna kräver Meta att Instagram-kontot är kopplat till en Facebook-sida för din foodtruck.

1. Öppna **Instagram-appen** igen.
2. Gå till din profil och klicka på **Redigera profil**.
3. Under "Offentlig företagsinformation", klicka på **Sida** (Page).
4. Välj den befintliga Facebook-sidan för Taji Foodtruck (eller klicka på "Skapa en ny Facebook-sida" om ni inte har någon).

## Steg 3: Ge utvecklaren tillgång för att skapa API-nyckeln
Istället för att du ska behöva registrera dig i Facebooks utvecklarportal (vilket är krångligt), är det enklaste att du tillfälligt lägger till din webbutvecklare som administratör på din Facebook-sida. Utvecklaren kan då logga in, generera den tekniska koden som behövs för hemsidan, och sedan kan du ta bort åtkomsten igen.

**Så här bjuder du in utvecklaren:**
1. Logga in på **Facebook** på din dator.
2. Byt till din Facebook-sida (klicka på din profilbild uppe till höger och välj sidan för Taji Foodtruck).
3. Klicka på **Inställningar** (kugghjulet) i vänstermenyn, och gå till **Ny sidupplevelse** (New Pages Experience) eller **Sidoåtkomst** (Page Access).
4. Klicka på **Lägg till ny** bredvid "Personer med Facebook-åtkomst".
5. Sök efter din webbutvecklares namn eller e-postadress.
6. Ge full åtkomst och klicka på **Ge åtkomst** (Ge Access). Du kan behöva ange ditt Facebook-lösenord för att bekräfta.

---

**Klart!** 
När detta är gjort, meddela din utvecklare. Utvecklaren kommer nu att kunna generera "Instagram Graph API Token" och koda in flödet på din hemsida. Du kan ta bort utvecklarens åtkomst från Facebook-sidan så fort flödet är live!
