<template>
  <div class="iot-container">
    <header class="iot-header">
      <div class="brand-box">
        <span class="brand-badge">SK</span>
        <div>
          <h2 class="brand-title">SMK Bisa Hebat</h2>
          <span class="brand-subtitle">Smart School & Lab Portal</span>
        </div>
      </div>
      <div class="online-indicator">
        <span class="pulse-dot"></span> Sistem Aktif
      </div>
    </header>

    <section class="iot-card">
      <div class="welcome-tag">Selamat Datang, Administrator Lab</div>
      <h1 class="main-heading">Manajemen Perangkat IoT Sekolah</h1>
      <p class="main-desc">
        Pusat kendali dan inventaris perangkat Internet of Things (IoT) di lingkungan sekolah. Pantau status perangkat laboratorium, kelola lokasi praktikum, dan dukung kegiatan belajar mengajar berbasis teknologi modern.
      </p>
      
      <div class="action-wrapper">
        <NuxtLink to="/data_iot" class="btn-primary-custom">
          <span>Kelola Data IoT Sekolah</span>
          &rarr;
        </NuxtLink>
      </div>
    </section>
    
    <section class="iot-card">
      <h3 class="section-title">🏫 Profil Sekolah — Pusat Keunggulan Teknologi</h3>
      <p class="about-text">
        Kami adalah institusi pendidikan kejuruan yang berkomitmen mencetak generasi unggul, kompeten, dan siap menghadapi era transformasi digital industri. Melalui fasilitas laboratorium yang modern dan integrasi teknologi praktikum terkini, siswa dibekali keahlian nyata di bidang rekayasa perangkat lunak, jaringan, dan sistem automasi.
      </p>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
@import '~/assets/css/index.css';
</style>
