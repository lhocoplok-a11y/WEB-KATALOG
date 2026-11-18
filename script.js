const produk = [
  {
    nama: "POSTER CUSTOM",
    harga: 10000,
    foto: "POSTER.jpeg",
    deskripsi: "Poster anime & karakter favorit, cetak berwarna bebas custom.",
    ukuran: [
      { nama: "A5", label: "A5 (15x21 cm)", harga: 8000 },
      { nama: "A4", label: "A4 (21x30 cm)", harga: 10000 },
      { nama: "A3", label: "A3 (30x42 cm)", harga: 15000 }
    ]
  },
  {
    nama: "FRAME FOTO FLANEL",
    harga: 15000,
    foto: "FRAME FOTO FLANEL.jpeg",
    deskripsi: "Frame foto flanel handmade, muat 4 foto, bisa custom ukuran.",
    warna: [
      { nama: "Putih", en: "White", kode: "#ffffff" },
      { nama: "Merah", en: "Red", kode: "#e53935" },
      { nama: "Kuning", en: "Yellow", kode: "#ffeb3b" },
      { nama: "Hijau", en: "Green", kode: "#4caf50" },
      { nama: "Biru", en: "Blue", kode: "#2196f3" }
    ]
  },
  {
    nama: "POSTER JADI",
    harga: 10000,
    foto: "NARUTO.png",
    deskripsi: "Poster anime & musisi favorit siap pilih dengan cetakan tajam berkualitas.",
    gambar: [
      { nama: "Naruto", file: "NARUTO.png" },
      { nama: "Madara", file: "MADARA.jpeg" },
      { nama: "Baskara", file: "BASKARA.jpeg" },
      { nama: "Aizen", file: "AIZEN.jpg" }
    ],
    ukuran: [
      { nama: "A5", label: "A5 (15x21 cm)", harga: 8000 },
      { nama: "A4", label: "A4 (21x30 cm)", harga: 10000 },
      { nama: "A3", label: "A3 (30x42 cm)", harga: 15000 }
    ]
  }
];

const nomorWA = "6282331764447";

const $ = id => document.getElementById(id);
const rp = n => "Rp " + n.toLocaleString("id-ID");

let pilihanUser = {
  0: { ukuran: "A4" },
  1: { warna: "Putih" },
  2: { gambar: "Naruto", ukuran: "A4" }
};

function getFotoProduk(i) {
  const p = produk[i];
  if (!p) return "";
  if (p.gambar) {
    const namaGambar = (pilihanUser[i] && pilihanUser[i].gambar) || p.gambar[0].nama;
    const item = p.gambar.find(g => g.nama === namaGambar);
    if (item) return item.file;
  }
  return p.foto;
}

function getHargaProduk(i) {
  const p = produk[i];
  if (!p) return 0;
  if (p.ukuran) {
    const namaUkuran = (pilihanUser[i] && pilihanUser[i].ukuran) || p.ukuran[0].nama;
    const item = p.ukuran.find(u => u.nama === namaUkuran);
    if (item && item.harga) return item.harga;
  }
  return p.harga;
}

function getHargaItem(k) {
  const p = produk[k.i];
  if (!p) return 0;
  const ukuranVal = k.ukuran || (k.opsi && k.opsi.ukuran);
  if (p.ukuran && ukuranVal) {
    const item = p.ukuran.find(u => u.nama === ukuranVal);
    if (item && item.harga) return item.harga;
  }
  return p.harga;
}

function getOpsiCurrent(i) {
  const p = produk[i];
  const userOpt = pilihanUser[i] || {};
  return {
    gambar: p.gambar ? (userOpt.gambar || p.gambar[0].nama) : null,
    ukuran: p.ukuran ? (userOpt.ukuran || p.ukuran[0].nama) : null,
    warna: p.warna ? (userOpt.warna || p.warna[0].nama) : null
  };
}

function formatLabelOpsi(opts) {
  const rincian = [];
  if (opts.gambar) rincian.push(`Gambar: ${opts.gambar}`);
  if (opts.warna) rincian.push(`Warna: ${opts.warna}`);
  if (opts.ukuran) rincian.push(`Ukuran: ${opts.ukuran}`);
  return rincian.join(", ");
}

