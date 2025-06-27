const form = document.getElementById("kritikForm");
const notif = document.getElementById("notif");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Cek apakah sudah pernah kirim
  if (localStorage.getItem("sudahKirim") === "true") {
    notif.innerText = "Anda sudah mengirim kritik/saran. Terima kasih!";
    return;
  }

  const data = new FormData(form);

  fetch("https://script.google.com/macros/s/AKfycbxBAU8VbWL7O9yWF2TlO0069ioVBpb6N6Fg99--Ry_8i8TwDewKyIshgK4lIebUx6xtnw/exec", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(() => {
    notif.innerText = "✅ Terima kasih atas masukan Anda!";
    form.reset();
    form.querySelector("button").disabled = true;  // Nonaktifkan tombol kirim
    localStorage.setItem("sudahKirim", "true");    // Simpan ke localStorage
  })
  .catch(() => {
    notif.innerText = "❌ Gagal mengirim, coba lagi.";
  });
});

