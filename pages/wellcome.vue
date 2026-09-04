<template>
  <div class="welcome-container">
    <!-- HEADER / NAVBAR ATAS -->
    <header class="welcome-header">
      <!-- KIRI ATAS: Profil Sekolah / Tempat Profile -->
      <div class="school-profile-card">
        <div class="school-logo-box">SK</div>
        <div>
          <p class="text-sm font-bold text-white">SMK PPLG Hebat</p>
          <p class="text-xs text-slate-300">Software & Game Development</p>
        </div>
      </div>

      <!-- KANAN ATAS: Menu Navigasi ala Gambar -->
      <nav class="welcome-nav">
        <NuxtLink to="/wellcome" class="nav-item">HOME</NuxtLink>
        <NuxtLink to="/wellcome" class="nav-item">ABOUT US</NuxtLink>
        <NuxtLink to="/data_iot" class="nav-item">DATA IOT</NuxtLink>
        <NuxtLink to="/" class="nav-item btn-login-nav">LOGOUT</NuxtLink>
      </nav>
    </header>

    <!-- KONTEN UTAMA (HERO SECTION) -->
    <main class="welcome-hero">
      <div class="hero-content">
        <h1 class="hero-title">WELCOME</h1>
        <p class="hero-desc">
          Pusat kendali dan inventaris perangkat Internet of Things (IoT) laboratorium sekolah. Pantau status perangkat secara real-time dan dukung era transformasi digital modern.
        </p>
        
        <div class="hero-action">
          <NuxtLink to="/data_iot" class="btn-yellow">
            READ MORE
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  layout: 'empty'
}
</script>

<style scoped>
@import '~/assets/css/wellcome.css';
</style>