function pilihUkuran(idx, ukuranNama) {
  if (!pilihanUser[idx]) pilihanUser[idx] = {};
  pilihanUser[idx].ukuran = ukuranNama;

  const label = $("ukuran-terpilih-" + idx);
  if (label) {
    label.textContent = ukuranNama;
  }

  const hargaEl = $("harga-produk-" + idx);
  if (hargaEl) {
    hargaEl.textContent = rp(getHargaProduk(idx));
  }

  const buttons = document.querySelectorAll(".pill-ukuran-" + idx);
  buttons.forEach(btn => {
    if (btn.dataset.ukuran === ukuranNama) {
      btn.classList.add("aktif");
    } else {
      btn.classList.remove("aktif");
    }
  });
}

function pilihWarna(idx, warnaNama) {
  if (!pilihanUser[idx]) pilihanUser[idx] = {};
  pilihanUser[idx].warna = warnaNama;

  const label = $("warna-terpilih-" + idx);
  if (label) {
    label.textContent = warnaNama;
  }

  const buttons = document.querySelectorAll(".dot-warna-" + idx);
  buttons.forEach(btn => {
    if (btn.dataset.warna === warnaNama) {
      btn.classList.add("aktif");
    } else {
      btn.classList.remove("aktif");
    }
  });
}

function pilihGambar(idx, gambarNama, fileFoto) {
  if (!pilihanUser[idx]) pilihanUser[idx] = {};
  pilihanUser[idx].gambar = gambarNama;

  const label = $("gambar-terpilih-" + idx);
  if (label) {
    label.textContent = gambarNama;
  }

  const fotoEl = $("foto-produk-" + idx);
  if (fotoEl) {
    fotoEl.src = fileFoto;
    fotoEl.alt = `${produk[idx].nama} - ${gambarNama}`;
  }

  const buttons = document.querySelectorAll(".thumb-gambar-" + idx);
  buttons.forEach(btn => {
    if (btn.dataset.gambar === gambarNama) {
      btn.classList.add("aktif");
    } else {
      btn.classList.remove("aktif");
    }
  });
}

function ambilKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem("keranjang") || "[]");

    if (!Array.isArray(data)) return [];

    return data.filter(k =>
      Number.isInteger(k.i) &&
      k.i >= 0 &&
      k.i < produk.length &&
      Number.isInteger(k.qty) &&
      k.qty > 0
    ).map(k => {
      const p = produk[k.i];
      let gambar = k.gambar || null;
      let ukuran = k.ukuran || null;
      let warna = k.warna || null;

      // Backward compatibility jika sebelumnya tersimpan sebagai string k.opsi atau k.warna
      if (k.opsi && typeof k.opsi === "string") {
        if (p.gambar && p.gambar.some(g => g.nama === k.opsi)) gambar = k.opsi;
        else if (p.ukuran && p.ukuran.some(u => u.nama === k.opsi)) ukuran = k.opsi;
        else if (p.warna && p.warna.some(w => w.nama === k.opsi)) warna = k.opsi;
      }

      if (p.gambar && !gambar) gambar = p.gambar[0].nama;
      if (p.ukuran && !ukuran) ukuran = p.ukuran[0].nama;
      if (p.warna && !warna) warna = p.warna[0].nama;

      return {
        i: k.i,
        qty: k.qty,
        gambar,
        ukuran,
        warna
      };
    });
  } catch {
    return [];
  }
}

let keranjang = ambilKeranjang();
let langsung = null;
let pesanSementara = "";

const daftarAktif = () => langsung || keranjang;

const total = () =>
  daftarAktif().reduce(
    (t, k) => t + getHargaItem(k) * k.qty,
    0
  );

function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

