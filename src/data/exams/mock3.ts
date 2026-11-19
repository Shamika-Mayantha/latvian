import type { MockExam } from "../types";

export const mock3: MockExam = {
  id: "mock3",
  title: "Mock exam 3",
  note: "Original practice paper. Do this one last, under real timing, about a week before the exam.",
  listening: {
    t1: [
      {
        clip: { lines: [{ v: "m", t: "Dārgie pilsētas iedzīvotāji! Pilsētas svētki šogad notiks no 18. līdz 20. jūlijam. Lielais koncerts būs sestdien, 19. jūlijā, Rātslaukumā." }] },
        q: "Kurā datumā būs lielais koncerts?",
        options: ["18. jūlijā.", "19. jūlijā.", "20. jūlijā."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "f", t: "Grāmatnīcā “Zvaigzne” tikai šonedēļ visām bērnu grāmatām trīsdesmit procentu atlaide. Mācību grāmatām atlaide nav." }] },
        q: "Kurām grāmatām ir atlaide?",
        options: ["Visām grāmatām.", "Mācību grāmatām.", "Bērnu grāmatām."],
        answer: 2,
      },
      {
        clip: { lines: [{ v: "m", t: "Autobuss numur trīs no rītdienas brauks pa jaunu maršrutu – caur slimnīcu un tirgu. Pieturu “Centrs” autobuss vairs neapkalpos." }] },
        q: "Kur autobuss vairs neapstāsies?",
        options: ["Pie slimnīcas.", "Pie tirgus.", "Pieturā “Centrs”."],
        answer: 2,
      },
      {
        clip: { lines: [{ v: "f", t: "Zoodārzs aicina ģimenes ar bērniem! Svētdienās ieeja bērniem līdz divpadsmit gadiem ir bez maksas. Zoodārzs ir atvērts no deviņiem līdz septiņiem." }] },
        q: "Kam svētdienās zoodārzā nav jāmaksā?",
        options: ["Bērniem līdz 12 gadiem.", "Visām ģimenēm.", "Senioriem."],
        answer: 0,
      },
      {
        clip: { lines: [{ v: "m", t: "Uzmanību, pasažieri! Reiss uz Londonu kavējas par vienu stundu. Iekāpšana lidmašīnā sāksies pulksten pusdivos." }] },
        q: "Cikos sāksies iekāpšana lidmašīnā?",
        options: ["13.30.", "14.30.", "12.30."],
        answer: 0,
      },
      {
        clip: { lines: [{ v: "f", t: "Mūsu frizētava ir pārcēlusies! Tagad mēs strādājam Brīvības ielā 40, otrajā stāvā, blakus aptiekai." }] },
        q: "Kur tagad atrodas frizētava?",
        options: ["Aptiekā.", "Brīvības ielā 40, otrajā stāvā.", "Brīvības ielā 14, pirmajā stāvā."],
        answer: 1,
      },
    ],
    t2: {
      clip: {
        lines: [
          { v: "f", t: "Sveiks, Mārtiņ! Ko tu dari šeit, tirgū?" },
          { v: "m", t: "Sveika, Rita! Pērku dārzeņus. Rīt mums būs ciemiņi – atbrauks sievas vecāki no Daugavpils." },
          { v: "f", t: "Cik jauki! Ko jūs gatavosiet?" },
          { v: "m", t: "Sieva cepīs zivi, bet es gatavošu salātus. Tāpēc man vajag tomātus un gurķus." },
          { v: "f", t: "Gurķi šodien ir dārgi, bet tomāti ir lēti un ļoti garšīgi." },
          { v: "m", t: "Paldies par padomu! Un ko tu pērc?" },
          { v: "f", t: "Es pērku ogas. Gribu cept ogu pīrāgu, jo meitai sestdien būs dzimšanas diena. Viņai būs desmit gadu." },
          { v: "m", t: "Apsveic viņu no manis!" },
        ],
      },
      statements: [
        { text: "Mārtiņa ģimenē rīt būs viesi.", answer: true },
        { text: "Mārtiņš cepīs zivi.", answer: false },
        { text: "Tirgū šodien tomāti nav dārgi.", answer: true },
        { text: "Ritas meitai būs vienpadsmit gadu.", answer: false },
      ],
    },
    t3: {
      items: [
        {
          clip: { lines: [
            { v: "m", t: "Vai jūs varat salabot manas kurpes?" },
            { v: "f", t: "Jā, protams. Tās būs gatavas parīt." },
          ] },
          sentence: "Kurpes būs gatavas ___.",
          answer: "parīt",
        },
        {
          clip: { lines: [
            { v: "f", t: "Cik ilgi ir jābrauc ar vilcienu līdz Cēsīm?" },
            { v: "m", t: "Apmēram pusotru stundu, varbūt nedaudz ilgāk." },
          ] },
          sentence: "Līdz Cēsīm jābrauc apmēram ___ stundu.",
          answer: "pusotru",
        },
        {
          clip: { lines: [
            { v: "m", t: "Vai jums ir brīvs galdiņš četrām personām?" },
            { v: "f", t: "Šobrīd nav, bet pēc divdesmit minūtēm būs brīvs galdiņš pie loga." },
          ] },
          sentence: "Galdiņš būs brīvs pēc ___ minūtēm.",
          answer: "20",
        },
        {
          clip: { lines: [
            { v: "f", t: "Ko tu darīsi atvaļinājumā?" },
            { v: "m", t: "Braukšu uz kalniem slēpot. Jūrā peldēties es varu arī vasarā Latvijā." },
          ] },
          sentence: "Atvaļinājumā vīrietis ies ___.",
          answer: "slēpot",
        },
        {
          clip: { lines: [
            { v: "m", t: "Labdien, es gribētu nosūtīt šo vēstuli uz Vāciju." },
            { v: "f", t: "Lūdzu, tā maksās divi eiro un divdesmit centu." },
          ] },
          sentence: "Vīrietis sūta ___ uz Vāciju.",
          answer: "vēstuli",
        },
      ],
      bank: ["parīt", "rīt", "pusotru", "divas", "20", "12", "slēpot", "peldēt", "vēstuli"],
    },
  },
  reading: {
    t1: [
      {
        title: "Paziņojums mājas iedzīvotājiem",
        body: [
          "Cienījamie iedzīvotāji! Otrdien, 5. martā, no 9.00 līdz 15.00 mājā nebūs karstā ūdens. Notiks remontdarbi pagrabā.",
          "Lūdzam saprast. Jautājumus var uzdot pa tālruni 67 12 34 56.",
          "Mājas apsaimniekotājs",
        ],
        options: ["Otrdien mājā visu dienu nebūs ūdens.", "Remonts notiks mājas pagrabā.", "Jautājumus var uzdot tikai e-pastā."],
        answer: 1,
      },
      {
        title: "Velosipēdu noma “Ritenis”",
        body: [
          "Velosipēdi pieaugušajiem un bērniem. Cena: 3 eiro stundā vai 15 eiro visai dienai.",
          "Lai nomātu velosipēdu, jāuzrāda pase vai personas apliecība. Ķiveres – bez maksas.",
        ],
        options: ["Par ķiveri ir jāmaksā atsevišķi.", "Velosipēdu var nomāt tikai uz visu dienu.", "Nomājot velosipēdu, vajag dokumentu."],
        answer: 2,
      },
      {
        title: "Mīļo Pēteri!",
        body: [
          "Sveicu Tevi vārda dienā! Novēlu Tev veselību, laimi un daudz saulainu dienu!",
          "Žēl, ka šodien nevaru būt kopā ar Tevi, jo esmu slima. Kad būšu vesela, aiziesim kopā uz kafejnīcu – es maksāšu!",
          "Tava māsa Kristīne",
        ],
        options: ["Kristīne apsveic brāli dzimšanas dienā.", "Kristīne šodien nevar atnākt, jo viņai jāstrādā.", "Kristīne grib vēlāk aiziet ar brāli uz kafejnīcu."],
        answer: 2,
      },
      {
        title: "Jauns darbs – jauna dzīve",
        body: [
          "Pirms trim gadiem Aleksandrs atbrauca uz Latviju no Ukrainas. Sākumā viņš strādāja noliktavā, bet vakaros mācījās latviešu valodu.",
          "Tagad viņš runā latviski un strādā par šoferi lielā firmā. “Valoda man ļoti palīdzēja. Kolēģi ir draudzīgi, un man patīk, ka katru dienu redzu dažādas Latvijas pilsētas,” stāsta Aleksandrs.",
        ],
        options: ["Aleksandrs Latvijā dzīvo jau trīs gadus.", "Aleksandrs vēl tagad strādā noliktavā.", "Aleksandrs mācījās latviešu valodu Ukrainā."],
        answer: 0,
      },
    ],
    t2: {
      situations: [
        { text: "Elīnai jāaizlido uz Londonu agri no rīta. Viņai nav mašīnas, un sabiedriskais transports tik agri vēl nebrauc.", answer: "D" },
        { text: "Viktoram ir mazs dēls, un abi vecāki strādā. Viņi meklē, kas pieskatīs bērnu pēc bērnudārza.", answer: "F" },
        { text: "Ingas ģimene grib nedēļas nogalē atpūsties laukos un pastaigāties pa mežu.", answer: "A" },
        { text: "Romāns gatavojas valsts valodas eksāmenam. Viņš grib vairāk runāt ar cilvēkiem latviski.", answer: "H" },
        { text: "Agnesei vajag mainīt naudu, jo viņa brauks ceļojumā uz Japānu.", answer: "C" },
        { text: "Kristapa sunim ir jāapgriež nagi un jāizmazgā spalva.", answer: "G" },
      ],
      ads: [
        { id: "A", title: "Brīvdienu māja “Priedes”", body: "Mājiņa ģimenei pie meža un ezera. Pirts, dārzs, meža takas. Cena – no 60 eiro par nakti." },
        { id: "B", title: "Viesnīca “Centrs”", body: "Ērti numuri pašā Rīgas centrā. Brokastis iekļautas cenā." },
        { id: "C", title: "Valūtas maiņa “Kurss”", body: "Maināmies eiro pret dolāriem, jenām, mārciņām un citām valūtām. Izdevīgs kurss." },
        { id: "D", title: "Taksometrs “Ātrais”", body: "Brauciens uz lidostu 24 stundas diennaktī. Pasūtiet iepriekš pa tālruni vai lietotnē." },
        { id: "E", title: "Autobusu kompānija “Ceļš”", body: "Reisi uz Tallinu un Viļņu katru dienu no autoostas, sākot no pulksten 8.00." },
        { id: "F", title: "Aukle Anna", body: "Pieskatu bērnus no 2 līdz 7 gadiem darba dienās pēc pulksten 16.00. Pieredze – 10 gadi." },
        { id: "G", title: "Dzīvnieku salons “Ķepa”", body: "Suņu un kaķu frizūras, mazgāšana un nagu griešana." },
        { id: "H", title: "Sarunu klubs “Runāsim!”", body: "Katru trešdienu kafejnīcā runājam latviski par dažādām tēmām. Visi laipni aicināti, līmenis A1–B1." },
      ],
    },
    t3: {
      title: "Ceļojums uz Liepāju",
      parts: [
        "Pagājušajā vasarā mēs ar draugiem ",
        { options: ["braucām", "brauksim", "braucam"], answer: 0 },
        " uz Liepāju. Ceļā bijām apmēram trīs ",
        { options: ["stunda", "stundas", "stundās"], answer: 1 },
        ". Liepājā mēs dzīvojām nelielā viesnīcā ",
        { options: ["blakus", "pirms", "kopš"], answer: 0 },
        " jūrai. Katru dienu mēs peldējāmies un sauļojāmies pludmalē. Vakarā mēs gājām ",
        { options: ["koncerts", "koncertā", "uz koncertu"], answer: 2 },
        ", jo Liepāja ir mūzikas pilsēta. Mums ļoti ",
        { options: ["patika", "patīkami", "patikt"], answer: 0 },
        " šis ceļojums.",
      ],
    },
  },
  writing: {
    t1: {
      name: "Marina Ozola",
      facts: [
        { label: "Profesija", value: "skolotāja (angļu valoda)" },
        { label: "Darbavieta", value: "Ogres 1. vidusskola" },
        { label: "Ģimene", value: "neprecējusies, kaķis Mincis" },
        { label: "Dzīvesvieta", value: "dzīvoklis Ogrē, Rīgas ielā 7" },
        { label: "Vaļasprieks", value: "ceļošana, fotografēšana" },
        { label: "E-pasts", value: "marina.ozola@inbox.lv" },
      ],
      ask: "Uzrakstiet aprakstu par Marinu – minimums 30 vārdu! Aprakstā sniedziet informāciju par profesiju, darbavietu, ģimeni, dzīvesvietu, vaļasprieku, saziņas iespējām.",
      model: "Marina Ozola ir angļu valodas skolotāja. Viņa strādā Ogres 1. vidusskolā. Marina nav precējusies, bet viņai ir kaķis Mincis. Viņa dzīvo dzīvoklī Ogrē, Rīgas ielā. Marinai patīk ceļot un fotografēt. Viņai var rakstīt uz e-pastu marina.ozola@inbox.lv.",
    },
    t2: {
      intro: "Lasiet teikumus un rakstiet iekavās doto vārdu pareizajā formā!",
      items: [
        { before: "Vakar es nopirku jaunu", base: "jaka", after: ".", answer: ["jaku"] },
        { before: "Mana māsa strādā", base: "slimnīca", after: "par medmāsu.", answer: ["slimnīcā"] },
        { before: "Nākamgad mēs", base: "ceļot", after: "uz Norvēģiju.", answer: ["ceļosim"] },
        { before: "Es dāvināšu", base: "tēvs", after: "grāmatu.", answer: ["tēvam"] },
        { before: "Šodien man", base: "sāpēt", after: "galva.", answer: ["sāp"] },
      ],
    },
    t3: {
      situation: "Jūs pārdodat savu veco velosipēdu. Uzrakstiet sludinājumu, kurā:",
      points: ["uzrakstiet, ko pārdodat;", "aprakstiet velosipēdu (krāsa, izmērs, stāvoklis);", "pastāstiet, kāpēc to pārdodat;", "norādiet cenu;", "uzrakstiet, kā ar jums sazināties."],
      minWords: 35,
      model: "Pārdodu velosipēdu!\nPārdodu zilu sieviešu velosipēdu. Tas ir vidēja izmēra un labā stāvoklī, jo es to maz lietoju. Velosipēdam ir jauni riteņi un grozs. Pārdodu, jo nopirku jaunu. Cena – 80 eiro.\nZvaniet pa tālruni 26 55 44 33 vakaros!",
    },
  },
  speaking: {
    t1: [
      { q: "Kā jūs sauc un kur jūs dzīvojat?", model: "Mani sauc Rahuls. Es dzīvoju Rīgā, Purvciemā." },
      { q: "Ar ko jūs dzīvojat kopā?", model: "Es dzīvoju kopā ar sievu un dēlu." },
      { q: "Kas jums patīk jūsu dzīvesvietā?", model: "Man patīk, ka blakus ir parks un veikals. Bet nepatīk, ka ir daudz mašīnu." },
      { q: "Kādas valodas jūs protat?", model: "Es protu sinhalu, angļu un mazliet latviešu valodu." },
      { q: "Kur jūs mācījāties latviešu valodu?", model: "Es mācījos latviešu valodu kursos un mājās internetā." },
      { q: "Kāds ir jūsu darba laiks?", model: "Es strādāju no deviņiem līdz pieciem, no pirmdienas līdz piektdienai." },
      { q: "Kur jūs iegūstat informāciju par to, kas notiek Latvijā?", model: "Es lasu ziņas internetā un dažreiz skatos televīziju." },
      { q: "Ko jūs darāt, ja esat slims?", model: "Ja esmu slims, es palieku mājās, dzeru tēju un zvanu ģimenes ārstam." },
      { q: "Kur jūs bijāt pagājušajā vasarā?", model: "Pagājušajā vasarā es biju Jūrmalā un Siguldā." },
      { q: "Kāpēc jūs mācāties latviešu valodu?", model: "Es mācos latviešu valodu, jo es dzīvoju un strādāju Latvijā. Man vajag runāt ar cilvēkiem." },
    ],
    t2: {
      scenes: [
        {
          title: "Attēls 1",
          description: "A doctor's office. A female doctor in a white coat listens to a boy with a stethoscope. The boy's mother sits on a chair next to him and looks worried. On the wall there is a clock that shows ten o'clock.",
          helpers: ["ārste", "balts halāts", "zēns", "māte", "noraizējusies", "pulkstenis"],
          model: "Attēlā es redzu ārsta kabinetu. Pulkstenis rāda desmit, tātad ir rīts. Ārste valkā baltu halātu. Viņa izmeklē zēnu. Laikam zēns ir slims. Blakus uz krēsla sēž zēna māte. Viņa ir noraizējusies. Man šķiet, ka ārste ir laipna un zēns drīz būs vesels.",
        },
        {
          title: "Attēls 2",
          description: "Winter in the countryside. Children ride sledges down a small hill. A grandfather in a warm hat stands near a house and smiles. Smoke comes from the chimney. Everything is white with snow.",
          helpers: ["ziema", "ragavas", "kalns", "vectēvs", "lauku māja", "sniegs"],
          model: "Attēlā es redzu laukus ziemā. Visur ir balts sniegs. Bērni brauc ar ragavām no kalna. Viņi ir priecīgi. Pie mājas stāv vectēvs. Viņš valkā siltu cepuri un smaida. Man patīk šis attēls, jo ziemā ir jautri spēlēties sniegā.",
        },
      ],
    },
    t3: {
      ads: [
        { text: "Velosipēdu noma “Ritenis” atrodas … ? …", ask: "Uzziniet adresi!", model: "Kur atrodas velosipēdu noma “Ritenis”?", keys: [["kur", "kāda ir adrese"], ["nom", "ritenis"]] },
        { text: "Latviešu valodas kursi ilgs … ? … mēnešus.", ask: "Uzziniet, cik ilgi!", model: "Cik ilgi ilgs latviešu valodas kursi?", keys: [["cik ilgi", "cik mēnešus", "cik ilgs"], ["kurs"]] },
        { text: "Sarunu klubā var piedalīties cilvēki no … ? … gadu vecuma.", ask: "Uzziniet vecumu!", model: "No cik gadu vecuma var piedalīties sarunu klubā?", keys: [["cik gad", "kāda vecuma", "cik vecs"], ["klub", "piedalīties"]] },
      ],
    },
  },
};
