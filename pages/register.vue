<template>
  <div class="login-container">
    <!-- KOLOM KIRI: Area Gambar & Identitas Sekolah / Branding -->
    <div class="login-left-pane">
      <div class="login-header-top">
        <span class="badge-portal">IoT Smart Lab Portal</span>
        <div class="status-indicator">
          <span class="text-xs text-slate-300">REG</span>
          <div class="pulse-dot"></div>
        </div>
      </div>

      <div class="login-hero-text">
        <h1 class="hero-title">
          Bergabung <br>Sekarang.
        </h1>
        <p class="hero-desc">
          Buat akun baru untuk mulai memantau dan mengontrol perangkat laboratorium secara real-time.
        </p>
      </div>

      <div class="school-profile-card">
      <div class="school-logo-box">SK</div>
        <div>
        <p class="text-sm font-bold text-white">SMK PPLG Hebat</p>
        <p class="text-xs text-slate-200">Software & Game Development</p>
        </div>
      </div>
      </div>

    <!-- KOLOM KANAN: Form Register -->
    <div class="login-right-pane">
      <div class="login-card-box">
        <div class="card-title-area">
          <h2>Buat Akun Baru</h2>
          <p>Daftarkan identitas kamu untuk akses sistem.</p>
        </div>

        <form class="form-group-container" @submit.prevent="handleRegister">
          <div class="input-group">
            <label>Nama Lengkap</label>
            <input 
              type="text" 
              v-model="name"
              required 
              placeholder="Masukkan nama lengkap"
              class="input-field"
            >
          </div>

          <div class="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              v-model="email"
              required 
              placeholder="nama@sekolah.sch.id"
              class="input-field"
            >
          </div>

          <div class="input-group">
            <label>Password</label>
            <input 
              type="password" 
              v-model="password"
              required 
              placeholder="••••••••"
              class="input-field"
            >
          </div>

          <button type="submit" class="btn-primary">
            Daftar Akun
          </button>
        </form>

        <div class="divider-or">
          <span>or</span>
        </div>

        <div class="footer-register">
          <p>
            Sudah punya akun? 
            <NuxtLink to="/" class="wa-link">Login di sini</NuxtLink>
          </p>
          <p style="margin-top: 8px;">
            <a :href="waHelpLink" target="_blank" class="wa-link">
              ⚠️ Ada kendala hubungi saja WA Admin click disini 
            </a>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      adminPhone: '62895640431365'
    }
  },
  computed: {
    waHelpLink() {
      const message = encodeURIComponent("Halo Admin, saya ada kendala saat melakukan pendaftaran akun IoT Lab.");
      return `https://wa.me/${this.adminPhone}?text=${message}`;
    }
  },
  methods: {
    async handleRegister() {
      try {
        const res = await this.$axios.$post('/api/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        
        alert('Registrasi berhasil! Silakan login.');
        this.$router.push('/');
      } catch (err) {
        console.error('Register gagal:', err);
        alert('Gagal melakukan registrasi. Periksa kembali data kamu.');
      }
    }
  }
}
</script>

<style src="~/assets/css/index.css" scoped></style>