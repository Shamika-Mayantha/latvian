import type { MockExam } from "../types";

export const mock2: MockExam = {
  id: "mock2",
  title: "Mock exam 2",
  note: "Original practice paper. Same format and difficulty as the A2 exam.",
  listening: {
    t1: [
      {
        clip: { lines: [{ v: "f", t: "Cienījamie klienti! Šodien mūsu lielveikals strādās līdz pulksten astoņiem vakarā. Rīt, svētku dienā, veikals būs slēgts." }] },
        q: "Kad veikals būs slēgts?",
        options: ["Šodien vakarā.", "Rīt.", "Svētdien."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "m", t: "Uzmanību! Vilciens Rīga–Sigulda šodien atiet no ceturtā ceļa nevis pulksten 15.20, bet pulksten 15.40. Atvainojamies par neērtībām." }] },
        q: "Cikos šodien atiet vilciens uz Siguldu?",
        options: ["15.20.", "15.40.", "14.40."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "f", t: "Sporta klubs “Enerģija” aicina uz bezmaksas jogas nodarbību sestdien, 14. oktobrī. Nodarbība notiks klubā, otrajā stāvā. Līdzi ņemiet paklājiņu un ūdeni." }] },
        q: "Kas jāņem līdzi uz nodarbību?",
        options: ["Paklājiņš un ūdens.", "Dvielis un sporta kurpes.", "Nauda par nodarbību."],
        answer: 0,
      },
      {
        clip: { lines: [{ v: "m", t: "Rīt Latvijā būs saulains, bet vējains laiks. Dienā gaisa temperatūra būs plus piecpadsmit grādi, naktī – plus pieci." }] },
        q: "Kāda būs temperatūra dienā?",
        options: ["+5 grādi.", "+15 grādi.", "+50 grādi."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "f", t: "Bērnu bibliotēka aicina skolēnus uz lasīšanas pēcpusdienu katru ceturtdienu no pulksten trijiem līdz pieciem. Jāpiesakās pie bibliotekāres." }] },
        q: "Kad notiek lasīšanas pēcpusdienas?",
        options: ["Katru otrdienu.", "Katru ceturtdienu.", "Katru piektdienu."],
        answer: 1,
      },
      {
        clip: { lines: [{ v: "m", t: "Pilsētas poliklīnikā no nākamās nedēļas pie ģimenes ārsta varēs pierakstīties ne tikai pa tālruni, bet arī internetā, poliklīnikas mājaslapā." }] },
        q: "Kā no nākamās nedēļas varēs pierakstīties pie ārsta?",
        options: ["Tikai pa tālruni.", "Arī internetā.", "Tikai reģistratūrā."],
        answer: 1,
      },
    ],
    t2: {
      clip: {
        lines: [
          { v: "f", t: "Labdien! Vai tā ir viesnīca “Jūrmala”?" },
          { v: "m", t: "Jā, labdien! Kā es varu palīdzēt?" },
          { v: "f", t: "Es gribu rezervēt numuru divām personām no piektdienas līdz svētdienai." },
          { v: "m", t: "Uz kuru datumu?" },
          { v: "f", t: "No divdesmitā līdz divdesmit otrajam augustam." },
          { v: "m", t: "Jā, mums ir brīvs numurs ar skatu uz jūru. Tas maksā astoņdesmit eiro par nakti. Brokastis ir iekļautas cenā." },
          { v: "f", t: "Labi. Vai viesnīcā ir autostāvvieta?" },
          { v: "m", t: "Jā, bet tā ir maksas – pieci eiro dienā." },
          { v: "f", t: "Sapratu. Vai drīkst ņemt līdzi suni?" },
          { v: "m", t: "Diemžēl nē, ar dzīvniekiem mūsu viesnīcā nedrīkst." },
          { v: "f", t: "Žēl. Bet labi, es rezervēšu numuru. Mans vārds ir Anna Liepa." },
        ],
      },
      statements: [
        { text: "Anna grib rezervēt numuru vienai personai.", answer: false },
        { text: "Brokastis nav jāmaksā atsevišķi.", answer: true },
        { text: "Autostāvvieta pie viesnīcas ir bez maksas.", answer: false },
        { text: "Viesnīcā nedrīkst dzīvot ar suni.", answer: true },
      ],
    },
    t3: {
      items: [
        {
          clip: { lines: [
            { v: "m", t: "Ilze, kur tu biji? Tevi nebija darbā." },
            { v: "f", t: "Man bija stipras zobu sāpes, tāpēc biju pie zobārsta." },
          ] },
          sentence: "Ilze bija pie ___.",
          answer: "zobārsta",
        },
        {
          clip: { lines: [
            { v: "f", t: "Cik maksā šie zābaki?" },
            { v: "m", t: "Parasti septiņdesmit eiro, bet šodien ar atlaidi – piecdesmit." },
          ] },
          sentence: "Šodien zābaki maksā ___ eiro.",
          answer: "50",
        },
        {
          clip: { lines: [
            { v: "m", t: "Ko tu dāvināsi mammai?" },
            { v: "f", t: "Grāmatas viņai jau ir daudz. Es nopirku siltu šalli, jo nāk ziema." },
          ] },
          sentence: "Mammai dāvanā būs ___.",
          answer: "šalle",
        },
        {
          clip: { lines: [
            { v: "f", t: "Kā tu brauc uz darbu?" },
            { v: "m", t: "Agrāk braucu ar mašīnu, bet tagad braucu ar velosipēdu. Tas ir veselīgi!" },
          ] },
          sentence: "Tagad vīrietis brauc uz darbu ar ___.",
          answer: "velosipēdu",
        },
        {
          clip: { lines: [
            { v: "m", t: "Kurā stāvā ir grāmatvedība?" },
            { v: "f", t: "Ceturtajā stāvā, četrsimt desmitajā kabinetā. Lifts ir pa labi." },
          ] },
          sentence: "Grāmatvedība ir ___ stāvā.",
          answer: "ceturtajā",
        },
      ],
      bank: ["zobārsta", "ārsta", "50", "70", "šalle", "grāmata", "velosipēdu", "mašīnu", "ceturtajā"],
    },
  },
  reading: {
    t1: [
      {
        title: "Kafejnīca “Saulīte” meklē viesmīli",
        body: [
          "Darbs maiņās: divas dienas strādā, divas dienas brīvas. Darba laiks no 10.00 līdz 22.00.",
          "Vēlamas latviešu un angļu valodas zināšanas. Darba apģērbu dod kafejnīca.",
          "Zvaniet pa tālruni 26 11 22 33 darba dienās.",
        ],
        options: ["Viesmīlim jāstrādā katru dienu.", "Viesmīlim nav jāpērk darba apģērbs.", "Kafejnīcai var zvanīt arī svētdienās."],
        answer: 1,
      },
      {
        title: "Sveika, Līga!",
        body: [
          "Paldies par ielūgumu uz Tavu izlaidumu! Diemžēl sestdien es nevarēšu atnākt, jo esmu komandējumā Vācijā un būšu mājās tikai pirmdien.",
          "Apsveicu Tevi! Novēlu Tev labu darbu un daudz prieka! Dāvanu atvedīšu, kad atbraukšu.",
          "Tava Ieva",
        ],
        options: ["Ieva nāks uz Līgas izlaidumu.", "Ieva atgriezīsies mājās pirmdien.", "Ieva jau atdeva Līgai dāvanu."],
        answer: 1,
      },
      {
        title: "Siguldas pils",
        body: [
          "Siguldas Jaunā pils ir atvērta apmeklētājiem katru dienu no 10.00 līdz 18.00, pirmdienās – slēgta.",
          "Biļete pieaugušajiem – 4 eiro, skolēniem un senioriem – 2 eiro. Bērniem līdz 7 gadiem ieeja bez maksas.",
        ],
        options: ["Pils ir atvērta arī pirmdienās.", "Senioriem biļete maksā tikpat, cik skolēniem.", "Visiem bērniem ieeja ir bez maksas."],
        answer: 1,
      },
      {
        title: "Mans vaļasprieks",
        body: [
          "Mani sauc Kārlis. Es strādāju bankā, bet mans lielākais prieks ir mans dārzs laukos. Katru piektdienu pēc darba es braucu pie vecākiem uz Vidzemi.",
          "Tur es audzēju tomātus, gurķus un kartupeļus. Rudenī mēs ar ģimeni ejam uz mežu sēņot. Pilsētā es dzīvoju dzīvoklī, tāpēc man ļoti patīk strādāt dārzā svaigā gaisā.",
        ],
        options: ["Kārlis strādā dārzā katru dienu.", "Kārļa dārzs ir pie viņa dzīvokļa Rīgā.", "Kārlis brīvdienas pavada laukos."],
        answer: 2,
      },
    ],
    t2: {
      situations: [
        { text: "Marta strādā birojā visu dienu un grib vakaros nodarboties ar sportu. Viņai patīk peldēt.", answer: "E" },
        { text: "Pētera ģimene pārceļas uz jaunu dzīvokli. Viņiem vajag kādu, kas pārvedīs mēbeles.", answer: "A" },
        { text: "Olga dzīvo Latvijā tikai pusgadu. Viņa grib labāk runāt latviski, lai atrastu darbu.", answer: "G" },
        { text: "Jāņa vecajam telefonam salūza ekrāns. Viņš negrib pirkt jaunu telefonu.", answer: "C" },
        { text: "Sandra un viņas vīrs grib sestdienas vakarā kopā aiziet uz labu restorānu un dzirdēt dzīvo mūziku.", answer: "H" },
        { text: "Dmitrija meitai ir pieci gadi. Viņš meklē vietu, kur meita var dejot un dziedāt kopā ar citiem bērniem.", answer: "B" },
      ],
      ads: [
        { id: "A", title: "Pārvākšanās serviss “Spēks”", body: "Pārvedam mēbeles un sadzīves tehniku Rīgā un visā Latvijā. Mums ir lielas mašīnas un spēcīgi darbinieki." },
        { id: "B", title: "Bērnu studija “Zīlīte”", body: "Dejas un dziesmas bērniem no 4 līdz 8 gadiem. Nodarbības otrdienās un ceturtdienās." },
        { id: "C", title: "Telefonu darbnīca “Fiksis”", body: "Salabojam telefonu ekrānus un baterijas 1 stundas laikā. Garantija 6 mēneši." },
        { id: "D", title: "Elektronikas veikals “Tehno”", body: "Jaunākie telefoni un datori ar atlaidi! Pērciet tagad – maksājiet vēlāk." },
        { id: "E", title: "Peldbaseins “Vilnis”", body: "Atvērts katru dienu no 7.00 līdz 22.00. Vakara abonements pieaugušajiem – 35 eiro mēnesī." },
        { id: "F", title: "Fitnesa klubs “Forma”", body: "Rīta treniņi no 6.00 līdz 9.00. Sporta zāle un sauna." },
        { id: "G", title: "Latviešu valodas kursi pieaugušajiem", body: "Bezmaksas kursi A1–A2 līmenī. Mācības vakaros, palīdzam sagatavoties valsts valodas pārbaudei un darba intervijai." },
        { id: "H", title: "Restorāns “Vecrīga”", body: "Piektdienās un sestdienās no 19.00 dzīvā džeza mūzika. Galdiņu rezervācija pa tālruni." },
      ],
    },
    t3: {
      title: "Mana darba diena",
      parts: [
        "Mani sauc Olga, un es strādāju ",
        { options: ["par", "uz", "ar"], answer: 0 },
        " pārdevēju maizes veikalā. Mans darbs sākas agri – ",
        { options: ["septiņi", "septiņos", "septīto"], answer: 1 },
        " no rīta. Vispirms mēs ar kolēģi saliekam svaigu maizi plauktos. Pircēji visvairāk ",
        { options: ["pērk", "pirka", "pirkt"], answer: 0 },
        " rupjmaizi un bulciņas. Pusdienas es ēdu ",
        { options: ["kafejnīca", "kafejnīcu", "kafejnīcā"], answer: 2 },
        " blakus veikalam. Man patīk mans darbs, ",
        { options: ["jo", "bet", "vai"], answer: 0 },
        " mūsu maize ir ļoti garšīga un pircēji ir laipni.",
      ],
    },
  },
  writing: {
    t1: {
      name: "Andris Kalniņš",
      facts: [
        { label: "Profesija", value: "pavārs" },
        { label: "Darbavieta", value: "restorāns “Rīts”, Liepāja" },
        { label: "Ģimene", value: "sieva Inga, meita (6 gadi)" },
        { label: "Dzīvesvieta", value: "māja pie jūras, Liepāja" },
        { label: "Vaļasprieks", value: "makšķerēšana, futbols" },
        { label: "Tālrunis", value: "29 87 65 43" },
      ],
      ask: "Uzrakstiet aprakstu par Andri – minimums 30 vārdu! Aprakstā sniedziet informāciju par profesiju, darbavietu, ģimeni, dzīvesvietu, vaļasprieku, saziņas iespējām.",
      model: "Andris Kalniņš ir pavārs. Viņš strādā restorānā “Rīts” Liepājā. Andrim ir sieva Inga un meita. Meitai ir seši gadi. Ģimene dzīvo mājā pie jūras. Brīvajā laikā Andris makšķerē un spēlē futbolu. Andrim var piezvanīt pa tālruni 29 87 65 43.",
    },
    t2: {
      intro: "Lasiet teikumus un rakstiet iekavās doto vārdu pareizajā formā!",
      items: [
        { before: "Pagājušajā sestdienā mēs", base: "būt", after: "teātrī.", answer: ["bijām"] },
        { before: "Es katru rītu dzeru", base: "kafija", after: "ar pienu.", answer: ["kafiju"] },
        { before: "Mans brālis dzīvo", base: "Ventspils", after: ".", answer: ["Ventspilī"] },
        { before: "Rīt es", base: "zvanīt", after: "tev pēc darba.", answer: ["zvanīšu"] },
        { before: "Bērni spēlējas pie", base: "liels", after: "ezera.", answer: ["liela"] },
      ],
    },
    t3: {
      situation: "Jūs gribat aicināt draugu/draudzeni uz savu dzimšanas dienas svinībām. Uzrakstiet ielūgumu, kurā:",
      points: ["uzrunājiet draugu;", "pastāstiet, kad un kur notiks svinības;", "uzrakstiet, ko jūs darīsiet;", "palūdziet atbildēt, vai draugs nāks;", "atvadieties."],
      minWords: 35,
      model: "Mīļais Mārti!\nAicinu Tevi uz manu dzimšanas dienu sestdien, 12. aprīlī, pulksten sešos vakarā. Svinības notiks pie manis mājās, Lāčplēša ielā 15. Mēs ēdīsim picu, dejosim un spēlēsim spēles. Lūdzu, piezvani man līdz ceturtdienai, vai Tu nāksi!\nTiksimies!\nTava Laura",
    },
  },
  speaking: {
    t1: [
      { q: "Labdien! Lūdzu, pastāstiet par sevi! Kā jūs sauc?", model: "Labdien! Mani sauc Rahuls Perera." },
      { q: "No kurienes jūs esat?", model: "Es esmu no Šrilankas, no Kolombo." },
      { q: "Kur jūs strādājat?", model: "Es strādāju IT uzņēmumā Rīgas centrā." },
      { q: "Kā jūs nokļūstat uz darbu?", model: "Es braucu uz darbu ar trolejbusu. Brauciens ilgst divdesmit minūtes." },
      { q: "Pastāstiet par savu ģimeni!", model: "Man ir sieva un dēls. Sieva strādā par grāmatvedi, dēls iet skolā." },
      { q: "Kāds ir jūsu dzīvoklis?", model: "Mans dzīvoklis ir neliels, tam ir divas istabas. Tas ir gaišs un silts." },
      { q: "Ko jūs parasti ēdat brokastīs?", model: "Brokastīs es parasti ēdu maizi ar sieru un dzeru tēju." },
      { q: "Kā jūs svinat dzimšanas dienu?", model: "Es svinu mājās kopā ar ģimeni un draugiem. Mēs gatavojam ēdienu un ēdam torti." },
      { q: "Kurš gadalaiks jums patīk vislabāk? Kāpēc?", model: "Man vislabāk patīk vasara, jo ir silts un var peldēt jūrā." },
      { q: "Ko jūs darīsiet nākamajā nedēļas nogalē?", model: "Nākamajā nedēļas nogalē es braukšu uz Siguldu kopā ar draugiem." },
    ],
    t2: {
      scenes: [
        {
          title: "Attēls 1",
          description: "An office. A young woman with dark hair sits at a computer and talks on the phone. On the table there is a cup of coffee and papers. Behind her, a man in a suit stands at the window and looks at his watch.",
          helpers: ["birojs", "dators", "runāt pa telefonu", "krūze kafijas", "uzvalks", "skatīties pulkstenī"],
          model: "Attēlā es redzu biroju. Laikam ir rīts. Pie datora sēž jauna sieviete ar tumšiem matiem. Viņa runā pa telefonu. Uz galda ir krūze kafijas un papīri. Aiz viņas pie loga stāv vīrietis. Viņš valkā uzvalku un skatās pulkstenī. Man šķiet, ka viņš gaida tikšanos.",
        },
        {
          title: "Attēls 2",
          description: "A family at the seaside in summer. A father and son build a sandcastle. The mother lies on a towel and reads a book. In the background there are boats on the sea and many people swimming.",
          helpers: ["pludmale", "jūra", "smilšu pils", "dvielis", "laivas", "peldēties"],
          model: "Attēlā es redzu pludmali pie jūras. Ir vasara, jo ir saulains un silts. Tēvs un dēls būvē smilšu pili. Māte guļ uz dvieļa un lasa grāmatu. Jūrā ir laivas, un daudzi cilvēki peldas. Man patīk šis attēls, jo es arī mīlu atpūtu pie jūras.",
        },
      ],
    },
    t3: {
      ads: [
        { text: "Ekskursija uz Rundāles pili. Biļetes cena: … ? … eiro.", ask: "Uzziniet cenu!", model: "Cik maksā biļete uz ekskursiju uz Rundāles pili?", keys: [["cik maksā", "kāda ir cena", "kāda ir biļetes cena"], ["ekskursij", "biļet"]] },
        { text: "Latviešu valodas kursi notiks … ? … (vieta).", ask: "Uzziniet vietu!", model: "Kur notiks latviešu valodas kursi?", keys: [["kur"], ["kurs"]] },
        { text: "Peldbaseins “Vilnis” ir atvērts līdz pulksten … ? …", ask: "Uzziniet laiku!", model: "Līdz cikiem ir atvērts peldbaseins “Vilnis”?", keys: [["cikiem", "cikos", "cik ilgi", "kad"], ["baseins", "atvērts", "strādā"]] },
      ],
    },
  },
};