function tampilProduk() {
  const container = $("katalog-list") || $("katalog");
  if (!container) return;

  container.innerHTML = produk.map((p, i) => {
    let opsiHtml = "";

    // Pilihan Gambar jika ada
    if (p.gambar) {
      const aktifGambar = (pilihanUser[i] && pilihanUser[i].gambar) || p.gambar[0].nama;
      opsiHtml += `
        <div class="opsi-warna" onclick="event.stopPropagation()">
          <span class="label-warna">Pilihan Karakter: <b id="gambar-terpilih-${i}">${aktifGambar}</b></span>
          <div class="list-gambar">
            ${p.gambar.map(g => {
              const aktif = aktifGambar === g.nama ? "aktif" : "";
              return `
                <button
                  type="button"
                  class="thumb-gambar thumb-gambar-${i} ${aktif}"
                  data-gambar="${g.nama}"
                  title="${g.nama}"
                  onclick="pilihGambar(${i}, '${g.nama}', '${g.file}')">
                  <img src="${g.file}" alt="${g.nama}">
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // Pilihan Ukuran jika ada
    if (p.ukuran) {
      const aktifUkuran = (pilihanUser[i] && pilihanUser[i].ukuran) || p.ukuran[0].nama;
      opsiHtml += `
        <div class="opsi-warna" onclick="event.stopPropagation()">
          <span class="label-warna">Pilihan Ukuran: <b id="ukuran-terpilih-${i}">${aktifUkuran}</b></span>
          <div class="list-ukuran">
            ${p.ukuran.map(u => {
              const aktif = aktifUkuran === u.nama ? "aktif" : "";
              return `
                <button
                  type="button"
                  class="pill-ukuran pill-ukuran-${i} ${aktif}"
                  data-ukuran="${u.nama}"
                  title="${u.label || u.nama}"
                  onclick="pilihUkuran(${i}, '${u.nama}')">
                  ${u.nama}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // Pilihan Warna jika ada
    if (p.warna) {
      const aktifWarna = (pilihanUser[i] && pilihanUser[i].warna) || p.warna[0].nama;
      opsiHtml += `
        <div class="opsi-warna" onclick="event.stopPropagation()">
          <span class="label-warna">Pilihan Warna: <b id="warna-terpilih-${i}">${aktifWarna}</b></span>
          <div class="list-warna">
            ${p.warna.map(w => {
              const aktif = aktifWarna === w.nama ? "aktif" : "";
              return `
                <button
                  type="button"
                  class="dot-warna dot-warna-${i} ${aktif}"
                  data-warna="${w.nama}"
                  style="background-color: ${w.kode};"
                  title="${w.nama} (${w.en})"
                  onclick="pilihWarna(${i}, '${w.nama}')">
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    const currentFoto = getFotoProduk(i);

    return `
      <div class="card" onclick="bukaDetail(${i})" style="cursor:pointer">
        <img id="foto-produk-${i}" src="${currentFoto}" alt="${p.nama}"
          onclick="event.stopPropagation(); zoom(${i})"
          onerror="this.style.background='#f5d5c0'; this.alt='Foto belum ditemukan'">
        <h3>${p.nama}</h3>
        <p class="deskripsi">${p.deskripsi}</p>
        ${opsiHtml}
        <p class="harga" id="harga-produk-${i}">${rp(getHargaProduk(i))}</p>
        <button onclick="event.stopPropagation(); tambah(${i})">🛒+</button>
        <button onclick="event.stopPropagation(); pesanLangsung(${i})">Pesan</button>
      </div>
    `;
  }).join("");
}

function bukaDetail(i) {
  const p = produk[i];
  let detailTeks = p.deskripsi;

  if (p.gambar) {
    const gambarAktif = (pilihanUser[i] && pilihanUser[i].gambar) || p.gambar[0].nama;
    const listGambar = p.gambar.map(g => g.nama).join(", ");
    detailTeks += "\n\nPilihan Gambar: " + listGambar;
    if (gambarAktif) {
      detailTeks += "\nGambar Terpilih: " + gambarAktif;
    }
  }

  if (p.ukuran) {
    const ukuranAktif = (pilihanUser[i] && pilihanUser[i].ukuran) || p.ukuran[0].nama;
    const listUkuran = p.ukuran.map(u => `${u.nama} (${u.label || u.nama})`).join(", ");
    detailTeks += "\n\nPilihan Ukuran: " + listUkuran;
    if (ukuranAktif) {
      detailTeks += "\nUkuran Terpilih: " + ukuranAktif;
    }
  }

  if (p.warna) {
    const warnaAktif = (pilihanUser[i] && pilihanUser[i].warna) || p.warna[0].nama;
    const listWarna = p.warna.map(w => `${w.nama} (${w.en})`).join(", ");
    detailTeks += "\n\nPilihan Warna: " + listWarna;
    if (warnaAktif) {
      detailTeks += "\nWarna Terpilih: " + warnaAktif;
    }
  }

  detailTeks += "\n\nHarga: " + rp(getHargaProduk(i));

  info(p.nama, detailTeks);
}

function zoom(i) {
  if ($("zoomFoto")) $("zoomFoto").src = getFotoProduk(i);
  if ($("zoom")) $("zoom").classList.add("buka");
}

function toast(teks) {
  const el = $("toast");
  if (!el) return;

  el.textContent = teks;
  el.classList.add("tampil");

  setTimeout(() => {
    el.classList.remove("tampil");
  }, 2000);
}

function tambah(i) {
  const opts = getOpsiCurrent(i);
  const ada = keranjang.find(k =>
    k.i === i &&
    k.gambar === opts.gambar &&
    k.ukuran === opts.ukuran &&
    k.warna === opts.warna
  );

  if (ada) {
    ada.qty++;
  } else {
    keranjang.push({
      i,
      qty: 1,
      gambar: opts.gambar,
      ukuran: opts.ukuran,
      warna: opts.warna
    });
  }

  tampil();
  const labelRincian = formatLabelOpsi(opts);
  const toastText = produk[i].nama + (labelRincian ? ` (${labelRincian})` : "") + " masuk keranjang ✔";
  toast(toastText);
}

function ubah(idx, jumlah) {
  const d = daftarAktif();

  if (!d[idx]) return;

  d[idx].qty += jumlah;

  if (d[idx].qty <= 0) {
    d.splice(idx, 1);
  }

  tampil();
}

function kosongkan() {
  if (!keranjang.length) {
    toast("Keranjang sudah kosong!");
    return;
  }

  if (confirm("Yakin ingin mengosongkan keranjang?")) {
    keranjang = [];
    tampil();
    toast("Keranjang berhasil dikosongkan");
  }
}

function tampil() {
  simpanKeranjang();

  if ($("jumlah")) {
    $("jumlah").textContent = keranjang.reduce(
      (t, k) => t + k.qty,
      0
    );
  }

  if ($("daftar")) {
    $("daftar").innerHTML = daftarAktif().map((k, idx) => {
      const p = produk[k.i];
      const hargaItem = getHargaItem(k);
      const labelTeks = formatLabelOpsi(k);
      const infoOpsi = labelTeks ? `<br><small style="color:#c98a5e; font-weight:bold;">${labelTeks}</small>` : "";

      return `
        <div class="item">
          <span>
            ${p.nama} - ${rp(hargaItem)}
            ${infoOpsi}
          </span>
          <span>
            <button onclick="ubah(${idx}, -1)">−</button>
            ${k.qty}
            <button onclick="ubah(${idx}, 1)">+</button>
          </span>
        </div>
      `;
    }).join("") || "<p>Belum ada barang.</p>";
  }

  if ($("total")) {
    $("total").textContent = "Total: " + rp(total());
  }

  if ($("judul")) {
    $("judul").textContent = langsung
      ? "📝 Pesan Langsung"
      : "🛒 Keranjang";
  }

  if ($("btnKosong")) {
    $("btnKosong").style.display = langsung ? "none" : "";
  }
}

function pesanLangsung(i) {
  const opts = getOpsiCurrent(i);
  langsung = [{
    i,
    qty: 1,
    gambar: opts.gambar,
    ukuran: opts.ukuran,
    warna: opts.warna
  }];
  bukaModal();
}

function pesanSemua() {
  const d = daftarAktif();

  const nama = $("nama") ? $("nama").value.trim() : "";
  const alamat = $("alamat") ? $("alamat").value.trim() : "";
  const catatan = $("catatan") ? $("catatan").value.trim() : "";
  const pembayaran = $("bayar") ? $("bayar").value : "";

  if (!d.length) {
    toast("Belum ada barang yang dipesan!");
    return;
  }

  if (!nama) {
    toast("Nama belum diisi!");
    if ($("nama")) $("nama").focus();
    return;
  }

  if (!alamat) {
    toast("Alamat belum diisi!");
    if ($("alamat")) $("alamat").focus();
    return;
  }

  const teks = d.map(k => {
    const p = produk[k.i];
    const hargaItem = getHargaItem(k);
    const labelTeks = formatLabelOpsi(k);
    const labelOpsi = labelTeks ? ` (${labelTeks})` : "";

    return `${p.nama}${labelOpsi} x${k.qty} (${rp(hargaItem * k.qty)})`;
  }).join("\n");

  const jumlahProduk = d.reduce(
    (t, k) => t + k.qty,
    0
  );

  if ($("konfirmasiProduk")) $("konfirmasiProduk").textContent = teks;
  if ($("konfirmasiJumlah")) $("konfirmasiJumlah").textContent = jumlahProduk + " buah";
  if ($("konfirmasiTotal")) $("konfirmasiTotal").textContent = rp(total());
  if ($("konfirmasiNama")) $("konfirmasiNama").textContent = nama;
  if ($("konfirmasiAlamat")) $("konfirmasiAlamat").textContent = alamat;
  if ($("konfirmasiBayar")) $("konfirmasiBayar").textContent = pembayaran;

  pesanSementara =
    `Halo, saya mau pesan:\n${teks}` +
    `\nTotal: ${rp(total())}` +
    `\n\nNama: ${nama}` +
    `\nAlamat: ${alamat}` +
    `\nPembayaran: ${pembayaran}` +
    (catatan ? `\nCatatan: ${catatan}` : "");

  if ($("popupKonfirmasi")) $("popupKonfirmasi").style.display = "flex";
}

function tutupKonfirmasi() {
  if ($("popupKonfirmasi")) $("popupKonfirmasi").style.display = "none";
}

function lanjutPesan() {
  if (!pesanSementara) {
    toast("Data pesanan tidak ditemukan!");
    return;
  }

  const link =
    "https://wa.me/" +
    nomorWA +
    "?text=" +
    encodeURIComponent(pesanSementara);

  window.open(link, "_blank");

  tutupKonfirmasi();
  tutupKeranjang();
}

function bukaModal() {
  tampil();
  if ($("modal")) $("modal").classList.add("buka");
}

function bukaKeranjang() {
  langsung = null;
  bukaModal();
}

function tutupKeranjang() {
  langsung = null;
  if ($("modal")) $("modal").classList.remove("buka");
  tampil();
}

function info(judul, isi) {
  if ($("infoJudul")) $("infoJudul").textContent = judul;
  if ($("infoIsi")) $("infoIsi").textContent = isi;
  if ($("info")) $("info").classList.add("buka");
}

function modeGelap(aktif) {
  document.body.classList.toggle("gelap", aktif);
  document.documentElement.classList.toggle("gelap", aktif);

  const btn = $("btnGelap");
  if (btn) {
    btn.textContent = aktif ? "☀️" : "🌙";
    btn.setAttribute("aria-label", aktif ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap");
    btn.title = aktif ? "Mode Terang" : "Mode Gelap";
  }

  localStorage.setItem("gelap", aktif ? "1" : "0");
}

function toggleGelap() {
  modeGelap(!document.body.classList.contains("gelap"));
}

if ($("modal")) {
  $("modal").addEventListener("click", e => {
    if (e.target.id === "modal") {
      tutupKeranjang();
    }
  });
}

if ($("popupKonfirmasi")) {
  $("popupKonfirmasi").addEventListener("click", e => {
    if (e.target.id === "popupKonfirmasi") {
      tutupKonfirmasi();
    }
  });
}

if ($("info")) {
  $("info").addEventListener("click", e => {
    if (e.target.id === "info") {
      $("info").classList.remove("buka");
    }
  });
}

if ($("zoom")) {
  $("zoom").addEventListener("click", () => {
    $("zoom").classList.remove("buka");
  });
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    tutupKonfirmasi();
    tutupKeranjang();
    if ($("info")) $("info").classList.remove("buka");
    if ($("zoom")) $("zoom").classList.remove("buka");
  }
});

tampilProduk();
tampil();

modeGelap(
  localStorage.getItem("gelap") === "1"
);

window.onscroll = () => {
  if ($("atas")) {
    $("atas").style.display = scrollY > 300 ? "block" : "none";
  }
};
