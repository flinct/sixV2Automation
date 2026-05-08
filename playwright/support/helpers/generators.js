function generateRandomQuote() {
  const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Don't be afraid to give up the good to go for the great.",
    "I find that the harder I work, the more luck I seem to have.",
    "Success is not in what you have, but who you are.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "The best way to predict the future is to create it.",
    "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    "Opportunities don't happen. You create them.",
    "Success is how high you bounce when you hit bottom.",
    "Your time is limited, so don't waste it living someone else's life.",
    "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
    "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    "Do what you can, with what you have, where you are.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Dream big and dare to fail.",
    "Hardships often prepare ordinary people for an extraordinary destiny.",
    "Don't watch the clock; do what it does. Keep going.",
    "The journey of a thousand miles begins with one step.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Difficulties in life are intended to make us better, not bitter.",
    "The only person you are destined to become is the person you decide to be.",
    "Don't count the days, make the days count.",
    "Every strike brings me closer to the next home run.",
    "Keep your face always toward the sunshine—and shadows will fall behind you.",
    "You define your own life. Don't let other people write your script.",
    "Success is not how high you have climbed, but how you make a positive difference to the world.",
    "The best revenge is massive success.",
    "Do not let what you cannot do interfere with what you can do.",
    "It is never too late to be what you might have been.",
    "Turn your wounds into wisdom.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "We may encounter many defeats but we must not be defeated.",
    "Your life only gets better when you get better.",
    "Failure is another stepping stone to greatness.",
    "The man who has confidence in himself gains the confidence of others.",
    "Happiness is not something ready made. It comes from your own actions.",
    "If you want to lift yourself up, lift up someone else.",
    "No one can make you feel inferior without your consent.",
    "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    "You miss 100% of the shots you don't take.",
    "Don't wait. The time will never be just right.",
    "Whether you think you can or you think you can't, you're right.",
    "To be a champion, you have to believe in yourself when no one else will.",
    "Always do your best. What you plant now, you will harvest later.",
    "Go confidently in the direction of your dreams. Live the life you have imagined.",
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function randomAsk() {
  const Ask = [
    "Kapan barang saya akan dikirim?",
    "Berapa lama estimasi waktu pengiriman?",
    "Apakah saya bisa melacak pengiriman barang saya?",
    "Apakah bisa memilih jasa ekspedisi tertentu?",
    "Apakah pengiriman tersedia ke luar kota/luar negeri?",
    "Mengapa barang saya belum sampai padahal statusnya sudah terkirim?",
    "Bagaimana jika barang saya hilang dalam proses pengiriman?",
    "Apa yang harus saya lakukan jika saya tidak menerima barang saya?",
    "Apakah ada penggantian jika barang hilang atau rusak selama pengiriman?",
    "Siapa yang bertanggung jawab atas kehilangan barang dalam pengiriman?",
    "Berapa biaya pengiriman ke alamat saya?",
    "Apakah biaya pengiriman dihitung per berat atau per ukuran?",
    "Apakah ada promo gratis ongkir?",
    "Apakah ongkir bisa dibayar di tempat (COD)?",
    "Apakah biaya pengiriman akan berubah jika ada pengiriman ulang?",
    "Bisa lacak kiriman aku di mana?",
    "Boleh nggak pilih ekspedisi sendiri?",
    "Ngirim ke luar kota atau luar negeri bisa nggak?",
    "Statusnya udah terkirim tapi barangnya belum nyampe, kenapa ya?",
    "Barangku hilang di jalan, gimana dong?",
    "Aku belum terima barangnya, harus ngapain?",
    "Kalau barangnya rusak pas dikirim, bisa diganti nggak?",
    "Kalau barang hilang, siapa yang tanggung jawab?",
    "Ongkir ke alamatku berapa sih?",
    "Ongkirnya dihitung dari berat atau ukuran barang ya?",
    "Ada promo gratis ongkir nggak?",
    "Ongkir bisa dibayar pas barang sampai nggak (COD)?",
    "Kalau minta kirim ulang, ongkirnya nambah nggak?",
    "Halo, apa kabar hari ini?",
    "Hi there, how are you?",
    "Good morning, ready for the day?",
    "Selamat pagi, semoga cerah.",
  ];
  const randomIndex = Math.floor(Math.random() * Ask.length);
  return Ask[randomIndex];
}

function randomAsk2() {
  const ask2 = [
    "Kapan paket saya akan diproses dan dikirim?",
    "Berapa estimasi waktu sampai ke alamat tujuan?",
    "Apakah saya bisa memantau status pengiriman melalui resi?",
    "Bisakah saya memilih jasa kurir yang saya inginkan?",
    "Apakah layanan pengiriman tersedia hingga ke luar negeri?",
    "Mengapa status pengiriman sudah selesai, tapi barang belum saya terima?",
    "Apa yang harus saya lakukan jika paket hilang di perjalanan?",
    "Apakah ada asuransi jika barang rusak dalam pengiriman?",
    "Siapa pihak yang bertanggung jawab bila terjadi kehilangan barang?",
    "Bagaimana cara klaim jika barang saya rusak?",
    "Paket gue dikirim kapan sih?",
    "Biasanya nyampe berapa lama ya?",
    "Resi bisa dicek di mana ya?",
    "Boleh nggak milih kurir sendiri?",
    "Ngirim ke luar kota bisa kan?",
    "Kok status udah delivered tapi gue belum dapet barang?",
    "Kalau paket gue ilang gimana dong?",
    "Kalau barang rusak pas nyampe, bisa minta ganti nggak?",
    "Ongkir ke rumah gue kira-kira berapa?",
    "Ada gratis ongkir nggak sih?",
  ];
  const randomIndex2 = Math.floor(Math.random() * ask2.length);
  return ask2[randomIndex2];
}

function randomAsk3() {
  const ask3 = [
    "Selamat pagi, apa kabar hari ini?",
    "Selamat siang, semoga harimu menyenangkan.",
    "Selamat sore, bagaimana kabarnya?",
    "Selamat malam, semoga harimu berjalan baik.",
    "Halo, senang bisa menyapa kamu.",
    "Halo, semoga harimu lancar.",
    "Halo, bagaimana harimu sejauh ini?",
    "Halo, terima kasih sudah menyapa.",
    "Halo, semoga hari ini penuh energi.",
    "Halo, semoga harimu indah.",
    "Hai! Apa kabar?",
    "Good morning, how are you today?",
    "Good afternoon, hope your day is going well.",
    "Hello, how's your day?",
    "Hi there, welcome!",
    "Hey, what's up?",
    "Hai 👋, gimana kabarnya?",
    "Halo, lagi sibuk atau santai?",
  ];
  const randomIndex3 = Math.floor(Math.random() * ask3.length);
  return ask3[randomIndex3];
}

function randomAsk4() {
  const ask4 = [
    "Selamat datang kembali!",
    "Halo, senang bisa ngobrol lagi.",
    "Hai, apa kabar hari ini?",
    "Halo, lama tak berjumpa.",
    "Hai, semoga kamu sehat selalu.",
    "Halo, bagaimana minggu ini?",
    "Hai, ada cerita baru?",
    "Halo, apa kabar keluarga?",
    "Hai, semoga semua baik-baik aja.",
    "Halo, sudah istirahatkah?",
    "Good morning! Hope you slept well.",
    "Hello there, nice to see you.",
    "Hi, thanks for dropping by.",
    "Hey, long time no chat!",
    "Hai, semoga harimu indah.",
    "Halo, sudah sarapan?",
    "Hai, gimana aktivitasmu?",
  ];
  const randomIndex4 = Math.floor(Math.random() * ask4.length);
  return ask4[randomIndex4];
}

function randomAsk5() {
  const ask5 = [
    "Good morning, ready for the day?",
    "Good afternoon, how's your vibe?",
    "Good evening, how's your mood?",
    "Hello there, hope you're good.",
    "Hiya! How's life?",
    "Hey, nice to connect.",
    "Hi, how are things lately?",
    "Hai, semoga hari ini menyenangkan.",
    "Halo, gimana kabar teman?",
    "Hai, ada cerita hari ini?",
    "Hi, hope your day's amazing.",
    "Hey, what's your highlight?",
    "Hi, good vibes only!",
  ];
  const randomIndex5 = Math.floor(Math.random() * ask5.length);
  return ask5[randomIndex5];
}

function randomAsk6() {
  const ask6 = [
    "Selamat pagi, semoga cerah.",
    "Selamat siang, apa kabar?",
    "Selamat sore, semoga tenang.",
    "Selamat malam, semoga damai.",
    "Halo, kabar baik ya?",
    "Hai, senang ngobrol lagi.",
    "Halo, semoga bahagia.",
    "Hai, semoga sehat selalu.",
    "Good morning, sunshine!",
    "Hello, welcome back!",
    "Hi, good to see you.",
    "Hey, new day new vibe!",
  ];
  const randomIndex6 = Math.floor(Math.random() * ask6.length);
  return ask6[randomIndex6];
}

function randomAnswer() {
  const answer = [
    "Biasanya barang dikirim 1x24 jam setelah pesanan dikonfirmasi.",
    "Waktu pengiriman tergantung lokasi, tapi biasanya 2–5 hari kerja.",
    "Kamu bisa cek status kiriman pakai nomor resi yang kami kasih.",
    "Bisa banget! Tinggal pilih ekspedisi yang tersedia pas checkout.",
    "Iya, kami bisa kirim ke luar kota dan luar negeri juga kok.",
    "Kalau status udah terkirim tapi barang belum nyampe, coba cek ke tetangga atau hubungi kurir ya.",
    "Kalau barang hilang, tenang aja, kami bantu proses klaim ke ekspedisi.",
    "Coba hubungi kami dulu ya, nanti tim kami bantu cekin.",
    "Kalau rusak karena pengiriman, kami bantu proses penggantian atau refund kok.",
    "Yang tanggung jawab biasanya ekspedisinya, tapi kami bantu prosesnya ya.",
    "Ongkir tergantung lokasi pengiriman dan berat barang, bisa dicek pas mau bayar.",
    "Iya, ongkir dihitung dari berat atau ukuran paket, tergantung ekspedisinya.",
    "Kadang ada promo free ongkir, pantengin terus infonya ya!",
    "Iya bisa, asal ekspedisinya support COD. Nanti pilih aja pas checkout.",
    "Kalau kirim ulang karena kesalahan alamat, biasanya ada tambahan ongkir ya.",
  ];
  const randomIndex = Math.floor(Math.random() * answer.length);
  return answer[randomIndex];
}

module.exports = {
  generateRandomQuote,
  randomAsk,
  randomAsk2,
  randomAsk3,
  randomAsk4,
  randomAsk5,
  randomAsk6,
  randomAnswer,
};
