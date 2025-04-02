**Projektplan: Luvly**

**Version:** 1.0 **Datum:** 2025-04-01

**1. Projektübersicht & Zielsetzung**

1. **Projektname:** Luvly  
2. **Kernziel:** Entwicklung einer modernen, vertrauenswürdigen Web-Dating-App für Erwachsene, die eine ernsthafte Beziehung suchen und einen expliziten Kinderwunsch haben.  
3. **Alleinstellungsmerkmal (USP):** Klarer Fokus auf Kinderwunsch und Familienplanung als primäres Matching-Kriterium, ergänzt durch Standard-Dating-Funktionen und Betonung der Benutzersicherheit (später Verifizierung).  
4. **Zielgruppe:** Erwachsene (ca. 25-45 Jahre), primär im deutschsprachigen Raum, auf der Suche nach langfristigen, ernsthaften Beziehungen mit dem Ziel der Familiengründung. Technikaffine Nutzer.

**2. Technologie-Stack**

1. **Frontend:** React, TypeScript, Vite  
2. **UI-Bibliothek:** shadcn/ui  
3. **Styling:** Tailwind CSS  
4. **State Management:** Zustand (für Onboarding), React Context (für Auth)  
5. **Routing:** React Router DOM  
6. **Backend & Datenbank:** Supabase (Authentication, PostgreSQL Datenbank, Storage, Edge Functions/DB Functions)  
7. **Entwicklungstools:** Lovable.dev, Windsurf Editor, Node.js/npm, Git/GitHub

**3. Kernfunktionen (MVP - Inklusive Erweiterungen)**

