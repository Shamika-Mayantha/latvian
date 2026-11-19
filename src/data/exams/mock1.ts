import type { MockExam } from "../types";

/**
 * Mock 1 is built on the official VIAA 2026 A2 sample paper
 * (viaa.gov.lv → Pārbaudes programma). Some texts that are images in the
 * original (ads, a job notice) were rewritten so they work on screen.
 */
export const mock1: MockExam = {
  id: "mock1",
  title: "Mock exam 1 — official sample",
  note: "Based on the official VIAA 2026 A2 sample paper. Same task types, points and timing as the real exam.",
  listening: {
    t1: [
      {
        clip: { lines: [{ v: "f", t: "Turpmāk katru trešdienu mūsu radiostacijā skanēs raidījums “Kas notiek Eiropā?”. Klausieties mūs jau šajā trešdienā, 20. septembrī, pulksten divpadsmitos dienā." }] },
        q: "Cikos būs raidījums “Kas notiek Eiropā?”",
        options: ["Pulksten 20.00.", "Pulksten 13.00.", "Pulksten 12.00."],
        answer: 2,
      },
      {
        clip: { lines: [{ v: "m", t: "Jaunā filma “Operācija 23” uz kinoteātru ekrāniem jau no 11. jūnija! Nepalaidiet garām, ja jums patīk asa sižeta filmas. Biļetes var iegādāties jau no 1. jūnija kinoteātra mājaslapā." }] },
        q: "Kurā datumā sāks rādīt jauno filmu?",
        options: ["1. jūnijā.", "11. jūnijā.", "23. jūnijā."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "f", t: "Ja gribat remontēt savu dzīvokli, nāciet uz mūsu būvmateriālu veikalu. Te varēsiet iegādāties visu labam remontam! Senioriem 20 % atlaide visām tapetēm un krāsām." }] },
        q: "Kurām precēm senioriem būs 20 % atlaide?",
        options: ["Visām krāsainajām tapetēm.", "Visām veikala precēm.", "Jebkurām tapetēm un krāsām."],
        answer: 2,
      },
      {
        clip: { lines: [{ v: "m", t: "Vasaras koncertu cikla “Muzikālās brokastis” atklāšana notiks svētdien, 3. maijā, pulksten vienpadsmitos. Koncertā uzstāsies pazīstamais pianists Andrejs Zariņš, bet nākamajā svētdienā spēlēs džeza mūzikas grupa. Ieeja koncertā bez maksas." }] },
        q: "Kad sāksies koncertu cikls?",
        options: ["10. maijā, pulksten 13.00.", "3. maijā, pulksten 13.00.", "3. maijā, pulksten 11.00."],
        answer: 2,
      },
      {
        clip: { lines: [{ v: "f", t: "2. jūnijā aicinām uz lekciju par Latvijas vēsturi. Lekcija sāksies pulksten divpadsmitos Centrālās bibliotēkas lasītavā un ilgs divas stundas." }] },
        q: "Cik ilgi būs lekcija?",
        options: ["Vienu stundu.", "Divas stundas.", "Visu dienu."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "m", t: "Cienījamie pasažieri! Divas nedēļas – no 1. līdz 14. jūnijam – dzelzceļa stacijas pirmajā stāvā notiks remonts. Biļešu kase un izeja uz vilcieniem būs no stacijas otrā stāva. Atvainojamies par sagādātajām neērtībām." }] },
        q: "Kur notiks remonts?",
        options: ["Stacijas otrajā stāvā.", "Stacijas pirmajā stāvā.", "Stacijas biļešu kasē."],
        answer: 1,
      },
    ],
    t2: {
      clip: {
        lines: [
          { v: "m", t: "Sveiks, Ērik!" },
          { v: "f", t: "Sveiks, Normund!" },
          { v: "m", t: "Kā iet? Ilgi neesam tikušies. Vai esi mājās?" },
          { v: "f", t: "Nē, pašreiz esmu Ventspilī. Man ir atvaļinājums." },
          { v: "m", t: "Cik ilgi būsi atvaļinājumā?" },
          { v: "f", t: "Gribēju trīs nedēļas, bet diemžēl daudz darba – varēšu būt prom no darba tikai divas nedēļas. Vēl vienu nedēļu varu atpūsties." },
          { v: "m", t: "Vai abas nedēļas plāno pavadīt Ventspilī?" },
          { v: "f", t: "Nē, mēs ar draudzeni bijām Talsos, rīt brauksim uz Kuldīgu. Izdomājām, ka šoreiz ceļosim tepat pa Latviju. Draudzene gan gribēja braukt uz Spāniju, bet tagad, jūlijā, tur ir ļoti karsts laiks. Drīzāk uz Spāniju brauksim septembrī vai oktobrī." },
          { v: "m", t: "Jā, tā ir, Latvijā tiešām ir daudz skaistu vietu. Es brīvdienās biju Latgalē pie radiem. Preiļos apskatījām Leļļu muzeju. Mana piecgadīgā meita priecājās par lellēm." },
          { v: "f", t: "Mēs uz Latgales pusi brauksim augusta sākumā. Daugavpilī dzīvo mana māsīca." },
          { v: "m", t: "Lai jums laba atpūta! Atsūti no Kurzemes kādus foto! Kādu bildi ar jūru." },
          { v: "f", t: "Paldies! Noteikti atsūtīšu!" },
        ],
      },
      statements: [
        { text: "Ērika atvaļinājums būs trīs nedēļas.", answer: false },
        { text: "Ēriks kopā ar draudzeni jūlijā plāno braukt uz Spāniju.", answer: false },
        { text: "Normunda meitai patika Leļļu muzejs.", answer: true },
        { text: "Normunds lūdz draugam atsūtīt fotogrāfijas ar jūras skatu.", answer: true },
      ],
    },
    t3: {
      items: [
        {
          clip: { lines: [
            { v: "m", t: "Sveika, Inese!" }, { v: "f", t: "Sveiks, Andri!" }, { v: "m", t: "Vai nāc no veikala?" },
            { v: "f", t: "Jā! Nopirku brālim dāvanu. Viņam rīt vārda diena." },
            { v: "m", t: "Mūsu ģimenē rīt arī svētki. Manai sievai rīt ir dzimšanas diena." },
          ] },
          sentence: "Ineses brālim būs ___ diena.",
          answer: "vārda",
        },
        {
          clip: { lines: [
            { v: "m", t: "Atvainojiet, vai jums ir zāles pret iesnām?" },
            { v: "f", t: "Protams, kādas jūs vēlaties – pilienus vai tabletes?" },
            { v: "m", t: "Dodiet labāk pilienus. Cik tie maksā?" },
            { v: "f", t: "Pilieni maksā piecus eiro un desmit centus." },
          ] },
          sentence: "Vīrietis izvēlas ___ pret iesnām.",
          answer: "pilienus",
        },
        {
          clip: { lines: [
            { v: "f", t: "Labrīt, Sabīne! Zinu, ka tev brīvdiena. Ko tu šodien darīsi?" },
            { v: "m", t: "Vēl nezinu. Pašreiz kārtoju drēbju skapi." },
            { v: "f", t: "Es braukšu uz veikalu “Zeta”, tur šodien ir izpārdošana. Varbūt brauksim kopā?" },
            { v: "m", t: "O, ļoti labi! Man tieši vajag jaunas kurpes!" },
          ] },
          sentence: "Ināra grib nopirkt jaunas ___.",
          answer: "kurpes",
        },
        {
          clip: { lines: [
            { v: "f", t: "Aleksi! Vai nāksi rīt skatīties futbola spēli?" },
            { v: "m", t: "Nē, es netikšu, man tajā laikā ir lekcija. Šo es tiešām nevaru kavēt, jo pēc nedēļas ir eksāmens." },
          ] },
          sentence: "Aleksis rīt ies uz ___.",
          answer: "lekciju",
        },
        {
          clip: { lines: [
            { v: "m", t: "Sakiet, lūdzu, vai jūsu firma piedāvā ekskursiju uz Rundāles pili?" },
            { v: "f", t: "Jā. Tuvākā būs sestdien, 12. septembrī. Autobuss aties no mūsu biroja pulksten 10.00." },
            { v: "m", t: "Cik maksā ekskursija?" },
            { v: "f", t: "Ekskursijas cena ir 35 eiro vienai personai." },
          ] },
          sentence: "Ekskursija maksā ___ eiro.",
          answer: "35",
        },
      ],
      bank: ["tabletes", "dzimšanas", "35", "kurpes", "futbolu", "25", "vārda", "pilienus", "lekciju"],
    },
  },
  reading: {
    t1: [
      {
        title: "Restorāns „Pie jūras”",
        body: [
          "Katru darbadienu no 12.00 līdz 15.00 garšīgas pusdienas ar atlaidi – tikai 5.99 EUR!",
          "Šodien pusdienu ēdienkartē: salāti, lasis ar ceptiem kartupeļiem, šokolādes kūka „Sapnis” un sula vai kafija.",
          "Mūsu ēdienkartē atradīsiet ne vien latviešu, bet arī igauņu un lietuviešu tradicionālos ēdienus!",
          "Pirmdiena−piektdiena: 9.00−20.00, sestdienās un svētdienās: slēgts.",
        ],
        options: ["Restorāns piedāvā apmeklētājiem dažādu tautu ēdienus.", "Reklāmā nav informācijas par ēdienu komplekta cenu.", "Restorāns strādā katru dienu bez brīvdienām."],
        answer: 0,
      },
      {
        title: "Aptiekai “Veselība” vajadzīgs noliktavas darbinieks",
        body: [
          "Darbs mūsu noliktavā Rīgā, Mūkusalas ielā. Darba laiks: no 8.00 līdz 17.00.",
          "Pieredze nav nepieciešama – pirmajā nedēļā jaunos darbiniekus apmācīs mūsu kolēģi.",
          "CV sūtiet uz e-pastu darbs@veseliba.lv.",
        ],
        options: ["Darbinieks strādās aptiekā.", "Darbiniekam vajag atnest dokumentus uz firmas biroju.", "Darbinieku apmācīs kolēģi."],
        answer: 2,
      },
      {
        title: "Juri!",
        body: [
          "Atnāc, lūdzu, piektdien, 20. februārī, uz manu dzimšanas dienas ballīti. Tā sāksies 18.00 pie manis mājās. Es uzaicināju arī savus draugus Ivaru un Aiju. Cepsim picas. Būs torte un šampanietis.",
          "Vakarā mēs plānojam aiziet uz nakts klubu padejot. Vai Tu arī nāksi? Ivars brauks ar mašīnu, un pēc kluba viņš visus aizvedīs uz mājām.",
          "Darba kolēģe Maija, Ceriņu ielā 3-50",
        ],
        options: ["Maija ielūdz uz dzimšanas dienu savu darbabiedru.", "Juris var ņemt uz ballīti līdzi arī savus draugus.", "Maija jautā, vai Juris var aizvest ciemiņus pēc kluba uz mājām."],
        answer: 0,
      },
      {
        title: "Ēdienu vajag gatavot ar prieku",
        body: [
          "“Mani vecāki ir mākslinieki. Viņi vēlējās, lai es būtu mākslinieks. Pēc pamatskolas beigšanas es vasarā sāku strādāt viesnīcā par virtuves palīgu. Darbs virtuvē man patika, un pavāra profesija ir interesanta, tādēļ es sāku mācīties pavāru skolā,” tā par profesijas izvēli stāsta Jānis Bērziņš.",
          "Tagad Jānis strādā restorānā. “Es gatavoju galvenokārt gaļas ēdienus un zupas. Mans uzdevums ir arī domāt ēdienu nosaukumus. Jo interesantāki tie ir, jo vairāk viesu šos ēdienus pasūta.”",
        ],
        options: ["Restorāna viesi vairāk pasūta ēdienus, kuri izskatās neparasti.", "Jānis mācījās par pavāru, jo viņam patika strādāt virtuvē.", "Pēc pamatskolas Jānis domāja, ka kļūs par mākslinieku."],
        answer: 1,
      },
    ],
    t2: {
      situations: [
        { text: "Haralds ir no Latgales. Pēc vidusskolas viņš studēs medicīnu. Viņš meklē vietu galvaspilsētā, kur dzīvot studiju laikā.", answer: "D" },
        { text: "Anitas meitai ļoti patīk ārzemju dziedātāja Adriana. Viņa arī vēlas izskatīties kā dziedātāja un grib tādu matu griezumu kā Adrianai.", answer: "B" },
        { text: "Kaspara draudzenei Zanei drīz būs dzimšanas diena. Viņa jau divus gadus dzīvo Itālijā. Kaspars grib sūtīt viņai dāvanu. Viņš nopirka Zanei skaistus auskarus.", answer: "F" },
        { text: "Ilzes dēls visu dienu ar draugiem ārā spēlēja bumbu. Kad viņš vakarā atnāca mājās, viņam bija augsta temperatūra un sākās klepus. Ilzei nav zāļu pret klepu.", answer: "A" },
        { text: "Edgaram salūza mašīna. Nestrādā ātrumkārba, un vajag regulēt bremzes. Viņš meklē meistaru, kas to var ātri salabot.", answer: "H" },
        { text: "Artūra māsai drīz būs dzimšanas diena. Viņa daudz lasa un krāj grāmatas ar autogrāfiem. Artūrs vēlas viņai šādu grāmatu uzdāvināt.", answer: "C" },
      ],
      ads: [
        { id: "A", title: "Diennakts aptieka “Mēness”", body: "Strādājam 24 stundas – arī naktī un svētku dienās. Zāles pret klepu, iesnām un temperatūru bez receptes." },
        { id: "B", title: "Frizētava “Stils”", body: "Modernas frizūras pēc jūsu mīļākās zvaigznes foto! Matu griešana un krāsošana. Pierakstieties pa tālruni." },
        { id: "C", title: "Grāmatnīca “Lapa”", body: "Sestdien tikšanās ar rakstnieci Ingu Ābeli. Pērciet viņas jauno romānu un saņemiet autores autogrāfu!" },
        { id: "D", title: "Studentu kopmītnes Rīgā", body: "Izīrējam istabas studentiem uz visu mācību gadu. 10 minūtes līdz Rīgas Stradiņa universitātei." },
        { id: "E", title: "Valodu kursi “Runā!”", body: "Itāļu valodas kursi iesācējiem. Nodarbības divas reizes nedēļā vakaros." },
        { id: "F", title: "Kurjerpasts “Ātri”", body: "Sūtām pakas un dāvanas uz visām Eiropas valstīm 3–5 dienās. Droši un lēti." },
        { id: "G", title: "Juvelierizstrādājumu veikals “Zelts”", body: "Gredzeni, auskari un ķēdītes. Ziemassvētku atlaides līdz 30 %!" },
        { id: "H", title: "Autoserviss “Ritenis”", body: "Remontējam ātrumkārbas, bremzes un motorus. Lielāko daļu remontu veicam vienas dienas laikā." },
      ],
    },
    t3: {
      title: "Atpūta",
      parts: [
        "Gandrīz katram Zariņu ģimenē ir kāds hobijs. Juris brīvajā laikā ļoti daudz lasa. Viņa draugi zina, ka Juri ",
        { options: ["visvairāk", "visvairāku", "vairākus"], answer: 0 },
        " interesē detektīvromāni, tāpēc dzimšanas dienās dāvina viņam grāmatas. Jura dēlam Andrim ",
        { options: ["patīk", "patika", "patīkams"], answer: 0 },
        " aktīva atpūta. Viņš brauc ",
        { options: ["uz", "ar", "pa"], answer: 1 },
        " velosipēdu un slēpo. Andra jaunākā māsa krāj konfekšu papīriņus. Ar to viņa ",
        { options: ["nodarbojas", "nodarbība", "nodarbojās"], answer: 0 },
        " kopš piecu gadu vecuma. Tagad viņas ",
        { options: ["kolekcija", "kolekcijā", "kolekcijas"], answer: 1 },
        " ir jau vairāk nekā simts dažādu konfekšu papīriņu. Sievas Ilzes vaļasprieks ir ceļošana.",
      ],
    },
  },
  writing: {
    t1: {
      name: "Sabīne Fogele",
      facts: [
        { label: "Profesija", value: "ārste" },
        { label: "Darbavieta", value: "Salaspils Medicīnas centrs" },
        { label: "Ģimene", value: "vīrs, dēls un meita" },
        { label: "Mājas adrese", value: "Alojas iela 23–17, Rīga" },
        { label: "Vaļasprieks", value: "skriešana kopā ar draudzeni" },
        { label: "E-pasts", value: "fogel.sa@gmail.com" },
      ],
      ask: "Uzrakstiet aprakstu par Sabīni – minimums 30 vārdu! Aprakstā sniedziet informāciju par profesiju, darbavietu, ģimeni, dzīvesvietu, vaļasprieku, saziņas iespējām.",
      model: "Sabīne Fogele ir ārste. Viņa strādā Salaspils Medicīnas centrā. Sabīnei ir vīrs un divi bērni: dēls un meita. Sabīnes ģimene dzīvo Rīgā, Alojas ielā. Brīvajā laikā Sabīnei patīk skriet kopā ar draudzeni. Sabīnei var rakstīt uz e-pastu fogel.sa@gmail.com.",
    },
    t2: {
      intro: "Lasiet interneta ziņu virsrakstus un rakstiet iekavās doto vārdu pareizajā formā!",
      items: [
        { before: "Moderni apģērbi un apavi visai", base: "vasara", after: ".", answer: ["vasarai"] },
        { before: "Nesen Rīgā", base: "viesoties", after: "slavens amerikāņu aktieris. Skatieties interviju ar viņu TV!", answer: ["viesojās"] },
        { before: "Mūziķe Dārta Celmiņa stāsta par", base: "savs", after: "ceļu uz mūziku.", answer: ["savu"] },
        { before: "Rīgā nesen atklāja", base: "jauna", after: "stadionu.", answer: ["jaunu"] },
        { before: "Kad šogad", base: "notikt", after: "festivāls “Lampa”, un kādi būs sarunu temati?", answer: ["notiks"] },
      ],
    },
    t3: {
      situation: "Iedomājieties, ka jūs bijāt ceļojumā. Uzrakstiet draugam/draudzenei e-pastu, kurā:",
      points: ["sasveicinieties;", "raksturojiet vietu, kur bijāt;", "pastāstiet, kad jūs bijāt ceļojumā;", "uzrakstiet, kas jums ceļojumā patika un kas nepatika;", "atvadieties."],
      minWords: 35,
      model: "Sveika, Anna!\nKā Tev iet? Es ar ģimeni pirms divām nedēļām biju Francijā. Mēs ceļojām pa Provansu. Tur ir augsti kalni, jūra un lavandu lauki. Man ceļojumā visvairāk patika daba un garšīgi ēdieni, bet nepatika satiksme, jo vilcieni bieži kavēja.\nCeru, ka drīz satiksimies! Uz redzēšanos!\nDita",
    },
  },
  speaking: {
    t1: [
      { q: "Kāds ir jūsu vārds un uzvārds?", model: "Mans vārds ir Rahuls, mans uzvārds ir Perera." },
      { q: "Kurā pilsētā jūs dzīvojat?", model: "Es dzīvoju Rīgā, Purvciemā." },
      { q: "Cik ilgi jūs jau dzīvojat šajā vietā?", model: "Es šeit dzīvoju jau trīs gadus." },
      { q: "Kāda ir jūsu profesija?", model: "Es esmu programmētājs. Es strādāju IT uzņēmumā." },
      { q: "Kur jūs pērkat pārtikas produktus?", model: "Es parasti pērku pārtiku lielveikalā “Rimi”, jo tas ir blakus manai mājai." },
      { q: "Kur jums labāk patīk pirkt pārtikas produktus – veikalā vai tirgū? Kāpēc?", model: "Man labāk patīk tirgus, jo tur ir svaigi dārzeņi un augļi. Bet veikalā ir ērtāk." },
      { q: "Ko jūs darāt vakaros pēc darba?", model: "Vakaros es gatavoju vakariņas, mācos latviešu valodu un dažreiz skatos filmas." },
      { q: "Kurš sporta veids jums patīk? Kāpēc?", model: "Man patīk basketbols, jo tā ir ātra un interesanta spēle. Latvijā basketbols ir ļoti populārs." },
      { q: "Uz kurieni jūs esat ceļojis?", model: "Es esmu bijis Lietuvā un Igaunijā. Pagājušajā vasarā es biju Tallinā." },
      { q: "Kas jums ceļojumā vislabāk patika? Kāpēc?", model: "Man vislabāk patika vecpilsēta, jo tā ir ļoti skaista un veca." },
    ],
    t2: {
      scenes: [
        {
          title: "Attēls 1",
          description: "A park in summer. On the left, an old man sits on a bench and reads a newspaper. In the middle, a mother and a small girl eat ice cream. On the right, two boys play football. The sun is shining.",
          helpers: ["parks", "soliņš", "avīze", "saldējums", "spēlēt futbolu", "spīd saule"],
          model: "Attēlā es redzu parku. Laikam ir vasara, jo spīd saule un koki ir zaļi. Pa kreisi uz soliņa sēž vecs vīrietis un lasa avīzi. Vidū ir māte un maza meitene. Viņas ēd saldējumu un smaida. Pa labi divi zēni spēlē futbolu. Man patīk šis attēls, jo cilvēki atpūšas un ir priecīgi.",
        },
        {
          title: "Attēls 2",
          description: "A supermarket checkout in winter. A woman in a warm coat and hat pays by card. Her basket has bread, milk and apples. Behind her a man with a small child waits in the queue. Outside the window it is snowing.",
          helpers: ["lielveikals", "kase", "maksāt ar karti", "grozs", "rinda", "snieg"],
          model: "Attēlā es redzu lielveikalu. Ir ziema, jo aiz loga snieg. Pie kases stāv sieviete. Viņa valkā siltu mēteli un cepuri. Sieviete maksā ar karti. Viņas grozā ir maize, piens un āboli. Aiz viņas rindā stāv vīrietis ar mazu bērnu. Es arī bieži iepērkos lielveikalā pēc darba.",
        },
      ],
    },
    t3: {
      ads: [
        { text: "Valmieras Olimpiskajā centrā notiks basketbola spēle Latvija–Lietuva. Spēles datums: … ? …", ask: "Uzziniet datumu!", model: "Kurā datumā notiks basketbola spēle Latvija–Lietuva?", keys: [["kurā datumā", "kad"], ["spēle", "spēli"]] },
        { text: "Teātra izrāde “Laiks” 15. jūnijā sāksies pulksten … ? …", ask: "Uzziniet laiku!", model: "Cikos 15. jūnijā sāksies teātra izrāde “Laiks”?", keys: [["cikos", "cik pulksten", "kad"], ["izrād"]] },
        { text: "Ģimenes ārstes Andras Kļaviņas kabinets atrodas … ? … stāvā.", ask: "Uzziniet stāvu!", model: "Kurā stāvā atrodas ģimenes ārstes Andras Kļaviņas kabinets?", keys: [["kurā stāvā"], ["kabinet", "ārst"]] },
      ],
    },
  },
};