1. **3.1. Authentifizierung:**  
2. Registrierung: E-Mail, Passwort, Vorname.  
3. Login: E-Mail, Passwort.  
4. Logout: Button in den Einstellungen.  
5. Passwort Reset: E-Mail-basierter Reset-Flow.  
6. *Status:* Teilweise implementiert (`Auth.tsx`, `AuthContext.tsx`, `ResetPassword.tsx`).  
7. **3.2. Onboarding-Prozess (Geführt nach Registrierung):**  
8. Schritt 1: Geburtstag (`BirthdayStep.tsx`).  
9. Schritt 2: Gender & Sexuelle Orientierung (`GenderOrientationStep.tsx`).  
10. Schritt 3: Kinderwunsch (Status: Hat Kinder? Ja/Nein -> Anzahl; Wunsch: Ja, bald / Ja, später / Vielleicht / Nein).  
11. Schritt 4: Interessen (Auswahl min. 3-5 Tags aus vordefinierter Liste).  
12. Schritt 5: Lifestyle (Minimal: Auswahl für Rauchen, Trinken, Sport).  
13. Schritt 6: Foto-Upload (Min. 2 Fotos, Auswahl Kamera/Galerie).  
14. Schritt 7: Standort (Eingabe Stadt & Land).  
15. Schritt 8: Kurze Bio (Textfeld, ca. 150-300 Zeichen).  
16. *Status:* Schritte 1 & 2 vorhanden, Rest muss erstellt werden. `onboardingStore.ts` vorhanden. Supabase Schema angepasst.  
17. **3.3. Profilanzeige:**  
18. Profilkarte (`ProfileCard.tsx`): Anzeige von Vorname, Alter, Hauptfoto, Bio (gekürzt), Kinderwunsch-Status (z.B. Icon/Text), Interessen-Tags (max. 3), Standort (Stadt).  
19. Profil-Detailansicht (Dialog/Scroll): Alle Fotos (Karussell), vollständige Bio, detaillierte Kinderwunsch-Infos, alle Interessen, Lifestyle-Angaben (Rauchen, Trinken, Sport), Standort.  
20. *Status:* `ProfileCard.tsx` existiert, muss erweitert werden, um neue Daten anzuzeigen.  
21. **3.4. Swipe-Interface (`SwipeInterface.tsx`):**  
22. Anzeige von Profilkarten.  
23. Funktionen: Like (Rechts), Pass (Links), Super-Like (Hoch/Button), Undo (Button).  
24. Filter-Button: Öffnet den Filter-Dialog/Sheet.  
25. *Status:* Basis implementiert, Super-Like, Undo und Filter-Integration fehlen.  
26. **3.5. Filter-Funktion:**  
27. UI: Dialog oder Sheet zum Einstellen von Filtern.  
28. Filterkriterien: Altersbereich (Slider), Entfernung (Slider), Interessen (Multi-Select Checkboxen/Tags), Lifestyle (Rauchen, Trinken, Sport - Auswahl), Kinderwunsch-Status (Enum-Auswahl).  
29. Backend: `useProfiles.ts` und Supabase-Abfragen müssen Filter anwenden können.  
30. *Status:* Nicht implementiert.  
31. **3.6. Matching & Swipe-Logik:**  
32. Backend (Supabase Function/Trigger):  
33. Speichert Swipes (Like, Pass, Super-Like) in `swipes`-Tabelle.  
34. Prüft bei 'like' oder 'super_like' auf gegenseitiges Like -> erstellt Eintrag in `matches`-Tabelle und ggf. `conversations`-Tabelle.  
35. Implementiert Undo: Löscht letzten Swipe aus `swipes`, löscht ggf. entstandenes Match/Konversation.  
36. *Status:* Grundlegende Tabellenstruktur vorhanden. Backend-Logik für Swipes, Matching, Super-Like, Undo fehlt.  
37. **3.7. Match-Liste & "Likes You" (`Matches.tsx`):**  
38. UI-Tabs: "Nachrichten", "Likes".  
39. "Nachrichten"-Tab: Liste bestehender Konversationen (`ConversationList.tsx`).  
40. "Likes"-Tab: Gitteransicht der Profile, die den aktuellen Nutzer geliked haben (benötigt separate Backend-Abfrage).  
41. Klick auf Match/Like öffnet Chat bzw. Profil.  
42. *Status:* `Matches.tsx` und `ConversationList.tsx` existieren, Tabs und "Likes"-Funktionalität fehlen.  
43. **3.8. Chat (`ChatView.tsx`):**  
44. 1-zu-1 Text-Chat mit Matches.  
45. Echtzeit-Nachrichtenübermittlung.  
46. Anzeige des Chatpartners im Header.  
47. *Status:* Basis implementiert.  
48. **3.9. Profil & Einstellungen (Minimal):**  
49. Eigenes Profil anzeigen (`Profile.tsx`): Anzeige aller erfassten MVP-Daten.  
50. Profil bearbeiten: Möglichkeit zum Ändern von Fotos, Bio, Kinderwunsch-Angaben, Standort, Interessen, Lifestyle.  
51. Einstellungen (`Settings.tsx`): Logout-Button, Link zur Profilbearbeitung.  
52. *Status:* Basis vorhanden, Bearbeitungsfunktionen müssen erweitert werden.  
53. **3.10. Blockier-Funktion:**  
54. UI: Button im Profil-Detail oder Chat-Menü zum Blockieren eines Nutzers.  
55. Backend: Eintrag in `blocked_users`-Tabelle.  
56. Logik: Blockierte Nutzer dürfen in Profilvorschlägen, Match-Listen, Likes-Listen und Chats nicht mehr erscheinen und keine Interaktionen mehr durchführen. RLS Policies müssen angepasst werden.  
57. *Status:* Nicht implementiert. Tabelle `blocked_users` erstellt.

**4. Datenbank Schema (Supabase)**

1. Tabelle `profiles`: Enthält alle Nutzerdaten (Name, Auth-ID, Bio, Geburtstag, Gender, Orientierung, Kinderwunsch-Details, Interessen, Lifestyle, Standort, Fotos etc.).  
2. Tabelle `swipes`: Speichert jede Swipe-Aktion (swiper_id, swiped_profile_id, action ('like', 'pass', 'super_like'), timestamp).  
3. Tabelle `matches`: Speichert gegenseitige Likes (profile_1_id, profile_2_id, timestamp).  
4. Tabelle `conversations`: Verbindet ein Match mit einem Chat (match_id, timestamp).  
5. Tabelle `messages`: Speichert einzelne Chat-Nachrichten (conversation_id, sender_id, content, timestamp).  
6. Tabelle `blocked_users`: Speichert Blockierungen (blocker_id, blocked_id, timestamp).  
7. Notwendige ENUM-Typen für Gender, Orientierung, Kinderwunsch, Lifestyle, Swipe-Aktion etc.  
8. Row Level Security (RLS) für alle Tabellen aktiviert und konfiguriert (essenziell\!).  
9. Indizes für häufig gefilterte Spalten (z.B. Interessen, Kinderwunsch, Standort - falls Geodaten genutzt werden).  
10. *Status:* Schema wurde laut Nutzerangabe in Supabase implementiert. RLS Policies müssen noch erstellt/angepasst werden.

**5. Entwicklungsansatz & Werkzeuge**

1. **Werkzeuge:** Primär Lovable.dev und Windsurf Editor für UI und Frontend-Logik. Supabase UI und SQL Editor für Backend/DB. Lokale IDE für komplexe Logik oder Debugging.  
2. **Ansatz:** Iterative Entwicklung. Fokus auf die Implementierung der definierten MVP-Features. Regelmässiges Testen.  
3. **Versionierung:** Git / GitHub.

**6. Phasen & Meilensteine (MVP)**

1. **Phase 1: Setup & Basis (Abgeschlossen/Laufend):** Projekt-Setup, Auth-Implementierung, Basis-Routing, UI-Bibliothek, DB-Schema implementiert.  
2. **Phase 2: Onboarding & Profil:** Vollständige Implementierung aller MVP-Onboarding-Schritte. Anpassung der Profilanzeige (`ProfileCard`, Detailansicht).  
3. **Phase 3: Swipe & Matching Logik:** Implementierung der Frontend-Buttons/Gesten für Like/Pass/Super-Like/Undo. Erstellung der Supabase Functions/Triggers für Swipe-Verarbeitung, Matching und Undo.  
4. **Phase 4: Filter & Blockieren:** Entwicklung der Filter-UI. Implementierung der Backend-Logik für das Filtern von Profilen. Implementierung der Blockier-UI und der Backend-Logik (inkl. RLS Anpassungen).  
5. **Phase 5: Matches, Likes & Chat:** Implementierung der Tabs in `Matches.tsx`. Erstellung der Backend-Abfrage und UI für den "Likes"-Tab. Sicherstellen der Chat-Funktionalität.  
6. **Phase 6: Bearbeitung, Einstellungen & Testing:** Implementierung der Profilbearbeitung für MVP-Felder. Minimales Settings-UI (Logout). Umfassendes Testing aller Funktionen, Bugfixing.  
7. **Phase 7: MVP Deployment:** Vorbereitung und Deployment des MVP.

**7. Wichtige Überlegungen & Risiken**

1. **Komplexität:** Die Hinzunahme von Filtern, Undo, Super-Like, "Likes"-Tab und Blockieren erhöht die Komplexität des MVP erheblich gegenüber einer reinen Swipe/Chat-App.  
2. **Row Level Security (RLS):** Die korrekte Implementierung von RLS, insbesondere unter Berücksichtigung der Blockierfunktion, ist kritisch für Sicherheit und Funktion. Dies erfordert sorgfältige Planung und Tests.  
3. **Backend-Logik:** Die Logik für Matching, Undo und das Filtern erfordert gut durchdachte Supabase Functions oder Trigger.  
4. **Performance:** Komplexe Filterabfragen und die "Likes You"-Abfrage können bei vielen Nutzern Performance-Engpässe verursachen. Indizierung ist wichtig.  
5. **UI/UX:** Das Design der Filter, Tabs und der Interaktionen (Super-Like, Undo) muss intuitiv sein.

**8. Nächste Konkrete Schritte**

1. **RLS Policies Definieren:** Erstelle und teste die Row Level Security Policies für *alle* Tabellen (`profiles`, `swipes`, `matches`, `conversations`, `messages`, `blocked_users`), insbesondere die SELECT-Policies, die blockierte Nutzer berücksichtigen.  
2. **TypeScript Typen Aktualisieren:** Generiere die Frontend-Typen basierend auf dem finalen Supabase-Schema neu.  
3. **Onboarding Implementieren:** Entwickle die UI und Logik für die fehlenden Onboarding-Schritte (Kinderwunsch, Interessen, Lifestyle, Fotos, Standort, Bio).  
4. **Backend Functions/Triggers:** Beginne mit der Implementierung der Supabase Functions/Triggers für:  
5. Verarbeitung von Swipes (Like, Pass, Super-Like speichern).  
6. Prüfung auf Matches bei Like/Super-Like.  
7. Verarbeitung von Undo.  
8. **Filter UI & Logik:** Entwerfe die Filter-UI und implementiere die `useProfiles` Hook-Anpassung, um Filter an Supabase zu übergeben und gefilterte Ergebnisse zu erhalten.  
9. **Swipe Interface Anpassen:** Füge die Buttons/Gesten für Super-Like und Undo hinzu und verbinde sie mit der Backend-Logik. Füge den Filter-Button hinzu.
